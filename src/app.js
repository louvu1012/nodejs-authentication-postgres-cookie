const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "https://new-react-sigma.vercel.app");
  // res.header("Access-Control-Allow-Origin", "http://http://localhost:3000");
  res.header("Access-Control-Allow-Origin:*"
            , "Content-Type: application/json");
  next();
});

// Enable CORS for all origins
app.use(cors({
  origin: ['http://localhost:3000/', 'https://new-react-sigma.vercel.app/'], // The origin you want to allow
  credentials: true, // Enable credentials
}));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
