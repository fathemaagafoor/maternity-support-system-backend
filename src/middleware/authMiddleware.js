import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    return res
      .status(500)
      .json({ message: "Server error: JWT_SECRET is not set" });
  }

  // Get token from header like "Bearer <token>"
  const authHeader = req.headers["authorization"] || "";
  const parts = authHeader.split(" ");
  const token = parts.length >= 2 ? parts[1] : "";

  // Check if token is empty or invalid
  const normalized = (token || "").trim().toLowerCase();
  if (!normalized || normalized === "null" || normalized === "undefined") {
    return res.status(401).json({ message: "Please sign in to continue." });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Your session has expired. Please sign in again." });
      }
      return res
        .status(401)
        .json({ message: "Invalid token. Please sign in again." });
    }

    const payload = decoded || {};

    // Add user info to request so we can use it in controllers
    req.user = {
      id: String(payload.id || payload.userId || ""),
    };

    next();
  });
};
