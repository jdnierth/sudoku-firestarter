/**
 * Fills in the blanks for a given unsolved Sudoku.
 *
 * @param sudokuNumbers
 * @returns {boolean}
 */
exports.solveSudoku = function (sudokuNumbers) {

    var quadrant;

    // Go through sudoku row by row.
    for (var rowIndex = 0; rowIndex < sudokuNumbers.length; rowIndex++) {

        // Begin of a quadrant
        if (rowIndex % 3 === 0) {
            quadrant = this.getExistingNumbersInQuadrant(sudokuNumbers, rowIndex);
        }

        // Check existing numbers per row
        this.getExistingNumbersInRow(sudokuNumbers, rowIndex);

    }

};

exports.allPossibleValues = function(sudokuNumbers, row, column) {
    var result = [];
    var max = Math.max(sudokuNumbers.length, sudokuNumbers[0].length);

    if (sudokuNumbers[row][column] !== 0) {
        return [];
    }

    var existingNumbersInRow = this.getExistingNumbersInRow(sudokuNumbers, 0);
    for (var i = 1; i <= max; i++) {
        if (existingNumbersInRow.indexOf(i) === -1) {
            result.push(i);
        }
    }

    return result;
};

/**
 *
 * @param { Array } sudokuNumbers is an array of nested arrays. Each array represents a row of a sudoku game.
 * @param { Number } rowIndex is the number of the row to be investigated.
 * @returns {Array} array of numbers which represent the existing numbers within a quadrant.
 */
exports.getExistingNumbersInQuadrant = function (sudokuNumbers, rowIndex) {
    var quadrant = [];

    for(var r = rowIndex; r <= 2; r++) {
        quadrant.push(this.readQuadrantRow(sudokuNumbers, r));
    }

    return [].concat.apply([],quadrant);
};


/**
 * Function that will only traverse through a row within a quadrant.
 *
 * @param { Array } sudokuNumbers representing the whole sudoku game. Each array represents a row.
 * @param { Number } rowIndex the row within the sudokuNumbers that needs to be reviewed.
 *
 * @returns {Array} Array of numbers within one single row of a quadrant representing in a quadrant.
 */
exports.readQuadrantRow = function (sudokuNumbers, rowIndex) {
    var max = 2,
        quadrant = [];

    for (var j = 0; j <= max; j++) {
        if (this.isValidNumber(sudokuNumbers[rowIndex], sudokuNumbers[rowIndex][j])) {
            quadrant.push(sudokuNumbers[rowIndex][j]);
        }
    }

    return quadrant;
};

/**
 * Takes a row of numbers and removes all invalid entries to keep
 * existing, valid numbers.
 *
 * @param {Array} rowIndex number of the row to investigate.
 * @returns {Array} empty array or array of valid, existing numbers.
 */
exports.getExistingNumbersInRow = function (sudokuNumbers, rowIndex) {

    var row = sudokuNumbers[rowIndex],
        nRow = [];

    for (var i = 0, len = row.length; i < len; i++) {

        if (this.isValidNumber(row, row[i])) {
            nRow.push(row[i]);
        }
    }

    return nRow;

};

exports.findMissingNumbersInQuadrant = function (sudokuNumbers) {

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

        if (!this.isValidNumber(row, i + 1) || !this.eachNumberExistsOnce(row)) {
            return false;
        }

    }

    return true;
};

/**
 * Checks if a given row contains a zero.
 *
 * @param {Array} row consisting of numbers or an empty array.
 * @param {Number} number to search for within the row.
 * @returns {boolean} returns true if zero has been found in the given array else false.
 */
exports.hasNumber = function (row, number) {
    return row.indexOf(number) !== -1;
};

/**
 * Returns true if the given number is a valid Sudoku number
 *
 * @param {Array} row of numbers.
 * @param {number} number to check for validity.
 */
exports.isValidNumber = function (row, number) {

    if (!number) {
        console.error('Number ' + number + ' is invalid');
        return false;
    }

    return !(number <= 0 || number > row.length);
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

