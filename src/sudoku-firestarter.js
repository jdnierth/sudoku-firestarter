exports.solveSudoku = function (sudokuNumbers) {


    return sudokuNumbers;

};


exports.isRowValid = function (row) {

    for (var i = 0, n = row.length; i < n; i++) {
        if (row[i] === 0) {
            return false;
        }
    }

    return true;
};
