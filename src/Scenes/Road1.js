var create_road1_scene = function(game){
    var loaded_func = function () {
        var mat = scene.getMaterialByName("Fenetre_inside");
        mat.emissiveColor = new BABYLON.Color3(0.8, 0.8, 0);
        mat.alpha = 0.8;


        var mat7 = scene.getMaterialByName("Fenetre_inside3");
        mat7.emissiveColor = new BABYLON.Color3(0,0,1);
        mat7.alpha = 0.8;




        var mat3 = scene.getMaterialByName("Neon1");
        mat3.emissiveColor = new BABYLON.Color3(0.55,0,0);
        mat3.alpha = 0.4;

        var mat4 = scene.getMaterialByName("Neon2");
        mat4.emissiveColor = new BABYLON.Color3(0.51,0.96,0.17);
        mat4.alpha = 0.4;

        var mat5 = scene.getMaterialByName("Building_fenetre");
        mat5.emissiveColor = new BABYLON.Color3(0.1,0.1,0.96);
        mat5.alpha = 0.4;



    };

    var arena = game.arena_builder.build_playable_arena("Road1", new BABYLON.Vector3(-3.64448,0,2.12205), new BABYLON.Vector3(14.3122,5.20704,-9.90656), loaded_func,game.musics.CITY);
    var camera = arena.get_camera();
    var player = arena.get_player();
    var scene = arena.get_scene();;

    var gl = new BABYLON.GlowLayer("glow", scene);

    gl.intensity = 0.2;



//////////////////////////////////////////// INTERACTIONS



    var interactiveHandler = arena.get_interactiveHandler();

    /// Monologue ////

    ////Update Monologue

    var sentencesSet_constraint = new  SentencesSet();
    sentencesSet_constraint.create_sentence("Ce n’est pas le moment pour ça.");
    //sentencesSet_constraint.create_sentence("La résidence est juste à l’opposé de mon bureau.");
    var monologue_constraint = arena.create_monologue("constraint", sentencesSet_constraint);

    /////////////Stairs
    interactiveHandler.create_interactive_position(
        "Stairs",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(1.23092,0,3.72711),
        1,
        function (){
 
            game.change_scene_by_name("Stairs", Location.STAIRS_FROM_ROAD1);

        });

    //////////////PARC
    interactiveHandler.create_interactive_position(
        "Parc",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(13.2988,0,2.42248 ),
        3,
        function (){
            monologue_constraint.play()
        });

    /////////////BAVEL
    interactiveHandler.create_interactive_position(
        "Bavel",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(-2.87527,0,4.85785 ),
        2,
        function (){
            monologue_constraint.play()
        });

    /////////////Bavel access
    interactiveHandler.create_interactive_position(
        "Bavel_access",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(-2.87527,0,4.85785 ),
        2,
        function (){
            game.change_scene_by_name("Alley2", Location.ALLEY2_FROM_ROAD1)
        });
    interactiveHandler.change_interactive_position_state(
        "Bavel_access",
        false);


    ////////HALL_1
    interactiveHandler.create_interactive_position(
        "Hall_1",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(-15.8753,0,-8.14215 ),
        2,
        function() {
            game.change_scene_by_name("Hall", Location.HALL_FROM_ROAD1)});

    ////////HALL_2
    /*
    var sentencesSet_constraint_hall = new  SentencesSet();
    sentencesSet_constraint_hall.create_sentence("Mince je m'en doutais bien.La police a bloqué l'accès au bâtiment..");
    sentencesSet_constraint_hall.create_sentence("Je dois trouver un autre moyen pour m’infiltrer.");

    var monologue_constraint_hall = arena.create_monologue("Road_to_hall",sentencesSet_constraint_hall,function () {
        game.game_state.update_objectif("Chercher un moyen alternatif pour entrer dans la résidence");
        interactiveHandler.change_interactive_position_state(
            "Hall_2",
            false
        )
    });

    interactiveHandler.create_interactive_position(
        "Hall_2",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(-15.8753,0,-8.14215 ),
        2,
        function() {
            monologue_constraint_hall.play();
        });
    interactiveHandler.change_interactive_position_state(
        "Hall_2",
        false
    );


*/

    ////////ALLEY
    interactiveHandler.create_interactive_position(
        "Ruelle",
        "Appuyez sur E pour interagir",
        new BABYLON.Vector3(-0.293309,0,-11.3053),
        2,
        function() {monologue_constraint.play()});


    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    light.intensity = 0.05;
    scene.ambientColor = new BABYLON.Color3(0.38, 0.69, 1);
    BABYLON.ParticleHelper.CreateAsync("rain", scene).then((set) => {
        set.start();
    });
    light.diffuse = new BABYLON.Color3(1,1,1);

    return arena;
};


/// CAR SPAWNER ///

//var carSpawner = new CarSpawner("assets/Items/Car/");
//setTimeout(function() {
//   carSpawner.spawn(new BABYLON.Vector3(0,0,0));
//}, 2000);