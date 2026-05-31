const jwt = require("jsonwebtoken");

const JWT_SECRET = "photo-sharing-app-secret";

function verifyToken(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return response.status(401).json("Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        request.user_id = decoded.user_id;
        next();
    } catch (error) {
        return response.status(401).json("Unauthorized: Invalid token");
    }
}

module.exports = { verifyToken, JWT_SECRET };
