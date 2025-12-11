export type Sample = {
  ts: number;
  value: number;
};

export type SensorBase = {
  name: string;
  unit: string;
  value: number;
  history: Sample[];
};

export type SensorData = {
  berat?: number;
  pwm?: number;
  rpm?: number;
  timestamp?: string;
  total_cost?: number;
  total_kwh?: number;
};

export interface ApiResponse {
  ok: boolean;
  data: {
    current: SensorData;
    history: SensorData[];
  };
}

export type error = {
  message: string;
};

export type ModelProps = {
  path: string;
};

export type SceneViewerProps = {
  path: string;
  enableZoom: boolean;
};
