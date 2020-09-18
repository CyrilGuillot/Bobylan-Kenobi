window.addEventListener('DOMContentLoaded', function(){
    var canvas = document.getElementById('canvas');

    var engine = new BABYLON.Engine(canvas, true);

    var scene = create_cipher_scene_lvl1();
    engine.runRenderLoop(function(){
        scene.render();
    });

});