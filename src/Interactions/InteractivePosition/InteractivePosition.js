/*
Représente une position interactive, si le personnage se trouve proche de cette position (<distance) un message est affiché à l'aide d'un GUI,
et il peut executer une action avec la touche "E", l'action est une fonction qui peut être définie à la création de l'objet. on peut également définir une action
si la touche "échap" est pressée (optionnel).
 */

class InteractivePosition {
    constructor(name, text, position, distance, event_func, quit_func) {
        this.name = name;
        this.text = text;
        this.position = position;
        this.event_func = event_func;
        this.distance = distance;
        this.gui = this.build_GUI(text);
        this.quit_func = quit_func;
        this.is_enabled = true;
        this.is_auto = false;
    }
    /*
    Création du message affiché lorsque le personnage est assez proche de la position
     */

    build_GUI(text) {
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        var image = new BABYLON.GUI.Image("interaction_background", "assets/images/interaction.png");


        var rect1 = new BABYLON.GUI.Rectangle();
        var text1 = new BABYLON.GUI.TextBlock();

        rect1.thickness = 0;
        text1.text = text;
        text1.color = "white";
        text1.fontSize = 13;
        text1.fontFamily = "Verdana";
        rect1.isVisible = false;
        rect1.width = 0.25;
        rect1.height = "40px";

        rect1.addControl(text1);

        rect1.verticalAlignment = 1;
        image.verticalAlignment = 1;

        rect1.top = -20;
        rect1.zindex = 1;
        rect1.addControl(image);
        rect1.addControl(text1);
        text1.zIndex = 1.1;
        advancedTexture.addControl(rect1);


        return rect1;
    }

    display_text() {
        this.gui.isVisible = true;
    }


    hide_text() {
        this.gui.isVisible = false;
    }

    /*
    Joue la fonction d'action
     */

    play_event() {

        this.event_func();
    }

    /*
    Joue la fonction pour quitter uniquement si elle a été définie
     */

    play_quit_if_exists() {
        if (this.quit_func) {
            this.quit_func();
        }
    }

}


