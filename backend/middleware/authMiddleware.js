// const jwt = require('jsonwebtoken');
// const asyncHandler = require('express-async-handler');
// const User = require('../models/userModel');

// const protect = asyncHandler(async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       // Get the token from header
//       token = req.headers.authorization.split(' ')[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       console.log('decoded', decoded);

//       // Get user from token
//       req.user = await User.findById(decoded.id).select('-password');
//       next();
//     } catch (error) {
//       console.log(error);
//       res.status(401);
//       throw new Error('Not authorized');
//     }
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error('Not authorized, no token');
//   }
// });

// // Bearer token

// module.exports = { protect };

const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  console.log(token);
  if (!token)
    return res
      .status(401)
      .json({ message: 'Access denied.No token provided.' });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    // Get user from token
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = { auth };
