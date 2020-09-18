var create_parc_scene = function(game){

    var arena = game.arena_builder.build_playable_arena( "Parc", new BABYLON.Vector3(-3.01598,0,-3.38688), new BABYLON.Vector3(0,4,-11.5605), null, game.musics.CITY);
    var camera = arena.get_camera();
    var player = arena.get_player();
    var scene = arena.get_scene();
    var interactiveHandler = arena.get_interactiveHandler();


    /// CHANGE SCENE EXAMPLE ////

    var func = function() {
        game.change_scene_by_name("Road1", Location.ROAD1_FROM_PARC);
    };

    arena.get_interactiveHandler().create_interactive_position("porte2","Appuyez sur E pour interagir",new BABYLON.Vector3(-3.01598,0,-3.38688), 1, func);

    


    var smat = new BABYLON.StandardMaterial("smat", scene);

    var texture = new BABYLON.Texture('https://raw.githubusercontent.com/Wingnutt/misc/master/flare01.png', scene);

    smat.diffuseTexture = texture;
    smat.specularTexture = texture;
    smat.ambientTexture = texture;
    smat.emissiveTexture = texture;
    smat.opacityTexture = texture;
    smat.reflectionTexture = texture;

    smat.backFaceCulling = false;

    smat.diffuseTexture.hasAlpha = true;
    smat.specularTexture.hasAlpha = true;
    smat.ambientTexture.hasAlpha = true;
    smat.emissiveTexture.hasAlpha = true;
    smat.opacityTexture.hasAlpha = true;
    smat.reflectionTexture.hasAlpha = true;

    smat.needAlphaBlending(true);
    smat.needAlphaTesting(true);
    smat.alpha = 0.6;


    var materialLamp = new BABYLON.StandardMaterial("sphere", scene);
    materialLamp.emissiveColor = new BABYLON.Color3(1.0, 1.0, 0.7);

    var hl = new BABYLON.HighlightLayer("hg", scene);
    hl.innerGlow = false;

    var gl = new BABYLON.GlowLayer("glow", scene);
    gl.intensity = 0.5;




    var lamp1 = BABYLON.Mesh.CreateSphere('lamp1', 60, 0.5, scene);
    lamp1.position = new BABYLON.Vector3(-13.4,5.4,10);
    lamp1.material = materialLamp;
    hl.addMesh(lamp1, new BABYLON.Color3(.9, .9, .9));



    var ground1 = BABYLON.Mesh.CreateGround("pole1", 5, 5, 1, scene);
    ground1.position = new BABYLON.Vector3(-13.4,0,10);
    ground1.visibility = .5;
    ground1.material = smat;



    var lamp2 = BABYLON.Mesh.CreateSphere('lamp2', 60, 0.5, scene);
    lamp2.position = new BABYLON.Vector3(-13.5,5.4,-0.37);
    lamp2.material = materialLamp;
    hl.addMesh(lamp2, new BABYLON.Color3(.9, .9, .9));



    var ground2 = BABYLON.Mesh.CreateGround("pole2", 5, 5, 1, scene);
    ground2.position = new BABYLON.Vector3(-13,0,-0.37);
    ground2.visibility = .5;
    ground2.material = smat;


    var lamp3 = BABYLON.Mesh.CreateSphere('lamp2', 45, 0.5, scene);
    lamp3.position = new BABYLON.Vector3(-13.4,5.4,-11.305);
    lamp3.material = materialLamp;
    hl.addMesh(lamp3, new BABYLON.Color3(.9, .9, .9));



    var ground3 = BABYLON.Mesh.CreateGround("pole2", 5, 5, 1, scene);
    ground3.position = new BABYLON.Vector3(-13,0,-11);
    ground3.visibility = .5;
    ground3.material = smat;


    var ground4 = BABYLON.Mesh.CreateGround("pole2", 5, 5, 1, scene);
    ground4.position = new BABYLON.Vector3(-7,0,-11);
    ground4.visibility = .5;
    ground4.material = smat;



    var lamp5 = BABYLON.Mesh.CreateSphere('lamp1', 60, 0.5, scene);
    lamp5.position = new BABYLON.Vector3(-5,5.4,10.8);
    lamp5.material = materialLamp;
    hl.addMesh(lamp5, new BABYLON.Color3(.9, .9, .9));



    var ground5 = BABYLON.Mesh.CreateGround("pole1", 5, 5, 1, scene);
    ground5.position = new BABYLON.Vector3(-5.5,0,10);
    ground5.visibility = .5;
    ground5.material = smat;




    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    light.intensity = 0.08;




    var materialSphere = new BABYLON.StandardMaterial("sphere1", scene);
    materialSphere.emissiveColor = new BABYLON.Color3(0.92, 0.92, 0.27);

    var box = BABYLON.MeshBuilder.CreateBox("Objet",{});
    box.setPositionWithLocalVector(new BABYLON.Vector3(-41,5.3,-0.1));
    box.scaling = new BABYLON.Vector3(0.2, 0.5, 0.5);
    box.material = materialSphere;
    hl.addMesh(box, new BABYLON.Color3(0.92, 0.92, 0.27));


    var box2 = BABYLON.MeshBuilder.CreateBox("Objet",{});
    box2.setPositionWithLocalVector(new BABYLON.Vector3(-41,5.3,1.2));
    box2.scaling = new BABYLON.Vector3(0.2, 0.5, 0.5);
    box2.material = materialSphere;
    hl.addMesh(box2, new BABYLON.Color3(0.92, 0.92, 0.27));


    var box3 = BABYLON.MeshBuilder.CreateBox("Objet",{});
    box3.setPositionWithLocalVector(new BABYLON.Vector3(-32,3,25));
    box3.scaling = new BABYLON.Vector3(0.2, 0.5, 0.5);
    box3.material = materialSphere;
    hl.addMesh(box3, new BABYLON.Color3(0.92, 0.92, 0.27));

    var box4 = BABYLON.MeshBuilder.CreateBox("Objet",{});
    box4.setPositionWithLocalVector(new BABYLON.Vector3(-32,-0.6,24));
    box4.scaling = new BABYLON.Vector3(0.2, 0.6, 1.2);
    box4.material = materialSphere;
    hl.addMesh(box4, new BABYLON.Color3(0.92, 0.92, 0.27));


    var box5 = BABYLON.MeshBuilder.CreateBox("Objet",{});
    box5.setPositionWithLocalVector(new BABYLON.Vector3(4.3,2.1,18));
    box5.scaling = new BABYLON.Vector3(1.2, 1, 0.2);
    box5.material = materialSphere;
    hl.addMesh(box5, new BABYLON.Color3(0.92, 0.92, 0.27));


    var box6 = BABYLON.MeshBuilder.CreateBox("Objet",{});
    box6.setPositionWithLocalVector(new BABYLON.Vector3(-32,-0.6,19));
    box6.scaling = new BABYLON.Vector3(0.2, 0.6, 1.2);
    box6.material = materialSphere;
    hl.addMesh(box6, new BABYLON.Color3(0.92, 0.92, 0.27));

    var box7 = BABYLON.MeshBuilder.CreateBox("Objet",{});
    box7.setPositionWithLocalVector(new BABYLON.Vector3(-32,3,18));
    box7.scaling = new BABYLON.Vector3(0.2, 1, 0.5);
    box7.material = materialSphere;
    hl.addMesh(box7, new BABYLON.Color3(0.92, 0.92, 0.27));


    var box8 = BABYLON.MeshBuilder.CreateBox("Objet",{});
    box8.setPositionWithLocalVector(new BABYLON.Vector3(-32,8,22));
    box8.scaling = new BABYLON.Vector3(0.2, 0.6, 1.2);
    box8.material = materialSphere;
    hl.addMesh(box8, new BABYLON.Color3(0.92, 0.92, 0.27));




    /*

    var planeWidth = 20;
    var planeHeight = 2.6;

    //Create plane
    var materialPlane = new BABYLON.StandardMaterial("sphere1", scene);
    materialPlane.emissiveColor = new BABYLON.Color3(0.88, 0.06, 0.61);

    var plane = BABYLON.MeshBuilder.CreatePlane("plane", {width:15, height:2}, scene);
    plane.setPositionWithLocalVector(new BABYLON.Vector3(-5,7.7,10));



    //Set width and height for dynamic texture using same multiplier
    var DTWidth = planeWidth * 60;
    var DTHeight = planeHeight * 60;

    //Set font type
    var font_type = "Apple Chancery";

    //Set text
    var text = "Powered by C.G.I";

    //Create dynamic texture
    var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", {width:DTWidth, height:DTHeight}, scene);

    //Check width of text for given font type at any size of font
    var ctx = dynamicTexture.getContext();
    var size = 12; //any value will work
    ctx.font = size + "px " + font_type;
    var textWidth = ctx.measureText(text).width;

    //Calculate ratio of text width to size of font used
    var ratio = textWidth/size;

    //set font to be actually used to write text on dynamic texture
    var font_size = Math.floor(DTWidth / (ratio * 1)); //size of multiplier (1) can be adjusted, increase for smaller text
    var font = font_size + "px Apple Chancery " + font_type;

    //Draw text
    dynamicTexture.drawText(text, null, null, font, "#4B3ECF", "#ffffff", true);


    plane.material = materialPlane;
    hl.addMesh(plane, new BABYLON.Color3(0.02, 0.19, 0.94));
    materialPlane.diffuseTexture = dynamicTexture;

    */
    var materialTube = new BABYLON.StandardMaterial("sphere1", scene);
    materialTube.emissiveColor = new BABYLON.Color3(180, 0, 200);



    var myPath = [
        new BABYLON.Vector3(8,5.5,0.3),
        new BABYLON.Vector3(-8, 5.5, 0.2)
    ];

    var tube = BABYLON.MeshBuilder.CreateTube("tube", {path: myPath, radius: 0.08}, scene);
    tube.material = materialTube;
    hl.addMesh(tube, new BABYLON.Color3(0.92, 0.92, 0.27));


    var myPath2 = [
        new BABYLON.Vector3(-8, 5.5, 0.2),
        new BABYLON.Vector3(-10.6, 5.5, 1)
    ];

    var tube2 = BABYLON.MeshBuilder.CreateTube("tube", {path: myPath2, radius: 0.08}, scene);
    tube2.material = materialTube;
    hl.addMesh(tube2, new BABYLON.Color3(0.92, 0.92, 0.27));


    var myPath3 = [
        new BABYLON.Vector3(-10.6, 5.5, 1),
        new BABYLON.Vector3(-12, 5.2, 2)
    ];

    var tube3 = BABYLON.MeshBuilder.CreateTube("tube", {path: myPath3, radius: 0.08}, scene);
    tube3.material = materialTube;
    hl.addMesh(tube3, new BABYLON.Color3(0.92, 0.92, 0.27));



    var myPath4 = [
        new BABYLON.Vector3(8,6.7,0.3),
        new BABYLON.Vector3(-8.2, 6.65, 0.2)
    ];

    var tube4 = BABYLON.MeshBuilder.CreateTube("tube", {path: myPath4, radius: 0.08}, scene);
    tube4.material = materialTube;
    hl.addMesh(tube4, new BABYLON.Color3(0.92, 0.92, 0.27));


    var myPath5 = [
        new BABYLON.Vector3(-8.2, 6.65, 0.2),
        new BABYLON.Vector3(-10.6,6.57, 1)
    ];

    var tube5 = BABYLON.MeshBuilder.CreateTube("tube", {path: myPath5, radius: 0.08}, scene);
    tube5.material = materialTube;
    hl.addMesh(tube5, new BABYLON.Color3(0.92, 0.92, 0.27));


    var myPath6 = [
        new BABYLON.Vector3(-10.6,6.57, 1),
        new BABYLON.Vector3(-12, 6.4, 2)
    ];

    var tube6 = BABYLON.MeshBuilder.CreateTube("tube", {path: myPath6, radius: 0.08}, scene);
    tube6.material = materialTube;
    hl.addMesh(tube6, new BABYLON.Color3(0.92, 0.92, 0.27));

///////AU DD

    var makeBeerText = function(text, board, neoncolor){
        const plane = BABYLON.Mesh.CreatePlane('', 25, scene);
        plane.material = new BABYLON.StandardMaterial('', scene);


        const texture = new BABYLON.DynamicTexture('', 812, scene, true);


        const context = texture.getContext();
        const fontSize = 75
        const lineHeight = fontSize * 1.286;
        const ad = text
        context.fillStyle = 'white';
        context.font = ""+fontSize+"px Monaco";
        const textWidth = context.measureText(' Powered by CGI').width;
        var BeerCanvas = {
            width: context.measureText(ad).width,
            height: fontSize
        }


        if(board){
            context.lineWidth = 15;
            roundRect(context, 0, 0, textWidth, lineHeight, {
                tl: 50,
                br: 25
            }, false);
        }else{
            context.fillText(ad, 0, BeerCanvas.height);
        }
        texture.update();

        plane.material.opacityTexture = texture;
        plane.material.diffuseColor = neoncolor;
        plane.position.z = 9;
        plane.position.x = -2;
        plane.position.y = -3.3;
        return plane;
    }
    var beertext = new makeBeerText('POWERED BY CGI', false, new BABYLON.Color3(245, 0, 0))
    scene.registerBeforeRender(()=>{
        var flash = Math.random()*(10 - 1) + 1 ;
        if (flash > 8){
        beertext.material.diffuseColor.r = (Math.random()*(1+.5))-.5
        }
    });

    /*

    var beertext_Board = new makeBeerText('Powered by CGI', true, new BABYLON.Color3(1, 0, 0))

    scene.registerBeforeRender(()=>{

    beertext_Board.material.diffuseColor.r = (Math.random()*(1+.5))-.5
    })

     */


function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
        var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }

}
    //////////////////////PNJ
    var pnj = arena.create_pnj(
        "pnj_002",
        new BABYLON.Vector3(-6,0,10),
        -1.5,
        2,
        false,
        false
    );


    //////////////unlock square
    var unlock_square = function () {
        var alley = game.get_arena_by_name("Alley2");
        alley.get_interactiveHandler().change_interactive_position_function(
            "square",
            function () {
                game.change_scene_by_name("Square", Location.SQUARE_FROM_ALLEY2);
            }
        );
        //////////////unlock bavel TEMPORAAAIIIRE
        /*


        var road = game.get_arena_by_name("Road1");

        road.get_interactiveHandler().change_interactive_position_state(
            "Bavel_access",
            true
        );
        road.get_interactiveHandler().change_interactive_position_state(
            "Bavel",
            false
        )

         */
    };

    ///////////////Update Quest
    var updateQuest = function () {
        game.game_state.update_objectif("Se rendre à la place centrale \n et chercher la transaction LVP");
        unlock_square();
        var dialog_pnj = new SentencesSet();
        dialog_pnj.create_sentence("Il faut agir vite détective...");
        pnj.set_dialog(dialog_pnj);
    };

    ///////////////end dialogue 1
    var end_dialog_1 = function () {
        var dialog_pnj = new SentencesSet(updateQuest);
        dialog_pnj.create_sentence("Je dois avouer que si vous êtes de Robot Corp je serai déjà mort...");
        dialog_pnj.create_sentence(" mais sachez que je ne vous fais pas entièrement confiance...");
        dialog_pnj.create_sentence("Je comprends votre réaction.","player");
        dialog_pnj.create_sentence("En attendant, vous semblez dans une impasse \n vous devez m’expliquer ce qui se passe réellement si vous voulez vous en sortir…\n","player");
        dialog_pnj.create_sentence("Le temps nous est compté donc je vais faire très court.");
        dialog_pnj.create_sentence("Robot Corp a toujours menti à propos de l’extinction des humains...");
        dialog_pnj.create_sentence("Ils sont toujours là, \n mais servent de cobayes pour les recherches de Robot Corp.");
        dialog_pnj.create_sentence("Ces monstres cherchent le moyen de récupérer un cerveau humain fonctionnel en se débarassant du corps.");
        dialog_pnj.create_sentence("Ils cherchent à exploiter l'intelligence biologique pour faire évoluer l’intelligence artificielle.");
        dialog_pnj.create_sentence("En ce moment même, un convoi d’humains est en transit dans cette ville.");
        dialog_pnj.create_sentence("Ils sont dans un lieu caché, à l’abri de tout les regards en attendant \n qu'une équipe de Robot Corp passe demain pour les amener dans leurs labos à l'est du pays.\n");
        dialog_pnj.create_sentence(" Je vois, il nous faut trouver ce lieu au plus vite dans ce cas. ","player");
        dialog_pnj.create_sentence(" Absolument, nous devons localiser cet endroit avant qu’il ne soit trop tard…");
        dialog_pnj.create_sentence(" Ecoutez, d’après mes recherches 3 magasins ont reçu une cargaison cette semaine. ");
        dialog_pnj.create_sentence(" La cargaison que l’on cherche porte le nom de LPV. ");
        dialog_pnj.create_sentence(" Il faut accéder à leur terminal pour savoir lequel de ces magasins sert de camouflage à Robot Corp.");
        dialog_pnj.create_sentence("  Qu’attendons-nous alors ? Allons rendre visite à ces magasins. ","player");
        dialog_pnj.create_sentence("  Ce n’est pas si simple");
        dialog_pnj.create_sentence("  Robot Corp me traque depuis un moment et je ne peux pas me rapprocher de la place centrale.");
        dialog_pnj.create_sentence("  Autre problème, les terminaux seront verrouillés et va falloir les pirater.");
        dialog_pnj.create_sentence("  Ça tombe bien, c'est une de mes spécialités.","player");
        dialog_pnj.create_sentence("  Mais en parlant de traque j’ai reçu moi aussi un message inquiétant...","player");
        dialog_pnj.create_sentence("  Ils t’ont dans leur radar alors mais il semblerait qu’ils n’ont pas encore décidé d’intervenir dans ton cas.");
        dialog_pnj.create_sentence("  Tu dois faire vite avant qu’ils ne changent d’avis. ");
        dialog_pnj.create_sentence("  Préviens moi si tu trouves quelque chose, voici mon numéro.");
        pnj.set_dialog(dialog_pnj);
        game.change_scene_by_name("Parc");
        game.game_state.update_objectif("Parler à Arthur");
    };

    /////////////////Dialogue
    var dialogue_pnj = new SentencesSet(end_dialog_1);
    dialogue_pnj.create_sentence("Arthur Morgan ?","player");
    dialogue_pnj.create_sentence("Qui êtes-vous ?!");
    dialogue_pnj.create_sentence("Je sais ce que vous avez fait bande de chiens...");
    dialogue_pnj.create_sentence("J’ai tout recueilli et j’ai tout enregistré même si vous me neutralisez \n la vérité éclatera tôt ou tard…\n");
    dialogue_pnj.create_sentence(" Calmez-vous je ne suis pas de Robot Corp","player");
    dialogue_pnj.create_sentence("[ Vous racontez votre histoire à Arthur Morgan et vous lui expliquez comment vous connaissez son identité.]","player");

    pnj.set_dialog(dialogue_pnj);


    return arena;
};