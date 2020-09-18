/**
 * Représentation du personnage dans UNE scène
 */

class Player {

    constructor(position, scene, camera, interactiveHandler, game_state, renderer) {
        this.name = "player";
        this.scene = scene;
        this.character = new BABYLON.TransformNode("character_root"); // Node auquel sont rattachés toutes les meshs du personnage, sa position est donc la position du personnage
        this.renderer = renderer;
        this.character.position = position;
        this.game_state = game_state;
        this.body = build_body_mesh(position,scene);
        this.camera = camera;
        this.position = position;
        this.camera.lockedTarget = this.character; //la caméra fixe la node principale du personnage
        this.speed = new BABYLON.Vector3(0, 0, 0.08);
        this.nextspeed = new BABYLON.Vector3.Zero();
        this.init_animations(scene,position,this);
        this.is_walking = false;
        this.init_walking_sound(scene);
        this.forbidden_meshes = [];
        this.interactiveHandler = interactiveHandler;
        this.can_move = true;
        this.appuie_time = 0;
        this.init_direction_adapter();
        //this.init_flash_light(scene,position);
    }


    change_location(location) {

        var self = this;
        this.stop_moving();
        this.body.position = location[0].clone();
        this.character.position =  location[0].clone();
        this.body.rotation.y =  location[1];
        this.character.rotation.y =  location[1];
        this.position = location[0]
        setTimeout(function(){
            self.allow_movements();
        },100);
    }

