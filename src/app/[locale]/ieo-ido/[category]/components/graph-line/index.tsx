import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      display: false,
    },
    x: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
};
const labels = [];

for (let i = 0; i < 10; i++) {
  labels.push(i + '');
}

const generateGradient = (canvas: any, color: any) => {
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.3)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
  gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.7)');
  gradient.addColorStop(0.9, 'rgba(255, 255, 255, 0.9)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  return gradient;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type GraphLineProps = {
  data: number[];
  color: string;
  width?: number;
  height?: number;
};

export default function GraphLine(props: GraphLineProps) {
  const { data, color, width, height } = props;

  const mappedData = {
    labels: data.map((_, index) => index + ''),
    datasets: [
      {
        data: data,
        backgroundColor: function (context: any) {
          const chart = context.chart;
          return generateGradient(chart.canvas, color);
        },
        borderColor: color,
        fill: true,
        borderWidth: 1,
      },
    ],
  };
  return (
    <div
      style={{
        width: width,
        height: height,
      }}
    >
      <Line width={width} height={height} data={mappedData} options={options} />
    </div>
  );
}
