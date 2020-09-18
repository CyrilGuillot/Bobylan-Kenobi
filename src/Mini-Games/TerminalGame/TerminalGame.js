const state = {
    TO_DO: 'todo',
    DOING: 'doing',
    DONE: 'done',
}



class TerminalGame{

    constructor(arena, position_camera, position_terminal, terminalGameConfigs, on_succeed, succeed_msg, on_mail_read) {
        this.scene = arena.scene;
        this.state = state.TO_DO;
        this.succeed_msg = succeed_msg;
        this.mesh_name = "Screen";
        this.configs = terminalGameConfigs;
        this.next_config_id = 0;
        this.load_next_config();
        this.initialized = false;
        this.on_succeed = on_succeed;
        this.end_done = false;
        this.succeeded = false;
        this.final_texts = [];
        this.current_final_text = 0;
        this.on_mail_read = on_mail_read;
        this.on_mail_read_done = false;

        var ok = new BABYLON.Sound("step2", "assets/Sound/Terminal_OK.mp3",this.scene);
        var wrong = new BABYLON.Sound("step3", "assets/Sound/Terminal_Wrong.mp3",this.scene);
        var terminal = new BABYLON.Sound("step3", "assets/Sound/Terminal.mp3",this.scene,null, {
            loop: true,
            autoplay: false
        });
        this.rules = new RulesRenderer(arena.gameState, "terminalGameRules");
        this.rules.disable();
        var self = this;

        var playing = false;
        let start_sound = function(){
            if (playing === false){
                terminal.play();
                playing = true;
            }
        };

        let stop_sound = function(){
            console.log("paused");
            if(playing === true){
                terminal.stop();
                playing = false;
            }
        };


        let start_session = function() {
            self.rules.enable();
            self.start();
            start_sound();
            arena.camera.lockedTarget = arena.scene.getMeshByName("Screen");
            arena.camera.position = position_camera;
            arena.player.can_move = false;
            arena.interactiveHandler.display_text = false;

        };

        let end_session = function() {
            self.rules.disable();
            self.end_session();
            stop_sound();
            arena.camera.position = new BABYLON.Vector3(1,4,-3);
            arena.camera.lockedTarget = arena.player.character;
            arena.player.can_move = true;
            arena.interactiveHandler.display_text = true;
            if (self.succeeded && !self.end_done) {
                self.on_succeed();
                self.end_done = true;
            }


        };

        arena.get_interactiveHandler().create_interactive_position("Terminal","Appuyez sur E pour interagir",position_terminal, 1, start_session, end_session);

    }


    load_next_config() {
        this.terminalGameConfig = this.configs[this.next_config_id];
        if (this.next_config_id >= this.configs.length - 1) {
            this.next_config_id = 0;
        }else {
            this.next_config_id += 1;
        }
        this.basic_text = this.terminalGameConfig.text;
        this.last_word = "";
        this.msg = "";
        this.current_attempt = 0;
        this.clear();
        if (this.ctx !== undefined) {
            this.update_screen();
        }

    }

    build(scene) {

        var self = this;
        window.addEventListener('keydown', function (event) {
            if (self.state === state.DOING && self.last_key === "") {
                if (event.keyCode >= 65 && event.keyCode <=90) {
                    self.last_key = event.key;
                }
                else if (event.keyCode === 13) {
                    self.try_word(self.current_typing.toUpperCase().substring(2));
                }
                else if (event.keyCode === 8) {
                    if (self.current_typing.length >2) {
                        self.current_typing = self.current_typing.substring(0, self.current_typing.length -1);
                        self.update_screen();
                    }
                }
            }
            else if (self.succeeded && self.last_key === "" && event.keyCode ===13) {
                self.show_next_final_text();
            }

        });

        scene.registerBeforeRender(function () {
           if (self.last_key !== "") {
               self.delay_key += 0.5;
               if (self.delay_key >= 1) {
                   self.current_typing += self.last_key;
                   self.update_screen();
                   self.last_key = "";
                   self.delay_key = 0;
               }
           }

        });

    }

