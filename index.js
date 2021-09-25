export default class Table {

    element = null;
    line = [];

    onClickCell = event => {
        const cell = event.target.closest('[data-column]');

        if(cell) {
            cell.dataset.show = 'true';

            const {row, column} = cell.dataset;

            const neighbors = this._getNeighbors(cell);
            const countBombs = this.getCountBombs(neighbors);

            if(countBombs !== 0) {
                cell.innerHTML = countBombs + '';
            }
            else if (countBombs === 0){
                this.BFS(cell);
            }
        }
    }

    BFS(cell) {
        this.line.push(cell);

        while(this.line.length !== 0) {
            const v = this.line.shift();

            if(v.dataset.visited === 'true' || v.dataset.mined === 'true') {
                continue;
            }
            v.dataset.visited = 'true';

            const neighbors = this._getNeighbors(v);

            for(const elem of neighbors) {
                if( this.getCountBombs(this._getNeighbors(elem)) === 0 ) {
                    elem.style.background = "red";
                    this.line.push(elem);
                }
            }
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

    constructor(size = 8) {
        this.size = size;

        this.matrix = [
            [0, 0, 1, 0, 0, 0, 0, 0 ],
            [0, 0, 1, 0, 0, 0, 0, 0 ],
            [0, 1, 0, 0, 0, 0, 0, 0 ],
            [0, 1, 0, 0, 0, 1, 0, 0 ],
            [0, 0, 0, 0, 0, 1, 0, 0 ],
            [0, 1, 0, 0, 0, 0, 0, 0 ],
            [0, 0, 1, 0, 0, 0, 0, 0 ],
            [1, 0, 1, 0, 0, 0, 0, 0 ],
        ];

        this.render();
        this.initHandlers();
    }

    render() {
        const wrapper = document.createElement('div');

        wrapper.innerHTML = this.template;
        this.element = wrapper.firstElementChild;
    }

    get template() {
        return `<div class="table">
                    ${this.getRows(this.matrix)}
                </div>`;
    }

    initHandlers() {
        console.dir(this.element)
        this.element.addEventListener('click', this.onClickCell);
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
            return `<div data-row="${numberRow}" data-column="${counter++}" class="cell" data-show="false" data-mined="${is_mined(cell)}">${cell}</div>`
        }).join('')
    }
}