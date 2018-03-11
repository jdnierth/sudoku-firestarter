var utilities = require('./sudoku-utilities'),
    solvedSudoku;

/**
 * Fills in the blanks for a given unsolved Sudoku.
 *
 * @param sudokuNumbers
 * @returns {boolean}
 */
exports.solveSudoku = function (sudokuNumbers) {
    var maxTries = 0,
        maxTriesLimit = 10,
        solution = [],
        restart = false,
        max = this.getAmountOfNumbers(sudokuNumbers);

    for (var i = 0; i < max; i++) {

        // If the last solutions indexes haven't reached number of possible values
        if (solution && (solution.r === max && solution.c === max)) {
            return solution;
        }

        if (i === 0 && !restart) {
            solution = this.getNextSolution(sudokuNumbers, 0, 0);
        } else if( i !== 0 && restart) {
            solution = this.getNextSolution(solution.sudoku, solution.r, solution.c);
        }

        // Loop through the sudoku again if there are still zeros left
        if(i === max - 1 && maxTries < maxTriesLimit) {
            var zeros = this.checkSudokuForZeros(solution.sudoku, 0, 0);
            if(zeros.length !== 0) {
               i = 0;
               restart = true;
               solution.r = zeros.r;
               solution.c = zeros.c;
               maxTries++;
            } else {
                return solution.sudoku;
            }
        }
    }

    return solution;
};

/**
 * Loops through the Sudoku and returns false if no zeros can be found, else true.
 *
 * @param {array} sudokuNumbers
 * @param {number} r row index if set to null, loop will start from 0.
 * @param {number} c column index if set to null, loop will start from 0
 */
exports.checkSudokuForZeros = function (sudokuNumbers, r, c) {
    var max = this.getAmountOfNumbers(sudokuNumbers);

    r = (r == null) ? 0 : r;
    c = (c == null) ? 0 : c;

    // Go through sudoku row by row.
    for (var rlen = sudokuNumbers.length; r < rlen; r++) {
        c = 0;

        for (var clen = sudokuNumbers.length; c < clen; c++) {
            if (sudokuNumbers[r][c] === 0) {
                return {
                    r: r,
                    c: c
                }
            }
        }
    }

    return [];
};

/**
 * Given an unsolved sudoku, this function returns the next solution of an empty cell.
 *
 * @param {array} sudokuNumbers
 * @param {number} r row index from where to continue searching
 * @param {number} c column index from where to continue searching
 */
exports.getNextSolution = function (sudokuNumbers, r, c) {
    var possibleValues,
        solution = {
            r: r,
            c: c,
            sudoku: sudokuNumbers
        };

    // // Go through sudoku row by row.
    for (var rlen = sudokuNumbers.length; r < rlen; r++) {
        c = 0;
        for (var clen = sudokuNumbers.length; c < clen; c++) {

            if (sudokuNumbers[r][c] === 0) {
                possibleValues = this.possibleValuesForCell(sudokuNumbers, r, c);
                if (possibleValues.length === 1) {
                    solution.sudoku = sudokuNumbers;

                    // update new values
                    solution.r = r;
                    solution.c = c;
                    solution.sudoku[r][c] = possibleValues[0];

                    return solution;
                }
            }
        }
    }

    return solution;
};

/**
 * Returns a list of values that will be possible to put into 1 requested cell.
 * It needs to check the available numbers in the row, in the column and the quadrant.
 * Any number that is not listed in this result, will be the possible values.
 *
 * @param {array} sudokuNumbers of the current sudoku
 * @param {number} rowIndex the row index of the selected cell
 * @param {number} columnIndex the column index of the selected cell
 *
 * @returns {array} a list of all possible values for the selected cell
 */
exports.possibleValuesForCell = function (sudokuNumbers, rowIndex, columnIndex) {

    var c,
        existingNumbersInRow,
        existingNumbersInColumn,
        existingNumbersInQuadrant,
        q,
        r,
        result,
        max = this.getAmountOfNumbers(sudokuNumbers);

    if (sudokuNumbers[rowIndex][columnIndex] !== 0) {
        return [];
    }

    existingNumbersInRow = this.getExistingNumbersInRow(sudokuNumbers, rowIndex);
    r = this.possibleValues(existingNumbersInRow, max);

    existingNumbersInColumn = this.getExistingNumbersInColumn(sudokuNumbers, columnIndex);
    c = this.possibleValues(existingNumbersInColumn, max);

    existingNumbersInQuadrant = this.getExistingNumbersInQuadrant(sudokuNumbers, rowIndex, columnIndex);
    q = this.possibleValues(existingNumbersInQuadrant, max);

    // Only numbers that are possible within the row and column
    result = utilities.intersect(r, c);
    result = utilities.intersect(result, q);

    return result;
};

