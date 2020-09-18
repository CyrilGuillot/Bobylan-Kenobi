class Polynomial extends Component {
    constructor() {
        super();
        this.squares = [];
    }

    add(x, y) {
        this.squares.push(new Square(x,y));
    }

    click() {
        for(const square of this.squares) {
            square.click();
        }
    }

    nbActivatedX(x) {
        let nbActivated = 0;
        for(const square of this.squares) {
            if(square.x === x && square.activated) nbActivated++;
        }
        return nbActivated;
    }

    nbActivatedY(y) {
        let nbActivated = 0;
        for(const square of this.squares) {
            if(square.y === y && square.activated) nbActivated++;
        }
        return nbActivated;
    }

    nbActivatedAround(x,y) {
        let nbActivated = 0;
        for(const square of this.squares) {
            if(square.x === x+1 && square.y === y && square.activated) nbActivated++;
            if(square.x === x-1 && square.y === y && square.activated) nbActivated++;
            if(square.x === x && square.y === y-1 && square.activated) nbActivated++;
            if(square.x === x && square.y === y+1 && square.activated) nbActivated++;
        }
        return nbActivated;
    }
}