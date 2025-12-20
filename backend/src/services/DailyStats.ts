import { db } from "./firebase";

let lastProcessTime = Date.now();
let lastResetDate = new Date().toISOString().split("T")[0];
let resetCheckSchedule = false;
let isNewDay = false;

export const scheduleResetCheck = () => {
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

export const checkAndResetDailyStats = () => {
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
    isNewDay = true;
  }
};
