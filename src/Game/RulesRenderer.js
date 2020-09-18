class RulesRenderer {
    constructor(gameState, rules_name) {
        this.gamestate = gameState;
        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI_rules");
        this.rules_path = "assets/images/regles/" + rules_name + ".png"
        this.build_check_box();
    }

    enable() {
        this.advancedTexture.addControl(this.rect2);
        this.checkbox.isChecked = false;
    }

    disable() {
        this.advancedTexture.removeControl(this.rect2);
        this.advancedTexture.removeControl(this.image);
    }

    build_check_box() {
        console.log(this.rules_path)
        var rect2 = new BABYLON.GUI.Rectangle();
        rect2.width = "250px";
        rect2.height = "40px";
        rect2.thickness = 0;

        this.image = new BABYLON.GUI.Image("img", this.rules_path); 

        this.image.width = "1000px";
        this.image.height = "700px";
        this.image.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.image.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    
        rect2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        rect2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.advancedTexture.addControl(rect2);    
    
        var checktext = new BABYLON.GUI.TextBlock();
        checktext.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        checktext.text = "Voir les règles ?";
        checktext.color = "white";
        checktext.fontSize = 15;  
        rect2.addControl(checktext);   
    
        var checkbox = new BABYLON.GUI.Checkbox();
        checkbox.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        checkbox.width = "20px";
        checkbox.height = "20px";
        checkbox.left = 100;
        checkbox.isChecked = false;
        checkbox.color = "green";

        this.rect2 = rect2;
        this.checkbox = checkbox;
        var self = this;

        checkbox.onIsCheckedChangedObservable.add(function() {
            if (checkbox.isChecked) {
                self.advancedTexture.addControl(self.image);
            } else {
                self.advancedTexture.removeControl(self.image);
            }
        });

        rect2.addControl(checkbox);    
    }

    dispose() {
        this.advancedTexture.dispose();
    }
}