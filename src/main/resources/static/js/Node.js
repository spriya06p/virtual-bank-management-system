const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Sample in-memory database (Replace with a real database)
let users = [];

// POST /register (User Registration)
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  
  // Check if the email already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the new user to the database
  const newUser = { email, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully' });
});

// POST /login (User Login)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  res.status(200).json({ message: 'Login successful' });
});

// Server setup
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
