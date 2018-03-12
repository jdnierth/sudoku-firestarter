exports.easy = function () {
    return {
        input: [
            [0, 0, 0, 0, 0, 0, 1, 7, 9],
            [8, 0, 1, 7, 0, 0, 5, 0, 4],
            [9, 4, 0, 1, 0, 0, 3, 0, 0],
            [6, 2, 0, 0, 0, 0, 0, 9, 0],
            [0, 0, 0, 2, 0, 4, 0, 0, 0],
            [0, 5, 0, 0, 0, 0, 0, 2, 6],
            [0, 0, 2, 0, 0, 1, 0, 3, 8],
            [4, 0, 6, 0, 0, 3, 2, 0, 7],
            [1, 7, 3, 0, 0, 0, 0, 0, 0]
        ],
        output: [
            [2, 6, 5, 3, 4, 8, 1, 7, 9],
            [8, 3, 1, 7, 2, 9, 5, 6, 4],
            [9, 4, 7, 1, 5, 6, 3, 8, 2],
            [6, 2, 4, 8, 3, 5, 7, 9, 1],
            [7, 1, 9, 2, 6, 4, 8, 5, 3],
            [3, 5, 8, 9, 1, 7, 4, 2, 6],
            [5, 9, 2, 4, 7, 1, 6, 3, 8],
            [4, 8, 6, 5, 9, 3, 2, 1, 7],
            [1, 7, 3, 6, 8, 2, 9, 4, 5]
        ]
    }
};

exports.superHard = function () {
    return {
        input: [
            [0, 0, 0, 0, 0, 0, 0, 9, 0],
            [0, 0, 0, 2, 0, 0, 0, 3, 5],
            [0, 0, 2, 3, 0, 0, 0, 7, 6],
            [0, 0, 0, 0, 0, 8, 7, 0, 4],
            [3, 0, 0, 6, 0, 5, 0, 0, 9],
            [8, 0, 5, 9, 0, 0, 0, 0, 0],
            [4, 2, 0, 0, 0, 1, 5, 0, 0],
            [5, 3, 0, 0, 0, 2, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0]
        ],
        output: [
            [1, 4, 3, 5, 7, 6, 2, 9, 8],
            [6, 7, 8, 2, 1, 9, 4, 3, 5],
            [9, 5, 2, 3, 8, 4, 1, 7, 6],
            [2, 9, 5, 1, 3, 8, 7, 6, 4],
            [3, 7, 1, 6, 4, 5, 8, 2, 9],
            [8, 6, 4, 9, 2, 7, 3, 5, 1],
            [4, 2, 6, 7, 9, 1, 5, 8, 3],
            [5, 3, 8, 4, 6, 2, 9, 1, 7],
            [7, 1, 9, 8, 5, 3, 6, 4, 2]
        ]
    }
};