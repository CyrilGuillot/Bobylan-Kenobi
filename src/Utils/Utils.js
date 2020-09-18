function deg_to_rad(deg) {
    return deg * Math.PI / 180;
}

function getDirView(v1,v2){
    return v1.subtract(v2);
}

function mesh_interaction(mesh,other_meshes) {
    for (let i = 0 ; i < other_meshes.length; i++) {
        if (mesh.intersectsMesh(other_meshes[i], false)) {
            //console.log(other_meshes[i].name);
            return true;
        }
    }
    return false;
}

function build_body_mesh(position,scene) {
    var dimx = 0.4;
    var dimy = 1;
    var dimz = 0.4;

    var body_mesh = BABYLON.MeshBuilder.CreateSphere("cylinder", { diameterX: dimx, diameterY: dimy, diameterZ: dimz}, scene);
    var material = new BABYLON.StandardMaterial("myMaterial", scene);
    material.alpha = 0;
    body_mesh.checkCollisions = true;
    body_mesh.material= material;
    body_mesh.position = new BABYLON.Vector3(position.x,1,position.z);
    body_mesh.ellipsoid = new BABYLON.Vector3(dimx, dimy, dimz);
    body_mesh.ellipsoidOffset = new BABYLON.Vector3(0, 0, 0);
    return body_mesh;
}

function get_position_distance(p1,p2) {
    var v = Math.pow(p2.x-p1.x,2) + Math.pow(p2.y-p1.y,2) + Math.pow(p2.z-p1.z,2);
    return Math.sqrt(v);
}

function get_angle_y_between_vec3(v1,v2) {
    return Math.atan2(v2.z - v1.z, v2.x - v1.x);
}

function lookAtObject(character, point, rotspeed){
    var angle =  Math.atan2(point.z - character.position.z, point.x - character.position.x);
    var da = angle - character.rotation.y;
    
    if (da > Math.PI) {
        da -= Math.PI*2;
    } else if (da < -Math.PI) {
        da += Math.PI*2;
    }
    
    //result = (angle - obj.body.rotation) + " : " + da;
    
    if (da < 0){
	character.rotation.y -= rotspeed;
    } else {
	character.rotation.y += rotspeed;
    }

    if (character.rotation.y > Math.PI) {
        character.rotation.y -= Math.PI*2;
    } else if (character.rotation.y < -Math.PI) {
        character.rotation.y += Math.PI*2;
    }
}
