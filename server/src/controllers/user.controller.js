import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const router = express.Router();

// Register a new user example taken from mongodb

router.post("/register", 
    async (req, res) => {
     // ✅ Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });}

  try {
    const { username, email, password ,googleId} = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }] });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const userData = new User({
      username,
      email,
      password: hashedPassword,
      verified: false,
    });
       // Only include googleId if it's present and non-null
    if (googleId) {
      userData.googleId = googleId;
    }

    await userData.save();
    await sendVerificationEmail(userData);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Login user
router.post("/login",[
  check("email").isEmail().normalizeEmail(),
  check("password").notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token"); // only if you're using cookies
  res.status(200).json({ message: "Logged out successfully" });
});

















