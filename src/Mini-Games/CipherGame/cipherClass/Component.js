class Component {
    constructor() {
        if (this.constructor === Component) {
            throw new TypeError('Abstract class "Component" cannot be instantiated directly');
        }
    }

    click() {}
    verification(grid) {return true;}
    nbActivatedX(x) {return 0;}
    nbActivatedY(y) {return 0;}
    nbActivatedAround(x,y) {return 0;}
}