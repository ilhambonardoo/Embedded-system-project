import { useEffect, useRef, useState, useCallback } from "react";
import type { SensorData, ApiResponse } from "../types";

export function useSensorBackend() {
  const [sensors, setSensors] = useState<SensorData>({});
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SensorData[]>([]);

  const fetchSensor = useCallback(async () => {
    try {
      const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:4000";
      const response = await fetch(`${apiBase}/api/sensors`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = (await response.json()) as ApiResponse;

      setSensors(result.data?.current || {});

      const historyData = result.data?.history;
      if (Array.isArray(historyData)) {
        setHistory(historyData);
      } else {
        setHistory([]);
      }

      setError(null);
    } catch (err) {
      setError(String(err));
    } finally {
    }
  }, []);

  useEffect(() => {
    fetchSensor();
    const interval = setInterval(fetchSensor, 1000);
    return () => clearInterval(interval);
  }, [fetchSensor]);

  return { sensors, error, history, fetchSensor };
}
