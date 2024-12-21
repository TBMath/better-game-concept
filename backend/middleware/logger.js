// middleware/logger.js
function logRequest(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();  // Pass the request to the next middleware or route handler
  }
export default logRequest;
  