export default class CreatorMatrix {
    constructor(size = 8) {
        this.size = size;
    }

    getRandomDataMatrix() {
        const matrix = this.createRandomMatrix(this.size);
        return {
            matrix: matrix,
            amountEmptyField: this._countEmptyFields(matrix),
        };
    }

    _countEmptyFields(matrix) {
        let counter = 0

        for(let i = 0; i < matrix.length; i++) {
            for(let j = 0; j < matrix.length; j++) {
                if(matrix[i][j] === 0) counter++;
            }
        }

        return counter;
    }

    createRandomMatrix(size = 8) {
        const amountCells = size * size;
        let amountBombs = Math.round(amountCells * 0.2);

        const zeroMatrix = this._createZeroMatrix(size);

        for(let i = 0; i < amountBombs; i++) {
            const coords = {
                x: this._randomInteger(0, size-1),
                y: this._randomInteger(0, size-1)
            }

            if(zeroMatrix[coords.x][coords.y] === 0) {
                zeroMatrix[coords.x][coords.y] = 1;
            }
            else {
                amountBombs++;
            }
        }
        return zeroMatrix;
    }

    _createZeroMatrix(size = 0) {
        const result = [];

        for(let i = 0; i < size; i++) {
            const row = [];
            for(let j = 0; j < size; j++) {
                row.push(0);
            }
            result.push(row);
        }
        return result;
    }

    _randomInteger(min, max) {
            // получить случайное число от (min-0.5) до (max+0.5)
            let rand = min - 0.5 + Math.random() * (max - min + 1);
            return Math.round(rand);
    }
}