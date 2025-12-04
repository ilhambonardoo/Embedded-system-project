import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function SimpleMeter({
  value,
  max = 100,
}: {
  value: number;
  max?: number;
}) {
  const data = [
    { name: "value", value: value },
    { name: "remaining", value: Math.max(0, max - value) },
  ];
  return (
    <div className="flex items-center gap-6">
      <div className="w-28 h-14 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[200%]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius="75%"
                outerRadius="100%"
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                <Cell key="val" fill="#000000" />
                <Cell key="rem" fill="#e5e5e5" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-500">
          {Math.round((value / max) * 100)}%
        </div>
      </div>
      <div>
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
          Capacity
        </div>
        <div className="h-1.5 w-24 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-black rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
