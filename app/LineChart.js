import React from 'react';

const LineChart = ({ data, stroke, background }) => {
  const width = 500;
  const height = 300;
  const padding = 20;
  const maxData = Math.max(...data);
  const minData = Math.min(...data);

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
    const y = height - padding - ((d - minData) / (maxData - minData)) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} style={{ background }}>
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        points={points}
      />
    </svg>
  );
};

export default LineChart;