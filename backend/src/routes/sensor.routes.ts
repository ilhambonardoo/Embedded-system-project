import { Router, type Request, type Response } from "express";
import { db } from "../services/firebase";

const router = Router();

const sensorHistory: any[] = [];
const MAX_HISTORY = 20;

db.ref("/").on("value", (snapshot) => {
  const data = snapshot.val();

  if (data) {
    const record = {
      ...data,
      timestamp: Date.now(),
    };
    sensorHistory.push(record);
    if (sensorHistory.length > MAX_HISTORY) {
      sensorHistory.shift();
    }
  }
});

// GET /api/sensors - Baca semua sensor data
router.get("/", async (req: Request, res: Response) => {
  try {
    const currentData =
      sensorHistory.length > 0 ? sensorHistory[sensorHistory.length - 1] : {};

    if (sensorHistory.length === 0) {
      const snap = await db.ref("/").once("value");
      const fallbackData = snap.val();
      res.json({
        ok: true,
        data: {
          current: fallbackData || {},
          history: fallbackData ? [fallbackData] : [],
        },
      });
      return;
    }

    res.json({
      ok: true,
      data: {
        current: currentData,
        history: sensorHistory,
      },
    });
  } catch (err: any) {
    console.error("Error fetching sensors:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/sensors/:sensor - Baca sensor tertentu
router.get("/:sensor", async (req: Request, res: Response) => {
  try {
    const { sensor } = req.params;
    const snap = await db.ref(`/${sensor}`).once("value");
    const value = snap.val();

    res.json({
      ok: true,
      sensor,
      value,
    });
  } catch (err: any) {
    console.error("Error fetching sensor:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
