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

export type SensorsState = {
  ir: SensorBase;
  load: SensorBase;
  power: SensorBase;
};

export type error = {
  message: string;
};
