import React from 'react';

type SubTitleProps = {
  radius: number;
  fill: string;
  textAnchor?: string;
  subTitle1?: string;
  subTitle2?: string;
  currency?: string;
};

export default function SubTitle(props: SubTitleProps) {
  const { radius, fill, textAnchor, subTitle1, subTitle2, currency } = props;
  return (
    <text x={radius} y={radius} fill={fill} textAnchor={textAnchor}>
      <tspan>{subTitle1}</tspan>
      <tspan x={radius} y={radius + 20}>
        {currency}
        {subTitle2}
      </tspan>
    </text>
  );
}
