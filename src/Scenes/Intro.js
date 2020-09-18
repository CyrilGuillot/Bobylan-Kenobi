var create_intro_scene =  function(game){

    var arena = game.arena_builder.build_simple_arena("Intro", game.musics.CITY);
    var scene = arena.get_scene();

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, -5), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(game.canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 1;
    scene.clearColor = new BABYLON.Color3(0, 0, 0);
    var plane = BABYLON.MeshBuilder.CreatePlane("plane", {height: 4.3, width: 4.3 * 1.77777, tileSize:1}, scene);

    plane.material = new BABYLON.StandardMaterial("screen", scene);
    plane.material.diffuseTexture = new BABYLON.Texture("assets/images/background.png", scene);

   camera.lockedTarget = plane;

   var music = new BABYLON.Sound("Music", "music/Erakess - Cycloid.mp3", scene, null, {
    loop: false,
    autoplay: false
    });

    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
   

    var rect1 = new BABYLON.GUI.Rectangle();
    rect1.width = 1;
    rect1.height = "200px";
    rect1.thickness = 0;
    rect1.top = 80;
    rect1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    

    var title = new BABYLON.GUI.TextBlock();
    title.text = "Bobylan Kenobi";
    title.fontFamily = 'aerolite';
    title.color = "white";
    title.fontSize = 100;
    title.zindex = 2;


rect1.addControl(title);
advancedTexture.addControl(rect1);


    var button = BABYLON.GUI.Button.CreateImageWithCenterTextButton(
        "but",
        "Commencer",
        "assets/images/interaction.png"
      ); 
    button.thickness = 0;
    button.width = 0.22;
    button.height = 0.06;
    button.color = 'white';
    button.top = -200;
    button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    advancedTexture.addControl(button);    

    //// CINEMATIQUE ?

    var rect2 = new BABYLON.GUI.Rectangle();
    rect2.width = "250px";
    rect2.height = "40px";
    rect2.thickness = 0;

    rect2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    rect2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(rect2);    

    var checktext = new BABYLON.GUI.TextBlock();
    checktext.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    checktext.text = "Jouer la cinématique ?";
    checktext.color = "white";
    checktext.fontSize = 15;  
    rect2.addControl(checktext);   

    var checkbox = new BABYLON.GUI.Checkbox();
    checkbox.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    checkbox.width = "20px";
    checkbox.height = "20px";
    checkbox.left = 100;
    checkbox.isChecked = true;
    checkbox.color = "green";
    rect2.addControl(checkbox);    


    var done = false;
    button.onPointerClickObservable.add(()=>{
        if (!done) {
            done =true;
            start_func();
            setTimeout(function() {
                advancedTexture.dispose();
            }, 1000); 
        }
    });

    var start_func = function() {
        if (checkbox.isChecked) {
            music.play();
            game.change_scene_by_name("Intro");
            setTimeout(function(){
                var videoTexture = new BABYLON.VideoTexture("vid", "assets/Videos/intro.mp4", scene, true);
                plane.material.diffuseTexture = videoTexture;
                videoTexture.video.play();
                setTimeout(function(){
                    music.stop();
                    game.change_scene_by_name("Bureau", Location.BUREAU_START);
                }, 104000);
            }, 2000);
        }
        else {
            game.change_scene_by_name(game.first_arena_to_load);
        }
    }


    return arena;

};