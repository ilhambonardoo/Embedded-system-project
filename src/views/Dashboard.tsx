import ControlPanel from "../components/ControlPanel";
import useRealtime from "../hooks/useRealtime";
import SensorCard from "../components/SensorCard";

export default function Dashboard() {
  const { sensors } = useRealtime({ mode: "mock", intervalMs: 1000 });

  return (
    <main className="p-6 md:p-8 max-w-7xl mx-auto pb-24">
      <div className="flex flex-col lg:flex-cols-12 gap-8">
        <section className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SensorCard sensor={sensors.ir} variant="sparkline" />
            <SensorCard sensor={sensors.load} variant="meter" />
          </div>
          <div>
            <SensorCard sensor={sensors.power} variant="large" />
          </div>
        </section>

        <div className="w-full">
          <div className="sticky top-8">
            <ControlPanel />
          </div>
        </div>
      </div>
    </main>
  );
}
