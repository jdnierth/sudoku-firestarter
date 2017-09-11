exports.solveSudoku = function (sudokuNumbers) {

    for (var i = 0; i < sudokuNumbers.length; i++) {
        var row = sudokuNumbers[i];

        if(this.hasZeros(row) || !this.eachNumberExistsOnce(row)) {
            return false;
        }

    }

    return true;

};

exports.hasZeros = function (row) {
    return row.indexOf(0) !== -1;
};

exports.eachNumberExistsOnce = function(row) {
    var comparable = [],
        rowLength = row.length;

    // Generate comparable array with the same length as the row
    for (var i = 1; i <= rowLength; i++) {
        comparable.push(i);
    }

    for (var j = 0; j < rowLength; j++) {
        var number = row[j],
            index = comparable.indexOf(number);

        if(index === -1) {
            return false
        } else {
            comparable.splice(index,1);
        }
    }

    return true;
};
