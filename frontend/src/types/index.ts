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

export type RFIDSensor = {
  name: string;
  lastScanned: string | null;
  isAuthorized: boolean;
  history: { ts: number; id: string; authorized: boolean }[];
};

export type SensorsState = {
  ir: SensorBase;
  load: SensorBase;
  power: SensorBase;
  rfid: RFIDSensor;
};

export type SensorData = {
  berat?: number;
  pwm?: number;
  rpm?: number;
  timestamp?: string;
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
