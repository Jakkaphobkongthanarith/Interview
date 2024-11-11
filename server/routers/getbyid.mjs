// // server/routes/get.mjs
// import express from "express";
// import supabase from "../supabaseClient.mjs";

// const router = express.Router();

// // เส้นทาง GET /getFood สำหรับดึงข้อมูลพร้อม pagination
// router.get("/getFood:id", async (req, res) => {
//   const { page = 1 } = req.query; // ใช้ page จาก query parameter, ถ้าไม่มีจะเป็น 1
//   const limit = 10; // จำนวนรายการที่จะแสดงต่อหน้า
//   const offset = (page - 1) * limit;

//   // ดึงข้อมูลจาก Supabase
//   const { data, error, count } = await supabase
//     .from("testMenu")
//     .select("id, created_at, updated_at, Name, Standard, Note", {
//       count: "exact",
//     })
//     .range(offset, offset + limit - 1); // ใช้ range เพื่อจำกัดจำนวนรายการต่อหน้า

//   if (error) {
//     console.error("Error fetching data:", error.message);
//     return res.status(500).json({ error: error.message });
//   }

//   // คำนวณหน้าทั้งหมด
//   const totalPages = Math.ceil(count / limit);

//   res.status(200).json({
//     data,
//     pagination: {
//       currentPage: page,
//       totalPages,
//       totalItems: count,
//       itemsPerPage: limit,
//     },
//   });
// });

// export default router;
