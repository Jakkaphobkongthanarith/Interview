import express from "express";
import supabase from "../supabaseClient.mjs";

const router = express.Router();

router.get("/getData", async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabase
    .from("testMenu")
    .select("id, created_at, Inspection_ID, Name, Standard, Note", {
      count: "exact",
    })
    .range(offset, offset + limit - 1)
    .order("id", { ascending: false }); 

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


router.get("/getData/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { data: testMenuData, error: testMenuError } = await supabase
      .from("testMenu")
      .select("*")
      .eq("id", id)
      .single();

    if (testMenuError) {
      console.error(
        "Error fetching data from testMenu:",
        testMenuError.message
      );
      return res.status(500).json({ error: testMenuError.message });
    }

    if (!testMenuData) {
      return res.status(404).json({ message: "Item not found" });
    }


    const { data: grainsData, error: grainsError } = await supabase
      .from("grains")
      .select("type, length")
      .eq("file_id", id);

    if (grainsError) {
      console.error("Error fetching data from grains:", grainsError.message);
      return res.status(500).json({ error: grainsError.message });
    }

    const grainTypes = [
      "white",
      "chalky",
      "yellow",
      "undermilled",
      "glutinous",
    ];
    const typeCounts = grainTypes.reduce((acc, type) => {
      acc[type] = { count: 0, percentage: "0" };
      return acc;
    }, {});

    const lengthCategories = {
      fullGrain: { count: 0, percentage: "0" },
      largeBrokenGrain: { count: 0, percentage: "0" },
      normalBrokenGrain: { count: 0, percentage: "0" },
    };

    if (!grainsData || grainsData.length === 0) {
      return res.status(200).json({
        testMenu: testMenuData,
        grainTypePercentages: typeCounts,
        lengthCategoryPercentages: lengthCategories,
      });
    }

    grainsData.forEach((grain) => {
      if (grain.type) {
        switch (grain.type) {
          case "white":
          case "chalky":
          case "yellow":
          case "undermilled":
          case "glutinous":
            typeCounts[grain.type].count += 1;
            break;
          default:
            break;
        }
      }

      if (grain.length) {
        if (grain.length >= 7) {
          lengthCategories.fullGrain.count += 1;
        } else if (grain.length >= 3.5 && grain.length <= 6.99) {
          lengthCategories.largeBrokenGrain.count += 1;
        } else if (grain.length >= 0 && grain.length <= 3.49) {
          lengthCategories.normalBrokenGrain.count += 1;
        }
      }
    });

    const totalGrains = grainsData.length;
    grainTypes.forEach((type) => {
      const count = typeCounts[type].count;
      const percentage =
        totalGrains > 0 ? ((count / totalGrains) * 100).toFixed(2) : "0";
      typeCounts[type].percentage = percentage;
    });

    Object.keys(lengthCategories).forEach((category) => {
      const count = lengthCategories[category].count;
      const percentage =
        totalGrains > 0 ? ((count / totalGrains) * 100).toFixed(2) : "0";
      lengthCategories[category].percentage = percentage;
    });

    res.status(200).json({
      testMenu: testMenuData,
      grainTypePercentages: typeCounts,
      lengthCategoryPercentages: lengthCategories,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
});

export default router;
