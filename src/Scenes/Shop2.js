var create_shop2_scene = function(game){

    var arena = game.arena_builder.build_playable_arena("Shop2", new BABYLON.Vector3(3.41677,0,-6.08684 ), new BABYLON.Vector3(-0.233213,4,1.79764), null, game.musics.CHILL);
    var scene = arena.get_scene();


    arena.get_interactiveHandler().create_interactive_position("porte2","Appuyez sur E pour interagir",new BABYLON.Vector3(3.41677,0,-6.08684), 2, function() {
        game.change_scene_by_name("Square", Location.SQUARE_FROM_SHOP2)});

    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    light.intensity = 0.5;


    //////////////////////

    ///////////////////////update
    var update = function(){
        var square = game.get_arena_by_name("Square");
        square.get_interactiveHandler().change_interactive_position_state(
            "shop1",
            true
        );
    };

    ////////////Terminal_game
    var sentencesSet = new  SentencesSet(update);
    sentencesSet.create_sentence("Ce n’est pas ce que je recherche….");
    var monologue = arena.create_monologue("terminal", sentencesSet);



    var on_succeed = function() {
        ///////////
        monologue.play();
        ////////
        arena.get_interactiveHandler().change_interactive_position_state(
            "Terminal",
            false
        );
        //////////////
        game.game_state.update_objectif("Chercher la transaction LVP dans un autre magasin ");
        ///////////
        dialog_pnj = new SentencesSet();
        dialog_pnj.create_sentence("Bonjour");
        pnj.set_dialog(dialog_pnj);
        ///////////

    };
    /////////////Terminal 1
    var succeed_msg = "********** Terminal déverouillé *********\n*** Appuyez sur entrer pour accéder ***\n**************aux transactions*************";
    var on_mails_read = function () {

    };

    var configs = [terminalConfigs[3], terminalConfigs[4], terminalConfigs[5]];
    // arena, camera_position, terminal_position, configs, func on suceed, msg on screen
    var terminalgame = new TerminalGame(arena,new BABYLON.Vector3(-2,2,9.5), new BABYLON.Vector3(-1.5596763523461703,0,9.643103171105382), configs, on_succeed, succeed_msg,on_mails_read);
    arena.get_interactiveHandler().change_interactive_position_state(
        "Terminal",
        false
    );

    var transaction1 = "Mon 10/07/2089\n" + "21:59\n" + "\n"+
        "***Transaction 2F56 : \n"+
        "*******Date : 03/07/2089 \n"+
        "*******Code : Nintendo Switch \n"+
        "*******Quantité : 3 \n"+
        "*******Quantité : Sous-sol \n";

    var transaction2 = "Mon 10/07/2089\n" + "22:01\n" + "\n"+
        "***Transaction DT59 : \n"+
        "*******Date : 03/07/2089 \n"+
        "*******Code : Oculus Quest \n"+
        "*******Quantité : 3 \n"+
        "*******Quantité : Sous-sol \n \n \n"+"***** Appuyez sur esc pour quitter *****";

    terminalgame.add_final_text(transaction1);
    terminalgame.add_final_text(transaction2);

    /////////////////////pnj

    var pnj = arena.create_pnj(
        "pnj",
        new BABYLON.Vector3(0.5025507408100313,0, 9.632895545025786),
        -0.5,
        2,
        false,
        false
    );

    //////////// function
    var func = function () {
        arena.get_interactiveHandler().change_interactive_position_state(
            "Terminal",
            true
        );
    };

    var dialog_pnj = new SentencesSet(func);
    dialog_pnj.create_sentence("Bonjour monsieur, puis-je utiliser votre terminal pour envoyer un message urgent s’il vous plaît ? ","player");
    dialog_pnj.create_sentence("Oui bien sûr.");
    /*
    dialog_pnj.create_sentence(" Je comprends...","player");
    dialog_pnj.create_sentence(" mais c’est très important pour moi il doit bien y avoir quelque chose que je peux faire pour vous...","player");
    dialog_pnj.create_sentence(" A vrai dire, je joue à ce jeu pour faire passer le temps et je suis bloqué dans un niveau...");
    dialog_pnj.create_sentence(" aidez moi à le résoudre et le terminal est à vous.");
    */

    pnj.set_dialog(dialog_pnj);





    return arena;
};