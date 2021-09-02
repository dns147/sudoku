module.exports = function solveSudoku(matrix) {
  
	function findNull(arr) {
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				if (arr[row][col] === 0) {
					return [row, col];
				}
			}
		}

		return false;
	}

	function getSector(a, b) {
		let x1 = null;
		let x2 = null;
		let y1 = null;
		let y2 = null;
		let sector = [];

		if (a >= 0 && a < 3) {
			x1 = 0;
			x2 = 3;
		} else if (a >= 3 && a < 6) {
			x1 = 3;
			x2 = 6;
		} else if (a >= 6 && a < 9) {
			x1 = 6;
			x2 = 9;
		}

		if (b >= 0 && b < 3) {
			y1 = 0;
			y2 = 3;
		} else if (b >= 3 && b < 6) {
			y1 = 3;
			y2 = 6;
		} else if (b >= 6 && b < 9) {
			y1 = 6;
			y2 = 9;
		}

		matrix.forEach((v1, i) => {
			let arr = [];
			if (i >= x1 && i < x2) {
				v1.slice(y1, y2).forEach((v2) => {
					sector.push(v2);
				});
			}
		});

		return sector;
	}

	function isValidate(num, pos, arr) {
		const [row, col] = pos;
		const sector = getSector(row, col);

		for (let i = 0; i < 9; i++) {
			if (arr[i][col] === num && i !== row) {
				return false;
			}
		}

		for (let i = 0; i < 9; i++) {
			if (arr[row][i] === num && i !== col) {
				return false;
			}
		}

    if (sector.indexOf(num) !== -1) {
      return false;
    }

		return true;
	}

	function solve() {
		const posNull = findNull(matrix);

		if (!posNull) {
			return true;
		}

		for (let i = 1; i <= 9; i++) {
			const isValid = isValidate(i, posNull, matrix);

			if (isValid) {
				const [x, y] = posNull;
				matrix[x][y] = i;

				if (solve()) {
					return true;
				}

				matrix[x][y] = 0;
			}
		}

		return false;
	}

	solve();
	
	return matrix;
}
