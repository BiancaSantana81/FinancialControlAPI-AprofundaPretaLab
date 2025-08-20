import app from "./index";
import { connectDB } from "./config/database";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    console.log("✅ Database connected!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
