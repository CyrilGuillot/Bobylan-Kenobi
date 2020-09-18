var create_puzzle_scene_8_V3 = function (game) {


    /// ---------------------------------
    var update_quest = function () {
        var shop = game.get_arena_by_name("Shop1");
        shop.get_interactiveHandler().change_interactive_position_state(
            "Terminal",
            true
        );

        var pnj = shop.get_pnj_by_name("pnj");
        var dialogue = new SentencesSet();
        dialogue.create_sentence("Super!, le terminal est à vous");
        pnj.set_dialog(dialogue);
        pnj.speak_func();

    };

    var on_succeed = function () {
        game.change_scene_by_name("Shop1");
        setTimeout(function() {
            scene.dispose();        
    },1000);
        update_quest();
    };

    var puzzleGame = new PuzzleGame(game,8, 18,"Puzzle8_v3", new BABYLON.Vector3(-1.236, 0.870445, -1.21633), on_succeed )
    puzzleGame.add_config(1, [1,2,8]);
    puzzleGame.add_config(2, [2,3,1]);
    puzzleGame.add_config(3, [2,3,4]);
    puzzleGame.add_config(4, [5,3,4]);
    puzzleGame.add_config(5, [4,5,6]);
    puzzleGame.add_config(6, [7,5,6]);
    puzzleGame.add_config(7, [7,8,6]);
    puzzleGame.add_config(8, [7,8,1]);

    var scene = puzzleGame.get_scene();


    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.4;

    return puzzleGame.get_arena();

};