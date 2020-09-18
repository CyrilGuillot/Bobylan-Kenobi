class Sentence{
    constructor(text,target_name, end_func) {
        this.target_name = target_name;
        this.text = text;
        this.end_func = end_func;
    }
    play_end_func() {
        if (this.end_func !== null) {
            this.end_func();
        }
    }
}