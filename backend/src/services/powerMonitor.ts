import { db } from "../services/firebase";
import { MOTOR_SPECS, MAX_POWER_WATT, TARIF_PLN_PER_KWH } from "../config";

export const sensorHistory: any[] = [];
const MAX_HISTORY = 20;
let lastProcessTime = Date.now();
let lastResetDate = new Date().toISOString().split("T")[0];
let resetCheckSchedule = false;

const scheduleResetCheck = () => {
  if (resetCheckSchedule) return;

  resetCheckSchedule = true;
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const msUntilReset = tomorrow.getTime() - now.getTime();

  setTimeout(() => {
    checkAndResetDailyStats();
    resetCheckSchedule = false;
    scheduleResetCheck();
  }, msUntilReset);
};

const checkAndResetDailyStats = () => {
  const today = new Date().toISOString().split("T")[0];
  if (today !== lastResetDate) {
    const yesterday = lastResetDate;
    const statsRef = db.ref(`daily_stats/${yesterday}`);

    statsRef.once("value", (snapshot) => {
      if (snapshot.exists()) {
        const yesterdayData = snapshot.val();
        console.log(`Archived stats for ${yesterday}:`, yesterdayData);
      }
    });

    const todayStatsRef = db.ref(`daily_stats/${today}`);
    todayStatsRef.set({
      total_kwh: 0,
      total_cost: 0,
      date: today,
    });

    lastResetDate = today;
  }
};

scheduleResetCheck();

db.ref("/").on("value", (snapshot) => {
  const data = snapshot.val();

  if (data) {
    checkAndResetDailyStats();

    let recordKwh = 0;
    let recordCost = 0;

    if (data.pwm !== undefined && data.pwm !== null && Number(data.pwm) > 0) {
      const now = Date.now();
      const timeDiffMs = now - lastProcessTime;
      const timeDiffHours = timeDiffMs / (1000 * 3600);

      if (timeDiffHours > 0 && timeDiffHours < 1) {
        let currentWatt =
          (Number(data.pwm) / MOTOR_SPECS.MAX_PWM) * MAX_POWER_WATT;

        recordKwh = (currentWatt / 1000) * timeDiffHours;
        recordCost = recordKwh * TARIF_PLN_PER_KWH;

        lastProcessTime = now;

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
