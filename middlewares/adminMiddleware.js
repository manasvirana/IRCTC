const adminApiKey = (req, res, next) => {
    const key = req.headers['x-api-key'];
    if (key !== process.env.ADMIN_API_KEY) {
      return res.status(403).json({ message: 'Invalid or missing API key' });
    }
    next();
  };
  
  module.exports = adminApiKey;
  