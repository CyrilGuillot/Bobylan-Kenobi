var create_puzzle_scene_8_V1 = function (game) {


    var on_succeed = function () {
        game.change_scene_by_name("Bar");
        setTimeout(function() {
            scene.dispose();        
        },1000);
        update_dialog();
    
    };

    var puzzleGame = new PuzzleGame(game,8, 18, "Puzzle8", new BABYLON.Vector3(-1.236, 0.870445, -1.21633), on_succeed )
    puzzleGame.add_config(1, [1,2,8]);
    puzzleGame.add_config(2, [2,3,1]);
    puzzleGame.add_config(3, [2,3,4]);
    puzzleGame.add_config(4, [5,3,4]);
    puzzleGame.add_config(5, [4,5,6]);
    puzzleGame.add_config(6, [7,5,6]);
    puzzleGame.add_config(7, [7,8,6]);
    puzzleGame.add_config(8, [7,8,1]);

    var scene = puzzleGame.get_scene();
    /// ---------------------------------

    var update_quest = function () {
        game.game_state.update_objectif(
            " Rendez vous au parc"
        );
        var bar = game.get_arena_by_name("Bar");
        var barman = bar.get_pnj_by_name("Barman");
        var dialog_barman = new SentencesSet();
        dialog_barman.create_sentence("Je vous sers quelque chose ?\n");
        dialog_barman.create_sentence("Non merci\n","player");
        barman.set_dialog(dialog_barman);

        var road = game.get_arena_by_name("Road1");
        road.get_interactiveHandler().change_interactive_position_function(
            "Parc",
            function () {
                game.change_scene_by_name("Parc", Location.PARC_FROM_ROAD);
            }
        );
        road.get_interactiveHandler().change_interactive_position_state(
            "Hall_1",
            false
        );
        road.get_interactiveHandler().change_interactive_position_state(
            "Ruelle",
            false
        );
        road.get_interactiveHandler().change_interactive_position_state(
            "Stairs",
            false
        )
    };

    var update_dialog = function () {
        var bar = game.get_arena_by_name("Bar");

        bar.get_interactiveHandler().change_interactive_position_state(
            "puzzle_V2",
            false
        );
        bar.get_interactiveHandler().change_interactive_position_state(
            "Barman",
            true
        );

        //////dialog
        var barman = bar.get_pnj_by_name("Barman");
        var dialog_barman = new SentencesSet(update_quest);
        dialog_barman.create_sentence("Voilà le pass, comme promis.\n");
        dialog_barman.create_sentence("Haha tu commence à devenir rouillé le vieux,\n on devrait bientôt vous changer je pense.","pnj_002");
        barman.set_dialog(dialog_barman);
    };


    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.4;


    return puzzleGame.get_arena();

};