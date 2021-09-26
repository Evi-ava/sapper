export default class Table {

    element = null;
    // line = [];

    onClickCell = event => {
        const cell = event.target.closest('[data-column]');
        if(!cell) return;

        if(cell.dataset.mined === 'true') {
            alert('вы проиграли');
            return;
        }

        if(cell.dataset.checked === 'true') return;

        const countBombs = this.getCountBombs(this._getNeighbors(cell));
        if(countBombs) {
            // если количество бомб соседей не 0;
            cell.innerHTML    = `${countBombs}`;
            cell.dataset.show = 'true';
        }
        else if (countBombs === 0) {
            // если клетка пуста
            this.BFS(cell);
        }
    }

    BFS(cell) {
        const line = [];
        line.push(cell);
        cell.dataset.visited = 'true';
        cell.dataset.show = 'true';

        while(line.length !== 0) {
            const v = line.shift();
            const neighbors = this._getNeighbors(v);

            neighbors.forEach(elem => {

                if(elem.dataset.visited === 'true') return;
                // elem.dataset.visited = 'true';

                elem.dataset.around = this.getCountBombs(this._getNeighbors(elem)) + '';
                if(+elem.dataset.around !== 0) elem.innerHTML = elem.dataset.around;
                elem.dataset.show = 'true';
            });

            const filteredNeighbors = neighbors.filter(elem => {
               return +elem.dataset.around === 0 && elem.dataset.visited !== 'true';
            });

            line.push(...filteredNeighbors);
            neighbors.forEach(elem => {
                elem.dataset.visited = 'true';
            })
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
            return `<div data-row="${numberRow}" data-column="${counter++}" class="cell" data-show="false" data-mined="${is_mined(cell)}">
<!--                        ${cell ? 'B' : ''}-->
                    </div>`
        }).join('')
    }
}