var create_stairs_scene = function(game){

    var arena = game.arena_builder.build_playable_arena("Stairs", new BABYLON.Vector3(-2.8362,0,-3.29174), new BABYLON.Vector3(1,4,-3), null, game.musics.CHILL);
    var camera = arena.get_camera();
    var player = arena.get_player();
    var scene = arena.get_scene();
    var interactiveHandler = arena.get_interactiveHandler();

    /// CHANGE SCENE EXAMPLE ////

    var func = function() {
        game.change_scene_by_name("Bureau", Location.BUREAU_FROM_STAIRS);
    };

    ////////////TO Office
    arena.get_interactiveHandler().create_interactive_position(
        "Bureau",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(-2.88227,0,-3.67272),
        1,
        func);

    /// CHANGE SCENE EXAMPLE ////

    var func2 = function() {
        game.change_scene_by_name("Road1", Location.ROAD1_FROM_STAIRS);

    };
    /////////TO ROAD
    arena.get_interactiveHandler().create_interactive_position(
        "porte_ext",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(-2.09988,0,3.14559),
        1,
        func2);

    //// PNJ

    var pnj_001 = arena.create_pnj( "Bob", new BABYLON.Vector3(-4.22006,0,2.55319), -0.5,7);


    var dialog_001 = new  SentencesSet();
    dialog_001.create_sentence("Bonsoir monsieur, tout va bien ?");
    dialog_001.create_sentence("Vous m'avez l’air contrarié…");
    dialog_001.create_sentence("Oui ne vous inquiétez pas j’ai juste un petit truc à vérifier à l'extérieur.", "player");
    pnj_001.set_dialog(dialog_001);

    ///






    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    light.intensity = 0.1;
    scene.ambientColor = new BABYLON.Color3(0, 0.19, 0.61);

    return arena;
}