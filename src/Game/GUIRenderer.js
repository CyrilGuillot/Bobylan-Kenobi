class GUIRenderer {
    constructor(gameState) {
        this.gamestate = gameState;
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        this.advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI2");
        this.advancedTexture3 = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI3");
        this.create_chapter_UI();
        this.render_objectif();
        
    }

    show_objectif() {
        this.objectif_panel.alpha = 1;
        this.objectif_rect.alpha = 0.5;
    }

    hide_objectif() {
        this.objectif_panel.alpha = 0;
        this.objectif_rect.alpha = 0;
    }

    set_arena(arena) {
        var self = this;
        this.arena = arena;
        this.arena.get_scene().registerBeforeRender(function() {
            if (self.show_chapter) {
                self.chapter_tick += 0.02;
                if (self.chapter_tick <= 1) {
                    self.panel.alpha = self.chapter_tick;
                }
                else if (self.chapter_tick >= 3) {
                    var dep = self.chapter_tick - 3;
                    self.panel.alpha = 1 - dep;
                }
                if (self.chapter_tick >= 4) {
                    self.show_chapter = false;
                    self.panel.alpha = 0;
                    if (self.end_chapter_func) {
                        self.end_chapter_func()
                    }
                }
            }
        });
    }

    create_chapter_UI() {
        
        this.chapter_tick = 0;
        this.show_chapter = false;

        var panel = new BABYLON.GUI.StackPanel();
        panel.width = "400px";
        panel.color = "red";
        panel.top = "10px";
        panel.verticalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_TOP;
        panel.top = "30px";
        panel.left = "30px";
        panel.alpha = 0;
        this.advancedTexture3.addControl(panel);

        var text1 = new BABYLON.GUI.TextBlock();
        text1.text = "Chapitre 0";
        text1.fontFamily = "aerolite";
        text1.height = "60px";
        text1.color = "red";
        text1.fontSize = 50;

        var text2 = new BABYLON.GUI.TextBlock();
        text2.text = "Null";
        text2.fontFamily = "aerolite";
        text2.height = "30px";
        text2.color = "white";
        text2.fontSize = 30;

        panel.addControl(text1);
        panel.addControl(text2);

        this.panel = panel;
        this.chapitre_id = text1;
        this.chapter_desc = text2;
    }

    render_chapter(id, description, end_func) {
        this.chapitre_id.text = "Chapitre " + id;
        this.chapter_desc.text = description;
        this.show_chapter = true;
        this.end_chapter_func = end_func;
    
    }

    render_objectif() {

        var rect = new BABYLON.GUI.Rectangle();
        rect.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        rect.verticalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_TOP;
        rect.thickness = 2;
        rect.width = "400px";
        rect.height =  "80px";
        rect.cornerRadius = 10;
        rect.background = "black";
        rect.alpha = 0.5;
        rect.top = "20px";
        rect.left = "20px";

        this.advancedTexture2.addControl(rect);

        var panel = new BABYLON.GUI.StackPanel();
        panel.width = "400px";
        panel.color = "red";
        panel.top = "10px";
        panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        panel.verticalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_TOP;
        panel.top = "30px";
        panel.left = "30px";
        this.advancedTexture2.addControl(panel);

        var text1 = new BABYLON.GUI.TextBlock();
        text1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        text1.text = "Objectif";
        text1.fontFamily = "lemonMilkFont";
        text1.height = "30px";
        text1.color = "white";
        text1.fontSize = 16;
        //text1.fontFamily = "Verdana";

        this.text2 = new BABYLON.GUI.TextBlock();
        this.text2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.text2.text = "Appuyez sur [E] pour faire défiler les dialogues \n Déplacez vous avec les touches [Z,Q,S,D] / flèches";
        this.text2.fontFamily = "bonVoyageFont";
        this.text2.height = "30px";
        this.text2.color = "white";
        this.text2.fontSize = 14;

        this.objectif_panel = panel;
        this.objectif_rect = rect;
        panel.addControl(text1);
        panel.addControl(this.text2);
    }

    update_objectif(text) {
        this.text2.text = text;
    }

    

}