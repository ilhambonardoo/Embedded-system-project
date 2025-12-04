import { YAxis, ResponsiveContainer, AreaChart, Area } from "recharts";

export default function Sparkline({
  data,
}: {
  data: { ts: number; value: number }[];
}) {
  return (
    <div className="w-full h-16 -mx-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#000000" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#000000" stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis domain={["dataMin", "dataMax"]} hide />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#000000"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
