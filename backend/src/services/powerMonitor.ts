import { db } from "../services/firebase";
import { MOTOR_SPECS, MAX_POWER_WATT, TARIF_PLN_PER_KWH } from "../config";

const sensorHistory: any[] = [];
const MAX_HISTORY = 20;
let lastProcessTime = Date.now();

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

    if (typeof data.pwm !== undefined) {
      const now = Date.now();
      const timeDiffHours = (now - lastProcessTime) / (1000 * 3600);
      lastProcessTime = now;

      if (timeDiffHours > 0 && timeDiffHours < 1) {
        let currentWatt =
          (Number(data.pwm) / MOTOR_SPECS.MAX_PWM) * MAX_POWER_WATT;

        const kwhUsed = (currentWatt / 1000) * timeDiffHours;
        const costRp = kwhUsed * TARIF_PLN_PER_KWH;

        const today = new Date().toISOString().split("T")[0];
        const statsRef = db.ref(`daily_stats/${today}`);

        statsRef.transaction((currentStats) => {
          if (!currentStats) {
            return {
              total_kwh: kwhUsed,
              total_cost: costRp,
            };
          }
          return {
            ...currentStats,
            total_kwh: (currentStats.total_kwh || 0) + kwhUsed,
            total_cost: (currentStats.total_cost || 0) + costRp,
          };
        });
      }
    }
  }
});
