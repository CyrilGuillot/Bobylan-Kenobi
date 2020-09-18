class Rule extends Component{
    constructor(x, y, ruleType, nbRequired) {
        super();
        this.x = x;
        this.y = y;
        this.ruleType = ruleType;
        this.nbRequired = nbRequired;
    }
    verification(grid) {
        if(this.ruleType) return this.verificationInLine(grid);
        else return this.verificationAround(grid);
    }

    verificationInLine(grid) {
        if(this.x===0) return checkLine(this.y, grid, this.nbRequired);
        else if(this.y===0) return checkColumn(this.x, grid, this.nbRequired);
        else return false;

        function checkColumn(x, grid, nbRequired) {
            let countActivated = 0;
            for(let component of grid) {
                countActivated += component.nbActivatedX(x);
            }
            return nbRequired === countActivated;
        }

        function checkLine(y, grid, nbRequired) {
            let countActivated = 0;
            for(let component of grid) {
                countActivated += component.nbActivatedY(y);
            }
            return nbRequired === countActivated;
        }
    }

    verificationAround(grid) {
        let countActivated = 0;
        for(let component of grid) {
            countActivated += component.nbActivatedAround(this.x,this.y);
        }
        return this.nbRequired === countActivated;
    }
}