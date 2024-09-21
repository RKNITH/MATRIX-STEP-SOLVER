// Function to parse the matrix from a textarea input
function parseMatrix(matrixText) {
    return matrixText.trim().split('\n').map(row => row.split(',').map(Number));
}

// Function to display the matrix result
function displayResult(result) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `<pre>${result.map(row => row.join(' ')).join('\n')}</pre>`;
}

// Function to display step-by-step result for matrix multiplication
function displaySteps(steps) {
    const stepDiv = document.getElementById('step-by-step');
    stepDiv.innerHTML = steps.join('<br><br>');
}

// Matrix Addition
function matrixAddition(matrix1, matrix2) {
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        return 'Error: Matrices must be the same size for addition.';
    }

    const result = [];
    for (let i = 0; i < matrix1.length; i++) {
        const row = [];
        for (let j = 0; j < matrix1[i].length; j++) {
            row.push(matrix1[i][j] + matrix2[i][j]);
        }
        result.push(row);
    }
    return result;
}

// Matrix Multiplication
function matrixMultiplication(matrix1, matrix2) {
    if (matrix1[0].length !== matrix2.length) {
        return 'Error: Number of columns in the first matrix must equal the number of rows in the second matrix for multiplication.';
    }

    const result = [];
    const steps = []; // To store step-by-step explanation
    for (let i = 0; i < matrix1.length; i++) {
        const row = [];
        for (let j = 0; j < matrix2[0].length; j++) {
            let sum = 0;
            const stepDetail = [`Calculating element [${i + 1},${j + 1}]`]; // Add step details
            for (let k = 0; k < matrix1[0].length; k++) {
                stepDetail.push(`matrix1[${i + 1},${k + 1}] * matrix2[${k + 1},${j + 1}] = ${matrix1[i][k]} * ${matrix2[k][j]}`);
                sum += matrix1[i][k] * matrix2[k][j];
            }
            row.push(sum);
            stepDetail.push(`Sum = ${sum}`);
            steps.push(stepDetail.join(' <br> '));
        }
        result.push(row);
    }
    displaySteps(steps);
    return result;
}

// Event listeners for button clicks
document.getElementById('matrix-add').addEventListener('click', () => {
    const matrix1 = parseMatrix(document.getElementById('matrix1').value);
    const matrix2 = parseMatrix(document.getElementById('matrix2').value);
    const result = matrixAddition(matrix1, matrix2);
    displayResult(result);
});

document.getElementById('matrix-multiply').addEventListener('click', () => {
    const matrix1 = parseMatrix(document.getElementById('matrix1').value);
    const matrix2 = parseMatrix(document.getElementById('matrix2').value);
    const result = matrixMultiplication(matrix1, matrix2);
    displayResult(result);
});
