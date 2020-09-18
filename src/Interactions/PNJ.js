const PNJ_State = {
    SPEAKING: 'speaking',
    NOT_SPEAKING: 'not_speaking'
};

class PNJ {

    constructor(arena, name, position, rotation_ratio, anim_id, loop, custom_interactive_position) {
        this.arena = arena;
        this.position = position;
        this.state = PNJ_State.NOT_SPEAKING;
        this.custom_interactive_position = custom_interactive_position;
        var self = this;
        this.player = arena.player;
        this.name = name;
        this.character = new BABYLON.TransformNode("character_root"); // Node auquel sont rattachés toutes les meshs du personnage, sa position est donc la position du personnage
        this.character.addRotation(0,rotation_ratio,0);
        //this.mesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameterTop : 0.4, diameterBottom : 0.4,  tessellation: 10}, scene);
        this.character.position = position;
        this.init_animations(arena.scene,position,this, anim_id, loop);
        this.click_timer = 1;
        this.can_continue = true;
        this.build_GUI();

        this.speak_func = function() {
            if (self.can_continue) {
                if (self.state === PNJ_State.NOT_SPEAKING) {
                    self.state = PNJ_State.SPEAKING;
                    self.rect1.isVisible = true;
                    arena.player.stop_moving();
                    arena.player.rotate_to_point(self.position);
                }
                var next_sentence = self.dialog.get_next_sentence();
                if (next_sentence !== null) {

                    self.show_next_sentence(next_sentence);
                }
                else {
                    self.state = PNJ_State.NOT_SPEAKING;
                    self.rect1.isVisible = false;
                    arena.player.allow_movements();;
                }
                self.can_continue = false;
            }
        };
        if (! custom_interactive_position) {
            arena.interactiveHandler.create_interactive_position("PNJ","Appuyez sur E pour parler", position, 1, this.speak_func);
        }

        arena.scene.registerBeforeRender(function () {
           if (self.click_timer <= 1.5 && ! self.can_continue) {
               self.click_timer += 0.07;
           }
           else {
               self.click_timer = 0;
               self.can_continue = true;
           }
        });
    }

    init_animations(scene, position, self, id, loop) {
        BABYLON.SceneLoader.ImportMesh("", "assets/PNJ/", "PNJ.babylon", scene, function (newMeshes, particleSystems, skeletons) {
            self.skeleton = skeletons[0];
            self.skeleton.position = position;

            for (let i = 0 ; i < newMeshes.length ; i ++) {
                let mesh = newMeshes[i];
                mesh.checkCollisions = true;
                mesh.parent = self.character;
            }

            self.mesh = newMeshes[0];

            self.character.scaling = new BABYLON.Vector3(0.004,0.004,0.004);

            var anim_name = "anim_a" + id;
            self.idleRange = self.skeleton.getAnimationRange(anim_name);

            self.skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
            self.skeleton.animationPropertiesOverride.enableBlending = true;
            self.skeleton.animationPropertiesOverride.blendingSpeed = 0.05;
            self.skeleton.animationPropertiesOverride.loopMode = 1;


            if (self.idleRange) scene.beginAnimation(self.skeleton, self.idleRange.from, self.idleRange.to, loop,1.0);


        })

    }

    change_animation(anim_id, loop, speed, frame_start) {
        var anim_name = "anim_a" + anim_id;
        var animRange = this.skeleton.getAnimationRange(anim_name);
        var from = animRange.from;
        if (frame_start) {
            from = frame_start;
        }
        if (animRange) this.arena.scene.beginAnimation(this.skeleton, from, animRange.to, loop,speed);

    }

    build_GUI() {
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        var image = new BABYLON.GUI.Image("dialog", "assets/images/dialog.png");


        this.rect1 = new BABYLON.GUI.Rectangle();
        this.text1 = new BABYLON.GUI.TextBlock();

        this.rect1.thickness = 0;
        this.text1.text = "";
        this.text1.color = "white";
        this.text1.fontSize = 13;
        this.text1.fontFamily = "Verdana";
        this.rect1.isVisible = false;
        this.rect1.height = "60px";

        this.rect1.addControl(this.text1);

        this.rect1.verticalAlignment = 1;
        image.verticalAlignment = 1;

        this.text1.top = -5;
        this.rect1.width = 0.4;
        this.rect1.zindex = 1;
        this.rect1.addControl(image);
        this.rect1.addControl(this.text1);
        this.text1.zIndex = 1.1;
        advancedTexture.addControl(this.rect1);


    }

    dispose() {
        if (! this.custom_interactive_position) {
            this.arena.interactiveHandler.remove_interactive_position("PNJ");
        }
        this.character.dispose();
    }

    set_dialog(dialog) {
        this.dialog = dialog;
    }

    show_next_sentence(sentence) {
        var self = this;
        this.rect1.isVisible = false;
        this.text1.text = sentence.text;
        this.rect1.widthInPixels = sentence.text.length * 10 ;
        this.change_mesh_pos(sentence);
        setTimeout(function(){
            self.rect1.isVisible = true;
            }, 300);

    }

    change_mesh_pos(next_sentence) {
        if (next_sentence.target_name === undefined) {
            this.rect1.linkWithMesh(this.mesh);
        }
        else if (next_sentence.target_name === "player") {
            this.rect1.linkWithMesh(this.player.body);
        } else {
            let pnj = this.arena.get_pnj_by_name(next_sentence.target_name);
            this.rect1.linkWithMesh(pnj.mesh);
        }
        this.rect1.linkOffsetY = -180;
    }



}