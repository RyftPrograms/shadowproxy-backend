const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

function generateId(length = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

app.post("/upload", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "No text provided." });

  const id = generateId();
  const filePath = path.join(__dirname, "uploads", `${id}.txt`);
  fs.writeFileSync(filePath, text);
  res.json({ id });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
