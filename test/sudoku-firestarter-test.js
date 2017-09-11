var expect = require('chai').expect,
    sudokuFireStarter = require('../src/sudoku-firestarter'),
    testData = require('../src/data');

describe('SudokuFirestarter', function() {
  describe('#solveSudoku()', function() {
    it('Sudoku data to be invalid', function() {
      expect(sudokuFireStarter.solveSudoku(testData.superHard())).to.be.false;
    });

    it('Sudoku result data to be valid', function() {
      expect(sudokuFireStarter.solveSudoku(testData.superHardSolved())).to.be.true;
    });
    
  });

  describe('#hasZeros()', function() {
    it('Returns false if row has no zeros', function() {
      expect(sudokuFireStarter.hasZeros([1,2,3])).to.be.false;

    });

    it('Returns true if row has zeros', function() {
      expect(sudokuFireStarter.hasZeros([1,0,2])).to.be.true;
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