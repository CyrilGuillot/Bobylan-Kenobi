class Grid {
    constructor() {
        this.grid = [];
    }
    addComponent(component) {
        this.grid.push(component);
    }

    // Check if the rules are respected
    verification() {
        for(const component of this.grid) {
            if(!component.verification(this.grid)) return false;
        }
        return true;
    }

    displayResults() {
        const result = this.verification();
        if(result) document.write('success');
        else document.write('fail');
    }
}