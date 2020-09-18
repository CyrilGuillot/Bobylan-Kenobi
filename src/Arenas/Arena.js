
class Arena {

    constructor(game, scene, id , name , music_enum) {
        this.game = game;
        this.name = name;
        this.scene = scene;
        this.id = id;
        this.music_enum = music_enum;
        this.set_music(music_enum);

    }

    set_music(music_enum) {
        if (music_enum) {
            if (music_enum !== this.game.current_music) {
                switch (music_enum) {
                    case this.game.musics.CITY:
                        this.music = new BABYLON.Sound("CITY", "music/Erakess - Cycloid.mp3", this.scene, null,{
                            loop : true
                        });
                        break;
                    case this.game.musics.CHILL:
                        this.music = new BABYLON.Sound("CHILL", "music/Erakess - Robot Freedom.mp3", this.scene, null,{
                            loop : true
                        });
                        break;
                }
            }
        }
        else {
            this.music_enum = this.game.musics.NONE;
        }
    }


    play_music() {
        if (this.music) {
            this.music.setVolume(0.2);
            this.music.play();
            return this.music;
        }
        return null;
    }


    get_name() {
        return this.name;
    }

    get_scene() {
        return this.scene;
    }

    get_id() {
        return this.id;
    }

}