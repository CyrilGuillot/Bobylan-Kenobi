var create_alley2_scene = function(game){

    var loaded_func = function () {
        var mat = scene.getMaterialByName("Neon1");
        mat.emissiveColor = new BABYLON.Color3(1, 1, 0);
        mat.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
        mat.alpha = 0.4;


        var mat2 = scene.getMaterialByName("Neon2");
        mat2.emissiveColor = new BABYLON.Color3(1, 1, 0);
        mat2.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
        mat2.alpha = 0.4;

    };

    var arena = game.arena_builder.build_playable_arena("Alley2", new BABYLON.Vector3(13.0762,0,-2.99455 ), new BABYLON.Vector3(1.35889,2.5,-8), loaded_func, game.musics.CITY);
    var scene = arena.get_scene();


    //////////////////To road
    arena.get_interactiveHandler().create_interactive_position(
        "road",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(13.0762,0,-2.99455 ),
        3, function() {
            game.change_scene_by_name("Road1",Location.ROAD1_FROM_ALLEY2)
        });

    //////////////////To the bar
    arena.get_interactiveHandler().create_interactive_position(
        "bar",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(1.07625,0,10.0055),
        2,
        function() {
            game.change_scene_by_name("Bar", Location.BAR_FROM_ALLEY)
        });


    var sentencesSet_constraint = new  SentencesSet();
    sentencesSet_constraint.create_sentence("Le bar est juste derrière...");
    var monologue_constraint = arena.create_monologue("constraint", sentencesSet_constraint);

    ////////////////////To the square
    arena.get_interactiveHandler().create_interactive_position(
        "square",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(-12.9238,0,-2.99455),
        3,
        function() {
            monologue_constraint.play();
        });


    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    light.intensity = 0.05;

    return arena;
};