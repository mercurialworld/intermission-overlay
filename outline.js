function getSmoothMatrix(size, threshold) {
	let matrix = [];
	let center = Math.floor(size / 2);
	let highest;

	for(let x = 0; x < size; x++) {
		let row = [];

		for(let y = 0; y < size; y++) {
			// distance formula we love the pythagorean theorem
			let val = Math.sqrt(Math.pow(center - x, 2) + Math.pow(center - y, 2));

			if(!highest) {
				// the corners will always be the furthest away from the center, so get it now
				highest = val;
			}

			// we need an inverted percentage of the highest distance as we *don't* want the corners taken into account for the matrix
			// also threshold it
			let perc = Math.abs((val / highest)-1);
			row[y] = (perc > threshold ? 1 : 0);
		}

		matrix.push(row.join(" "));
	}
	return matrix;
}

function setMatrix(matrixSize, divisor, threshold) {
    var matrix = getSmoothMatrix(matrixSize, threshold);
	const convolveMatrix = document.getElementsByTagName("feConvolveMatrix")[0];

    convolveMatrix.setAttribute("divisor", divisor);
    convolveMatrix.setAttribute("order", `${matrixSize},${matrixSize}`);
    convolveMatrix.setAttribute("kernelMatrix", matrix.join(" "));
}

setMatrix(7, 3, 0.2);