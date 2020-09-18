class GameLoadingUI{
    constructor(game) {
        this.game = game;
        this.current_text = "Création des robots...";
        this.done = false;
        this.MB_total_loaded = 0;
        this.MB_current_loaded = 0;
        this.MB_total_to_load = 21.7;
        this.change_progress_bar_from_scene_loader = true;
        this.onTransitionEnd = () => {
            if (!this._loadingDiv) {
                return;
            }
            if (this._loadingDiv.parentElement) {
                this._loadingDiv.parentElement.removeChild(this._loadingDiv);
            }
            window.removeEventListener("resize", this._resizeLoadingUI);

            this._loadingDiv = null;
        };
        var self =  this;
        window.addEventListener('load', function () {
            self.page_loaded = true;
          })
        this.sentences = [
            "Serrage des boulons...",
            "Nettoyage des conduits...",
            "Affutage du cylindre...",
            "Allongement des ressorts..."];
        this.current_sentence_count = 0;
        this.page_loaded = false;
        this.all_loaded = false;
        this.interval = window.setInterval(function() {
            self.update()}, 2500);
    }

    hideLoadingUI() {
        if (!this._loadingDiv || this.done) {
            return;
        }
        this.done = true;
    }

    update() {
        var self = this;
        this.change_text(this.sentences[this.current_sentence_count]);
        this.current_sentence_count++;
        if (this.current_sentence_count >= this.sentences.length) {
            this.current_sentence_count = 0;
        }
        if (this.done && this.page_loaded && ! this.all_loaded) {
            this.all_loaded = true;
            setTimeout(function() {
                clearInterval(this.interval);
                self._loadingDiv.style.opacity = "0";
                self._loadingDiv.addEventListener("transitionend", self.onTransitionEnd);
            },1000);

        }
    
    }

    change_text(text) {
        this._loadingTextDiv.innerHTML = text;
    }

    change_progress_bar_percent(percent) {
        var value = percent * 196;
    }


    reset_scene_loading() {
        this.MB_total_loaded += this.MB_current_loaded;
        this.MB_current_loaded = 0;
    }

    load_func(event) {
        if (event.lengthComputable) {
            var dlCount = event.loaded / (1024 * 1024);
            this.MB_current_loaded =  (Math.floor(dlCount * 100.0) / 100.0);   
        }
        var current_value = this.get_real_total_loaded();
    
        this.change_progress_bar_percent(this.get_real_total_loaded()/this.MB_total_to_load)
    }

    get_real_total_loaded() {
        return this.MB_total_loaded + this.MB_current_loaded;
    }

    displayLoadingUI() {
        if (this._loadingDiv) {
            return;
        }
        this._loadingDiv = document.createElement("div");
        this._loadingDiv.id = "babylonjsLoadingDiv";
        this._loadingDiv.style.opacity = "0";
        this._loadingDiv.style.transition = "opacity 1.5s ease";
        this._loadingDiv.style.pointerEvents = "none";
        this._loadingDiv.style.backgroundColor = "green";
        // The background
        this._loadingBackgroundDiv = document.createElement("div");
        this._loadingBackgroundDiv.style.width = "100%";
        this._loadingBackgroundDiv.style.height = "100%";
        this._loadingBackgroundDiv.style.left = "0";
        this._loadingBackgroundDiv.style.top = "0";
        this._loadingBackgroundDiv.style.position = "absolute";
        this._loadingBackgroundDiv.style.backgroundColor = "black";
        this._loadingDiv.appendChild(this._loadingBackgroundDiv);

        // CENTER DIV

        this._loadingCenterDiv = document.createElement("div");
        this._loadingCenterDiv.style.width = "300px";
        this._loadingCenterDiv.style.height = "400px";
        this._loadingCenterDiv.style.top = "30%";
        this._loadingCenterDiv.style.left = "40%";
        this._loadingCenterDiv.style.position = "absolute";
        this._loadingCenterDiv.style.backgroundColor = "black";
        this._loadingDiv.appendChild( this._loadingCenterDiv);

    
        // Loading text
        this._loadingTextDiv = document.createElement("div");
        this._loadingTextDiv.style.position = "absolute";
        this._loadingTextDiv.style.left = "0";
        this._loadingTextDiv.style.top = "45%";
        this._loadingTextDiv.style.marginTop = "80px";
        this._loadingTextDiv.style.width = "100%";
        this._loadingTextDiv.style.height = "20px";
        this._loadingTextDiv.style.fontFamily = "Arial";
        this._loadingTextDiv.style.fontSize = "14px";
        this._loadingTextDiv.style.color = "white";
        this._loadingTextDiv.style.textAlign = "center";
        this._loadingTextDiv.innerHTML = "Loading";
        this._loadingCenterDiv.appendChild(this._loadingTextDiv);
        //set the predefined text
        this.change_text("Génération des robots...");
        // Generating keyframes
        var style = document.createElement('style');
        style.type = 'text/css';
        var keyFrames = "@-webkit-keyframes spin1 { 0% { -webkit-transform: rotate(0deg);}\n                    100% { -webkit-transform: rotate(360deg);}\n                }                @keyframes spin1 {                    0% { transform: rotate(0deg);}\n                    100% { transform: rotate(360deg);}\n                }";
        style.innerHTML = keyFrames;
        document.getElementsByTagName('head')[0].appendChild(style);

        // Container div

        // Loading img
        var imgBack = new Image();
        imgBack.src = "assets/images/robot_head.png";
        imgBack.style.position = "absolute";
        imgBack.style.left = "100px";
        imgBack.style.top = "20%";
        imgBack.style.width = "100px";
        imgBack.style.height = "100px";
        // imgBack.style.marginLeft = "-60px";
        // imgBack.style.marginTop = "-60px";
        imgBack.style.animation = "spin1 2s infinite ease-in-out";
        imgBack.style.webkitAnimation = "spin1 2s infinite ease-in-out";
        imgBack.style.transformOrigin = "50% 50%";
        imgBack.style.webkitTransformOrigin = "50% 50%";
        this._loadingCenterDiv.appendChild(imgBack);
    
        window.addEventListener("resize", this._resizeLoadingUI);
        this._loadingDiv.style.backgroundColor = this._loadingDivBackgroundColor;
        document.body.appendChild(this._loadingDiv);
        this._loadingDiv.style.opacity = "1";
    }


}