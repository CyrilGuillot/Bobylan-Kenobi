
class PlayableArena extends Arena {

    constructor(game, name, scene, camera, player, gui_renderer, interactiveHandler, automaticHandler, music_enum, id) {
        super(game, scene, id , name , music_enum);

        this.camera = camera;
        this.player = player;
        this.gui_renderer = gui_renderer;
        this.gui_renderer.set_arena(this);
        this.interactiveHandler = interactiveHandler;
        this.automaticHandler = automaticHandler;
        this.gui_created = false;
        this.pnjs = [];
        this.monologues = [];
        this.lights = [];        
        this.already_rendered = false;
    }

    add_light(light) {
        this.lights.push(light);
    }

    create_lighting() {
        var ground = this.scene.getMeshByName("Ground");
        if (ground) {
            ground.receiveShadows = true;
        }
        for (let i = 0 ; i< this.lights.length ; i++) {
            var shadowGenerator = new BABYLON.ShadowGenerator(2048, this.lights[i]);
            for (let i = 0 ; i < this.scene.meshes.length; i++) {
                shadowGenerator.getShadowMap().renderList.push(this.scene.meshes[i]);
            }
        }

    }

    create_pnj(name, position, rotation_ratio, anim_id) {
        var pnj = new PNJ(this, name, position, rotation_ratio, anim_id);
        this.pnjs.push(pnj);
        return pnj;
    }
    

    get_pnj_by_name(name) {
        for (let i = 0; i < this.pnjs.length ; i++) {
            if (this.pnjs[i].name === name) {
                return this.pnjs[i];
            }
        }
        return null;
    }

    create_monologue(name, dialog,end_func) {
        var monologue = new Monologue(this, name, dialog, end_func);
        this.monologues.push(monologue);
        return monologue;
    }

    get_monologue_by_name(name) {
        for (let i = 0; i < this.pnjs.length ; i++) {
            if (this.monologues[i].name === name) {
                return this.monologues[i];
            }
        }
        return null;
    }

    get_camera() {
        return this.camera;
    }

    get_player() {
        return this.player;
    }

    get_interactiveHandler() {
        return this.interactiveHandler;
    }
    get_automaticHandler() {
        return this.automaticHandler;
    }

    get_renderer() {
        return this.renderer;
    }

    load_gui() {
        if (!this.gui_created) {
            console.log("diplay gui");
            var anneaux = this.scene.getMeshByName("Anneau") ;
            this.player.init_color_picker(anneaux,this.scene);
            this.gui_created = true;
        }
    }

    play_chapter(id, description, end_func) {
        this.gui_renderer.render_chapter(id,description, end_func);
        console.log("play chapter")
        console.log(id)
    }

    set_on_scene_first_render(func) {
        this.on_scene_first_render = func;
    }

    on_scene_render(){
        if (!this.already_rendered && this.on_scene_first_render) {
            this.on_scene_first_render();
        }
        this.already_rendered = true;
    }

    show_objectif(cond) {
        if (cond) {
            this.gui_renderer.show_objectif();
        }
        else {
            this.gui_renderer.hide_objectif();
        }
    }

    change_player_location(location) {
        this.player.change_location(location);

    }

    isPlayable() {
        return true;
    }

}