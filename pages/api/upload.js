import multer from "multer";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await new Promise((resolve, reject) => {
        upload.array("files")(req, res, (err) => {
          if (err) {
            console.error("Error uploading files:", err);
            reject({ message: "Error uploading files", err });
            return;
          }
          const uploadPromises = req.files.map((file) => {
            return supabase.storage
              .from("documents")
              .upload(`${Date.now()}_${file.originalname}`, file.buffer, {
                cacheControl: "3600",
                upsert: false,
              })
              .then((response) => {
                console.log("File uploaded successfully:", response.data);
              })
              .catch((error) => {
                console.error("Error uploading file:", error);
                throw error;
              });
          });
          Promise.all(uploadPromises)
            .then(() => {
              resolve();
            })
            .catch((err) => {
              console.error("Error uploading files:", err);
              reject({ message: "Error uploading files", err });
            });
        });
      });
      res.status(200).json({ message: "Files uploaded successfully" });
    } catch (err) {
      console.error("Error uploading files:", err);
      res.status(500).json({ message: err.message || "Error uploading files" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}