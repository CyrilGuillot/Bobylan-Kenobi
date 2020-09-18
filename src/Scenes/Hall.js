var create_hall_scene = function(game){

    var arena = game.arena_builder.build_playable_arena( "Hall", new BABYLON.Vector3(-6.9452,0,-0.508246 ), new BABYLON.Vector3(-1.78421,4,5.39288), null, game.musics.CITY);
    var scene = arena.get_scene();
    var interactiveHandler = arena.get_interactiveHandler();

    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    light.intensity = 0.5;

    //////////Door to Road
    arena.get_interactiveHandler().create_interactive_position(
        "Road",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(-7.15488,0,-0.511235  ),
        2,
        function() {game.change_scene_by_name("Road1", Location.ROAD1_FROM_HALL)});


    /////////Door to crime scene
    var sentencesSet = new  SentencesSet();
    sentencesSet.create_sentence("Quelque chose cloche ici, d’habitude il y a des gardes dans le hall d’entrée…");
    sentencesSet.create_sentence("L'accès à l'ascenseur est bloqué, je devrais pouvoir le pirater.");
    var monologue = arena.create_monologue("Hall", sentencesSet,function () {
        game.add_arena(create_cipher_scene_lvl1(game));
        game.change_scene_by_name("Cipher1")
        // game.change_scene_by_name("CrimeRoom", Location.CRIME_ROOM_FROM_HALL)
    });


    arena.get_interactiveHandler().create_interactive_position(
        "CrimeScene",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(4.84757,0,-0.511235 ),
        2,
        function() {monologue.play()});





    return arena;
}