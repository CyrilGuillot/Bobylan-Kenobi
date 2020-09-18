var create_test_scene = function(game){

    var arena = game.arena_builder.build_simple_arena("Test", game.musics.CHILL);
    var scene = arena.get_scene();

    scene.clearColor = new BABYLON.Color3(0, 0, 0);
    var camera =new BABYLON.FreeCamera("FollowCam2", new BABYLON.Vector3(3.90199,4, -6.17327) , scene);

    var body_mesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop : 0.4, diameterBottom : 0.4,  tessellation: 10}, scene);
    var material = new BABYLON.StandardMaterial("myMaterial", scene);
    //material.alpha = 0;
    body_mesh.material= material;
    body_mesh.position = new BABYLON.Vector3(0,1.1,0);
    camera.lockedTarget = body_mesh;



    BABYLON.SceneLoader.LoadAssetContainer( "assets/Maps/Test/", "Test.babylon", scene, function (container) {

        for (let i = 0 ; i < container.meshes.length ; i++) {
            if (container.meshes[i].material) {
                container.meshes[i].material.freeze();
            }
        }

        container.addAllToScene();
    });

    var dir = new BABYLON.Vector3(0.01,0,0.01);
    scene.registerBeforeRender(function () {
        body_mesh.moveWithCollisions(dir);
        body_mesh.position.y = 1.1;
    });


    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    light.intensity = 0.5;

    return arena;
}