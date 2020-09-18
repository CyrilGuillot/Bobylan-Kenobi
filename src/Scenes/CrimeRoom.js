var create_crime_room_scene = function(game){

    var arena = game.arena_builder.build_playable_arena("CrimeRoom", new BABYLON.Vector3(7.43517,0,-3.09553 ), new BABYLON.Vector3(6.68943,3,-6.80719),null,game.musics.CITY);
    var camera = arena.get_camera();
    var player = arena.get_player();
    var scene = arena.get_scene();
    var interactiveHandler = arena.get_interactiveHandler();

    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    light.intensity = 0.15;


    /*
    arena.get_interactiveHandler().create_interactive_position("porte2","Appuyez sur E pour interagir",new BABYLON.Vector3(7.43517,0,-3.09553), 2, function() {game.change_scene(9)});
*/

    /// PNJ Dialog Example ////

    var pnj_000 = arena.create_pnj("Bobby", new BABYLON.Vector3(0.988615,0,-5.73495), -0.5,1, false);
    /*
    var end_dialog1 = function () {
        pnj_000.set_dialog(dialog2);
    };

    var dialog2 = new  SentencesSet();
    dialog2.create_sentence("Maintenant");
    dialog2.create_sentence("Je dis ça");
    */
    var office = game.get_arena_by_name("Bureau");
    var stairs = game.get_arena_by_name("Stairs");
    var road = game.get_arena_by_name("Road1");


    var over = function() {
        office_update();
        road_update();
        game.change_scene_by_name("Bureau", Location.BUREAU_START);
        game.game_state.update_objectif("Ecouter les informations à la radio ");
        var bureau = game.get_arena_by_name("Bureau");
        var automatic_handler = bureau.get_automaticHandler();
        automatic_handler.change_automatic_event_state("chapter2", true);
        var crime = game.get_arena_by_name("CrimeRoom");
        var pnj = crime.get_pnj_by_name("Bobby");
        setTimeout(function() {
            pnj.dispose();
        },2000);
    };


    var dialog1 = new  SentencesSet(over);
    dialog1.create_sentence("Il ne respire plus, je ne peux plus rien faire pour lui.","player");
    dialog1.create_sentence("Je ferai mieux de passer un appel anonyme à la police et de déguerpir.","player");
    pnj_000.set_dialog(dialog1);

    ////////////Modifier le bureau

    var sentencesSet_Terminal = new  SentencesSet();
    sentencesSet_Terminal.create_sentence("Le journal télévisé");
    var bureau = game.get_arena_by_name("Bureau");
    var monologue_Terminal = bureau.get_monologue_by_name("Terminal_2");
    /*
    var monologue_Terminal = bureau.create_monologue("Terminal_2", sentencesSet_Terminal_2,function () {
        game.game_state.update_objectif("Chercher des indices dans l’appartement de la victime");
    });
     */

    var office_update=function () {
        /*
        bureau.get_interactiveHandler().change_interactive_position_function(
            "Terminal",
            function () {

                console.log(monologue_Terminal);
                monologue_Terminal.play();

                road_update();
            });

        */
        bureau.get_interactiveHandler().change_interactive_position_state(
            "Terminal_1",
            false
        );
        
        bureau.get_interactiveHandler().change_interactive_position_state(
            "Terminal_2",
            true
        );
        bureau.get_interactiveHandler().change_interactive_position_state(
            "porte000",
            false
        )
        bureau.get_interactiveHandler().change_interactive_position_state(
            "Window",
            false
        )

    };

    /////////////////Road update

    var sentencesSet_constraint_hall = new  SentencesSet();
    sentencesSet_constraint_hall.create_sentence("Mince je m'en doutais bien. La police a bloqué l'accès au bâtiment ...");
    sentencesSet_constraint_hall.create_sentence("Je dois trouver un autre moyen pour m’infiltrer.");

    var monologue_constraint_hall = arena.create_monologue("Road_to_hall",sentencesSet_constraint_hall,function () {
        game.game_state.update_objectif("Chercher un moyen alternatif pour entrer dans la résidence")
    });



    var road_update = function () {

        var road = game.get_arena_by_name("Road1");
        
        road.get_interactiveHandler().change_interactive_position_function(
            "Ruelle",
            function () {
                game.change_scene_by_name("Alley", Location.ALLEY_FROM_ROAD1)
            });

        road.get_interactiveHandler().change_interactive_position_state(
            "Hall_1",
            false
        );

        /*
        road.get_interactiveHandler().change_interactive_position_state(
            "Hall_2",
            false
        )
    */
    };


    ////////////Frame ineraction

    var sentencesSet_frame = new  SentencesSet();
    sentencesSet_frame.create_sentence("Fascinant...");
    var monologue_frame = arena.create_monologue("Crime_Frame", sentencesSet_frame);


    interactiveHandler.create_interactive_position(
        "Crime_Frame",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(-5.074628247861754,0,-4.777845496938278),
        0.5,
        function() {monologue_frame.play()});


    ////////////Room access


    interactiveHandler.create_interactive_position(
        "Escalier",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(4.685346617172777,0,0.8694179900061192),
        1.5,
        function() {
            game.change_scene_by_name("Room", Location.ROOM_FROM_CRIME_ROOM);



        });

    interactiveHandler.change_interactive_position_state(
        "Escalier",
        false
    );


    /////////////To alley
    interactiveHandler.create_interactive_position(
        "To_alley",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(-5.188037053746878, 0, -1.7685217403101523),
        2,
        function() {game.change_scene_by_name("CrimeSide", Location.CRIME_SIDE_FROM_CRIME_ROOM)});

    interactiveHandler.change_interactive_position_state(
        "To_alley",
        false
    );





    //////////PROVISOIRE



    return arena;
};