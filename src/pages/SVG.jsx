// convert given json to svg

import React from "react";
import svgJson from "../json/svg.json";

const removeBorders = (matrix) => {
	const result = [];

	for (let i = 1; i < matrix.length - 1; i++) {
		const row = matrix[i];
		const newRow = [];

		for (let j = 1; j < row.length - 1; j++) {
			newRow.push(row[j]);
		}

		result.push(newRow);
	}

	return result;
};

export default function SVG() {
	const { width, height, viewBox, fill } = svgJson;
	const [qrCords, setQrCords] = React.useState([]);
	const [qrCodeWithRects, setRects] = React.useState([]);
	const [connectedCords, setConnectedCords] = React.useState([]);
	const [ronnysAlgo, setRonnysAlgo] = React.useState([]);
	const [matrix, setMatrix] = React.useState([]);

	//TODO:
	// !

	const SIZE = 15;

	// A function to generate a 22x22 matrix of random 0 and 1
	const generateMatrix = (height = SIZE, width = SIZE) => {
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
		}

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

				if (i > 14 && j < 7) {
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
		}

		// Check if there is a sequence that hasn't been added to the result yet
		if (start !== -1) {
			result.push({ line, start, end });
		}

		return result;
	}

	// A function to convert the path to svg path
	// const pathToSvgPath = (path) => {
	//   const svgPath = [];
	//   for (let i = 0; i < path.length; i++) {
	//     const [x, y] = path[i].split('_');
	//     svgPath.push(`M${x * 10} ${y * 10} h10 v10 h-10 z`);
	//   }
	//   return svgPath;
	// };
	const pathToRect = (path) => {
		const rect = [];
		for (let i = 0; i < path.length; i++) {
			const [x, y, z] = path[i].split("_");
			rect.push(
				<rect
					x={x * 10}
					rx="5"
					ry="5"
					y={y * 12}
					width={(z - y) * 10 + 10}
					height="10"
					fill={fill}
					key={i}
				/>
			);
		}
		return rect;
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

	// Depth first search to find all the connected ones
	const dfsPath = (arr, i, j, path) => {
		const rows = arr.length;
		const cols = arr[0].length;
		const rowNbr = [-1, -1, -1, 0, 0, 1, 1, 1];
		const colNbr = [-1, 0, 1, -1, 1, -1, 0, 1];

		// Mark this cell as visited
		arr[i][j] = 0;

		// Recur for all connected neighbours
		for (let k = 0; k < 8; k++) {
			if (isSafePath(arr, i + rowNbr[k], j + colNbr[k])) {
				dfsPath(arr, i + rowNbr[k], j + colNbr[k], path);
			}
		}
		path.push(`${i}_${j}`);
	};

	// A function to check if a given cell (row, col) can be included in DFS
	const isSafePath = (arr, row, col) => {
		const rows = arr.length;
		const cols = arr[0].length;

		// row number is in range, column number is in range and value is 1 and not yet visited
		return (
			row >= 0 && row < rows && col >= 0 && col < cols && arr[row][col] === 1
		);
	};

	React.useEffect(() => {
		generateQR();
	}, []);

	const generateQR = () => {
		const matrix = generateMatrix();
		setMatrix(matrix);
		const data = ROOTZAlgo(matrix);
		setRonnysAlgo(data);
	};

	const generateNew = () => {
		// const matrix = generateMatrix();
		// const path = matrixToPath(matrix);
		// const svgPath = pathToSvgPath(path);
		// const rects = pathToRect(path);
		// const arrObj = convertOnes(matrix);
		// const connectedRects = pathToConnectedRect(arrObj);
		// setConnectedCords(connectedRects);
		// setRects(rects);
		// setQrCords(svgPath);
		generateQR();
	};

	const paddingBoundaries = (matrix) => {
		//adding 0s in the boundries of the matrix
		for (let i = 0; i < matrix.length; i++) {
			matrix[i].unshift(0);
			matrix[i].push(0);
		}
		const zeroRow = new Array(matrix[0].length).fill(0);
		matrix.unshift(zeroRow);
		matrix.push(zeroRow);
		return matrix;
	};

	const ROOTZAlgo = (arr) => {
		arr = paddingBoundaries(arr);

		const result = [];

		for (let i = 0; i < arr.length; i++) {
			const mat = [];
			for (let j = 0; j < arr[0].length; j++) {
				const data = {
					pixel: 0,
					curved: {
						TR: 0,
						TL: 0,
						BR: 0,
						BL: 0,
					},
				};

				if (arr[i][j] === 1) {
					data.pixel = "black";

					//  right & left & i == 0 or i == arr.length - 1

					//  top  &  bottom  &  j == 0 or j == arr[0].length - 1

					//  top right
					if (
						i > 0 &&
						j < arr[0].length - 1 &&
						arr[i - 1][j] === 0 &&
						arr[i][j + 1] === 0
					) {
						data.curved.TR = 1;
					} else {
						data.curved.TR = 0;
					}

					//  curving the corners

					//  top left
					if (i > 0 && j > 0 && arr[i - 1][j] === 0 && arr[i][j - 1] === 0) {
						data.curved.TL = 1;
					} else {
						data.curved.TL = 0;
					}

					//  bottom right
					if (
						i < arr.length - 1 &&
						j < arr[0].length - 1 &&
						arr[i + 1][j] === 0 &&
						arr[i][j + 1] === 0
					) {
						data.curved.BR = 1;
					}

					//  bottom left
					if (
						i < arr.length - 1 &&
						j > 0 &&
						arr[i + 1][j] === 0 &&
						arr[i][j - 1] === 0
					) {
						data.curved.BL = 1;
					}

					//  bottom right
					if (
						i < arr.length - 1 &&
						j < arr[0].length - 1 &&
						arr[i + 1][j] === 0 &&
						arr[i][j + 1] === 0
					) {
						data.curved.BR = 1;
					}
				} else {
					data.pixel = "white";

					//  top right
					//  check if top & top right & right are 1
					//  if yes then curved = 1
					if (
						i > 0 &&
						j < arr[0].length - 1 &&
						arr[i - 1][j] === 1 &&
						// arr[i - 1][j + 1] === 1 &&
						arr[i][j + 1] === 1
					) {
						data.curved.TR = 1;
					}

					//  top left
					if (
						i > 0 &&
						j > 0 &&
						arr[i - 1][j] === 1 &&
						// arr[i - 1][j - 1] === 1 &&
						arr[i][j - 1] === 1
					) {
						data.curved.TL = 1;
					}

					//  bottom right
					if (
						i < arr.length - 1 &&
						j < arr[0].length - 1 &&
						arr[i + 1][j] === 1 &&
						// arr[i + 1][j + 1] === 1 &&
						arr[i][j + 1] === 1
					) {
						data.curved.BR = 1;
					}

					//  bottom left
					if (
						i < arr.length - 1 &&
						j > 0 &&
						arr[i + 1][j] === 1 &&
						// arr[i + 1][j - 1] === 1 &&
						arr[i][j - 1] === 1
					) {
						data.curved.BL = 1;
					}

					/* tryna connect the dots here ^_^ */
					/*
					//  check if top & right are 1
					//  if yes then curved = 1
					if (
						i > 0 &&
						j < arr[0].length - 1 &&
						arr[i - 1][j] === 1 &&
						arr[i][j + 1] === 1
					) {
						data.curved.TR = 1;
					}

					//  top left
					if (i > 0 && j > 0 && arr[i - 1][j] === 1 && arr[i][j - 1] === 1) {
						data.curved.TL = 1;
					}

					//  bottom right
					if (
						i < arr.length - 1 &&
						j < arr[0].length - 1 &&
						arr[i + 1][j] === 1 &&
						arr[i][j + 1] === 1
					) {
						data.curved.BR = 1;
					}

					//  bottom left
					if (
						i < arr.length - 1 &&
						j > 0 &&
						arr[i + 1][j] === 1 &&
						arr[i][j - 1] === 1
					) {
						data.curved.BL = 1;
          }
          */
				}

				mat.push(data);
			}
			result.push(mat);
		}

		return removeBorders(result);
	};

	return (
		<div style={{ display: "grid", placeContent: "center", width: "100%" }}>
			<div style={{ padding: "50px", display: "flex" }}>
				<div
					style={{
						width: "300px",
						height: "300px",

						position: "relative",
					}}
				>
					{/* curved */}
					{ronnysAlgo.map((rect, x) => {
						console.log("rect", rect);
						return rect.map((data, y) =>
							data.pixel === "black" ? (
								<div
									style={{
										width: "10px",
										height: "10px",
										backgroundColor: data.pixel,
										position: "absolute",
										top: x * 10,
										left: y * 10,
										backgroundColor: "black",
										borderTopLeftRadius: data.curved.TL * 5,
										borderTopRightRadius: data.curved.TR * 5,
										borderBottomLeftRadius: data.curved.BL * 5,
										borderBottomRightRadius: data.curved.BR * 5,
									}}
									key={x + y}
								>
									{" "}
								</div>
							) : (
								<>
									<div
										style={{
											width: "10px",
											height: "10px",
											backgroundColor: data.pixel,
											position: "absolute",
											top: x * 10,
											left: y * 10,
											zIndex: 2,
											borderTopLeftRadius: data.curved.TL * 5,
											borderTopRightRadius: data.curved.TR * 5,
											borderBottomLeftRadius: data.curved.BL * 5,
											borderBottomRightRadius: data.curved.BR * 5,
										}}
										key={x + y}
									>
										{" "}
									</div>
									<div
										style={{
											width: "10px",
											height: "10px",
											backgroundColor: data.pixel,
											position: "absolute",
											top: x * 10,
											left: y * 10,
											backgroundColor: "black",
											zIndex: 1,
										}}
										key={x + y}
									>
										{" "}
									</div>
								</>
							)
						);
					})}
				</div>

				<div
					style={{
						width: "300px",
						height: "300px",

						position: "relative",
					}}
				>
					{/* plane */}
					{ronnysAlgo.map((rect, x) => {
						console.log("rect", rect);
						return rect.map((data, y) =>
							data.pixel === "black" ? (
								<div
									style={{
										width: "10px",
										height: "10px",
										backgroundColor: data.pixel,
										position: "absolute",
										top: x * 10,
										left: y * 10,
										backgroundColor: "black",
										// borderTopLeftRadius: data.curved.TL * 5,
										// borderTopRightRadius: data.curved.TR * 5,
										// borderBottomLeftRadius: data.curved.BL * 5,
										// borderBottomRightRadius: data.curved.BR * 5,
									}}
									key={x + y}
								>
									{" "}
								</div>
							) : (
								<>
									<div
										style={{
											width: "10px",
											height: "10px",
											backgroundColor: data.pixel,
											position: "absolute",
											top: x * 10,
											left: y * 10,
											zIndex: 2,
											// borderTopLeftRadius: data.curved.TL * 5,
											// borderTopRightRadius: data.curved.TR * 5,
											// borderBottomLeftRadius: data.curved.BL * 5,
											// borderBottomRightRadius: data.curved.BR * 5,
										}}
										key={x + y}
									>
										{" "}
									</div>
									{/* <div
									style={{
										width: "10px",
										height: "10px",
										backgroundColor: data.pixel,
										position: "absolute",
										top: x * 100,
										left: y * 100,
										backgroundColor: "black",
										zIndex: 1,
									}}
									key={x + y}
								>
									{" "}
								</div> */}
								</>
							)
						);
					})}
				</div>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<button
					style={{
						color: "white",
						margin: "auto",
					}}
					onClick={generateNew}
				>
					Generate New
				</button>
			</div>
		</div>
	);
}

const MatrixToTable = ({ matrix }) => {
	return (
		<table border={1}>
			<tbody>
				{matrix.map((row, rowIndex) => (
					<tr key={rowIndex}>
						{row.map((cell, cellIndex) => (
							<td key={cellIndex}>{cell}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

const MatrixToJSONTable = ({ matrix }) => {
	return (
		<table border={1}>
			<tbody>
				{matrix.map((row, rowIndex) => (
					<tr key={rowIndex}>
						{row.map((cell, cellIndex) => (
							<td key={cellIndex}>{JSON.stringify(cell)}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};
