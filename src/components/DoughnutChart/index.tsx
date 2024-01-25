import React from 'react';
import Path from './Path';

type DoughnutProps = {
  radius: number;
  data: number[];
  colors: string[];
  hole: number;
  strokeWidth?: number;
  stroke?: number;
};

export default function Doughnut(props: DoughnutProps) {
  const { radius, data, colors, hole, strokeWidth, stroke, ...rest } = props;

  let colorsLength = colors.length,
    diameter = radius * 2,
    sum: number,
    startAngle: number;

  sum = data.reduce(function (carry, current) {
    return carry + current;
  }, 0);

  startAngle = 0;

  return (
    <svg
      width={diameter}
      height={diameter}
      viewBox={'0 0 ' + diameter + ' ' + diameter}
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
    >
      {data.map((item, itemIndex) => {
        let angle, nextAngle, percent;

        nextAngle = startAngle;
        angle = (item / sum) * 360;
        percent = (item / sum) * 100;
        startAngle += angle;

        return (
          <Path
            stroke={stroke}
            strokeWidth={strokeWidth}
            showLabel={false}
            key={itemIndex}
            value={item?.toString()}
            percent={!!percent}
            percentValue={parseFloat(percent.toFixed(1))}
            startAngle={nextAngle}
            angle={angle}
            trueHole={hole}
            fill={colors[itemIndex % colorsLength]}
            radius={radius}
            hole={radius - hole}
            {...rest}
          />
        );
      })}
    </svg>
  );
}
