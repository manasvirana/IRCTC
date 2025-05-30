const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log('Please login to access this route');
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('Token not found. Try logging in again.');
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(`User verified | ID: ${decoded.id}, Role: ${decoded.role}`);
    next();
  } catch {
    console.log('Invalid token. Please login again.');
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    console.log('Access denied. Admin only area.');
    return res.status(403).json({ message: 'Admin access required' });
  }
  console.log('Admin access granted');
  next();
};

module.exports = {
  authenticateUser,
  authorizeAdmin,
};
