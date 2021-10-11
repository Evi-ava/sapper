import Header from "./components/Header.js";
import CreatorMatrix from "./components/CreatorMatrix.js";
import Table from './components/Table.js';
import PopUp from "./components/PopUp.js";

export default class Game {

    observers = [];

    infoGame = {
        start: false,
        end: false,
        bestTime: {
            simple: 0,
            middle: 0,
            hard: 0,
        }
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

        const cell = event.target.closest('[data-column]');
        if(!cell) return;

        if(this.infoGame.start === false) {
            this.startGame();
            this.firstClicked(cell);
        };

        if(cell.dataset.flag === 'true') return;
        if(cell.dataset.mined === 'true') {
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
            this._checkWin();
        }
        else if (countBombs === 0) {
            // если клетка пуста
            this.BFS(cell);
            this._checkWin();
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
        cell.innerHTML = `<img src="svg/flag.svg" alt="flag" width="50%" height="50%">`;

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
        this.dataMatrix = this.creator.createZeroMatrix(this.getLevelSize(levelGame));

        this.header = new Header(this.creator.getCountBombsOnField(this.getLevelSize(this.levelGame)));
        this.table = new Table(this.dataMatrix);
        this.popup = new PopUp();

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

    firstClicked(cell) {
        const {row, column} = cell.dataset;
        const dataMatrix = this.creator.getRandomDataMatrix({x: +column, y: +row});

        this.table.update(dataMatrix);
        const newGenerateCell = this.table.element.querySelector(`.cell[data-column="${column}"][data-row="${row}"]`);

        const eventClick = new Event('click', {bubbles: true});
        newGenerateCell.dispatchEvent(eventClick);
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
        this.blocked();

        const flagCells = this.table.element.querySelectorAll('[data-flag="true"]');

        for(const cell of flagCells) {
            cell.innerHTML = '';
        }

        this.observers.forEach(observer => {
            observer.lose();
        });

        this.popup.show('___', this.infoGame.bestTime[this.levelGame]);
    }

    restart(levelGame) {
        this.popup.remove();
        this.header.removeClock();

        this.header.element.dataset.blocked = 'false';
        this.table.element.dataset.blocked = 'false';

        this.infoGame.start = false;
        this.infoGame.end = false;

        this.root.classList.remove('root_bombs');
        const sizeMatrix = this.getLevelSize(levelGame);

        this.creator = new CreatorMatrix(sizeMatrix);
        this.dataMatrix = this.creator.createZeroMatrix(sizeMatrix);

        this.header.update(this.creator.getCountBombsOnField(sizeMatrix));
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

    _checkWin() {
        let countShowCells = 0;
        this.table.allCells.forEach(cell => {
            cell.dataset.show === 'true' ? countShowCells++ : false;
        });

        if(countShowCells === this.table.amountEmptyField) {
            this.win();
        }
    }

    win() {
        this.blocked();

        if(this.infoGame.bestTime[this.levelGame] === 0) {
            this.infoGame.bestTime[this.levelGame] = this.header.clockCount;
        }
        else if (this.infoGame.bestTime[this.levelGame] > this.header.clockCount) {
            this.infoGame.bestTime[this.levelGame] = this.header.clockCount;
        }

        this.popup.show(this.header.clockCount, this.infoGame.bestTime[this.levelGame]);
    }

    blocked() {
        this.infoGame.end = true;
        this.header.removeClock();
        this.header.element.dataset.blocked = 'true';
        this.table.element.dataset.blocked = 'true';
    }

    initHandlers() {
        document.addEventListener('click', event => {
            const element = event.target.closest('[data-restart="true"]');
            if(element) this.restart(this.levelGame);
        });

        this.table.element.addEventListener('click', this.onClickCell);
        this.header.element.addEventListener('click', this.changeLevel);
        this.table.element.addEventListener('pointerdown', this.onRightClickCell);
    }
}