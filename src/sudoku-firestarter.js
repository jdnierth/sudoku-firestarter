var utilities = require('./sudoku-utilities'),
    solvedSudoku;

/**
 * Fills in the blanks for a given unsolved Sudoku.
 *
 * @param sudokuNumbers
 * @returns {boolean}
 */
exports.solveSudoku = function (sudokuNumbers) {

    var quadrant,
        length = sudokuNumbers.length;

    // Go through sudoku row by row.
    for (var r = 0; r < length; r++) {

        for (var c = 0; c <= length; c++) {
            quadrant = this.getExistingNumbersInQuadrant(sudokuNumbers, r, c);
        }

    }

};

/**
 * Given an unsolved sudoku, this function returns the next solution of an empty cell.
 *
 * @param {array} sudokuNumbers
 */
exports.getNextSolution = function (sudokuNumbers) {
    var possibleValues,
        newSudoku;

    // Go through sudoku row by row.
    for (var r = 0, rlen = sudokuNumbers.length; r < rlen; r++) {
        for (var c = 0, clen = sudokuNumbers.length; c < clen; c++) {
            if (sudokuNumbers[r][c] === 0) {
                possibleValues = this.possibleValuesForCell(sudokuNumbers, r, c);

                if (possibleValues.length === 1) {
                    newSudoku = sudokuNumbers;
                    // update new value
                    newSudoku[r][c] = possibleValues[0];

                    return newSudoku;
                }
            }
        }
    }
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

    existingNumbersInQuadrant = this.getExistingNumbersInQuadrant(sudokuNumbers, 1, 1);
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

