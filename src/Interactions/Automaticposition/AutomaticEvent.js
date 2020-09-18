/*
Représente une position interactive, si le personnage se trouve proche de cette position (<distance) un message est affiché à l'aide d'un GUI,
et il peut executer une action avec la touche "E", l'action est une fonction qui peut être définie à la création de l'objet. on peut également définir une action
si la touche "échap" est pressée (optionnel).
 */

class AutomaticEvent {
    constructor(name, event_func, quit_func) {
        this.name = name;
        this.event_func = event_func;
        this.quit_func = quit_func;
        this.is_enabled = false;
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


