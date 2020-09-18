
class AutomaticHandler{
    constructor(scene) {
        this.automatic_events = [];
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
    create_automatic_event(name, event_func, quit_func) {
        var automatic_event = new AutomaticEvent(name,event_func,quit_func);
        this.automatic_events.push(automatic_event);
        return automatic_event;
    }

    /*
    Supprime une position interactive depuis son nom
     */

    remove_automatic_event(name) {
        for (let i = 0 ; i < this.automatic_events.length ; i++) {
            if (this.automatic_events[i].name === name) {
                this.automatic_events.splice(i, 1);
                break
            }
        }
    }

    /*
    Change l etat d une position interactive depuis son nom
     */

    change_automatic_event_state(name, is_enabled) {
        var self = this;
        for (let i = 0 ; i < this.automatic_events.length ; i++) {
            if (this.automatic_events[i].name === name) {
                setTimeout(function(){
                    self.automatic_events[i].is_enabled = is_enabled;
                }, 1200);
            }
        }
    }

    run_automatics_events() {
        for (let i = 0 ; i < this.automatic_events.length ; i++) {
            if (this.automatic_events[i].is_enabled) {
                console.log("found one !")
                this.automatic_events[i].play_event();
                this.automatic_events[i].is_enabled = false;
            }
        }
    }


}