import { useEffect, useRef, useState } from "react";
import type { SensorsState } from "../types";

export default function useRealtime({
  mode = "mock",
  intervalMs = 1000,
}: {
  mode?: "mock" | "firebase";
  intervalMs?: number;
  firebaseMode?: "firestore" | "realtime-db";
  path?: string;
}) {
  const makeInit = (): SensorsState => {
    const now = Date.now();
    const make = (n: string, u: string, v: number) => ({
      name: n,
      unit: u,
      value: v,
      history: Array.from({ length: 10 }).map((_, i) => ({
        ts: now - (10 - i) * 1000,
        value: v,
      })),
    });
    return {
      ir: make("Sensor IR", "cm", 15.4),
      load: make("Sensor Beban", "kg", 5.2),
      power: make("Daya", "W", 450),
    };
  };

  const [sensors, setSensors] = useState<SensorsState>(makeInit);
  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    if (mode === "mock") {
      tickRef.current = window.setInterval(() => {
        setSensors((prev) => {
          const now = Date.now();
          const jitter = (v: number, pct = 0.04) =>
            parseFloat((v * (1 + (Math.random() - 0.5) * pct * 2)).toFixed(2));
          return {
            ir: {
              ...prev.ir,
              value: jitter(prev.ir.value, 0.03),
              history: [
                ...prev.ir.history,
                { ts: now, value: jitter(prev.ir.value) },
              ].slice(-60),
            },
            load: {
              ...prev.load,
              value: jitter(prev.load.value, 0.05),
              history: [
                ...prev.load.history,
                { ts: now, value: jitter(prev.load.value) },
              ].slice(-60),
            },
            power: {
              ...prev.power,
              value: Math.max(0, Math.round(jitter(prev.power.value, 0.04))),
              history: [
                ...prev.power.history,
                { ts: now, value: Math.round(jitter(prev.power.value)) },
              ].slice(-60),
            },
          };
        });
      }, intervalMs);
    } else {
      // nanti isi WebSocket connection di sini
    }

    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [mode, intervalMs]);

  return { sensors };
}
