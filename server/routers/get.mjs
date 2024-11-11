import express from "express";
import supabase from "../supabaseClient.mjs";

const router = express.Router();

router.get("/getFood", async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 10; 
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabase
    .from("testMenu")
    .select("id, created_at, Inspection_ID, Name, Standard, Note", {
      count: "exact",
    })
    .range(offset, offset + limit - 1); 

  if (error) {
    console.error("Error fetching data:", error.message);
    return res.status(500).json({ error: error.message });
  }

  const totalPages = Math.ceil(count / limit);

  res.status(200).json({
    data,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: count,
      itemsPerPage: limit,
    },
  });
});

router.get("/getFood/:id", async (req, res) => {
  const { id } = req.params; 

  try {
    const { data, error } = await supabase
      .from("testMenu") 
      .select("*") 
      .eq("id", id) 
      .single(); 

    if (error) {
      console.error("Error fetching data by ID:", error.message);
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(data); 
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
});

export default router;
