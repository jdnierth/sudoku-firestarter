/**
 * SOME DESCRIPTION
 *
 * @author: Jessica Nierth
 * @date: 10/9/2017
 */

exports.flattenArray = function (a) {
    return [].concat.apply([], a);
};

exports.intersect = function (a, b) {
    var matches = [];

    for (var i = 0; i < a.length; i++) {
        for (var e = 0; e < b.length; e++) {
            if (a[i] === b[e]) matches.push(a[i]);
        }
    }
    return matches;
};

exports.unique = function (a) {
    return a.filter(function (item, pos) {
        return a.indexOf(item) == pos;
    })
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
