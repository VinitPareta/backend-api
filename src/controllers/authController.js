const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs"); // import bcrypt
const jwt = require("jsonwebtoken");

class AuthController {
  // REGISTER
  static async register(req, res) {
    try {
      const existing = await Admin.findOne({ email: req.body.email });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Admin already exists",
        });
      }

      // 2. hash password before saving
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const admin = await Admin.create({
        email: req.body.email,
        password: hashedPassword, // save hashed password not plain text
      });

      res.status(201).json({
        success: true,
        message: "Admin registered successfully",
        data: {
          _id: admin._id,
          email: admin.email,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // LOGIN
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      //  compare plain password with hashed password
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
      //  generate JWT token
      const token = jwt.sign(
        { id: admin._id, email: admin.email }, // payload means what data we want to include in the token
        process.env.JWT_SECRET, // secret key from .env
        { expiresIn: "30d" }, // token expires in 30 days
      );

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          _id: admin._id,
          email: admin.email,
          token: token, // token is send to the frontend so it can be stored and used for authenticated requests
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = AuthController;
