class Paper{

    constructor(arena, text, end_func) {
        this.text = text;
        this.advanced_texture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        this.paper = this.build_gui(text);
        this.end_func = end_func;
        var self = this;

        var paper_in = function() {
            self.enable();
            arena.player.can_move = false;
            arena.interactiveHandler.display_text = false;
        };
        var paper_off = function() {
            self.disable();
            arena.player.can_move = true;
            arena.interactiveHandler.display_text = true;
            arena.interactiveHandler.remove_interactive_position("paper");
            if (end_func) {
                end_func();
            }
        };
        arena.interactiveHandler.create_interactive_position("paper","Appuyez sur E pour interagir",new BABYLON.Vector3(-2.697731950632334, 0, 1.0110750100630337), 1, paper_in, paper_off);
    }

    build_gui(text) {
        var gui = new BABYLON.GUI.Image("GUI", "assets/images/paper.png");

        gui.width = "500px";
        gui.height = "700px";
        gui.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        gui.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;

        var text1 = new BABYLON.GUI.TextBlock();

        text1.text = text;
        text1.color = "black";
        text1.fontSize = 20;
        text1.fontFamily = "Verdana";


        var rect1 = new BABYLON.GUI.Rectangle();

        rect1.thickness = 0;
        rect1.width = "400px";
        rect1.height =  "600px";

        rect1.addControl(text1);

        return [gui,rect1];

    }

    enable(){
        this.advanced_texture.addControl(this.paper[0]);
        this.advanced_texture.addControl(this.paper[1]);
    }

    disable() {
        this.advanced_texture.removeControl(this.paper[0]);
        this.advanced_texture.removeControl(this.paper[1]);
    }





}