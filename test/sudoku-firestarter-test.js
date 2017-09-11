var expect = require('chai').expect,
    sudokuFireStarter = require('../src/sudoku-firestarter');

describe('SudokuFirestarter', function() {
  describe('#solveSudoku()', function() {
    it('Dummy data comparison', function() {
      expect(sudokuFireStarter.solveSudoku()).to.be.deep.equal([1,2,3]);
    });
  });
});