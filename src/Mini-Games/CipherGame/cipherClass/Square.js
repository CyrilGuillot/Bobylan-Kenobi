class Square {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.activated = false;
    }

    click() {
        this.activated = !this.activated;
    }
}