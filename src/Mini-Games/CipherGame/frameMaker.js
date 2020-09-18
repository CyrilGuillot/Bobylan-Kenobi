var frameMaker = function(name, options, scene) {

    var path = options.path;
    var profile = options.profile;

    var originX = Number.MAX_VALUE;

    for(var m = 0; m < profile.length; m++) {
        originX = Math.min(originX, profile[m].x);
    }

    var innerData = [];
    var outerData = [];
    var angle = 0;
    var extrusion = 0;
    var width = 0;
    var cornerProfile = [];

    var nbPoints = path.length;
    var line = BABYLON.Vector3.Zero();
    var nextLine = BABYLON.Vector3.Zero();
    path[1].subtractToRef(path[0], line);
    path[2].subtractToRef(path[1], nextLine);

    for(var p = 0; p < nbPoints; p++) {
        angle = Math.PI - Math.acos(BABYLON.Vector3.Dot(line, nextLine)/(line.length() * nextLine.length()));
        direction = BABYLON.Vector3.Cross(line, nextLine).normalize().z;
        lineNormal = new BABYLON.Vector3(line.y, -1 * line.x, 0).normalize();
        line.normalize();
        extrusionLength = line.length();
        cornerProfile[(p + 1) % nbPoints] = [];
        //local profile
        for(m = 0; m < profile.length; m++) {
            width = profile[m].x - originX;
            cornerProfile[(p + 1) % nbPoints].push(path[(p + 1) % nbPoints].subtract(lineNormal.scale(width)).subtract(line.scale(direction * width/Math.tan(angle/2))));
        }

        line = nextLine.clone();
        path[(p + 3) % nbPoints].subtractToRef(path[(p + 2) % nbPoints], nextLine);
    }

    var frame = [];
    var extrusionPaths = []

    for(var p = 0; p < nbPoints; p++) {
        extrusionPaths = [];
        for(var m = 0; m < profile.length; m++) {
            extrusionPaths[m] = [];
            extrusionPaths[m].push(new BABYLON.Vector3(cornerProfile[p][m].x, cornerProfile[p][m].y, profile[m].y));
            extrusionPaths[m].push(new BABYLON.Vector3(cornerProfile[(p + 1) % nbPoints][m].x, cornerProfile[(p + 1) % nbPoints][m].y, profile[m].y));
        }

        frame[p] = BABYLON.MeshBuilder.CreateRibbon("frameLeft", {pathArray: extrusionPaths, sideOrientation: BABYLON.Mesh.DOUBLESIDE, updatable: true, closeArray: true}, scene);
    }

    return BABYLON.Mesh.MergeMeshes(frame, true).convertToFlatShadedMesh();
}

var hall_cipher_frame = function (scene) {
    path  = [
        new BABYLON.Vector3(-3.7, -5, 0),
        new BABYLON.Vector3(4, -5, 0),
        new BABYLON.Vector3(4, 5, 0),
        new BABYLON.Vector3(-3.7, 5, 0)
    ];


    //profile in XoY plane, the left most point(s) will form the outer edge of the frame along the given path.
    var profilePoints = [
        new BABYLON.Vector3(-0.25, 0.5, 0),
        new BABYLON.Vector3(-0.25, -0.5, 0),
        new BABYLON.Vector3(0.25, -0.5, 0),
        new BABYLON.Vector3(0.2, 0.3, 0),
        new BABYLON.Vector3(0.15, 0.3, 0),
        new BABYLON.Vector3(0.15, 0.5, 0)
    ];


    var frameMesh = frameMaker("hall_cipher_frame", {path: path, profile:profilePoints}, scene);
    var frame_material = new BABYLON.StandardMaterial("frame_material", scene);
    frame_material.diffuseColor = new BABYLON.Color3(0.204, 0.286, 0.369);
    frame_material.specularColor = new BABYLON.Color3(0.204, 0.286, 0.369);
    frame_material.diffuseTexture = new BABYLON.Texture("assets/textures/metal-texture.jpg", scene);
    // frame_material.emissiveColor = new BABYLON.Color3(0.5, 1, 1);
    // frame_material.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
    frameMesh.material = frame_material;

    frameMesh.rotation.x = -Math.PI/2;

    return frameMesh;
}

var hall_cipher_inner_frame = function (scene) {
    var innerFrame = BABYLON.MeshBuilder.CreateBox("innerFrame", {height: 0.2, width: 7, depth: 10}, scene);
    innerFrame.setPositionWithLocalVector(new BABYLON.Vector3(0, 0, 0));

    var inner_frame_material = new BABYLON.StandardMaterial("inner_frame_material", scene);
    inner_frame_material.diffuseColor = new BABYLON.Color3(0.09, 0.125, 0.165);
    inner_frame_material.ambientTexture = new BABYLON.Texture("assets/textures/screen-texture.jpg", scene);
    innerFrame.material = inner_frame_material;

    return innerFrame;
}