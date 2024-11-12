import express from "express";
import supabase from "../supabaseClient.mjs";

const router = express.Router();

router.delete("/deleteData/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ error: "กรุณาระบุ ID ของรายการที่ต้องการลบ" });
  }

  const { error } = await supabase.from("testMenu").delete().eq("id", id);

  if (error) {
    console.error("Error deleting data:", error.message);
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: "ลบข้อมูลสำเร็จ" });
});

export default router;
