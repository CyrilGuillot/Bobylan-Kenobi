var create_crime_side_scene = function(game){

    var arena = game.arena_builder.build_playable_arena( "CrimeSide", new BABYLON.Vector3(4.26658,0,6.04432 ), new BABYLON.Vector3(1.56738,2,11.6131), null, game.musics.CITY);
    var scene = arena.get_scene();

    arena.get_interactiveHandler().create_interactive_position("porte2","Appuyez sur E pour interagir",new BABYLON.Vector3(4.26658,0,6.04432), 2, function() {
        game.change_scene_by_name("Alley",Location.ALLEY_FROM_CRIME_SIDE);
    });



    /////////////To crime scene
    arena.get_interactiveHandler().create_interactive_position(
        "CrimeScene",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(-2.58786,0,6.04432),
        2,
        function() {
            game.change_scene_by_name("CrimeRoom", Location.CRIME_ROOM_FROM_CROM_SIDE);
            game.game_state.update_objectif("Chercher des indices dans l’appartement")
        });

    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    light.intensity = 0.05;

    return arena;
}