// convert given json to svg

import React from 'react';
import svgJson from '../json/svg.json';

export default function SVG() {
  const { width, height, viewBox, fill } = svgJson;
  const [qrCords, setQrCords] = React.useState([]);

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

  React.useEffect(() => {
    const matrix = genrateMatrix();
    const path = matrixToPath(matrix);
    const svgPath = pathToSvgPath(path);
    setQrCords(svgPath);
  }, []);

  return (
    <svg xmlns='http://www.w3.org/2000/svg'>
      {qrCords.map((cord, index) => (
        <path
          key={index}
          d={cord}
          fill={fill}
        />
      ))}
    </svg>
  );
}
