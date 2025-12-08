import express, { NextFunction, type Request, type Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import "./services/firebase";
import sensorsRouter from "./routes/sensor.routes";
import path from "path";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT || 4000);
const __dirname = path.resolve();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// routes
// Ngecek doang
app.get("/health", (req: Request, res: Response) => {
  res.json({ ok: true, timeStamp: new Date() });
});

app.get("/api/sensors", sensorsRouter);
app.use("/api/sensors", sensorsRouter);

// 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Sever error" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log(`NODE_ENV : ${process.env.NODE_ENV || "Development"}  `);
  console.log(`Firebase DB: ${process.env.FIREBASE_DB_URL}`);
});
