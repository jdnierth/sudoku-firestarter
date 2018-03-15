var expect = require('chai').expect,
    sudokuFireStarter = require('../src/sudoku-firestarter'),
    utilities = require('../src/sudoku-utilities'),
    testData = require('../src/data');

describe('SudokuFirestarter', function () {
    describe('#solveSudoku()', function () {
        it('Sudoku data to be invalid', function () {
            expect(sudokuFireStarter.checkResult(testData.superHard())).to.be.false;
        });

        it('Sudoku result data to be valid', function () {
            expect(sudokuFireStarter.checkResult(testData.superHardSolved())).to.be.true;
        });

        it('Detects zero and duplicates', function () {
            expect(sudokuFireStarter.eachNumberExistsOnce([0, 2, 2])).to.be.false;
        });

        it('Solve Sudoku', function () {
            //   sudokuFireStarter.solveSudoku(testData.easy().input);
        });

    });

    describe('#possibleValuesForCell()', function () {
        it('Returns empty array when solved', function () {
            expect(sudokuFireStarter.possibleValuesForCell([[1]], 0, 0)).to.be.deep.equal([]);
        });
        it('Returns single value when only one value missing', function () {
            expect(sudokuFireStarter.possibleValuesForCell([[0, 1, 2], [4, 5, 6], [7, 8, 9]], 0, 0)).to.be.deep.equal([3]);
        });

        it('Returns multiple values', function () {
            expect(sudokuFireStarter.possibleValuesForCell(testData.easy().input, 1, 1)).to.be.deep.equal([3, 6]);
        });
        it('Returns missing value within center of 3rd quadrant', function () {
            expect(sudokuFireStarter.possibleValuesForCell(testData.easy().input, 1, 7)).to.be.deep.equal([6]);
        });
    });

    describe('#getExistingNumbersInRow()', function () {
        it('Returns the number that exists in 2nd row', function () {
            expect(sudokuFireStarter.getExistingNumbersInRow(testData.easy().input, 1)).to.deep.equal([8, 1, 7, 5, 4]);
        });
    });

    describe('#getExistingNumbersInQuadrant()', function () {
        it('Returns the number that exists in 1st quadrant', function () {
            expect(sudokuFireStarter.getExistingNumbersInQuadrant(testData.easy().input, 0, 0)).to.deep.equal([8, 1, 9, 4]);
        });

        it('Returns the number that exists in 2nd quadrant from column start', function () {
            expect(sudokuFireStarter.getExistingNumbersInQuadrant(testData.easy().input, 0, 3)).to.deep.equal([7, 1]);
        });

        it('Returns the number that exists in 2nd quadrant from column middle', function () {
            expect(sudokuFireStarter.getExistingNumbersInQuadrant(testData.easy().input, 0, 4)).to.deep.equal([7, 1]);
        });

        it('Returns the number that exists in 2nd quadrant from column end', function () {
            expect(sudokuFireStarter.getExistingNumbersInQuadrant(testData.easy().input, 0, 5)).to.deep.equal([7, 1]);
        });

        it('Returns the number that exists in 5th quadrant from row start', function () {
            expect(sudokuFireStarter.getExistingNumbersInQuadrant(testData.easy().input, 3, 4)).to.deep.equal([2, 4]);
        });

        it('Returns the number that exists in 5th quadrant from row middle', function () {
            expect(sudokuFireStarter.getExistingNumbersInQuadrant(testData.easy().input, 4, 4)).to.deep.equal([2, 4]);
        });
    });

    describe('#hasNumber()', function () {
        it('Returns false if row has no zeros', function () {
            expect(utilities.hasNumber([1, 2, 3], 0)).to.be.false;

        });

        it('Returns true if row has zeros', function () {
            expect(utilities.hasNumber([1, 0, 2], 0)).to.be.true;
        });
    });

    describe('#eachNumberExistsOnce()', function () {
        it('Each number exists once', function () {
            expect(sudokuFireStarter.eachNumberExistsOnce([1, 3, 2])).to.be.true;
        });

        it('Detects duplicate values', function () {
            expect(sudokuFireStarter.eachNumberExistsOnce([1, 2, 2])).to.be.false;
        });
    })
});
