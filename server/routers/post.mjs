import express from "express";
import supabase from "../supabaseClient.mjs";

const router = express.Router();

router.use(express.json());

router.post("/addData", async (req, res) => {
  console.log("Request Body:", req.body);
  const {
    Name,
    Standard,
    Note,
    Price,
    requestID,
    imageURL,
    grains,
    Sampling_Point,
  } = req.body;

  if (!Name || !Standard || !Note || !requestID || !imageURL || !grains) {
    console.log(req.body);
    return res.status(400).json({ error: "กรุณาใส่ข้อมูลให้ครบถ้วน" });
  }

  try {
    const { data: testMenuData, error: insertError } = await supabase
      .from("testMenu")
      .insert([
        {
          Name,
          Standard,
          Note,
          Price,
          requestID,
          imageURL,
          Sampling_Point: Sampling_Point,
        },
      ])
      .select("id");

    if (insertError) {
      console.error("Error inserting data into testMenu:", insertError.message);
      return res.status(500).json({ error: insertError.message });
    }

    const testMenuId = testMenuData[0].id;

    const totalSampleCount = grains.length;

    const { error: updateError } = await supabase
      .from("testMenu")
      .update({ Total_Sample: totalSampleCount })
      .match({ id: testMenuId });

    if (updateError) {
      console.error("Error updating Total_sample:", updateError.message);
      return res.status(500).json({ error: updateError.message });
    }

    const grainsData = grains.map((grain) => ({
      length: grain.length,
      weight: grain.weight,
      shape: grain.shape,
      type: grain.type,
      file_id: testMenuId,
    }));

    const { error: grainsInsertError } = await supabase
      .from("grains")
      .insert(grainsData);

    if (grainsInsertError) {
      console.error(
        "Error inserting data into grains:",
        grainsInsertError.message
      );
      return res.status(500).json({ error: grainsInsertError.message });
    }

    res
      .status(201)
      .json({ message: "Data added successfully", data: testMenuData });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
});

export default router;
