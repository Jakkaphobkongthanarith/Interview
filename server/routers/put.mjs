import express from "express";
import supabase from "../supabaseClient.mjs";

const router = express.Router();

router.put("/updateFood/:id", async (req, res) => {
  const { id } = req.params;
  const { Name, Standard, Note, Price } = req.body;

  //   if (!Name || !Standard || !Note || !Price) {
  //     return res.status(400).json({ error: "กรุณาใส่ข้อมูลให้ครบถ้วน" });
  //   }

  try {
    const { data, error } = await supabase
      .from("testMenu")
      .update({ Name, Standard, Note, Price })
      .eq("id", id);

    if (error) {
      console.error("Error updating data:", error.message);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: "Food item updated successfully", data });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
});

export default router;
