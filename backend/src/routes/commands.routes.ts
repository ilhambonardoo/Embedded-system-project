import { Router, type Request, type Response } from "express";
import { db } from "../services/firebase";

const router = Router();

// POST /api/commands/stop - Kirim perintah STOP
router.post("/stop", async (req: Request, res: Response) => {
  try {
    const { reason = "manual-button", meta } = req.body || {};

    const payload = {
      active: true,
      reason,
      by: "api",
      meta: meta || {},
      ts: Date.now(),
    };

    await db.ref("commands/stop").set(payload);

    res.json({
      ok: true,
      message: "Stop command sent",
      payload,
    });
  } catch (err: any) {
    console.error("Error sending stop command:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/commands/speed - Kirim perintah SET SPEED
router.post("/speed", async (req: Request, res: Response) => {
  try {
    const { rpm } = req.body || {};

    if (typeof rpm !== "number" || rpm < 0 || rpm > 5000) {
      return res.status(400).json({ error: "RPM must be 0-5000" });
    }

    const payload = {
      active: true,
      rpm,
      by: "api",
      ts: Date.now(),
    };

    // Tulis ke Firebase Realtime DB
    await db.ref("commands/speed").set(payload);

    res.json({
      ok: true,
      message: "Speed command sent",
      payload,
    });
  } catch (err: any) {
    console.error("Error sending speed command:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
