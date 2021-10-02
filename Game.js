import Header from "./Header.js";
import CreatorMatrix from "./CreatorMatrix.js";
import Table from './index.js';

export default class Game {
    constructor(root = document.body) {
        this.root = root;
        this.creator = new CreatorMatrix(8);
        this.dataMatrix = this.creator.getRandomDataMatrix();

        this.header = new Header(this.dataMatrix.amountBombs);
        this.table = new Table(this.dataMatrix, this.header.handlerFlag.bind(this.header));


        this.render();
        debugger;
    }

    restart() {
        this.creator = new CreatorMatrix(8);
        this.dataMatrix = this.creator.getRandomDataMatrix();

        this.header.update(this.dataMatrix.amountBombs);
        this.table.update(this.dataMatrix);
    }

    render() {
        this.root.append(this.header.element);
        this.root.append(this.table.element);
    }
}