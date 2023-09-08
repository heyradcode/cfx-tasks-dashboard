import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale, LinearScale, Chart, BarElement } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement);

interface Props {
  data: { labels: string[]; values: number[] };
}
export default function BarChart({ data }: Props) {
  const chartData = useMemo(() => {
    return {
      labels: data.labels,
      datasets: [
        {
          label: "Bot",
          data: data.values,
          backgroundColor: ["#eab308", "#22c55e"],
          borderWidth: 1,
        },
      ],
    }
  }, [data])

  return (
    <div className="w-full mt-24 flex flex-col justify-center items-center">
      <div>
        <h2 className="text-gray-700 dark:text-white mb-4">Status ( pending/completed )</h2>
        <div className="hidden sm:block">
          <Bar
            data={chartData}
            width={400}
            height={400}
            options={{
              maintainAspectRatio: true
            }}
          />
        </div>
        <div className="sm:hidden">
          <Bar
            data={chartData}
            width={300}
            height={300}
            options={{
              maintainAspectRatio: true
            }}
          />
        </div>
      </div>
    </div>
  )
}
