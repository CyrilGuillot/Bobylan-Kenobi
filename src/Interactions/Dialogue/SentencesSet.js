
class SentencesSet {
    constructor(end_func) {
        this.sentences = [];
        this.current_sentence_id = -1;
        this.end_func = end_func;
    }
    create_sentence(text, target_name, end_func) {
        this.sentences.push(new Sentence(text, target_name, end_func));
    }

    get_next_sentence() {
        if (this.current_sentence_id + 1 < this.sentences.length) {
            this.current_sentence_id +=1;
            return this.sentences[this.current_sentence_id];
        }else {
            if (this.end_func !=null) {
                this.end_func();
            }
            this.current_sentence_id = -1;
            return null;
        }


    }
}