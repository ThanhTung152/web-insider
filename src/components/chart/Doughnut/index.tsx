import React, { forwardRef } from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutChartProps = any;

export default forwardRef(function DoughnutChart(
  props: DoughnutChartProps,
  ref: any
) {
  return <Doughnut {...props} ref={ref} />;
});
