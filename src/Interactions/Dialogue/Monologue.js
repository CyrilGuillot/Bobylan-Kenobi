const Monologue_State = {
    SPEAKING: 'speaking',
    NOT_SPEAKING: 'not_speaking'
};

class Monologue {

    constructor(arena, name, dialog, end_func) {
        var self = this;
        this.end_func = end_func;
        this.player = arena.player;
        this.dialog = dialog;
        this.state = Monologue_State.NOT_SPEAKING;
        this.click_timer = 1;
        this.can_continue = true;
        this.name = name;
        this.build_GUI();


        this.speak = function() {
            if (self.can_continue) {
                if (self.state === Monologue_State.NOT_SPEAKING) {
                    self.state = Monologue_State.SPEAKING;
                    self.rect1.isVisible = true;
                    arena.player.stop_moving();
                }
                var next_sentence = self.dialog.get_next_sentence();
                if (next_sentence !== null) {
                    self.show_next_sentence(next_sentence);
                }
                else {
                    self.state = Monologue_State.NOT_SPEAKING;
                    self.rect1.isVisible = false;
                    arena.player.allow_movements();
                    if (self.end_func) {
                        self.end_func();
                    }
                }
                self.can_continue = false;
            }
        };

        arena.scene.registerBeforeRender(function () {
            if (self.state === Monologue_State.SPEAKING) {
                if (window.keyisdown[69]) {
                    self.speak();
                }
            }

            if (self.click_timer <= 1.5 && ! self.can_continue) {
                self.click_timer += 0.07;
            }
            else {
                self.click_timer = 0;
                self.can_continue = true;
            }
        });
    }

    build_GUI() {

        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI2");
        var image = new BABYLON.GUI.Image("dialog", "assets/images/dialog.png");

        this.rect1 = new BABYLON.GUI.Rectangle();
        this.text1 = new BABYLON.GUI.TextBlock();
        this.rect1.isVisible = false;
        this.rect1.thickness = 0;
        this.text1.text = "";
        this.text1.color = "white";
        this.text1.fontSize = 13;
        this.text1.fontFamily = "Verdana";

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

    show_next_sentence(sentence) {
        var self = this;
        this.rect1.isVisible = false;
        this.text1.text = sentence.text;
        this.rect1.widthInPixels = sentence.text.length * 10 ;
        setTimeout(function(){
            self.rect1.isVisible = true;
        }, 300);

    }

    set_custom_mesh(mesh) {
        this.custom_mesh = mesh;
    }

    play() {
        this.rect1.linkWithMesh(this.player.body);
        if (this.custom_mesh) {
            this.rect1.linkWithMesh(this.custom_mesh);
        } else {
            this.rect1.linkWithMesh(this.player.body);
        }
        this.rect1.linkOffsetY = -180;
        this.speak();

    }

    dispose() {

    }
}