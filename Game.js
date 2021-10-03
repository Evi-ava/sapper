import Header from "./Header.js";
import CreatorMatrix from "./CreatorMatrix.js";
import Table from './Table.js';

export default class Game {

    observers = [];

    infoGame = {
        start: false,
        end: false,
    }

    changeLevel = event => {
        const element = event.target.closest('.select');
        if(element === null) return;

        if(element.value !== this.levelGame) {
            this.restart(element.value);
            this.levelGame = element.value;
            this.root.dataset.level = element.value;
        }
    }

    onClickCell = event => {

        if(this.infoGame.end) return;
        if(this.infoGame.start === false) this.startGame();

        const cell = event.target.closest('[data-column]');

        if(!cell) return;
        if(cell.dataset.flag === 'true') return;
        if(cell.dataset.mined === 'true') {
            alert('вы проиграли');
            this.losing();
            return;
        }

        if(cell.dataset.visited === 'true') return;
        cell.classList.remove('cell_white');

        const countBombs = this.table.getCountBombs(this.table._getNeighbors(cell));
        if(countBombs) {
            // если количество бомб соседей не 0;
            cell.innerHTML    = `${countBombs}`;
            cell.dataset.show = 'true';
            cell.dataset.around = countBombs  + '';
            this.table._checkWin();
        }
        else if (countBombs === 0) {
            // если клетка пуста
            this.BFS(cell);
            this.table._checkWin();
        }
    }

    onRightClickCell = event => {
        event.preventDefault();
        if(this.infoGame.end) return;
        if(event.which !== 3) return;

        const cell = event.target.closest('.cell');
        if(cell === null || cell.dataset.show === 'true') return;

        if(cell.dataset.flag === 'true') {
            this._removeFlag(cell);
        }
        else {
            this._addFlag(cell);
        }
    }

    _addFlag(cell) {
        cell.dataset.flag = 'true';
        cell.innerHTML = `<img src="flag.svg" alt="flag" width="50%" height="50%">`;

        // у следующего метода контекстом является header
        this.header.handlerFlag('delete');
    }

    _removeFlag(cell) {
        cell.dataset.flag = 'false';
        cell.innerHTML = '';

        // у следующего метода контекстом является header
        this.header.handlerFlag('add');
    }

    constructor(root = document.body, levelGame = 'simple') {
        this.root = root;
        this.root.dataset.level = levelGame;
        this.levelGame = levelGame;

        this.creator = new CreatorMatrix(this.getLevelSize(levelGame));
        this.dataMatrix = this.creator.getRandomDataMatrix();

        this.header = new Header(this.dataMatrix.amountBombs);
        this.table = new Table(this.dataMatrix);

        this.render();
        this.initHandlers();
        this.subscribe(this.header, this.table);
    }

    render() {
        this.root.append(this.header.element);
        this.root.append(this.table.element);
    }

    startGame() {
        this.header.startClock(this.header);
        this.infoGame.start = true;
    }

    BFS(cell) {
        const line = [];
        line.push(cell);
        cell.dataset.visited = 'true';
        cell.dataset.show = 'true';

        while(line.length !== 0) {
            const v = line.shift();
            const neighbors = this.table._getNeighbors(v);

            neighbors.forEach(elem => {

                if(elem.dataset.visited === 'true') return;

                elem.dataset.around = this.table.getCountBombs(this.table._getNeighbors(elem)) + '';
                if(+elem.dataset.around !== 0) elem.innerHTML = elem.dataset.around;
                elem.dataset.show = 'true';

                if(elem.dataset.flag === 'true') this._removeFlag(elem);
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

    subscribe(...args) {
        this.observers.push(...args);
    }

    losing() {
        this.infoGame.end = true;

        const flagCells = this.table.element.querySelectorAll('[data-flag="true"]');

        for(const cell of flagCells) {
            cell.innerHTML = '';
        }

        this.observers.forEach(observer => {
            observer.lose();
        });
    }

    restart(levelGame) {
        this.header.removeClock();

        this.infoGame.start = false;
        this.infoGame.end = false;

        this.root.classList.remove('root_bombs');
        const sizeMatrix = this.getLevelSize(levelGame);

        this.creator = new CreatorMatrix(sizeMatrix);
        this.dataMatrix = this.creator.getRandomDataMatrix();

        this.header.update(this.dataMatrix.amountBombs);
        this.table.update(this.dataMatrix);
    }

    getLevelSize(levelGame = 'simple') {

        const level = {
            'simple': 10,
            'middle': 16,
            'hard': 19,
        }

        return level[levelGame];
    }

    initHandlers() {
        this.header.element.addEventListener('click', event => {
            const element = event.target.closest('.exit');
            if(element) this.restart(this.levelGame);
        });

        this.table.element.addEventListener('click', this.onClickCell);
        this.header.element.addEventListener('click', this.changeLevel);
        this.table.element.addEventListener('pointerdown', this.onRightClickCell);
    }
}