var create_room_scene = function(game){

    var arena = game.arena_builder.build_playable_arena("Room", new BABYLON.Vector3(3.60953,0,0.354151 ), new BABYLON.Vector3(7.89196,4,-7.53218), null, game.musics.CITY);
    var scene = arena.get_scene();

    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    light.intensity = 0.5;




    ////////Main Room
    arena.get_interactiveHandler().create_interactive_position(
        "Escaliers",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(3.60953,0,0.354151 ),
        2,
        function() {game.change_scene_by_name("CrimeRoom",Location.CRIME_ROOM_FROM_ROOM)});


    /////////////////Paper in the office
    /*

     */
    var pop_paper=function () {
        var office = game.get_arena_by_name("Bureau");

        office.get_interactiveHandler().change_interactive_position_state(
            "paper",
            true
        )

    };

    //////////////////Hacking tool
    var pop_tool = function () {
        var office = game.get_arena_by_name("Bureau");
        office.get_interactiveHandler().change_interactive_position_state(
            "Tool",
            true
        );
        office.get_interactiveHandler().change_interactive_position_state(
            "Terminal_2",
            false
        )

    };

    ///////////update interaction
    var update_dialog = function () {
        var stairs = game.get_arena_by_name("Stairs");
        var pnj = stairs.get_pnj_by_name("Bob");
        var dialog = new  SentencesSet();
        dialog.create_sentence("Bonjour");
        pnj.set_dialog(dialog);

    };

    //////////////////Changing the pnj_interaction
    var update_bob = function () {
        var stairs = game.get_arena_by_name("Stairs");
        var pnj = stairs.get_pnj_by_name("Bob");
        console.log(stairs.pnjs[0].name);
        console.log(pnj);
        var dialog = new  SentencesSet(update_dialog);
        dialog.create_sentence("M. Kenobi, quelqu’un vous a rendu visite pendant que vous étiez absent. ");
        dialog.create_sentence("Il vous a laissé un message sur votre bureau.");
        dialog.create_sentence("Ah bon ? Je n’ai pourtant pas prévu de rendez-vous. Je vais voir ça, merci.","player");
        pnj.set_dialog(dialog);
    };


    //////////Terminal_first_interaction
    var sentencesSet = new  SentencesSet();
    sentencesSet.create_sentence(" Le terminal personnel du CEO est bien évidemment verrouillé..");
    sentencesSet.create_sentence("Je dois pouvoir le pirater...");
    var monologue= arena.create_monologue("Terminal_room", sentencesSet,function () {
        arena.get_interactiveHandler().change_interactive_position_state(
            "Terminal_3",
            false
        );



    });

    /*


    arena.get_interactiveHandler().create_interactive_position(
        "Terminal_3",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(-3.8084409004646513,0,0.48481267408466355),
        2,
        function() {
            monologue.play();
            arena.get_interactiveHandler().change_interactive_position_state(
                "Terminal",
                true
            );

        });

*/

    ////////////Terminal_game
    var sentencesSet_2 = new  SentencesSet();
    sentencesSet_2.create_sentence(" Mon Dieu je n’arrive pas y croire. Des humains ?! \n");
    sentencesSet_2.create_sentence("Je dois retrouver cet Arthur Morgan...");
    sentencesSet_2.create_sentence("Je devrais me rendre au bar où il devait rencontrer John ce soir. ");
    var monologue_2= arena.create_monologue("Terminal_room", sentencesSet_2,function () {
        game.game_state.update_objectif("Chercher Arthur Morgan au bar")
    });



    var on_succeed = function() {
        monologue_2.play();
        var alley  = game.get_arena_by_name("Alley");
        alley.get_interactiveHandler().change_interactive_position_state(
            "CrimeScene_side",
            false
        );


        var road = game.get_arena_by_name("Road1");
        road.get_interactiveHandler().change_interactive_position_state(
            "Bavel_access",
            true
        );
        road.get_interactiveHandler().change_interactive_position_state(
            "Bavel",
            false
        );
        arena.get_interactiveHandler().change_interactive_position_state(
            "Terminal",
            false
        );

    };

    var succeed_msg = "********** Terminal déverouillé *********\n*** Appuyez sur entrer pour accéder ***\n*****************aux mails****************";
    var on_mails_read = function () {


        console.log("se lance lorsque tout les mails sont lus");
    };
    var configs = [terminalConfigs[0], terminalConfigs[1],terminalConfigs[2]];
    // arena, camera_position, terminal_position, configs, func on suceed, msg on screen
    var terminalGame = new TerminalGame(arena,new BABYLON.Vector3(-3.74293,2,0.58448), new BABYLON.Vector3(-3.8084409004646513,0,0.48481267408466355), configs, on_succeed, succeed_msg, on_mails_read);
    /////////////////////// MAIL 1
    var mail1 = "Date:05/07/2089 \n From : Arthur Morgan \n Subject: Re LPV \n" +
        "   John, ce qui se passe est très grave.\n" +
        "Tu as raison. J’ai demandé à mon ami\n" +
        "Lenny quelques informations sur les\n" +
        " dernières opérations logistiques\n "+
        "de Robot Corp. Il a pu accéder aux\n" +
        "caméras de surveillances des centres \n" +
        "de dépôts de Robot Corp et ce que \n" +
        "l’on craignait était bien réel. \n"+
        "   Plusieurs humains étaient enfermés\n "+
        "*** Appuyez sur entrer pour continuer ***"
        ;
    ///////////////////////e
    var mail2 = "transférés ailleurs.\n"+ " là bas en attendant qu’ils soient\n"+
        "   Bon sang John, on nous ment depuis\n" +
        "le début, les humains existent encore \n"+
        "dans ce monde !.Nous devons absolument\n"+
        " retrouver ce dépôt.\n" +
        "   Je te donne rendez-vous au bar \n " +
        " habituel au nord de la ville dans\n " +
        "3 jours pour décider de nos actions.\n \n \n" +"*** Appuyez sur esc pour quitter ***";
    terminalGame.add_final_text(mail1);
    terminalGame.add_final_text(mail2);
    arena.get_interactiveHandler().change_interactive_position_state(
        "Terminal",
        true
    );


    return arena;
};