import React, { useEffect } from 'react';
import SubTitle from './SubTitle';

interface PathProps {
  radius: number;
  hole: number;
  angle: number;
  trueHole: number;
  startAngle: number;
  fill: string;
  stroke?: number;
  strokeWidth?: number;
  showLabel: boolean;
  percentValue: number;
  percent?: boolean;
  value: string;
  subTitle1?: string;
}

function getAnglePoint(
  startAngle: number,
  endAngle: number,
  radius: number,
  x: number,
  y: number
) {
  const x1 = x + radius * Math.cos((Math.PI * startAngle) / 180);
  const y1 = y + radius * Math.sin((Math.PI * startAngle) / 180);
  const x2 = x + radius * Math.cos((Math.PI * endAngle) / 180);
  const y2 = y + radius * Math.sin((Math.PI * endAngle) / 180);

  return { x1, y1, x2, y2 };
}

type PathState = {
  path: string;
  x: 0;
  y: 0;
  isMounted: boolean;
};

export default function Path(props: PathProps) {
  const {
    radius,
    hole,
    angle,
    startAngle,
    fill,
    stroke,
    strokeWidth,
    showLabel,
    percentValue,
    percent,
    value,
    subTitle1,
    trueHole,
  } = props;

  const [state, setState] = React.useState<PathState>({
    path: '',
    x: 0,
    y: 0,
    isMounted: false,
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isMounted: true,
    }));
    animate();
  }, []);

  const animate = () => {
    draw(0);
  };

  const draw = (s: number) => {
    if (state.isMounted) {
      return;
    }

    let step: number;
    let a, b, c: any;
    let path: string[] = [];

    step = angle / (37.5 / 2);

    if (s + step > angle) {
      s = angle;
    }

    a = getAnglePoint(startAngle, startAngle + s, radius, radius, radius);
    b = getAnglePoint(
      startAngle,
      startAngle + s,
      radius - hole,
      radius,
      radius
    );

    path.push('M' + a.x1 + ',' + a.y1);

    path.push(
      'A' +
        radius +
        ',' +
        radius +
        ' 0 ' +
        (s > 180 ? 1 : 0) +
        ',1 ' +
        a.x2 +
        ',' +
        a.y2
    );

    path.push('L' + b.x2 + ',' + b.y2);

    path.push(
      'A' +
        (radius - hole) +
        ',' +
        (radius - hole) +
        ' 0 ' +
        (s > 180 ? 1 : 0) +
        ',0 ' +
        b.x1 +
        ',' +
        b.y1
    );

    path.push('Z');

    setState((prevState) => ({
      ...prevState,
      path: path.join(' '),
    }));

    if (s < angle) {
      setTimeout(function () {
        draw(s + step);
      }, 16);
    } else if (showLabel) {
      c = getAnglePoint(
        startAngle,
        startAngle + angle / 2,
        radius / 2 + trueHole / 2,
        radius,
        radius
      );

      setState((prevState) => ({
        ...prevState,
        x: c.x2,
        y: c.y2,
      }));
    }
  };

  return (
    <g overflow='hidden'>
      <path
        d={state.path}
        fill={fill}
        stroke={stroke?.toString()}
        strokeWidth={strokeWidth ? strokeWidth : 3}
      />
      {showLabel && percentValue > 5 ? (
        <text x={state.x} y={state.y} fill='#fff' textAnchor='middle'>
          {percent ? percentValue + '%' : value}
        </text>
      ) : null}
      {subTitle1 ? (
        <SubTitle {...props} textAnchor='middle' fill='#aaa' />
      ) : null}
    </g>
  );
}
