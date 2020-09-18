
/*
shade est l'état du jeu permettant d'avoir une fondu lors d'un changement de scène
 */

const shade = {
    PLAYING: 'playing',
    SHADE_OUT: 'shade_out',
    LOADING: 'loading',
    SHADE_IN: 'shade_in'
};

/*
Game est la représentation d'une partie Babylonjs, elle prend en compte :
-un gamestate qui représente l'état du jeu indépendemment des scènes
-l'engine babylonjs
-les scnènes
-la scène actuelle
 */

class Game{

    constructor() {
        var self = this;
        this.canvas = document.getElementById('renderCanvas');
        this.game_state = new GameState(this,"Bobylan Kenoby");

        this.engine = new BABYLON.Engine(this.canvas, true);
        this.engine.enableOfflineSupport = false;
        BABYLON.Animation.AllowMatricesInterpolation = true;
        this.gameLoadingUI = new GameLoadingUI(this);
        this.engine.loadingScreen = this.gameLoadingUI;
        this.engine.displayLoadingUI();
        this.arena_builder = new ArenaBuilder(this, "assets/Maps/");
        this.arenas = [];
        this.musics = {
            NONE: 'none',
            CITY: 'city',
            CHILL: 'chill'
        };

        this.music_playing = null;
        this.current_music = this.musics.NONE;
        this.next_music = this.musics.NONE;
        this.load_arenas();
        this.shade = shade.SHADE_IN; // On démarre la partie sur un shade_in

        this.first_arena_to_load = "Bureau";

        this.current_arena = this.get_arena_by_name("Intro");
        this.next_arena = this.get_arena_by_name("Intro");

        var self = this;
        this.engine.runRenderLoop(function () { // L'engine calcule un rendu uniquement pour la scène en cours
            self.current_arena.get_scene().render();
        });

        window.addEventListener('resize', function(){
            self.engine.resize();
        });
       
    }


    /**
     * build_gui construit un fondu si l'état du jeu shade le permet
     *
     * @param scene
     */

    build_gui(scene) {

        var self = this;
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        var rect1 = new BABYLON.GUI.Rectangle();
        rect1.alpha = 1; // Ecran initialement noir
        rect1.zindex = 1; // Ecran en premier plan
        rect1.background = "Black";
        advancedTexture.addControl(rect1);
        var loading_value = 0;

        scene.registerBeforeRender(function() { // Affiche un fondu décroissant ou croissant si l'état du jeu le perme   
        switch (self.shade) {
            
                case shade.SHADE_IN:
                    rect1.alpha -= 0.02;
                    if (rect1.alpha <= 0) { // Quand l'écran est entièrement visible, l'état du jeu devient PLAYING
                        rect1.alpha = 0;
                        self.shade = shade.PLAYING;
                    }
                    break;
                case shade.LOADING:
                    loading_value += 0.01;
                    if (loading_value >= 0.5) {   // Quand l'écran est en chargement depuis un certain temps, l'état du jeu devient SHADE_IN
                        loading_value = 0;
                        self.shade = shade.SHADE_IN;
                    }
                    break
                case shade.SHADE_OUT:
                    rect1.alpha += 0.02;
                    if (rect1.alpha >= 1) { // Quand l'écran est entièrement caché, l'état du jeu devient LOADING
                        rect1.alpha = 1;
                        self.shade = shade.LOADING;
                        self.load_next_scene(); // On peut alors changer la scène sans que cela soit perçu directement
                    }
                    break
            }

        })
    }

    add_arena(arena) {
        this.arenas.push(arena);
    }

    /**
     * Création de toutes les scènes du jeu
     * @returns la liste des scènes
     */

    load_arenas() {
        this.arenas.push(create_intro_scene(this));
        this.arenas.push(create_bureau_scene(this));
        this.arenas.push(create_stairs_scene(this));
        this.arenas.push(create_road1_scene(this));
        this.arenas.push(create_parc_scene(this));
        this.arenas.push(create_test_scene(this));
        this.arenas.push(create_alley2_scene(this));
        this.arenas.push(create_square_scene(this));
        this.arenas.push(create_crime_room_scene(this));
        this.arenas.push(create_bar_scene(this));
        this.arenas.push(create_hall_scene(this));
        this.arenas.push(create_room_scene(this));
        this.arenas.push(create_alley_scene(this));
        this.arenas.push(create_crime_side_scene(this));
        this.arenas.push(create_shop1_scene(this));
        this.arenas.push(create_shop2_scene(this));
        this.arenas.push(create_crime_scene(this));
        this.arenas.push(create_depot_scene(this));
  
    }

    /**
     * Permet de changer de scène, ne change pas directement la scène (afin d'obtenir un fondu pour une certaine durée)
     * @param id de la nouvelle scène à charger
     */


    change_arena(name, location) {
        this.next_arena = this.get_arena_by_name(name);
        var next = this.next_arena
        this.next_music = this.next_arena.music_enum;
        this.shade = shade.SHADE_OUT;
        if (this.current_arena.isPlayable()) {
            this.current_arena.player.stop_moving();
        }
        if (this.next_arena.isPlayable() && location) {
            next.change_player_location(location);
        }

    }

    change_scene_by_name(name, location) {
        this.change_arena(name,location);
    }

    get_arena_by_name(name) {
        for (let i = 0; i < this.arenas.length ; i++) {
            if (this.arenas[i].name === name) {
                return this.arenas[i];
            }
        }
        let error_msg = "Arena " + name + " not found !";
        return null;
    }


    load_next_scene() {
        if (this.current_arena.isPlayable() ){
            this.current_arena.player.can_move = true;
        }
        this.current_arena = this.next_arena;
        if (this.next_arena.isPlayable()) {
            this.next_arena.on_scene_render();
        }
        this.start_music();
        
    }

    start_music() {
        
        if (this.next_music === this.musics.NONE && this.music_playing) {
            this.music_playing.stop();
            this.music_playing = null;
            this.current_music = this.musics.NONE;
        } else if (this.current_music.valueOf() !== this.next_music.valueOf()) {
            if (this.music_playing) {
                this.music_playing.stop();
            }
            this.music_playing = this.next_arena.music;
            this.music_playing.play();
            this.current_music = this.next_arena.music_enum;
        }
    }

    get_game_state() {
        return this.game_state;
    }


    register_arena(arena) {
        this.arenas.push(arena);
    }



    set_crime_func(func) {
        this.crime_func = func;
    }

    play_crime() {
        this.crime_func();
    }

 

}

/*
Création de la Game
 */

window.addEventListener('DOMContentLoaded', function(){
    let game = new Game();
});
