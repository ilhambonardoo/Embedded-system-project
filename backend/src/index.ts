import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import "./services/firebase";
import sensorsRouter from "./routes/sensor.routes";
import commandsRouter from "./routes/commands.routes";
import { verifyApiKey } from "./middleware/auth";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT || 4000);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ngecek doang
app.get("/health", (req: Request, res: Response) => {
  res.json({ ok: true, timeStamp: new Date() });
});

// routes
app.get("/api/sensors", sensorsRouter);
app.use("/api/sensors", sensorsRouter);
app.use("/api/commands", verifyApiKey, commandsRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Sever error" });
});

// 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log(`NODE_ENV : ${process.env.NODE_ENV || "Development"}  `);
  console.log(`Firebase DB: ${process.env.FIREBASE_DB_URL}`);
});
