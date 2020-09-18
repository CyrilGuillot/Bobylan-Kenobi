var create_square_scene = function(game){

    var arena = game.arena_builder.build_playable_arena("Square", new BABYLON.Vector3(14.1243,0,-1.65314 ), new BABYLON.Vector3(31.4878,3,4.1319), null, game.musics.CITY);
    var scene = arena.get_scene();

    ///////To Alley
    arena.get_interactiveHandler().create_interactive_position(
        "shop1",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(14.1243,0,-1.65314 ),
        2,
        function() {
        game.change_scene_by_name("Alley2", Location.ALLEY2_FROM_SQUARE)
    });


    ///////////To shop1
    arena.get_interactiveHandler().create_interactive_position(
        "shop1",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(25.548293788120017,0,9.909943882354355 ),
        3,
        function() {
            game.change_scene_by_name("Shop1", Location.SHOP1_FROM_SQUARE)
        });
    arena.get_interactiveHandler().change_interactive_position_state(
        "shop1",
        false
    );


    ///////////To shop2
    arena.get_interactiveHandler().create_interactive_position(
        "shop2",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(25.2932,0,-4.03273 ),
        3,
        function() {
            game.change_scene_by_name("Shop2", Location.SHOP2_FROM_SQUARE)
        });

    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    light.intensity = 0.5;


    return arena;
};