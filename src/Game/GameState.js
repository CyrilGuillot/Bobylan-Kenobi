class GameState{
    constructor(game, name) {
        this.game = game;
        this.player_name = name;
    }

    update_objectif(text) {
        for (let i = 0 ; i < this.game.arenas.length ; i++) {
            var arena = this.game.arenas[i];
            if (arena.isPlayable()) {
                arena.player.renderer.update_objectif(text);
            }
        }
    }

}
