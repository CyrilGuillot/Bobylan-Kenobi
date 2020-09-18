var create_crime_scene = function(game){

    
    var arena = game.arena_builder.build_simple_arena("Crime", game.musics.CHILL);
    var scene = arena.get_scene();

    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(-2.94747, 1.51109, 3.76105), scene);

    camera.fov = 0.5;
    BABYLON.SceneLoader.LoadAssetContainer( "assets/Maps/Crime/", "Crime.babylon", scene, function (container) {
        container.addAllToScene();
        var ascenceur = scene.getMeshByName("Ascenseur");
        var vitre = scene.getMeshByName("Vitre");
        vitre.material = new BABYLON.StandardMaterial("box1M", scene);
        vitre.material.alpha = 0.5;
        vitre.material.diffuseColor = new BABYLON.Color3(0.5, 0.6, 0.87);
        camera.lockedTarget = ascenceur;
    });


    var position = new BABYLON.Vector3(18.0082,0,-4.83449);
    var character = new BABYLON.TransformNode("character_root"); // Node auquel sont rattachés toutes les meshs du personnage, sa position est donc la position du personnage
    BABYLON.SceneLoader.ImportMesh("", "assets/PNJ/", "PNJ.babylon", scene, function (newMeshes, particleSystems, skeletons) {
        var skeleton = skeletons[0];
        skeleton.position = position;

        for (let i = 0; i < newMeshes.length; i++) {
            let mesh = newMeshes[i];
            mesh.checkCollisions = true;
            mesh.parent = character;
        }

        character.scaling = new BABYLON.Vector3(0.004, 0.004, 0.004);
        character.position = position;

        var idleRange = skeleton.getAnimationRange("anim_a2");

        skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
        skeleton.animationPropertiesOverride.enableBlending = true;
        skeleton.animationPropertiesOverride.blendingSpeed = 0.05;
        skeleton.animationPropertiesOverride.loopMode = 1;

        if (idleRange) scene.beginAnimation(skeleton, idleRange.from, idleRange.to, true, 1.0);


        var crime_func = function () {
            game.change_scene_by_name("Crime");
            setTimeout(function(){
                var deadRange = skeleton.getAnimationRange("anim_a1");
                if (deadRange) scene.beginAnimation(skeleton, deadRange.from, deadRange.to, false, 1.0);
                setTimeout(function(){
                    game.change_scene_by_name("Bureau");
                }, 6000);
            }, 5000);

        };
        game.set_crime_func(crime_func);

    });

    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    light.intensity = 0.05;

    var light8 = new BABYLON.PointLight("table1", new BABYLON.Vector3(15.68,3.10681  ,2.49242), scene);
    light8.intensity = 0.8;
    var light9 = new BABYLON.PointLight("canape", new BABYLON.Vector3(15.1834,5.41749  ,-3.69188), scene);
    light9.intensity = 0.5;
    var light9 = new BABYLON.PointLight("ascenseur", new BABYLON.Vector3(24.356,5.41749  , -3.18406), scene);
    light9.intensity = 0.2;


    return arena;
}