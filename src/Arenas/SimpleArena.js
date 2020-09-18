class SimpleArena extends Arena {

    constructor(game, scene, id, name, music_enum) {
        super(game, scene, id , name , music_enum);
    }

    isPlayable() {
        return false;
    }

    add_rules_renderer(renderer) {
        this.renderer = renderer;
    }


}