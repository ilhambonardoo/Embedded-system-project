import { useEffect, useRef, useState } from "react";
import type { SensorData, ApiResponse } from "../types";

export function useSensorBackend() {
  const [sensors, setSensors] = useState<SensorData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SensorData[]>([]);

  const isClearedRef = useRef(false);

  const clearHistory = async () => {
    setHistory([]);
    isClearedRef.current = true;
  };

  const fetchSensor = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:4000";
      const response = await fetch(`${apiBase}/api/sensors`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = (await response.json()) as ApiResponse;

      setSensors(result.data?.current || {});

      if (!isClearedRef.current) {
        const historyData = result.data?.history;
        if (Array.isArray(historyData)) {
          setHistory(historyData);
        } else {
          setHistory([]);
        }
      }

      setError(null);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSensor();
    const interval = setInterval(fetchSensor, 1000);
    return () => clearInterval(interval);
  }, []);

  return { sensors, loading, error, history, clearHistory };
}
