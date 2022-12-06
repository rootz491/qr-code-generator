// convert given json to svg

import React from 'react';
import svgJson from '../json/svg.json';

export default function SVG() {
  const { width, height, viewBox, fill } = svgJson;
  const [qrCords, setQrCords] = React.useState([]);
  const [qrCodeWithRects, setRects] = React.useState([]);

  // A function to genrate a 22x22 matrix of random 0 and 1
  const genrateMatrix = () => {
    const matrix = [];
    for (let i = 0; i < 22; i++) {
      const row = [];
      for (let j = 0; j < 22; j++) {
        row.push(Math.round(Math.random()));
      }
      matrix.push(row);
    }
    return matrix;
  };
  // A function to convert the matrix to svg path
  const matrixToPath = (matrix) => {
    const path = [];
    for (let i = 0; i < 22; i++) {
      for (let j = 0; j < 22; j++) {
        if (matrix[i][j] === 1) {
          path.push(`${i}_${j}`);
        }
      }
    }
    return path;
  };

  console.log(matrixToPath(genrateMatrix()));
  // A function to convert the path to svg path
  const pathToSvgPath = (path) => {
    const svgPath = [];
    for (let i = 0; i < path.length; i++) {
      const [x, y] = path[i].split('_');
      svgPath.push(`M${x * 10} ${y * 10} h10 v10 h-10 z`);
    }
    return svgPath;
  };

  const pathToRect = (path) => {
    const rect = [];
    for (let i = 0; i < path.length; i++) {
      const [x, y] = path[i].split('_');
      rect.push(
        <rect
          x={x * 10}
          rx='5'
          ry='5'
          y={y * 10}
          width='10'
          height='10'
          fill={fill}
          key={i}
        />
      );
    }
    return rect;
  };

  React.useEffect(() => {
    const matrix = genrateMatrix();
    const path = matrixToPath(matrix);
    const svgPath = pathToSvgPath(path);
    const rects = pathToRect(path);
    setRects(rects);
    setQrCords(svgPath);
  }, []);

  const genrateNew = () => {
    const matrix = genrateMatrix();
    const path = matrixToPath(matrix);
    const svgPath = pathToSvgPath(path);
    const rects = pathToRect(path);
    setRects(rects);
    setQrCords(svgPath);
  };

  return (
    <>
      <svg xmlns='http://www.w3.org/2000/svg'>
        {qrCords.map((cord, index) => (
          <path
            strokeLinecap='round'
            key={index}
            d={cord}
            fill={fill}
          />
        ))}
      </svg>
      <svg xmlns='http://www.w3.org/2000/svg'>
        {qrCodeWithRects.map((rect, index) => rect)}
      </svg>
      <button
        style={{
          color: 'white',
        }}
        onClick={genrateNew}
      >
        Generate New
      </button>
    </>
  );
}
