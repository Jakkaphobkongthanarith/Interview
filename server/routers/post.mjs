import express from "express";
import supabase from "../supabaseClient.mjs";

const router = express.Router();

router.use(express.json());

router.post("/addFood", async (req, res) => {
  console.log("Request Body:", req.body);
  const { Name, Standard, Note, Price, requestID, imageURL, grains } = req.body;

  if (!Name || !Standard || !Note || !requestID || !imageURL || !grains) {
    console.log(req.body);
    return res.status(400).json({ error: "กรุณาใส่ข้อมูลให้ครบถ้วน" });
  }

  try {
    const { data, error: insertError } = await supabase
      .from("testMenu")
      .insert([{ Name, Standard, Note, Price, requestID, imageURL, grains }])
      .select(
        "id, created_at, updated_at, Name, Standard, Note, requestID, imageURL, grains"
      );

    if (insertError) {
      console.error("Error inserting data:", insertError.message);
      return res.status(500).json({ error: insertError.message });
    }

    res.status(201).json({ message: "done", data });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
});

export default router;
