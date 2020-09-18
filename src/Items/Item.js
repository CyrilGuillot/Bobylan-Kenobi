class Item {
    constructor(name, description, image, on_click) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.on_click = on_click;
    }

    use() {
        if (this.on_click !== null) {
            this.on_click();
        }
    }
}