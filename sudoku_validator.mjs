export default class SudokuValidator {

    static validate(board) {
        const tally = 0b0011_1111_1110;

        function hasValidSize() {
            return board.length === 9
        }

        function isSquare() {
            return board.every(row => row.length === board.length);
        }

        function areColsValid() {
            for (let c = 0; c < board.length; c++) {
                let mask = 0;
                for (let r = 0; r < board.length; r++) {
                    const v = board[r][c];
                    if (!v || typeof (v) !== 'number' || mask & (1 << v))
                        return false;
                    mask |= 1 << v;
                }
                if (mask !== tally)
                    return false;
            }
            return true;
        }

        function areRowsValid() {
            for (let r = 0; r < board.length; r++) {
                let mask = 0;
                for (let c = 0; c < board.length; c++) {
                    const v = board[r][c];
                    if (mask & (1 << v))
                        return false;
                    mask |= 1 << v;
                }
                if (mask !== tally)
                    return false;
            }
            return true;
        }

        function areSubSquaresValid() {
            const size = board.length / 3;

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
                    if (mask !== tally)
                        return false;
                }
            }
            return true;
        }

        return hasValidSize() &&
            isSquare() &&
            areRowsValid() &&
            areColsValid() &&
            areSubSquaresValid();
    }
}
