export default class Table {

    element = null;

    onPointerOver = event => {
        const element = event.target.closest('.cell');

        if(element && element.dataset.show !== 'true') {
            element.classList.add('cell_white');
        }
    }

    onPointerOut = event => {
        const element = event.target.closest('.cell_white');

        if(element) {
            element.classList.remove('cell_white');
        }
    }

    _getNeighbors(cell) {
        const neighbors = [];

        let {row, column} = cell.dataset;
        row = +row;
        column = +column;

        for(let i = row-1; i <= row+1; i++) {
            for(let j = column-1; j <= column+1; j++) {

                if(i === row && j === column) continue;
                const neighbor = this.element.querySelector(`[data-row="${i}"][data-column="${j}"]`);

                if(neighbor) neighbors.push(neighbor);

            }
        }
        return neighbors;
    }

    getCountBombs(cells = []) {
        let result = 0;
        for(const cell of cells) {
            if (cell.dataset.mined === 'true') result++;
        }
        return result;
    }

    constructor(data = []) {
        this.matrix = data.matrix;
        this.amountEmptyField = data.amountEmptyField;

        this.render();
        this.initHandlers();
        this.allCells = this.element.querySelectorAll('.cell');
    }

    render() {
        const wrapper = document.createElement('div');

        wrapper.innerHTML = this.template;
        this.element = wrapper.firstElementChild;
    }

    update(data = []) {
        this.matrix = data.matrix;
        this.amountEmptyField = data.amountEmptyField;

        this.element.innerHTML = this.getRows(this.matrix);
        this.allCells = this.element.querySelectorAll('.cell');
    }

    lose() {
        const root = this.element.closest('.root');
        if(root) {
            root.classList.add('root_bombs');
        }
    }

    get template() {
        return `<div class="table">
                    ${this.getRows(this.matrix)}
                </div>`;
    }

    initHandlers() {
        this.element.addEventListener('pointerover', this.onPointerOver);
        this.element.addEventListener('pointerout', this.onPointerOut)
    }

    getRows(matrix) {
        let numberRow = 0;

        return matrix.map(row => {
            return `<div class="row" data-row="${numberRow+1}">
                        ${this.getCells(row, numberRow++)}
                    </div>`
        }).join('');
    }

    getCells(row, numberRow) {
        const is_mined = cell => cell === 1 ? true : false;

        let counter = 0;
        return row.map(cell => {
            return `<div data-row="${numberRow}" data-column="${counter++}" class="cell" data-show="false" data-mined="${is_mined(cell)}">

                    </div>`
        }).join('')
    }
}