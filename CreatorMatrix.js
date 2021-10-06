export default class CreatorMatrix {
    constructor(size = 8) {
        this.size = size;
    }

    getRandomDataMatrix(clear = {}) {
        const matrix = this.createRandomMatrix(this.size, clear);
        const amountEmptyField = this._countEmptyFields(matrix);
        const amountBombs = matrix.length * matrix.length - amountEmptyField;
        return {
            matrix: matrix,
            amountEmptyField: amountEmptyField,
            amountBombs: amountBombs,
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

    createRandomMatrix(size = 8, clearCoords = {x: null, y: null}) {
        const amountCells = size * size;
        //было 20
        let amountBombs = Math.round(amountCells * 0.11);

        const {matrix} = this.createZeroMatrix(size);

        for(let i = 0; i < amountBombs; i++) {
            const coords = {
                x: this._randomInteger(0, size-1),
                y: this._randomInteger(0, size-1)
            }

            if( (matrix[coords.y][coords.x] === 0) && (coords.x !== clearCoords.x && coords.y !== clearCoords.y) ) {
                matrix[coords.y][coords.x] = 1;
            }
            else {
                amountBombs++;
            }
        }
        return matrix;
    }

    getCountBombsOnField(size) {
       return Math.round(size * size * 0.11);
    }

    createZeroMatrix(size = 0) {
        const result = [];

        for(let i = 0; i < size; i++) {
            const row = [];
            for(let j = 0; j < size; j++) {
                row.push(0);
            }
            result.push(row);
        }
        return {matrix: result};
    }

    _randomInteger(min, max) {
            // получить случайное число от (min-0.5) до (max+0.5)
            let rand = min - 0.5 + Math.random() * (max - min + 1);
            return Math.round(rand);
    }
}