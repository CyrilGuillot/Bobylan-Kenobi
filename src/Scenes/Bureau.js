var create_bureau_scene = function(game){

    var on_loaded = function() {
        var radio = scene.getMeshByName("Radio_table");
        monologue_Terminal_2.set_custom_mesh(radio);
    }
    
    var arena = game.arena_builder.build_playable_arena("Bureau", new BABYLON.Vector3(-3.94077, 0,3.67019 ), new BABYLON.Vector3(1,4,-3), on_loaded, game.musics.CHILL);
    var scene = arena.get_scene();
    var interactiveHandler = arena.get_interactiveHandler();


    const interaction_text = "Appuyez sur E pour interagir";

    var monologue =[];
    monologue.push("Ma première compétition de programmation, que de beaux souvenirs de cette vieille époque."); //0
    monologue.push("Toute cette technologie que l'on a développée n'a pas pu remplacer le charme d'un simple livre."); //1
    monologue.push("Il faudrait que je trie mes centaines de mails non-consultés un jour...");//2
    monologue.push("Bien qu'elle gâche la vue, je dois avouer que la résidence du nouveau CEO de Robot Corp est impressionnante.");//3
    monologue.push("Bon, encore un dernier dossier à traiter et j’aurai fini pour la journée.");//4
    monologue.push("Mais où est-ce que je l’ai mis déjà  ?");//5
    monologue.push("Hein !");//6
    monologue.push("C’est moi ou il y a quelque chose d’étrange qui se passe dans la résidence en face ?");//7


    //Quest updates
    var interactions = 0;



    // Monologue Window

    var sentencesSet_Window = new  SentencesSet();
    sentencesSet_Window.create_sentence(monologue[3]);
    var monologue_Window = arena.create_monologue("Windows_1", sentencesSet_Window);

    // Monologue Windows_Alternative

    var sentencesSet_Window_alt = new  SentencesSet();
    sentencesSet_Window_alt.create_sentence("  ?!  ");

    var sentencesSet_Window_alt2 = new  SentencesSet();
    sentencesSet_Window_alt2.create_sentence("Je devrais aller vérifier que tout va bien en face ...");
    var mono_win_2 = arena.create_monologue("check",sentencesSet_Window_alt2);

    var monologue_Window_alt = arena.create_monologue("Windows_2", sentencesSet_Window_alt,function () {
        game.play_crime();
        interactiveHandler.remove_interactive_position("Book");
        interactiveHandler.remove_interactive_position("Terminal");
        interactiveHandler.remove_interactive_position("Desk");
        interactiveHandler.remove_interactive_position("Frame");
        interactiveHandler.change_interactive_position_function("porte000", function () {
            game.change_scene_by_name("Stairs", Location.STAIRS_FROM_BUREAU);
        });
        interactiveHandler.change_interactive_position_function("Window", function () {
            mono_win_2.play();
        });

    });

    // Window Interaction
    interactiveHandler.create_interactive_position(
        "Window",
        interaction_text,
        new BABYLON.Vector3(-4.399424654858113, 0, 3.951320153531432),
        0.5,
        function () {
            monologue_Window.play();
        });





    // Monologue Book

    var sentencesSet_Book_alt = new  SentencesSet();
    sentencesSet_Book_alt.create_sentence("Je devrais aller vérifier ce qui se passe par la fenêtre");
    var monologue_Book_alt = arena.create_monologue("Book_2", sentencesSet_Book_alt);

    var sentencesSet_Book = new  SentencesSet();
    sentencesSet_Book.create_sentence(monologue[1]);
    sentencesSet_Book.create_sentence(monologue[6]);
    sentencesSet_Book.create_sentence(monologue[7]);
    var monologue_Book = arena.create_monologue("Book_1", sentencesSet_Book,function () {
        interactiveHandler.change_interactive_position_function("Book",function () {
            monologue_Book_alt.play();
        });
        interactiveHandler.change_interactive_position_function("Terminal",function () {
            monologue_Book_alt.play();
        });
        interactiveHandler.change_interactive_position_function("Desk",function () {
            monologue_Book_alt.play();
        });
        interactiveHandler.change_interactive_position_function("porte000",function () {
            monologue_Book_alt.play();
        });

        game.game_state.update_objectif("Aller vérifier ce qui se passe par la fenêtre");
    });

    // Monologue_Book_Alt

    interactiveHandler.create_interactive_position(
        "Book",
        interaction_text,
        new BABYLON.Vector3(0.2131400851686804, 0,3.4698376167382072),
        1,
        function () {
            interactiveHandler.change_interactive_position_function("Window", function () {
                monologue_Window_alt.play();
                game.game_state.update_objectif("Aller voir ce qui se passe dans la résidence du CEO")
            });

            monologue_Book.play();
        });


    // Monologue Terminal

    var sentencesSet_Terminal = new  SentencesSet();
    sentencesSet_Terminal.create_sentence(monologue[2]);
    var monologue_Terminal = arena.create_monologue("Terminal", sentencesSet_Terminal);
    interactiveHandler.create_interactive_position(
        "Terminal_1",
        interaction_text,
        new BABYLON.Vector3(1.317507369123701,0,1.7964861333112592),
        0.5,
        function () {
            monologue_Terminal.play();
    });

    /////update bob
    var update_bob = function () {
        var stairs = game.get_arena_by_name("Stairs");
        var pnj = stairs.get_pnj_by_name("Bob");
        var dialog = new  SentencesSet();
        dialog.create_sentence("Bonjour");
        pnj.set_dialog(dialog);
    };


    /////Monologue reaction
    var sentencesSet_reaction = new  SentencesSet();
    sentencesSet_reaction.create_sentence(" Mais qu'est-ce qu'il raconte ?!");
    sentencesSet_reaction.create_sentence(" J’ai vu de mes propres yeux le CEO assassiné. ");
    sentencesSet_reaction.create_sentence(" En plus ce n’est pas son adjoint ou je ne sais qui qui l’a retrouvé, c’était moi !  ");
    sentencesSet_reaction.create_sentence(" Cette histoire est vraiment louche, les médias sont entrain de camoufler les faits. ");
    sentencesSet_reaction.create_sentence(" La police doit aussi être impliqué. ");
    sentencesSet_reaction.create_sentence(" Je ne peux pas laisser les choses se passer comme ça, \n je dois en savoir plus. \n   ");
    sentencesSet_reaction.create_sentence(" Je devrais commencer par aller visiter la résidence de la victime, \n je dois forcément y trouver des indices. \n   ");
    var monologue_reaction = arena.create_monologue("react",sentencesSet_reaction,function () {
        game.game_state.update_objectif("Trouver un moyen pour entrer \n dans l'appartement de la victime");
        interactiveHandler.change_interactive_position_state(
            "porte000",
            true
        )
    });

    //////////////////RADIO
    const radio_text1 = " [RADIO] : En effet, le soir du 22/02/2077 le CTO de Robot Corp s’est inquiété vis à vis de son supérieur";
    const radio_text2 =    "[RADIO] : qui ne s’est pas présenté aux réunions de la journée et qui ne répondait pas aux appels. \n" ;
    const radio_text3 =    "[RADIO] :Le CTO s'est alors rendu à la résidence du CEO et c’est là qu’il a découvert le jeune chef dans un état de coma. \n" ;
    const radio_text4 =    "[RADIO] :Les pompiers sont très rapidement intervenus pour l'emmener à l'hôpital. Malgré les efforts des médecins pour le réanimer, le CEO est décédé la nuit même. \n";

    const radio_text5 = "[RADIO] : Après les analyses médicales, on apprend aujourd’hui que le CEO s’est suicidé d’une forte dose de substance psychoactive. \n" ;
    const radio_text6 =    "[RADIO] :Le pays est sous le choc dans la mesure où le CEO ne semblait pas souffrir de problèmes mentaux ou de dépendance. \n" ;
    const radio_text7 =    "[RADIO] :Il allait d’ailleurs présenter le nouveau projet de Robot Corp le mois prochain devant le monde entier. \n" ;
    const radio_text8 =    "[RADIO] :Peut être s’est-il écroulé sous le poids des énormes responsabilités vis-à-vis de son poste ? \n" ;
    const radio_text9 =    "[RADIO] :Nos journalistes pourront nous en dire plus dans les jours à venir. \n";

    // Monologue Terminal_2
    var sentencesSet_Terminal_2 = new  SentencesSet();
    sentencesSet_Terminal_2.create_sentence(radio_text1);
    sentencesSet_Terminal_2.create_sentence(radio_text2);
    sentencesSet_Terminal_2.create_sentence(radio_text3);
    sentencesSet_Terminal_2.create_sentence(radio_text4);
    sentencesSet_Terminal_2.create_sentence(radio_text5);
    sentencesSet_Terminal_2.create_sentence(radio_text6);
    sentencesSet_Terminal_2.create_sentence(radio_text7);
    sentencesSet_Terminal_2.create_sentence(radio_text8);
    sentencesSet_Terminal_2.create_sentence(radio_text9);
    var monologue_Terminal_2 = arena.create_monologue("Terminal_2", sentencesSet_Terminal_2,function () {
        interactiveHandler.change_interactive_position_state(
            "Terminal_2",
            false
        );

        monologue_reaction.play()
        update_bob();
        var road = game.get_arena_by_name("Road1");
        road.get_interactiveHandler().change_interactive_position_state(
            "Stairs",
            false
        );
        var stairs = game.get_arena_by_name("Stairs");
        stairs.get_interactiveHandler().change_interactive_position_state(
            "Bureau",
            false
        );

    });
    interactiveHandler.create_interactive_position(
        "Terminal_2",
        interaction_text,
        new BABYLON.Vector3(1.37411, 0, -0.111522),
        0.7,
        function () {
            monologue_Terminal_2.play();
        });
    interactiveHandler.change_interactive_position_state(
        "Terminal_2",
        false);


    // Monologue First_step

    var sentencesSet_Desk = new  SentencesSet();
    sentencesSet_Desk.create_sentence(monologue[4]);
    sentencesSet_Desk.create_sentence(monologue[5]);
    var monologue_Desk = arena.create_monologue("Desk", sentencesSet_Desk,function () {
        game.game_state.update_objectif("Chercher le document dans votre bureau");
    });

    var end_chapter_func = function() {
        arena.player.can_move = true;
        monologue_Desk.play();
        arena.show_objectif(true);
    };

    arena.set_on_scene_first_render(function() {
        arena.player.can_move = false;
        arena.show_objectif(false);
        setTimeout(function() {
            arena.play_chapter(1,"Une situation fantasmagorique", end_chapter_func)
        },3000);
    });

    // Monologue Frame

    var sentencesSet_frame = new  SentencesSet();
    sentencesSet_frame.create_sentence(monologue[0]);
    var monologue_frame = arena.create_monologue("Frame", sentencesSet_frame);


    interactiveHandler.create_interactive_position(
        "Frame",
        interaction_text,
        new BABYLON.Vector3(-5.66096,0,-0.240232),
        1.5,
        function () {
            monologue_frame.play();
            console.log(monologue_frame)

    });


    // Monologue Door_1

    var sentencesSet3 = new  SentencesSet();
    sentencesSet3.create_sentence("Je devrais finir de traiter les dossiers...");
    var monologue3 = arena.create_monologue("Door", sentencesSet3);
    interactiveHandler.create_interactive_position(
        "porte000",
        interaction_text,
        new BABYLON.Vector3(-4.44437,0,-4.08574),
        1,
        function () {
            monologue3.play();
    });


    ////////////Hacking tool
    /*


    var sentencesSet_tool = new  SentencesSet();

    sentencesSet_tool.create_sentence(" Trouvé ! Il est de temps d’en savoir plus…\n");
    var monologue_tool = arena.create_monologue("Frame", sentencesSet_tool,function () {
        var road = game.get_arena_by_name("Road1");
        road.get_interactiveHandler().change_interactive_position_state(
            "Stairs",
            false
        );
        road.get_interactiveHandler().change_interactive_position_state(
            "Stairs",
            false
        );


        var room = game.get_arena_by_name("Room");
        room.get_interactiveHandler().change_interactive_position_state(
            "Terminal_3",
            false
        );
        room.get_interactiveHandler().change_interactive_position_state(
            "Terminal",
            true
        )
    });


    interactiveHandler.create_interactive_position(
        "Tool",
        interaction_text,
        new BABYLON.Vector3(1.317507369123701,0,1.7964861333112592),
        1.5,
        function () {
            monologue_tool.play();
            game.game_state.update_objectif(" Accéder au terminal du CEO");
        });
    interactiveHandler.change_interactive_position_state(
        "Tool",
        false
    );


     */



    /// Monologue exemple 2

    var sentencesSet2 = new  SentencesSet();
    sentencesSet2.create_sentence(" C’est maintenant évident, quelque chose de très grave se prépare. ");
    sentencesSet2.create_sentence("Peut être que tout le pays est en danger,\n je ne peux pas m'arrêter. Je ne vais pas céder à ces menaces. ");
    sentencesSet2.create_sentence("Mais dorénavant je dois être prudent dans mes déplacements \n et faire en sorte que l’on ne me repère pas facilement.",);
    var monologue2 = arena.create_monologue("Paper_reaction", sentencesSet2);




    /// Paper exemple ///
    /*



    var paper_read = function () { // Fonction lancée lorsque le papier est lu (après la touche échap)
        arena.get_interactiveHandler().change_interactive_position_state(
            "paper",
            false
        );

        monologue2.play(); /// On joue le second monologue
    };
    new Paper(arena,"Restez en dehors de ça.\n Vous êtes prévenu.\n", paper_read);

    interactiveHandler.change_interactive_position_state(
        "paper",
        false
    );

     */

    /// Terminal exemple ///
/*

        var on_succeed = function() {
            console.log(" débloque un objet");
        };

        var succeed_msg = "Bravo vous avez gagné";

        var configs = [terminalConfigs[0], terminalConfigs[1]];
        // arena, camera_position, terminal_position, configs, func on suceed, msg on screen
        new TerminalGame(arena,new BABYLON.Vector3(-2.90642,2,-0.9), new BABYLON.Vector3(-2.90642,0,-0.07075), configs, on_succeed, succeed_msg);
     */

    /// VENTILATEUR

    scene.onMeshImportedObservable.add((_, state) => {
        if (_.name === "Ventilateur") {
            var rot = 0;
            scene.registerBeforeRender(function (){
                _.rotation.y += 0.025;
            });
        }
        //else if (_.name === "Lampe") {
        //  var sub = _.material;
        //console.log(_.material)
        //emissiveColor = new BABYLON.Color3(1, 1, 1);
        //}
    });

    /// LIGHTING

    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    light.intensity = 0.025;
    light.diffuse = new BABYLON.Color3(1,1,1);
    
    //var light2 = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(-4.53125, 0.737345, 5.40512), scene);
    //light2.intensity = 0.1;

    ////////////////////////////////////////////////////////

    //////////////////////


    arena.get_automaticHandler().create_automatic_event("chapter2", function() {
        arena.play_chapter(2, "Des informations alambiquées")
    })
    return arena;

};