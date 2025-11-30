import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not set");
    }

    const authHeader = req.headers["authorization"] || "";
    const parts = authHeader.split(" ");
    const token = parts.length >= 2 ? parts[1] : "";

    const normalized = (token || "").trim().toLowerCase();
    if (!normalized || normalized === "null" || normalized === "undefined") {
        return res.authenticationRequired(
            res,
            "Please sign in to continue."
        );
    }

    jwt.verify(
        token,
        JWT_SECRET,
        { algorithms: ["HS256"] },
        (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.tokenExpired(
                        res,
                        "Your session has expired. Please sign in again."
                    );
                }
                return res.invalidToken(
                    res,
                    "Invalid authentication token. Please sign in again."
                );
            }

            const payload = decoded || {};

            req.user = {
                id: String(payload.id || payload.userId || ""),
            };

            next();
        }
    );
};