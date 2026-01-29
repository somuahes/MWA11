const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env")
});

console.log("MONGO_URI:", process.env.MONGO_URI);

const User = require("./models/User");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      username: "admin",
      password: hashedPassword
    });

    console.log("✅ Admin user created");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err.message);
    process.exit(1);
  });
