export default class Table {

    element = null;

    onClickCell = event => {
        const cell = event.target.closest('[data-number]');

        if(cell) {
            cell.style.background = 'red'
        }
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
        let counter = 0;

        return matrix.map(row => {
            return `<div class="row" data-row="${counter++}">
                        ${this.getCells(row)}
                    </div>`
        }).join('');
    }

    getCells(row) {
        const is_mined = cell => cell === 1 ? true : false;

        let counter = 0;
        return row.map(cell => {
            return `<div data-number="${counter++}" class="cell" data-show="false" data-mined="${is_mined(cell)}">${cell}</div>`
        }).join('')
    }
}