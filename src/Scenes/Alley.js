var create_alley_scene = function(game){



    var arena = game.arena_builder.build_playable_arena("Alley", new BABYLON.Vector3(1.046885,0,-4.5184 ), new BABYLON.Vector3(-0.046885,4,-12.2184), null, game.musics.CITY);
    var scene = arena.get_scene();
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    light.intensity = 0.05;

    /////////To depot
    arena.get_interactiveHandler().create_interactive_position(
        "depot",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(0.016434,0,5.06527),
        2,
        function() {
            game.change_scene_by_name("Depot", Location.DEPOT_FROM_ALLEY)
        });
    arena.get_interactiveHandler().change_interactive_position_state(
        "depot",
        false
    );


    ///////////to Road1
    arena.get_interactiveHandler().create_interactive_position(
        "Road1",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(-0.046885,0,-7.5184  ),
        2,
        function() {game.change_scene_by_name("Road1", Location.ROAD1_FROM_ALLEY)});




    //////////////////Unlock access to the room
    var unlock_room=function () {
        var crimeRoom = game.get_arena_by_name("CrimeRoom");

        crimeRoom.get_interactiveHandler().change_interactive_position_state(
            "Escalier",
            true
        );
    };

    ////////////////Unlock alley_from_crime
    var unlock_alley = function () {
        var crimeRoom = game.get_arena_by_name("CrimeRoom");

        crimeRoom.get_interactiveHandler().change_interactive_position_state(
            "To_alley",
            true
        );
    };

    //////////////////to Crime scene_side
    var sentencesSet = new  SentencesSet();
    sentencesSet.create_sentence("Ah, cette échelle semble mener à la terrasse de l’appartement !");
    var monologue = arena.create_monologue("001", sentencesSet,function () {
        unlock_room();
        unlock_alley();
        game.change_scene_by_name("CrimeSide", Location.CRIME_SIDE_FROM_ALLEY)
        arena.get_interactiveHandler().change_interactive_position_function(
            "CrimeScene_side",
            function (){game.change_scene_by_name("CrimeSide", Location.CRIME_SIDE_FROM_ALLEY)}
        );
        /*
        var road = game.get_arena_by_name("Road1");
        road.get_interactiveHandler().change_interactive_position_state(
            "Hall_2",
            false
        );

         */
    });


    arena.get_interactiveHandler().create_interactive_position(
        "CrimeScene_side",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(3.26618,0,-2.42935),
        2,
        function() {monologue.play()});


    //////////////////



    return arena;
};