    init_flash_light(scene,position) {
        var anneaux = scene.getMeshByName("Anneaux");
        var light = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(0, 1, 0), new BABYLON.Vector3(-1, -1, -1), Math.PI / 3, 2, scene);
        light.parent = this.character;
    }

    /*
    Permet d'afficher l'interface du personnage
     */

    init_color_picker(mesh,scene){

        console.log("init color picker")
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        var gui = new BABYLON.GUI.Image("GUI", "assets/images/gui.png");
        var robot_head = new BABYLON.GUI.Image("robot_head", "assets/images/robot_head.png");
        robot_head.height = "100px";
        robot_head.width = "100px";
        robot_head.top = "18px";
        robot_head.left = "45px";
        robot_head.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        robot_head.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

        var rect1 = new BABYLON.GUI.Rectangle();
        rect1.thickness = 0;
        rect1.background = "white";
        rect1.width = "30px";
        rect1.height = "30px";
        rect1.top = "44px";
        rect1.left = "85px";
        rect1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        rect1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

        gui.width = "500px";
        gui.height = "140px";
        gui.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        gui.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

        var panel = new BABYLON.GUI.StackPanel();
        advancedTexture.addControl(panel);

        var picker = new BABYLON.GUI.ColorPicker();
        var mat = scene.getMeshByName("Anneau").material.subMaterials[1];
        mat.albedoColor = this.game_state.get_eye_color();
        var color = mat.albedoColor;
        panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        picker.value = color;
        picker.height = "100px";
        picker.width = "100px";
        picker.top = "18px";
        picker.left = "167spx";
        picker.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        picker.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        picker.onValueChangedObservable.add(function(value) { // value is a color3
            mat.albedoColor.copyFrom(value);
            //rect1.color = value;
        });



        advancedTexture.addControl(gui);
        advancedTexture.addControl(rect1);
        advancedTexture.addControl(robot_head);
        advancedTexture.addControl(picker);

    }

    /*
    Permet d'initialiser els bruits de pas
     */

    init_walking_sound(scene){
        var self = this;
        var step1 = new BABYLON.Sound("step1", "assets/Sound/step1.wav", scene);
        var step2 = new BABYLON.Sound("step2", "assets/Sound/step2.wav", scene);
        var step3 = new BABYLON.Sound("step3", "assets/Sound/step3.wav", scene);

        var goToStep2 = false;
        var walking = false;

        step1.onended = function() {
            goToStep2 = true;
        };
        step2.onended = function() {
            goToStep2 = false;
        };
        step3.onended = function() {
            goToStep2 = false;
        };

        scene.registerBeforeRender(function () {
            if (walking && self.can_move) {
                if (! step1.isPlaying && !step2.isPlaying && !step3.isPlaying) {
                    if (Math.random() < 0.2) {
                        step3.play();
                    } else if (!goToStep2) {
                        step1.play();
                    } else {
                        step2.play();
                    }
                }
            }
        });

        const keys = [90,81,83,68];

        window.addEventListener("keydown", function(evt) {
            if (keys.includes(evt.keyCode)) {
                walking = true;
            }
        });
        window.addEventListener("keyup", function(evt) {
            if (keys.includes(evt.keyCode)) {
                walking = false;
            }
        });



    }

    /**
     * Permet d'initialiser les meshs du personnage et ses animations
     *
     * @param scene
     * @param position
     * @param self
     */

    init_animations(scene, position,self) {
        BABYLON.SceneLoader.ImportMesh("", "assets/Character2/", "Character.babylon", scene, function (newMeshes, particleSystems, skeletons) {
            self.skeleton = skeletons[0];
            self.skeleton.position = position;

            for (let i = 0 ; i < newMeshes.length ; i ++) {
                let mesh = newMeshes[i];
                mesh.checkCollisions = false;
                mesh.parent = self.character;
            }


            self.character.scaling = new BABYLON.Vector3(0.004,0.004,0.004);

            self.idleRange = self.skeleton.getAnimationRange("anim_idle");
            self.walkRange = self.skeleton.getAnimationRange("anim_walking");

            self.skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
            self.skeleton.animationPropertiesOverride.enableBlending = true;
            self.skeleton.animationPropertiesOverride.blendingSpeed = 0.05;
            self.skeleton.animationPropertiesOverride.loopMode = 1;

            if (self.idleRange) scene.beginAnimation(self.skeleton, self.idleRange.from, self.idleRange.to, true,1.0);

            self.init_keys(self,scene);

        })

    }

    stop_moving() {
        this.can_move = false;
        this.play_idle(this.scene);
        this.nextspeed.x = 0.0;
        this.nextspeed.z = 0.0;
        this.speed.x = 0;
        this.speed.z =0;
    }

    allow_movements() {
        this.can_move = true;
    }

    /**
     * Joue l'animation idle du personnage
     * @param scene
     */

    play_idle(scene) {
        if (this.is_walking === true) {
            if (this.idleRange) scene.beginAnimation(this.skeleton, this.idleRange.from, this.idleRange.to, true,1.0);
            this.is_walking = false;
        }
    }

    /**
     * Joue l'animation walking du personnage
     * @param scene
     */

    play_walking(scene) {
        if (this.is_walking === false) {
            if (this.walkRange) scene.beginAnimation(this.skeleton, this.walkRange.from, this.walkRange.to, true,1.0);
            this.is_walking = true;
        }
    }

    /**
     * Permet d'initialiser les règles de calcul pour déterminer la position du personnage et sa direction en fonction des touches préssées
     * @param self
     * @param scene
     */

    init_keys(self, scene) {




        //keypress events
        window.keyisdown = {};
        window.addEventListener('keydown', function (event) {
            window.keyisdown[event.keyCode] = true;
        });

        window.addEventListener('keyup', function (event) {
            window.keyisdown[event.keyCode] = false;
        });

        window.addEventListener('blur', function (event) {
            for (var k in window.keyisdown) {
                window.keyisdown[k] = false;
            }
        });
        window.tempv = new BABYLON.Vector3.Zero();

        scene.registerAfterRender(function () {
            if (self.appuie_time < 2) {
                self.appuie_time += 0.05;
            }
            if (window.keyisdown[69] && self.appuie_time >= 2 ) {
                self.interactiveHandler.action();
                self.appuie_time = 0;
            }
            if (window.keyisdown[27]) {
                self.interactiveHandler.quit_event();
            }
            /*
            if (window.keyisdown[73]) {
                self.renderer.render_inventory(true, self);
            }

             */
            if (self.can_move) {


                var v = 0.04;
                self.nextspeed.x = 0.0;
                self.nextspeed.z = 0.00001;
                if (window.keyisdown[90] || window.keyisdown[38]) {
                    self.nextspeed.x = -v;
                    self.play_walking(scene);
                }
                if (window.keyisdown[83]|| window.keyisdown[40]) {
                    self.nextspeed.x = v;
                    self.play_walking(scene);
                }
                if (window.keyisdown[68]|| window.keyisdown[39]) {
                    self.nextspeed.z = v;
                    self.play_walking(scene);
                }
                if (window.keyisdown[81]|| window.keyisdown[37]) {
                    self.nextspeed.z = -v;
                    self.play_walking(scene);
                }

                if (!window.keyisdown[90] && !window.keyisdown[81] && !window.keyisdown[68] && !window.keyisdown[83]
                    && !window.keyisdown[38] && !window.keyisdown[40] && !window.keyisdown[39] && !window.keyisdown[37]) {
                    self.play_idle(scene);
                }
                /*
                Permet de calculer la direction en fonction de la caméra
                 */

                var dir = self.character.position.subtract(self.camera.position);
                var dir2 = new BABYLON.Vector3(dir.x, 0, dir.z);
                var angle = BABYLON.Vector3.GetAngleBetweenVectors(dir2, BABYLON.Axis.X, BABYLON.Axis.Y);
                var matrix = BABYLON.Matrix.RotationAxis(BABYLON.Axis.Y, -angle);
                var newspeed = BABYLON.Vector3.TransformCoordinates(self.nextspeed, matrix);

                ///////////////

                self.speed = BABYLON.Vector3.Lerp(self.speed, newspeed, 0.1);


                if (self.speed.length() > 0.01) {
                    tempv.copyFrom(self.speed);
                    var dot = BABYLON.Vector3.Dot(tempv.normalize(), BABYLON.Axis.Z);
                    var al = Math.acos(dot);
                    if (tempv.x < 0.0) {
                        al = Math.PI * 2.0 - al;
                    }
                    if (window.keyisdown[9]) {
                        console.log("dot,al:", dot, al);
                    }
                    if (al > self.character.rotation.y) {
                        var t = Math.PI / 30;
                    } else {
                        var t = -Math.PI / 30;
                    }
                    var ad = Math.abs(self.character.rotation.y - al);
                    if (ad > Math.PI) {
                        t = -t;
                    }
                    if (ad < Math.PI / 15) {
                        t = 0;
                    }
                    self.character.rotation.y += t;
                    if (self.character.rotation.y > Math.PI * 2) self.character.rotation.y -= Math.PI * 2;
                }
                if (self.character.rotation.y < 0) {
                    self.character.rotation.y += Math.PI * 2;
                }

                self.speed.y= 0;
                self.body.moveWithCollisions(self.speed.negate());
                self.body.position.y = 1;
                self.character.position = new BABYLON.Vector3(self.body.position.x,0, self.body.position.z)
                //if (!mesh_interaction(self.body, self.forbidden_meshes)) {
                  //  self.character.position = next_pos;

                //}
                //self.body.position = new BABYLON.Vector3(next_pos.x, 1.1, next_pos.z);

                // else : pourrait vérifier si on peut 'glisser' le long d'une mesh

            }

        })
    }

    /*
    Si on veut pouvoir tourner le personnage vers une direction
    */

    init_direction_adapter() {
        var self = this;
        this.adapt = false;
        this.scene.registerAfterRender(function () {
            
        });
    }

    rotate_to_point(point) {
 
       var lAt = point.subtract(this.character.position);
       this.character.rotation.y = -Math.atan2(lAt.z, lAt.x) - Math.PI/2;
       //this.final_y = -Math.atan2(lAt.z, lAt.x) - Math.PI/2;

       this.adapt = true;
    }
    set_player_position(position){
        this.character.position = position;
    }

}