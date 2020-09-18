var create_shop1_scene = function(game){

    var arena = game.arena_builder.build_playable_arena("Shop1", new BABYLON.Vector3(7.55896,0,1.05271 ), new BABYLON.Vector3(6.3634,4,4.57939), null, game.musics.CHILL);
    var scene = arena.get_scene();
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(7.55896,0,1.05271 ), scene);
    light.intensity = 0.5;

    /////to square

    arena.get_interactiveHandler().create_interactive_position(
        "alley",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(7.55896,0,1.05271 ),
        2, function() {
            game.change_scene_by_name("Square", Location.SQUARE_FROM_SHOP1);
        });



    /////////////pnj
    var pnj = arena.create_pnj(
        "pnj",
        new BABYLON.Vector3(-0.8340432306212212, 0,1.5650469713714683),
        -1.5,
        2,
        true,
        true
    );
    arena.get_interactiveHandler().create_interactive_position(
        "pnj",
        "Appuyez sur E pour parler",
        new BABYLON.Vector3(1.3796614890271381,0, 1.3564547319678562),
        1,
        function(){
            pnj.speak_func();
        }
    );

    ///////function
    var func = function () {
        game.add_arena(create_puzzle_scene_8_V3(game));
        game.change_scene_by_name("Puzzle8_v3")
    };
    ////////////Dialogue
    var dialog_pnj = new SentencesSet(func);
    dialog_pnj.create_sentence("Bonjour monsieur, puis-je utiliser votre terminal pour envoyer un message s’il vous plaît ? ","player");
    dialog_pnj.create_sentence("Euh... ");
    dialog_pnj.create_sentence("je ne suis pas le gérant de cet établissement. Je ne sais pas trop si je peux vous laisser faire ça. ");
    dialog_pnj.create_sentence(" Je comprends...","player");
    dialog_pnj.create_sentence(" mais c’est très important pour moi il doit bien y avoir quelque chose que je puisse faire pour vous...","player");
    dialog_pnj.create_sentence(" A vrai dire, je joue à ce jeu pour faire passer le temps et je suis bloqué dans un niveau...");
    dialog_pnj.create_sentence(" aidez moi à le résoudre et le terminal est à vous.");
    pnj.set_dialog(dialog_pnj);






    //////Terminal
    var sentencesSet = new  SentencesSet();
    sentencesSet.create_sentence("C’est ça !");
    sentencesSet.create_sentence(" Ils les gardent dans le dépôt juste en face de mon bureau !.");
    sentencesSet.create_sentence(" Je préviens Arthur pour qu’il me rejoigne là bas.");
    var monologue = arena.create_monologue("terminal", sentencesSet);

    var on_succeed = function() {
        arena.get_interactiveHandler().change_interactive_position_state(
            "Terminal",
            false
        );

        ///////////
        monologue.play();
        //////////////
        game.game_state.update_objectif("Retrouver Arthur devant le dépôt");
        ///////////
        dialog_pnj = new SentencesSet();
        dialog_pnj.create_sentence("Ne dites à personne que je vous ai laissé faire ça...");
        pnj.set_dialog(dialog_pnj);

        ///////////

        var alley = game.get_arena_by_name("Alley");
        alley.get_interactiveHandler().change_interactive_position_state(
            "depot",
            true
        );

        var road = game.get_arena_by_name("Road1");
        road.get_interactiveHandler().change_interactive_position_state(
            "Ruelle",
            true
        );

        road.get_interactiveHandler().change_interactive_position_state(
            "Parc",
            false
        )


    };

    var succeed_msg = "********** Terminal déverouillé *********\n*** Appuyez sur entrer pour accéder ***\n**************aux transactions*************";

    var on_mails_read = function () {
    };

    var configs = [terminalConfigs[6], terminalConfigs[7]];
    // arena, camera_position, terminal_position, configs, func on suceed, msg on screen
    var terminalgame = new TerminalGame(arena,new BABYLON.Vector3(-4.692363320831241,2,0.1), new BABYLON.Vector3(-4.8521306740588415,0,0.3536095502471421), configs, on_succeed, succeed_msg,on_mails_read);
    arena.get_interactiveHandler().change_interactive_position_state(
        "Terminal",
        false
    );
    var transaction1 = "Mon 10/07/2089\n" + "22:30\n" + "\n"+
        "***Transaction 2F56 : \n"+
        "*******Date : 05/07/2089 \n"+
        "*******Code : LVP \n"+
        "*******Quantité : NULL \n"+
        "*******Quantité : Dépôt 85Re - Road1 \n \n \n" + "***** Appuyez sur esc pour quitter *****";

    terminalgame.add_final_text(transaction1);




    /////

    ////////////

    return arena;
}