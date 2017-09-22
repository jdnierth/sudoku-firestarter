var expect = require('chai').expect,
    sudokuFireStarter = require('../src/sudoku-firestarter'),
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

    describe('#getExistingNumbersInRow()', function() {
       it('Returns the number that exists in 2nd row', function() {
           expect(sudokuFireStarter.getExistingNumbersInRow(testData.easy().input, 1)).to.deep.equal([8,1,7,5,4]);
       })
        
    });
    
    describe('#getExistingNumbersInQuadrant()', function() {
       it('Returns the number that exists in 1st quadrant', function() {
           expect(sudokuFireStarter.getExistingNumbersInQuadrant(testData.easy().input, 0)).to.deep.equal([8,1,9,4]);
       })
        
    });
    
    describe('#hasNumber()', function () {
        it('Returns false if row has no zeros', function () {
            expect(sudokuFireStarter.hasNumber([1, 2, 3], 0)).to.be.false;

        });

        it('Returns true if row has zeros', function () {
            expect(sudokuFireStarter.hasNumber([1, 0, 2], 0)).to.be.true;
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