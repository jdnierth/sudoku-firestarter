var expect = require('chai').expect,
    sudokuFireStarter = require('../src/sudoku-firestarter'),
    testData = require('../src/data');

describe('SudokuFirestarter', function() {
  describe('#solveSudoku()', function() {
    it('Sudoku result data to be an array', function() {
      expect(sudokuFireStarter.solveSudoku(testData.superHard())).to.be.an('array');
    });
  });
});