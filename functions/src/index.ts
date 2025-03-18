import * as functions from "firebase-functions/v2"; // <-- 2nd Gen
import * as admin from "firebase-admin";
import axios from "axios";

admin.initializeApp();

export const uploadPdfToStorage = functions.https.onRequest(async (req, res) => {
  const { pdfUrl, fileName } = req.body;

  if (!pdfUrl || !fileName) {
    res.status(400).send("Missing pdfUrl or fileName");
    return;
  }

  try {
    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "binary");

    const bucket = admin.storage().bucket();
    const file = bucket.file(`pdfs/${fileName}`);
    await file.save(buffer, {
      contentType: "application/pdf",
    });

    const fileUrl = await file.getSignedUrl({
      action: "read",
      expires: "03-01-2500",
    });

    res.status(200).send({ fileUrl });
  } catch (error) {
    console.error("Error uploading PDF to storage:", error);
    res.status(500).send("Error uploading PDF to storage");
  }
});
