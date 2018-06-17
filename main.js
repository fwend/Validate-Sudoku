let Sudoku = function (board) {
    const tally = Math.pow(2, board.length + 1) - 2;

    function isSquare() {
        return board.every(row => row.length == board.length);
    }

    function areRowsValid() {
        for (let c = 0; c < board.length; c++) {
            let mask = 0;
            for (let r = 0; r < board.length; r++) {
                const v = board[r][c];
                if (!v || typeof (v) !== 'number' || mask & (1 << v))
                    return false;
                mask |= 1 << v;
            }
            if (mask != tally)
                return false;
        }
        return true;
    }

    function areColsValid() {
        for (let r = 0; r < board.length; r++) {
            let mask = 0;
            for (let c = 0; c < board.length; c++) {
                const v = board[r][c];
                if (mask & (1 << v))
                    return false;
                mask |= 1 << v;
            }
            if (mask != tally)
                return false;
        }
        return true;
    }

    function areSubSquaresValid() {
        const size = Math.sqrt(board.length);

        for (let subr = 0; subr < board.length; subr += size) {
            for (let subc = 0; subc < board.length; subc += size) {

                let mask = 0;

                for (let r = subr; r < subr + size; r++) {
                    for (let c = subc; c < subc + size; c++) {
                        const v = board[r][c];
                        if (mask & (1 << v))
                            return false;
                        mask |= 1 << v;
                    }
                }
                if (mask != tally)
                    return false;
            }
        }
        return true;
    }

    //   Public methods
    // -------------------------
    return {
        isValid: function () {
            return isSquare() &&
                areRowsValid() &&
                areColsValid() &&
                areSubSquaresValid();
        }
    };
};