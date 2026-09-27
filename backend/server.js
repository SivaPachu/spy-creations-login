const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());

const usersDB = [
  {
    name: 'Pachaiyappan',
    email: 'pachaiyappan@gmail.com',
    password: 'Password@123',
  },
];

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const existingUser = usersDB.find((user) => user.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(409).json({ message: 'An account with this email already exists.' });
  }

  const newUser = { name, email, password };
  usersDB.push(newUser);

  return res.status(201).json({
    message: 'Registration successful! You can now log in.',
    user: { name: newUser.name, email: newUser.email },
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = usersDB.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (user) {
    return res.status(200).json({
      message: 'Login successful!',
      user: {
        name: user.name,
        email: user.email,
      },
      token: 'mock-jwt-token-spy-creations-12345',
    });
  } else {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }
});

app.listen(PORT, () => {
  console.log(`SPY Creations API server running at http://localhost:${PORT}`);
});