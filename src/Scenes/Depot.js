var create_depot_scene = function(game){

    var arena = game.arena_builder.build_playable_arena( "Depot", new BABYLON.Vector3(0.421616,0,13.928), new BABYLON.Vector3(7.77384 ,4,6.82716), null, game.musics.CITY);
    var scene = arena.get_scene();
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    light.intensity = 0.5;


    /*
    arena.get_interactiveHandler().create_interactive_position("porte2","Appuyez sur E pour interagir",new BABYLON.Vector3(0.421616,0,13.928 ), 2, function() {game.change_scene(13)});

     */
    var pnj_A = arena.create_pnj(
        "pnj_A",
        new BABYLON.Vector3(0.803197,0,-0.065247),
        3,
        2,
        true,
        true
    );
    var pnj_B = arena.create_pnj(
        "pnj_B",
        new BABYLON.Vector3(-1.03818,0,-0.045455),
            3.5,
        2,
        true,
        true
    );
    var pnj_C = arena.create_pnj(
        "pnj_C",
        new BABYLON.Vector3(-0.108059,0,2.5742),
        0,
        2,
        true,
        true
    );

    var final_func = function() {
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI_END");
        
        var image = new BABYLON.GUI.Image("imgX", "assets/images/end.png");
        advancedTexture.addControl(image)
    };

    ///////func
    var end_func = function () {
        game.change_scene_by_name("Depot");
        pnj_B.change_animation(1,false,1);
        pnj_A.change_animation(1,false,1);
        var dialog = new SentencesSet(final_func);
        dialog.create_sentence("On y est...ce qu’on cherche se cache derrière cette porte...","pnj_C");
        dialog.create_sentence("Il est temps de découvrir la vérité","player");
        pnj_C.set_dialog(dialog);
    };

    ////////dialog
    var dialog = new SentencesSet(end_func);
    dialog.create_sentence("L’accès à ce dépôt est strictement interdit au public. ","pnj_A");
    dialog.create_sentence("Veuillez quitter cet endroit ","pnj_B");
    dialog.create_sentence("Dégagez de là  si vous voulez survivre !","pnj_C");
    dialog.create_sentence("Hé le détective j’espère que vous savez vous servir de vos poings. ","pnj_C");

    var dialogA = new SentencesSet();
    dialog.create_sentence("Déguerpissez ! ","pnj_A");
    pnj_A.set_dialog(dialogA);

    var dialogB = new SentencesSet();
    dialog.create_sentence("Sortez d'ici ! ","pnj_B");
    pnj_B.set_dialog(dialogB);

    pnj_C.set_dialog(dialog);




    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    light.intensity = 0.5;

    return arena;
};