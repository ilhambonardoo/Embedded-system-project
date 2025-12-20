import { db } from "./firebase";
import {
  MOTOR_SPECS,
  MAX_POWER_WATT,
  TARIF_PLN_PER_KWH,
  MIN_EFFECTIVE_PWM_PERCENT,
} from "../config";
import { scheduleResetCheck, checkAndResetDailyStats } from "./DailyStats";

export const sensorHistory: any[] = [];
const MAX_HISTORY = 20;
let lastProcessTime = Date.now();
let isNewDay = false;

scheduleResetCheck();

db.ref("/").on("value", (snapshot) => {
  const data = snapshot.val();

  if (data) {
    checkAndResetDailyStats();

    const now = Date.now();
    let recordKwh = 0;
    let recordCost = 0;
    const timeDiffMs = now - lastProcessTime;
    const timeDiffHours = timeDiffMs / (1000 * 3600);
    lastProcessTime = now;

    if (data.pwm !== undefined && data.pwm !== null && Number(data.pwm) > 0) {
      if ((timeDiffHours > 0 && timeDiffHours < 1) || isNewDay) {
        const pwmRaw = Number(data.pwm) || 0;
        const pwmClamped = Math.max(0, Math.min(pwmRaw, MOTOR_SPECS.MAX_PWM));
        const pwmPercent = pwmClamped / MOTOR_SPECS.MAX_PWM;

        const currentWatt =
          pwmPercent < MIN_EFFECTIVE_PWM_PERCENT
            ? 0
            : pwmPercent * MAX_POWER_WATT;

        recordKwh = (currentWatt / 1000) * timeDiffHours;
        recordCost = recordKwh * TARIF_PLN_PER_KWH;

        const today = new Date().toISOString().split("T")[0];
        const statsRef = db.ref(`daily_stats/${today}`);

        statsRef
          .transaction((currentStats) => {
            if (!currentStats) {
              return {
                total_kwh: recordKwh,
                total_cost: recordCost,
                date: today,
              };
            }
            return {
              ...currentStats,
              total_kwh: (currentStats.total_kwh || 0) + recordKwh,
              total_cost: (currentStats.total_cost || 0) + recordCost,
              date: today,
            };
          })
          .then(() => {
            statsRef.once("value", (statsSnapshot) => {
              const updatedStats = statsSnapshot.val();

              const record = {
                ...data,
                total_kwh: updatedStats?.total_kwh || 0,
                total_cost: updatedStats?.total_cost || 0,
                timestamp: Date.now(),
              };
              sensorHistory.push(record);
              if (sensorHistory.length > MAX_HISTORY) {
                sensorHistory.shift();
              }

              isNewDay = false;
            });
          });
      }
    } else {
      const today = new Date().toISOString().split("T")[0];
      db.ref(`daily_stats/${today}`).once("value", (statsSnapshot) => {
        const currentStats = statsSnapshot.val();

        const record = {
          ...data,
          total_kwh: currentStats?.total_kwh || 0,
          total_cost: currentStats?.total_cost || 0,
          timestamp: Date.now(),
        };
        sensorHistory.push(record);
        if (sensorHistory.length > MAX_HISTORY) {
          sensorHistory.shift();
        }
      });
    }
  }
});
