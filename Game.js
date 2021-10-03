import Header from "./Header.js";
import CreatorMatrix from "./CreatorMatrix.js";
import Table from './index.js';

export default class Game {

    changeLevel = event => {
        const element = event.target.closest('.select');
        if(element === null) return;

        if(element.value !== this.levelGame) {
            this.restart(element.value);
            this.levelGame = element.value;
            this.root.dataset.level = element.value;
        }
    }

    constructor(root = document.body, levelGame = 'simple') {
        this.root = root;
        this.root.dataset.level = levelGame;
        this.levelGame = levelGame;

        this.creator = new CreatorMatrix(this.getLevelSize(levelGame));
        this.dataMatrix = this.creator.getRandomDataMatrix();

        this.header = new Header(this.dataMatrix.amountBombs);
        this.table = new Table(this.dataMatrix, this.header.handlerFlag.bind(this.header));

        this.render();
        this.initHandlers();
    }

    render() {
        this.root.append(this.header.element);
        this.root.append(this.table.element);
        this.header.startClock(this.header);
    }

    restart(levelGame) {
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

        this.header.element.addEventListener('click', this.changeLevel);
    }
}