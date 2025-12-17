import { useSensorBackend } from "../hooks/useSensorBackend";
import SensorDisplay from "../components/SensorDisplay";
import SensorTable from "../components/SensorTable";
import PowerCost from "../components/PowerCost";

export default function Dashboard() {
  const { sensors, history, error } = useSensorBackend();

  return (
    <div className="pb-32">
      <main className="pt-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg border border-red-300">
            ⚠️ Error: {error}
          </div>
        )}

        <SensorDisplay sensors={sensors} history={history} />
        <PowerCost sensors={sensors} />
        <SensorTable history={history} sensors={sensors} />
      </main>
    </div>
  );
}
