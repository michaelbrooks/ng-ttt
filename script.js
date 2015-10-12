(function() {

    var ttt = angular.module('ticTacToe', ['ngAnimate']);
    
    ttt.controller('gameController', function($scope) {
        
        $scope.newGame = function() {
            
            $scope.players = ['x', 'o'];
            
            $scope.currentPlayer = Math.round(Math.random());
            
            $scope.board = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
            
            $scope.stripes = {
                columns: [false, false, false],
                rows: [false, false, false],
                diagonals: [false, false]
            };
            
            $scope.gameOver = undefined;
        };
        
        $scope.cellClicked = function(row, col) {
            var val = $scope.board[row][col];
            if (val) return; // already claimed
            if ($scope.gameOver) return; // game already over
            
            $scope.board[row][col] = $scope.players[$scope.currentPlayer];
            $scope.currentPlayer = ($scope.currentPlayer + 1) % 2;
            
            $scope.checkGame();
        };
        
        $scope.checkGame = function() {
            
            var r, c, cell;
            
            //Victory sums
            var diagonals = [0, 0],
                rows = [0, 0, 0],
                cols = [0, 0, 0],
                total = 0;
            
            var boardSize = 3;
            for (r = 0; r < boardSize; r++) {
                for (c = 0; c < boardSize; c++) {
                    cell = $scope.board[r][c];
                    
                    if (cell) {
                        total += 1;
                        
                        // Convert the player value to a number
                        cell = (cell === 'x' ? -1 : 1);
                        
                        rows[r] += cell;
                        cols[c] += cell;
                        
                        if (r === c) diagonals[0] += cell;
                        if (r + c === 2) diagonals[1] += cell;
                    }
                }
            }
            
            var checker = function(rowColTotals, stripes) {
                for (var i = 0; i < rowColTotals.length; i++) {
                    //Mark the stripe if someone won on this row
                    if (Math.abs(rowColTotals[i]) === 3) {
                        stripes[i] = true;
                        
                        if (rowColTotals[i] > 0) {
                            $scope.gameOver = 'o';
                        } else {
                            $scope.gameOver = 'x';
                        }
                    }
                }
            };
            
            checker(rows, $scope.stripes.rows);
            checker(cols, $scope.stripes.columns);
            checker(diagonals, $scope.stripes.diagonals);
            
            if (total === 9 && !$scope.gameOver) {
                $scope.gameOver = 't';
            }
            
            if ($scope.gameOver) {
                $scope.currentPlayer = undefined;
            }
        };
        window.$$sc = $scope;
        $scope.newGame();
    });

})();