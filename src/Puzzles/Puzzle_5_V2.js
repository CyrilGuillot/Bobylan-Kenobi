var create_puzzle_scene_5_V2 = function (game) {

    
    var on_succeed = function() {
        game.change_scene_by_name("Bar");
        setTimeout(function() {
                scene.dispose();        
        },1000);
        update_dialog();
    };

    var puzzleGame = new PuzzleGame(game,5, 12,"Puzzle5",  new BABYLON.Vector3(-1.236, 0.870445, -1.21633), on_succeed )
    puzzleGame.add_config(1, [1,3,4]);
    puzzleGame.add_config(2, [2,4,5]);
    puzzleGame.add_config(3, [3,5,1]);
    puzzleGame.add_config(4, [4,1,2]);
    puzzleGame.add_config(5, [5,2,3]);
    
    var scene = puzzleGame.get_scene();

    var update_dialog = function () {
        var bar = game.get_arena_by_name("Bar");

        bar.get_interactiveHandler().change_interactive_position_state(
            "puzzle",
            false
        );
        bar.get_interactiveHandler().change_interactive_position_state(
            "Barman",
            false
        );
        ///////////Barman


        /////pnj
        var pnj = bar.get_pnj_by_name("pnj_002");
        var dialog_pnj = new SentencesSet(unlock_puzzle_V2);
        dialog_pnj.create_sentence("Haha mais dites donc vous êtes bien doué!","pnj_002");
        dialog_pnj.create_sentence("Bon, en venant ici j’ai vu Arthur se diriger vers le parc.","pnj_002");
        dialog_pnj.create_sentence(" En y repensant, il avait pas trop une bonne mine \n quelques bières ne lui feraient pas de mal hahaha.","pnj_002");
        dialog_pnj.create_sentence("D’accord, bonne soirée à vous messieurs.","player");
        dialog_pnj.create_sentence("J’espère que vous avez le pass si vous voulez accéder au parc…\n","Barman");
        dialog_pnj.create_sentence(" Pardon ?","player");
        dialog_pnj.create_sentence(" L’accès au parc est restreint en ce moment.","Barman");
        dialog_pnj.create_sentence(" Une société du nom de CGI l’a loué pour préparer un de leur événement…","Barman");
        dialog_pnj.create_sentence(" Heureusement pour vous j’en ai en ma possession.","Barman");
        dialog_pnj.create_sentence(" Laissez moi deviner...\n","player");
        dialog_pnj.create_sentence(" vous n’allez pas me le donner gratuitement.","player");
        dialog_pnj.create_sentence("  Haha exactement !","Barman");
        dialog_pnj.create_sentence("  Rien de personnel monsieur mais j’ai un commerce à faire vivre ici moi.","Barman");
        dialog_pnj.create_sentence("  J’ai aimé comme vous avez gagné contre pnj1.","Barman");
        dialog_pnj.create_sentence("  ça vous dit d'élever un peu le niveau ?","Barman");
        dialog_pnj.create_sentence("  Allons-y","player");
        dialog_pnj.create_sentence("  Parfait! c'est à la même table","Barman");

        pnj.set_dialog(dialog_pnj);


    };
    ////////////////////PNJ & barman Dialogue
    var unlock_puzzle_V2 =function () {
        var bar = game.get_arena_by_name("Bar");

        bar.get_interactiveHandler().change_interactive_position_state(
            "puzzle_V2",
            true
        );
        var pnj = bar.get_pnj_by_name("pnj_002");
        var dialog_pnj = new SentencesSet();
        dialog_pnj.create_sentence("J'ai encore perdu...");
        dialog_pnj.create_sentence("Il me faut une bière pour oublier...");
        pnj.set_dialog(dialog_pnj);
    };
    
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.4;

    return puzzleGame.get_arena();

};