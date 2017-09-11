var expect = require('chai').expect,
    sudokuFireStarter = require('../src/sudoku-firestarter'),
    testData = require('../src/data');

describe('SudokuFirestarter', function() {
  describe('#solveSudoku()', function() {
    it('Sudoku result data to be an array', function() {
      expect(sudokuFireStarter.solveSudoku(testData.superHard())).to.be.an('array');
    });
  });

  describe('#isRowValid()', function() {
    it('Returns true if row is valid', function() {
      expect(sudokuFireStarter.isRowValid([1,2,3])).to.be.true;

    });

    it('Returns false if row has a zero', function() {
      expect(sudokuFireStarter.isRowValid([1,0,2])).to.be.false;
    });

    it('Each number exists once', function() {
      expect(sudokuFireStarter.eachNumberExistsOnce([1,3,2])).to.be.true;
    });

    it('Detects duplicate values', function() {
      expect(sudokuFireStarter.eachNumberExistsOnce([1,2,2])).to.be.false;
    });

    it('Detects zero and duplicates', function() {
      expect(sudokuFireStarter.eachNumberExistsOnce([0,2,2])).to.be.false;
    });

  })
});