import { useEffect, useRef, useState, useCallback } from "react";
import type { SensorData, ApiResponse } from "../types";

export function useSensorBackend() {
  const [sensors, setSensors] = useState<SensorData>({});
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SensorData[]>([]);

  const isClearedRef = useRef(false);

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
        if (isClearedRef.current) {
          if (historyData.length > 0) {
            setHistory(historyData);
            isClearedRef.current = false;
          } else {
            setHistory([]);
          }
        } else {
          setHistory(historyData);
        }
      } else {
        setHistory([]);
      }

      setError(null);
    } catch (err) {
      setError(String(err));
    } finally {
    }
  }, []);

  const clearHistory = useCallback(async () => {
    try {
      isClearedRef.current = true;
      setHistory([]);

      const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:4000";
      const response = await fetch(`${apiBase}/api/sensors/clear-history`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      await fetchSensor();
    } catch (err) {
      setError(String(err));
    }
  }, [fetchSensor]);

  useEffect(() => {
    fetchSensor();
    const interval = setInterval(fetchSensor, 1000);
    return () => clearInterval(interval);
  }, [fetchSensor]);

  return { sensors, error, history, clearHistory, fetchSensor };
}
