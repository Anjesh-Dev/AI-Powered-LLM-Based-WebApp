// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const app = express();
// const PORT = process.env.PORT || 4000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Gemini
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// const model = genAI.getGenerativeModel({
//     model: "gemini-2.5-flash",
// });

// // Home Route
// app.get("/", (req, res) => {
//     res.send("AI Powered LLM API SERVER is Running...")
// });

// // Generate Function
// async function generate(prompt) {
//     const result = await model.generateContent(prompt);
//     return result.response.text();
// }

// // API Route
// app.post("/api/content", async (req, res) => {

//     try {

//         const { question } = req.body;

//         if (!question) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Question is required"
//             });
//         }

//         const answer = await generate(question);

//         res.status(200).json({
//             success: true,
//             result: answer
//         });

//     } catch (error) {

//         console.error(error);

//         res.status(500).json({
//             success: false,
//             message: "Internal Server Error"
//         });

//     }

// });

// // // Start Server
// // app.listen(PORT, () => {
// //     console.log(`Server Running : http://localhost:${PORT}`);
// // });

// // yahan se frontend serve hoga
// app.use(express.static("public"));

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });



require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve Frontend
app.use(express.static(path.join(__dirname, "../public")));

// Gemini
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// Generate Function
async function generate(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// API Route
app.post("/api/content", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const answer = await generate(question);

    res.json({
      success: true,
      result: answer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// Home Route (Serve index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});