var animations = [];
var animation_playing = false;


var anim_piano = new BABYLON.Animation("anim_piano", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
var keyFrames_piano = [];

keyFrames_piano.push({
    frame: 0,
    value: new BABYLON.Vector3(6,3.5,5.5)
});

keyFrames_piano.push({
    frame: 60,
    value:  new BABYLON.Vector3( 0,1,0)
});

keyFrames_piano.push({
    frame: 120,
    value: new BABYLON.Vector3(-5.49308,2,-2.00575)
});

anim_piano.setKeys(keyFrames_piano);


animations.push(anim_piano);

