// convert given json to svg

import React from 'react';
import svgJson from '../json/svg.json';

export default function SVG() {
  const { width, height, viewBox, fill } = svgJson;
  const [qrCords, setQrCords] = React.useState([]);
  const [qrCodeWithRects, setRects] = React.useState([]);
  const [connectedCords, setConnectedCords] = React.useState([]);

  //TODO:
  // !

  // A function to generate a 22x22 matrix of random 0 and 1
  const generateMatrix = (height = 21, width = 21) => {
    const matrix = [];
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push(Math.round(Math.random()));
      }
      matrix.push(row);
    }
    return matrix;
  };

  // A function to convert the matrix to svg path
  //[0,1,1,1,1,1,0,0]
  //[0_1,0_2......]
  const matrixToPath = (arr) => {
    let result = [];
    let start = -1;
    let end = -1;

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === 1) {
          if (start === -1) {
            // This is the first 1 in a potential sequence
            start = j;
          }
          // Update the end of the sequence to the current index
          end = j;
        } else if (start !== -1) {
          // This is the end of the sequence, so add it to the result

          result.push(`${i}_${start}_${end}`);

          // Reset the start and end of the sequence
          start = -1;
          end = -1;
        }
      }
      // console.log('hi');
      // if (arr[i] === 1) {
      //   if (start === -1) {
      //     // This is the first 1 in a potential sequence
      //     start = i;
      //   }
      //   // Update the end of the sequence to the current index
      //   end = i;
      // } else if (start !== -1) {
      //   // This is the end of the sequence, so add it to the result
      //   result.push({ start, end });
      //   // Reset the start and end of the sequence
      //   start = -1;
      //   end = -1;
      // }
    }

    // Check if there is a sequence that hasn't been added to the result yet
    // if (start !== -1) {
    //   result.push(`${i}_${start}`);
    //   result.push(`${i}_${end}`);
    // }

    return result;
  };
  const filterEye = (arr) => {
    //removing 7x7 eye from start end and bottom
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (i < 7 && j < 7) {
          arr[i][j] = 0;
        }
        if (i < 7 && j > 14) {
          arr[i][j] = 0;
        }

        if (i > 14 && j > 14) {
          arr[i][j] = 0;
        }
      }
    }
    return arr;
  };

  function convertOnes(arr) {
    arr = filterEye(arr);
    let result = [];
    let start = -1;
    let end = -1;
    let line = 0;

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === 1) {
          if (start === -1) {
            // This is the first 1 in a potential sequence
            start = j;
          }
          // Update the end of the sequence to the current index
          end = j;
          line = i;
        } else if (start !== -1) {
          // This is the end of the sequence, so add it to the result
          result.push({ line, start, end });
          // Reset the start and end of the sequence
          start = -1;
          end = -1;
          line = i;
        }
      }
      // console.log('hi');
      // if (arr[i] === 1) {
      //   if (start === -1) {
      //     // This is the first 1 in a potential sequence
      //     start = i;
      //   }
      //   // Update the end of the sequence to the current index
      //   end = i;
      // } else if (start !== -1) {
      //   // This is the end of the sequence, so add it to the result
      //   result.push({ start, end });
      //   // Reset the start and end of the sequence
      //   start = -1;
      //   end = -1;
      // }
    }

    // Check if there is a sequence that hasn't been added to the result yet
    if (start !== -1) {
      result.push({ line, start, end });
    }

    return result;
  }

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
      const [x, y, z] = path[i].split('_');
      rect.push(
        <rect
          x={x * 10}
          rx='5'
          ry='5'
          y={y * 12}
          width={(z - y) * 10 + 10}
          height='10'
          fill={fill}
          key={i}
        />
      );
    }
    return rect;
  };

  /*
    
   */

  // Dynamic island algorithm to find all the connected Ones
  const connectedOnes = (arr) => {
    const result = [];
    const visited = [];
    const rows = arr.length;
    const cols = arr[0].length;

    // Initialize the visited array
    for (let i = 0; i < rows; i++) {
      visited[i] = [];
      for (let j = 0; j < cols; j++) {
        visited[i][j] = false;
      }
    }

    // Loop through the array and find all the connected ones
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (arr[i][j] === 1 && !visited[i][j]) {
          const path = [];
          dfs(arr, i, j, visited, path);
          result.push(path);
        }
      }
    }
    return result;
  };

  // Depth first search to find all the connected ones
  const dfs = (arr, i, j, visited, path) => {
    const rows = arr.length;
    const cols = arr[0].length;
    const rowNbr = [-1, -1, -1, 0, 0, 1, 1, 1];
    const colNbr = [-1, 0, 1, -1, 1, -1, 0, 1];

    // Mark this cell as visited
    visited[i][j] = true;

    // Recur for all connected neighbours
    for (let k = 0; k < 8; k++) {
      if (isSafe(arr, i + rowNbr[k], j + colNbr[k], visited)) {
        dfs(arr, i + rowNbr[k], j + colNbr[k], visited, path);
      }
    }
    path.push(`${i}_${j}`);
  };

  // A function to check if a given cell (row, col) can be included in DFS
  const isSafe = (arr, row, col, visited) => {
    const rows = arr.length;
    const cols = arr[0].length;

    // row number is in range, column number is in range and value is 1 and not yet visited
    return (
      row >= 0 &&
      row < rows &&
      col >= 0 &&
      col < cols &&
      arr[row][col] === 1 &&
      !visited[row][col]
    );
  };

  // A function to convert the path to svg path
  const pathToConnectedSvgPath = (coords) => {
    const svgPath = [];

    for (let i = 0; i < coords.length; i++) {
      const { line, start, end } = coords[i];

      svgPath.push(
        `M${start * 10} ${line * 10} h${(end - start) * 10 + 10} v10 h-${
          (end - start) * 10 + 10
        } z`
      );
    }
    return svgPath;
  };

  const pathToConnectedRect = (coords) => {
    const rect = [];

    for (let i = 0; i < coords.length; i++) {
      const { line, start, end } = coords[i];

      rect.push(
        <rect
          x={start * 10}
          rx='5'
          ry='5'
          padding={50}
          y={line * 12}
          width={(end - start) * 10 + 10}
          height='10'
          fill={fill}
          key={i}
        />
      );
    }
    return rect;
  };

  React.useEffect(() => {
    const matrix = generateMatrix();
    const path = matrixToPath(matrix);
    const svgPath = pathToSvgPath(path);
    const rects = pathToRect(path);
    console.log(path);
    const arrObj = convertOnes(matrix);
    const connectedRects = pathToConnectedRect(arrObj);
    setConnectedCords(connectedRects);

    setRects(rects);
    console.log(convertOnes(generateMatrix()));

    setQrCords(svgPath);
  }, []);

  const generateNew = () => {
    const matrix = generateMatrix();
    const path = matrixToPath(matrix);
    const svgPath = pathToSvgPath(path);
    const rects = pathToRect(path);
    const arrObj = convertOnes(matrix);
    const connectedRects = pathToConnectedRect(arrObj);
    setConnectedCords(connectedRects);
    setRects(rects);
    setQrCords(svgPath);
  };

  return (
    <>
      {/* <svg
        width={300}
        height={300}
        xmlns='http://www.w3.org/2000/svg'
      >
        {qrCords.map((cord, index) => (
          <path
            strokeLinecap='round'
            key={index}
            d={cord}
            fill={fill}
          />
        ))}
      </svg> */}
      {/* <svg
        width={300}
        height={300}
        xmlns='http://www.w3.org/2000/svg'
      >
        {qrCodeWithRects.map((rect, index) => rect)}
      </svg> */}
      <svg
        width={300}
        height={300}
        xmlns='http://www.w3.org/2000/svg'
      >
        {connectedCords.map((rect, index) => rect)}
      </svg>
      <button
        style={{
          color: 'white',
        }}
        onClick={generateNew}
      >
        Generate New
      </button>
    </>
  );
}
