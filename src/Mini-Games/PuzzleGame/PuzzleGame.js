class PuzzleCubeConfig {
    constructor(mesh_id, others_id, meshes) {
        this.mesh_id = mesh_id;
        this.others_id = others_id;
        this.meshes = meshes;
    }
    apply_color_change() {
        for (let i = 0 ; i < this.others_id.length ; i++) {
            var other_id = this.others_id[i];

            var mesh = this.meshes[other_id - 1];

            if (mesh.material.diffuseColor.b === 0){
                mesh.material.diffuseColor = BABYLON.Color3.Blue();
                mesh.material.emissiveColor = BABYLON.Color3.Blue();
            } else {
                mesh.material.diffuseColor = BABYLON.Color3.Red();
                mesh.material.emissiveColor = BABYLON.Color3.Black();
            }
        }
        console.log("end")
    }
}

class PuzzleGame{

    constructor(game, n_element, scene_id, scene_name, camera_pos, on_succeed) {
        this.game = game;
        this.n_element = n_element;
        this.scene_name = scene_name;
        this.camera_pos = camera_pos;
        this.scene_id = scene_id;
        this.on_succeed = on_succeed;
        this.meshes = [];
        this.configs = [];
        this.load_scene();
    
    }

    add_config(mesh_id, others_id) {
        this.configs.push(new PuzzleCubeConfig(mesh_id, others_id, this.meshes));
    }

    on_loaded() {

        var self = this;

        for (let i = 1 ; i <= this.n_element ; i++) {
            var box_name = "pyr" + i;
            var box = this.scene.getMeshByName(box_name);
            var mat_name = "box_mat" + i;
            box.material = new BABYLON.StandardMaterial(mat_name , this.scene);
            box.material.diffuseColor = BABYLON.Color3.Red();
            this.meshes.push(box);
            
        }
        var sphere = this.scene.getMeshByName("Sphere");
        sphere.material = new BABYLON.StandardMaterial("sphere_mat", this.scene);
        sphere.material.diffuseColor = BABYLON.Color3.Black();
        this.camera.lockedTarget = sphere;

        var check_sphere = function () {
            var success = true;
            self.meshes.forEach(mesh => {
                if (mesh.material.diffuseColor.r ===1) {
                    success = false;
                };
            });
            if (success === true){
                sphere.material.emissiveColor = BABYLON.Color3.Green();
                setTimeout(function(){
                    self.on_succeed();
                }, 1500);
            }
        };

        var overMesh = function(mesh) {
            if(sphere.material.diffuseColor.g===0){
                if (mesh.name.substring(0, 3) === "pyr") {
                    mesh.puzzle_config.apply_color_change();
                    check_sphere();
                }
            }
        };

        var on_click = function(mesh){

            mesh.actionManager = new BABYLON.ActionManager(self.scene);

            mesh.actionManager.registerAction(

                new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPickTrigger,
                    function () { overMesh(mesh)

                    }
                )
            );
            check_sphere()

        };
        
        for (let i = 0 ;i < this.meshes.length; i++) {
            on_click(this.meshes[i])
        }

        setTimeout(function() {
            for (let i = 0 ;i < self.configs.length; i++) {
                var config = self.configs[i];
                self.meshes[config.mesh_id - 1].puzzle_config = config;
            };
        },2000);

    };

    load_scene() {
        var self = this;
        this.arena = this.game.arena_builder.build_simple_arena(this.scene_name, this.game.musics.CHILL, "puzzleGameRules");
        this.scene = this.arena.get_scene();
        this.camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(-1.236, 0.870445, -1.21633), this.scene);
        var gl = new BABYLON.GlowLayer("glow", this.scene);
        gl.intensity = 0.5;
        var path = "assets/Maps/" + this.scene_name + "/"
        BABYLON.SceneLoader.LoadAssetContainer(path, this.scene_name + ".babylon", this.scene, function (container) {
            container.addAllToScene();
            self.on_loaded();
        });
    }

    get_scene() {
        return this.scene;
    }

    get_arena() {
        return this.arena;
    }
}