var create_bar_scene =  function(game){

    var arena = game.arena_builder.build_playable_arena("Bar", new BABYLON.Vector3(-3,0,-3 ), new BABYLON.Vector3(4.29134,3,5.07914), null, game.musics.CHILL);
    var scene = arena.get_scene();

    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    light.intensity = 0.5;

    var interactiveHandler = arena.get_interactiveHandler();
    /////////Puzzle
    arena.get_interactiveHandler().create_interactive_position(
        "puzzle",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(1.7,0,-1.1 ),
        2,
        function() {
            game.add_arena(create_puzzle_scene_5_V2(game));
            game.change_scene_by_name("Puzzle5")
        });
    arena.get_interactiveHandler().change_interactive_position_state("puzzle", false);

    /////////Puzzle_V2
    arena.get_interactiveHandler().create_interactive_position(
        "puzzle_V2",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(1.7,0,-1.1 ),
        2,
        function() {
            game.add_arena(create_puzzle_scene_8_V1(game));
            game.change_scene_by_name("Puzzle8")
        });
    arena.get_interactiveHandler().change_interactive_position_state("puzzle_V2", false);



    /////////Leave_bar
    arena.get_interactiveHandler().create_interactive_position(
        "porte2",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(-3,0,-3 ),
        2,
        function() {
            game.change_scene_by_name("Alley2", Location.ALLEY2_FROM_BAR)
        });

    /////////Barman
    var barman = arena.create_pnj(
        "Barman",
        new BABYLON.Vector3(-3.2112368902373314,0,3),
        -0.5,
        2, true,true); //// TRUE SI ON VEUT QU IL POSSEDE UNE INTERACTIVE POSITON CUSTOM D'office
    arena.get_interactiveHandler().create_interactive_position(
        "Barman",
        "Appuyez sur E pour parler",
        new BABYLON.Vector3(-2.20807,0, 0.829302),
        1,
        function(){
            barman.speak_func();
        }
        );





    ////////////Pnj 1
    var pnj_002 = arena.create_pnj(
        "pnj_002",
        new BABYLON.Vector3(-5.304993653382819,0,3.3682709192276006),
        -1.5,
        2,
        true,
        true
    );
    arena.get_interactiveHandler().create_interactive_position(
        "pnj_002",
        "Appuyez sur E pour parler",
        new BABYLON.Vector3(-5.304993653382819,0,3.3682709192276006),
        1,
        function(){
            pnj_002.speak_func();
        }
    );
    arena.get_interactiveHandler().change_interactive_position_state(
        "pnj_002",
        false
    );



    /////////Dianlgue pnj_init
    var dialog_pnj_init = new SentencesSet();
    dialog_pnj_init.create_sentence("[Ivre] ....");
    pnj_002.set_dialog(dialog_pnj_init);


    ////////////Automatic


    ///////Dialogue pnj
    var end_func = function () {
        arena.get_interactiveHandler().change_interactive_position_state(
            "Barman",
            false);
        arena.get_interactiveHandler().change_interactive_position_state(
            "puzzle",
            true);

    };

    //////////Dialogue barman
    var dialog_barman = new SentencesSet(end_func);
    dialog_barman.create_sentence("Bonsoir, qu’est ce je vous sers ?","Barman");
    dialog_barman.create_sentence("Je suis à la recherche d’une certaine personne du nom de Arthur Morgan","player");
    dialog_barman.create_sentence("le connaissez-vous ?","player");
    dialog_barman.create_sentence("Oui il vient ici assez souvent...","Barman");
    dialog_barman.create_sentence("mais ça fait deux ou trois jour qu’on ne le voit plus trop…","Barman");
    dialog_barman.create_sentence("Savez-vous où est-ce que je peux le trouver ?","player");
    dialog_barman.create_sentence("Aucune idée.","Barman");

    dialog_barman.create_sentence("Hé l’ami je sais où se trouve votre gars…","pnj_002");
    dialog_barman.create_sentence("Ah oui ? Intéressant...","player");
    dialog_barman.create_sentence("Mais voyez-vous je m’ennuie trop dans cette maudite ville...","pnj_002");
    dialog_barman.create_sentence("Je vous propose un jeu. Si vous gagnez, vous aurez votre information.","pnj_002");
    dialog_barman.create_sentence("Sinon, vous me payez un verre.","pnj_002");
    dialog_barman.create_sentence("Je n'ai pas trop le choix alors...","player");
    dialog_barman.create_sentence("Haha! Prenez un siège près de la table là-bas !","pnj_002");

    barman.set_dialog(dialog_barman);

    //////////Dialogue barman 2














    ///////////////////
    
    //////////////////////////

    return arena;
};