/**
 * InteractiveHandler permet de gérer toutes les InteractivePosition d'une scène et d'effectuer leur action.
 */


class InteractiveHandler{
    constructor(scene) {
        this.interactive_positions = [];
        this.display_text = true;
        this.event_close= null;
        this.scene = scene;
        this.is_enabled = true;
    }

    enable() {
        this.is_enabled = true;
    }


    disable () {
        this.is_enabled = false;
    }



    /*
    Crée une position interaction et l'ajoute à la liste des positions du Handler, ces positions correspondent aux positions interactives pour une seule scène,
    le handler étant défini pour chaque scène.
     */
    create_interactive_position(name,text, position, distance, event_func, quit_func) {
        var interactivePosition = new InteractivePosition(name,text,position,distance,event_func,quit_func)
        this.interactive_positions.push(interactivePosition);
        return interactivePosition;
    }

    /*
    Supprime une position interactive depuis son nom
     */

    remove_interactive_position(name) {
        var found = false;
        for (let i = 0 ; i < this.interactive_positions.length ; i++) {
            if (this.interactive_positions[i].name === name) {
                this.interactive_positions.splice(i, 1);
                found = true;
                break
            }
        }
        if (! found) {
            console.log("interactive position not found");
        }
    }

    /*
    Change la fonction lancée d'une position interactive
     */

    change_interactive_position_function(name, new_func) {
        var found = false;
        var self = this;
        for (let i = 0 ; i < this.interactive_positions.length ; i++) {
            if (this.interactive_positions[i].name === name) {
                setTimeout(function(){
                    self.interactive_positions[i].event_func = new_func;
                    found = true;
                }, 300);
            }
        }
    }

    /*
    Change l etat d une position interactive depuis son nom
     */

    change_interactive_position_state(name, is_enabled) {
        for (let i = 0 ; i < this.interactive_positions.length ; i++) {
            if (this.interactive_positions[i].name === name) {
                this.interactive_positions[i].is_enabled = is_enabled;
            }
        }
    }

    /*
    Fonction qui est lancé pour chaque rendu de la scène, elle permet de définir la position interactive courante si le personnage est assez proche de l'une d'elle,
    affichant ou cachant le texte suivant sa distance de celle-ci
     */
    get_close_interactive_position(character_position) {

        var character_position_copy = new BABYLON.Vector3(character_position.x,0,character_position.z);
        var found_close = false;
        for (let i = 0 ; i< this.interactive_positions.length; i++) {
            var interactivePosition = this.interactive_positions[i];
            if (get_position_distance(character_position_copy, interactivePosition.position) <= interactivePosition.distance && interactivePosition.is_enabled) {
                this.event_close = interactivePosition;
                found_close = true;
                break;

            }
        }
        if (! found_close) {
            if (this.event_close != null) {
                this.event_close.hide_text();
                this.event_close = null;
            }

        }
        else {
            if (this.display_text) {
                this.event_close.display_text();
            }
            else {
                this.event_close.hide_text();
            }
        }

    }

    /**
     * Joue l'action de la position interactive courante
     */

    action() {
        if (this.event_close != null && this.is_enabled) {
            this.event_close.play_event();
        }
    }

    /**
     * Joue l'action échap de la position interactive courante
     */

    quit_event() {
        if (this.event_close != null) {
            this.event_close.play_quit_if_exists();
        }
    }

}