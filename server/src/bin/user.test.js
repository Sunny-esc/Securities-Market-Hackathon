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








//pg code below









//this is rough code for postgres using pgbouncer connection pool
//returns all users from the users table
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//returns a single user from the users table based on the id
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


//creates a new user in the users table
const createUser = (request, response) => {
  const { name, email,password } = request.body

  pool.query('INSERT INTO users (username, email ,password) VALUES ($1, $2,$3) RETURNING *', [name, email,password], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}


//updates an existing user in the users table based on the id
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}
//DELETE a user
//Finally, we’ll use the DELETE clause on /users/:id to delete a specific user by ID. This call is very similar to our getUserById() function:

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

export{
  pool,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
