    try_word(word) {


        if ( this.terminalGameConfig.words.includes(word)) {
            if (word === this.terminalGameConfig.correct_word) {

                this.succeed();
            }
            else {
                this.msg = " - Invalid word (" + this.calcul_match(this.current_typing.toUpperCase()) + " correct)";
            }
        }
        else {
            this.msg = " - Unknown word";
        }
        if (this.state !== state.DONE) {
            this.clear();
            this.current_attempt +=1;
            if (this.current_attempt ===  this.terminalGameConfig.attemps) {
                this.load_next_config();
            }
            this.update_screen();
        }

    }

    clear() {

        this.current_typing = "> ";
        this.last_key = "";
        this.delay_key = 1;
    }

    start() {
        if (this.state !== state.DONE) {
            this.state = state.DOING;
            if (!this.initialized) {
                this.dynamicTexture = this.connect();
                this.update_screen();
                this.build(this.scene);
                this.initialized = true;
            }
        }
    }

    connect() {
        var mesh = this.scene.getMeshByName(this.mesh_name);

        var DTWidth =  60* 50;
        var DTHeight = 60 * 50;
        var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", {width:DTWidth, height:DTHeight}, this.scene);
        this.ctx = dynamicTexture.getContext();
        var size = 150; //any value will work
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, 3000, 3000);
        this.ctx.fillStyle = '#08ff52';
        this.ctx.font = size + "px " + "Arial";
        var mat = new BABYLON.StandardMaterial("mat", this.scene);
        mat.emissiveTexture = dynamicTexture;
        mat.disableLighting = true;
        mesh.material = mat;

        return dynamicTexture;
    }

    update_screen() {
        if (this.state !== state.DONE) {
            this.ctx.clearRect(0,0,3000,3000);
            this.write_text(this.basic_text);
            var line = "Attempt " + this.current_attempt + "/" + this.terminalGameConfig.attemps;
            line += this.msg;
            this.write_line(line,10);
            if (this.last_word !== "") {
                var line2 = this.calcul_match(this.last_word.toUpperCase());
                this.write_line(line2,11);
            }
            this.write_line(this.current_typing,12);
        }
        else {
            this.ctx.clearRect(0,0,3000,3000);
            var lines = this.succeed_msg.split('\n');
            for (let i = 0 ; i < lines.length ; i++) {
                this.write_line(lines[i],i);
            }
        }
        this.dynamicTexture.update();
    }

    calcul_match(word) {
        var max = this.terminalGameConfig.correct_word.length;
        var correct_word_array = this.terminalGameConfig.correct_word.split('');
        var checking_word_array = word.split('');
        var match_number = 0;
        for (let i = 0 ; i < checking_word_array.length ; i++) {
            var char_checking = checking_word_array[i];
            if (correct_word_array.includes(char_checking)) {
                correct_word_array.splice( correct_word_array.indexOf(char_checking), 1 );
                match_number+=1;

            }
        }
        return match_number + "/" + max;
    }

    update_text(text) {
        this.ctx.clearRect(rect.x, rect.y, rect.width, rect.height);
    }

    write_text(text) {
        var lines = text.split('\n');
        for (let i = 0 ; i < lines.length ; i += 1) {
            this.write_line(lines[i],i);
        }
    }

    write_line(text ,line) {
        this.ctx.fillText(text, 150, 250 + (215 * line));
    }


    end_session() {

        if (this.state !== state.DONE) {
            this.state = state.TO_DO;
        }

    }

    succeed() {
        this.state =state.DONE;
        this.update_screen();
        this.succeeded = true;
    }


    add_final_text(text) {
        this.final_texts.push(text);
    }

    show_next_final_text() {
        if (this.final_texts.length>0) {
            this.succeed_msg = this.final_texts[this.current_final_text];
            this.update_screen();
            this.current_final_text +=1;
            if (this.current_final_text === this.final_texts.length  && ! this.on_mail_read_done) {
                this.on_mail_read();
                this.on_mail_read_done = true;
            }
            if (this.current_final_text === this.final_texts.length) {
                this.current_final_text = 0;
            }
        }
    }




}

