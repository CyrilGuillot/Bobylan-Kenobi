class ArenaBuilder {

    constructor(game, arenas_path) {
        this.game = game;
        this.engine = game.engine;
        this.game_state = game.get_game_state();
        this.arenas_path = arenas_path;
        this.n_arena = 0;

    }

    build_playable_arena(arena_name, player_spawn, camera_pos, loaded_func, music_enum) {
        var scene = new BABYLON.Scene(this.engine);
        scene.clearColor = new BABYLON.Color3(0, 0, 0);
        var camera =new BABYLON.FreeCamera("FollowCam2", camera_pos , scene);

        var interactiveHandler = new InteractiveHandler(scene);
        var automaticHandler = new AutomaticHandler(scene);
        var guiRenderer = new GUIRenderer(this.game.game_state);
        var player = new Player(player_spawn ,scene, camera,interactiveHandler,this.game_state, guiRenderer);

        scene.registerBeforeRender(function (){
            interactiveHandler.get_close_interactive_position(player.character.position);
            automaticHandler.run_automatics_events();
        });
        var path = this.arenas_path + arena_name + "/";
        var arena_babylon = arena_name + ".babylon";

        var self = this;
        BABYLON.SceneLoader.LoadAssetContainer( path, arena_babylon, scene, function (container) {

            self.game.gameLoadingUI.reset_scene_loading();

            player.forbidden_meshes= container.meshes;
            for (let i = 0 ; i < container.meshes.length ; i++) {
                let mesh = container.meshes[i];
                mesh.checkCollisions = true;
                if (mesh.material) {
                   mesh.material.freeze();
                };
                if (mesh.name.substring(0,14) === "InvisibleBlock") {
                    mesh.isVisible = false;
                }
            }
            container.addAllToScene();
            if (loaded_func) {
                loaded_func();
            }

            self.build_ligths(arena);

        }, function(event){
            self.game.gameLoadingUI.load_func(event);
        });

        /// LIGHTING ///

        setTimeout(function(){
            arena.create_lighting();
        }, 5000);

        this.game.build_gui(scene);
        let arena = new PlayableArena(this.game, arena_name, scene,camera,player,guiRenderer, interactiveHandler, automaticHandler, music_enum, this.n_arena);

        this.n_arena +=1;
        return arena;

    }

    build_simple_arena(name, music_enum, render_rules) {
        var scene = new BABYLON.Scene(this.engine);
        scene.clearColor = new BABYLON.Color3(0, 0, 0);
        this.game.build_gui(scene);
        let arena = new SimpleArena(this.game, scene, this.n_arena, name, music_enum);
        if (render_rules) {
            var rules_renderer = new RulesRenderer(this.game.game_state, render_rules);
            arena.add_rules_renderer(rules_renderer);
        }
        this.n_arena +=1;
        return arena;
    }

    build_ligths(arena){
        var scene = arena.get_scene();
        var gl = new BABYLON.GlowLayer("glow", scene);
        gl.intensity = 0.5;
        var mesh = scene.getMeshByName("Lampe.003");
        if (mesh) {
            mesh.material.subMaterials[1].emissiveColor = new BABYLON.Color3(0.55, 0.4, 0.03);
        }
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        scene.fogDensity = 0.00015;
        scene.fogColor = new BABYLON.Color3(0.55, 0.4, 0.03);
        scene.ambientColor = new BABYLON.Color3(0.55, 0.4, 0.03);

    }


}