import dotenv from "dotenv";

// Load biến môi trường từ file .env
dotenv.config();

const JWT_SECRET_ACCESS = process.env.JWT_SECRET_ACCESS || "default_access_secret";
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH || "default_refresh_secret";

export { JWT_SECRET_ACCESS, JWT_SECRET_REFRESH };
