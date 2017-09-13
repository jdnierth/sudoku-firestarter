exports.solveSudoku = function (sudokuNumbers) {

    for (var i = 0; i < sudokuNumbers.length; i++) {
        var row = sudokuNumbers[i];

        if(this.hasZeros(row) || !this.eachNumberExistsOnce(row)) {
            return false;
        }

    }

    return true;

};

/**
 * Checks if a given row contains a zero.
 *
 * @param {Array} row consisting of numbers or an empty array.
 * @returns {boolean} returns true if zero has been found in the given array else false.
 */
exports.hasZeros = function (row) {
    return row.indexOf(0) !== -1;
};

/**
 * Given a row of the Sudoku, checks if each number (defined by the length of a given row) exists no more than once.
 *
 * @param {Array} row consisting of numbers or an empty array.
 * @returns {boolean} returns true
 */
exports.eachNumberExistsOnce = function(row) {
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

        if(index === -1) {
            return false;
        } else {
            comparable.splice(index,1);
        }
    }

    return true;
};
