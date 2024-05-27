const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Enable CORS for all origins
app.use(cors({ origin: '*' }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin); // Cho phép tất cả các nguồn gốc
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, HEAD, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin","*");
//   next();
// });
// app.use(cors({
//   origin: ['http://localhost:3000', 'https://new-react-sigma.vercel.app'],
//   credentials: true, // Enable credentials
// }));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
