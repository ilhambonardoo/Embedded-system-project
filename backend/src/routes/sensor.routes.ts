import { Router, type Request, type Response } from "express";
import { db } from "../services/firebase";
import { sensorHistory } from "../services/powerMonitor";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const currentData =
      sensorHistory.length > 0 ? sensorHistory[sensorHistory.length - 1] : {};

    const today = new Date().toISOString().split("T")[0];
    const dailyStatsSnap = await db.ref(`daily_stats/${today}`).once("value");
    const dailyStats = dailyStatsSnap.val();

    const mergedCurrentData = {
      ...currentData,
      total_cost: dailyStats?.total_cost || 0,
      total_kwh: dailyStats?.total_kwh || 0,
    };

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
        current: mergedCurrentData,
        history: sensorHistory,
      },
    });
  } catch (err: any) {
    console.error("Error fetching sensors:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/sensors/:sensor -> membaca sensor tertentu
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