exports.possibleValues = function (rowOrColumn, max) {

    var result = [];
    for (var i = 1; i <= max; i++) {
        if (rowOrColumn.indexOf(i) === -1) {
            result.push(i);
        }
    }

    return result;
};

/**
 *
 * @param { Array } sudokuNumbers is an array of nested arrays. Each array represents a row of a sudoku game.
 * @param { Number } row is the number of the row to be investigated.
 * @param { Number } column is the number of the column to be investigated.
 *
 * @returns {Array} array of numbers which represent the existing numbers within a quadrant.
 */
exports.getExistingNumbersInQuadrant = function (sudokuNumbers, row, column) {

    var quadrant = [],
        row = this.getFirstColumnOrRowOfQuadrant(row),
        max = row + 2;

    for (var r = row; r <= max; r++) {
        quadrant.push(this.readQuadrant(sudokuNumbers, r, column, max));
    }

    // Flatten result of nested arrays to a single array
    return utilities.flattenArray(quadrant);
};

/**
 * Function that will only traverse through a row within a quadrant.
 *
 * @param { Array } sudokuNumbers representing the whole sudoku game. Each array represents a row.
 * @param { Number } row the row within the sudokuNumbers that needs to be reviewed.
 * @param { Number } column the column within the sudokuNumbers that needs to be reviewed.
 *
 * @returns {Array} Array of numbers within one single row of a quadrant representing in a quadrant.
 */
exports.readQuadrant = function (sudokuNumbers, row, column) {

    var max,
        quadrant = [];

    // Start at the first cell of the quadrant.
    column = this.getFirstColumnOrRowOfQuadrant(column);
    max = column + 2;

    for (var c = column; c <= max; c++) {

        if (utilities.isValidNumber(sudokuNumbers[row], sudokuNumbers[row][c])) {
            quadrant.push(sudokuNumbers[row][c]);
        }
    }

    return quadrant;
};

/**
 * Retrieves the index of the column or row where the quadrant starts.
 *
 * @param {Number} index of row or column.
 * @returns {*}
 */
exports.getFirstColumnOrRowOfQuadrant = function (index) {
    var diff = index;

    if (index % 3 === 1) {

        diff = index - 1;

    } else if (index % 3 === 2) {

        diff = index - 2;
    }

    return diff;
};

/**
 * Takes a row of numbers and removes all invalid entries to keep
 * existing, valid numbers.
 *
 * @param {Array} row number of the row to investigate.
 * @returns {Array} empty array or array of valid, existing numbers.
 */
exports.getExistingNumbersInRow = function (sudokuNumbers, row) {

    var row = sudokuNumbers[row],
        nRow = [];

    for (var i = 0, len = row.length; i < len; i++) {
        if (utilities.isValidNumber(row, row[i])) {
            nRow.push(row[i]);
        }
    }

    return nRow;

};

exports.getExistingNumbersInColumn = function (sudokuNumbers, column) {

    var result = [],
        max = this.getAmountOfNumbers(sudokuNumbers);

    for (var r = 0; r < max; r++) {
        if (utilities.isValidNumber(sudokuNumbers[r], sudokuNumbers[r][column])) {
            result.push(sudokuNumbers[r][column]);
        }
    }

    return result;
};

/**
 * Checks whether or not the given result is valid.
 *
 * @param {Array} sudokuNumbers 2 dimensional array consisting of the numbers of rows.
 * @returns {boolean}
 */
exports.checkResult = function (sudokuNumbers) {
    for (var i = 0; i < sudokuNumbers.length; i++) {
        var row = sudokuNumbers[i];

        if (!utilities.isValidNumber(row, i + 1) || !this.eachNumberExistsOnce(row)) {
            return false;
        }

    }

    return true;
};

/**
 * Gets the max amount of numbers within the sudoku.
 *
 * @param { Array } sudokuNumbers
 * @returns { number }
 */
exports.getAmountOfNumbers = function (sudokuNumbers) {
    return Math.max(sudokuNumbers.length, sudokuNumbers[0].length);
};

/**
 * Given a row of the Sudoku, checks if each number (defined by the length of a given row) exists no more than once.
 *
 * @param {Array} row consisting of numbers or an empty array.
 * @returns {boolean} returns true
 */
exports.eachNumberExistsOnce = function (row) {
    var comparable = [],
        rowLength = row.length;

    // Generate comparable array with the same length as the row.
    // Contains all numbers exactly once that are required.
    for (var i = 1; i <= rowLength; i++) {
        comparable.push(i);
    }

    // Runs through the given row and removes all found numbers from
    // the comparable array. If any number from the row can not be found
    // in the comparable - the number is a duplicate and this test fails.
    for (var j = 0; j < rowLength; j++) {
        var number = row[j],
            index = comparable.indexOf(number);

        if (index === -1) {
            return false;
        } else {
            comparable.splice(index, 1);
        }
    }

    return true;
};

