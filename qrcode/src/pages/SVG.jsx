// convert given json to svg

import React from 'react';
import svgJson from '../json/svg.json';

export default function SVG() {
  const { width, height, viewBox, fill } = svgJson;

  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox={viewBox}>
      <rect x='0' y='0' rx='10' ry='10' width={width} height={height} fill={fill} />
    </svg>
  );
}
