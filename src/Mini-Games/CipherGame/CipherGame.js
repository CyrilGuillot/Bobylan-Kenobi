class CipherGame {
    constructor(game, grid, scene_name, on_succeed) {
        this.game = game;
        this.grid = grid;
        this.scene_name = scene_name;
        this.on_succeed = on_succeed;
        this.meshes = [];
        this._x_shift = 0;
        this._y_shift = 0;
        this.load_scene();
    }

    load_scene() {
        this.arena = this.game.arena_builder.build_simple_arena(this.scene_name, this.game.musics.CITY, "cipherGameRules");
        this.scene = this.arena.get_scene();

        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(-3, 10, 0), this.scene);
        camera.setTarget(BABYLON.Vector3.Zero());

        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);
        light.intensity = 0.4;

        var ground = BABYLON.MeshBuilder.CreateGround("myGround", {width: 15, height: 30}, this.scene);
        var ground_material = new BABYLON.StandardMaterial("ground",this.scene);
        ground_material.diffuseTexture = new BABYLON.Texture("assets/textures/wall-texture.jpg", this.scene);
        ground_material.diffuseColor = new BABYLON.Color3(0.7, 0.7, 0.7);
        ground.material = ground_material;
        var innerFrame = hall_cipher_inner_frame(this.scene);
        var frame = hall_cipher_frame(this.scene);

        var gl = new BABYLON.GlowLayer("glow", this.scene);
        gl.intensity = 0.5;
    }

    set_x_shift(value) {
        this._x_shift = value;
    }

    set_y_shift(value) {
        this._y_shift = value;
    }

    buildMeshes() {
        this.meshes.push(this.buildValidateButton(this.grid));
        for(const component of this.grid.grid) {
            if (component instanceof Polynomial) {
                this.meshes.push(this.buildSquare(component));
            }
            else {
                this.meshes.push(this.buildMeshRule(component));
            }
        }
    }

    // POLYNOMIAL MESH

    buildSquare(component) {
        let box = BABYLON.MeshBuilder.CreateBox("Polynomial" + component.squares[0].x + component.squares[0].y, {}, this.scene);
        box.setPositionWithLocalVector(new BABYLON.Vector3(-component.squares[0].y+this._y_shift, 0.2, -component.squares[0].x+this._x_shift));
        let boxMaterial = new BABYLON.StandardMaterial("boxM", this.scene);
        boxMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        boxMaterial.diffuseTexture = new BABYLON.Texture("assets/textures/screen-texture.jpg",this.scene);
        box.material = boxMaterial;
        this.on_click(box, component);
        return box;
    }

    // RULE MESH

    buildMeshRule(component) {
        let box = BABYLON.MeshBuilder.CreateBox("Rule"+component.x+component.y,{}, this.scene);
        box.setPositionWithLocalVector(new BABYLON.Vector3(-component.y+this._y_shift, 0.1, -component.x+this._x_shift));
        let boxMaterial = new BABYLON.StandardMaterial("boxM", this.scene);
        boxMaterial.diffuseColor = new BABYLON.Color3(0.34,0.46,0.78);
        boxMaterial.diffuseTexture = new BABYLON.Texture("assets/textures/screen-texture.jpg",this.scene);
        box.material = boxMaterial;

        if(component.ruleType) {
        //    InLineRule
            let mesh = this.buildInLineRule(component, box);
            return mesh;
        }
        else {
        //    AroundRule
            let mesh = this.buildAroundRule(component, box);
            return mesh;
        }

        return mesh;
    }

    // AROUND RULE MESH

    buildAroundRule(component, mesh) {
        var sphere1 = BABYLON.MeshBuilder.CreateSphere("mySphere", {diameter: 0.2}, this.scene);
        sphere1.setPositionWithLocalVector(new BABYLON.Vector3(-component.y+this._y_shift, 0.7, -component.x+this._x_shift));
        var sphereMaterial1 = new BABYLON.StandardMaterial("sphereM1", this.scene);
        sphereMaterial1.diffuseColor = BABYLON.Color3.Black();
        sphere1.material = sphereMaterial1;
        switch (component.nbRequired) {
            case 2 :
                var sphere2 = sphere1.clone();
                sphere1.setPositionWithLocalVector(new BABYLON.Vector3(-component.y+this._y_shift, 0.7, -component.x+this._x_shift-0.2));
                sphere2.setPositionWithLocalVector(new BABYLON.Vector3(-component.y+this._y_shift, 0.7, -component.x+this._x_shift+0.2));
                var mergedMesh = BABYLON.Mesh.MergeMeshes([mesh, sphere1, sphere2], true, true, undefined, false, true);
                break;
            case 3 :
                var sphere2 = sphere1.clone();
                var sphere3 = sphere1.clone();
                sphere1.setPositionWithLocalVector(new BABYLON.Vector3(-component.y+this._y_shift+0.2, 0.7, -component.x+this._x_shift));
                sphere2.setPositionWithLocalVector(new BABYLON.Vector3(-component.y+this._y_shift-0.2, 0.7, -component.x+this._x_shift-0.2));
                sphere3.setPositionWithLocalVector(new BABYLON.Vector3(-component.y+this._y_shift-0.2, 0.7, -component.x+this._x_shift+0.2));
                var mergedMesh = BABYLON.Mesh.MergeMeshes([mesh, sphere1, sphere2, sphere3], true, true, undefined, false, true);
                break;
            default :
                var mergedMesh = BABYLON.Mesh.MergeMeshes([mesh, sphere1], true, true, undefined, false, true);
        }
        return mergedMesh;
    }

    // IN LINE RULE MESH

    buildInLineRule(component, mesh) {
        if(component.x === 0) {
            var box1 = BABYLON.MeshBuilder.CreateBox("RuleInLine1-"+component.x+component.y, {height: 1.2, width: 0.25, depth: 0.6}, this.scene);
            box1.setPositionWithLocalVector(new BABYLON.Vector3(-component.y+this._y_shift, 0.2, -component.x+this._x_shift));
            var boxMaterial1 = new BABYLON.StandardMaterial("boxM1", this.scene);
            boxMaterial1.diffuseColor = BABYLON.Color3.Black();
            // boxMaterial1.diffuseTexture = new BABYLON.Texture("textures/screen-texture.jpg",this.scene);
            box1.material = boxMaterial1;
            switch (component.nbRequired) {
                case 2 :
                    var box2 = box1.clone();
                    box1.setPositionWithLocalVector(new BABYLON.Vector3(-component.y+this._y_shift-0.2, 0.2, -component.x+this._x_shift));
                    box2.setPositionWithLocalVector(new BABYLON.Vector3(-component.y+this._y_shift+0.2, 0.2, -component.x+this._x_shift));
                    var mergedMesh = BABYLON.Mesh.MergeMeshes([mesh, box1, box2], true, true, undefined, false, true);
                    break;
                case 3 :
                    var box2 = box1.clone();
                    var box3 = box1.clone();
                    box2.setPositionWithLocalVector(new BABYLON.Vector3(-component.y+this._y_shift-0.3, 0.2, -component.x+this._x_shift));
                    box3.setPositionWithLocalVector(new BABYLON.Vector3(-component.y+this._y_shift+0.3, 0.2, -component.x+this._x_shift));
                    var mergedMesh = BABYLON.Mesh.MergeMeshes([mesh, box1, box2, box3], true, true, undefined, false, true);
                    break;
                default :
                    var mergedMesh = BABYLON.Mesh.MergeMeshes([mesh, box1], true, true, undefined, false, true);
            }
            return mergedMesh;

        }
        else {
            var box1 = BABYLON.MeshBuilder.CreateBox("RuleInLine1-"+component.x+component.y, {height: 1.2, width: 0.6, depth: 0.25}, this.scene);
            box1.setPositionWithLocalVector(new BABYLON.Vector3(-component.y+this._y_shift, 0.2, -component.x+this._x_shift));
            var boxMaterial1 = new BABYLON.StandardMaterial("boxM1", this.scene);
            boxMaterial1.diffuseColor = BABYLON.Color3.Black();
            box1.material = boxMaterial1;
            switch (component.nbRequired) {
                case 2 :
                    var box2 = box1.clone();
                    box1.setPositionWithLocalVector(new BABYLON.Vector3(-component.y+this._y_shift, 0.2, -component.x+this._x_shift+0.2));
                    box2.setPositionWithLocalVector(new BABYLON.Vector3(-component.y+this._y_shift, 0.2, -component.x+this._x_shift-0.2));
                    var mergedMesh = BABYLON.Mesh.MergeMeshes([mesh, box1, box2], true, true, undefined, false, true);
                    break;
                case 3 :
                    var box2 = box1.clone();
                    var box3 = box1.clone();
                    box2.setPositionWithLocalVector(new BABYLON.Vector3(-component.y+this._y_shift, 0.2, -component.x+this._x_shift-0.3));
                    box3.setPositionWithLocalVector(new BABYLON.Vector3(-component.y+this._y_shift, 0.2, -component.x+this._x_shift+0.3));
                    var mergedMesh = BABYLON.Mesh.MergeMeshes([mesh, box1, box2, box3], true, true, undefined, false, true);
                    break;
                default :
                    var mergedMesh = BABYLON.Mesh.MergeMeshes([mesh, box1], true, true, undefined, false, true);
            }
            return mergedMesh;
        }
    }

    on_click(mesh, component){

        mesh.actionManager = new BABYLON.ActionManager(this.scene);

        mesh.actionManager.registerAction(

            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnLeftPickTrigger,
                function () {
                    component.click();
                    // update color
                    if (component.squares[0].activated) {
                        mesh.material.emissiveColor = BABYLON.Color3.Green();
                    }
                    else {
                        mesh.material.emissiveColor = BABYLON.Color3.Black();
                    }
                }
            )
        );
    }

    // VALIDATE BUTTON MESH

    buildValidateButton(grid) {
        var self = this;

        var box = BABYLON.MeshBuilder.CreateBox("Validate",{}, this.scene);
        box.setPositionWithLocalVector(new BABYLON.Vector3(2,0.2,0));
        var boxMaterial = new BABYLON.StandardMaterial("boxM", this.scene);
        boxMaterial.diffuseColor = BABYLON.Color3.Black();
        boxMaterial.emissiveColor = BABYLON.Color3.Blue();
        box.material = boxMaterial;
        box.actionManager = new BABYLON.ActionManager(this.scene);

        box.actionManager.registerAction(

            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnLeftPickTrigger,
                function () {
                    if(grid.verification()) {
                        // SUCCESS
                        box.material.emissiveColor = BABYLON.Color3.Green();
                        self.on_succeed();
                    }
                    else {
                        // FAILURE
                        box.material.emissiveColor = BABYLON.Color3.Red();
                        setTimeout(function () {
                            box.material.emissiveColor = BABYLON.Color3.Blue();
                        }, 1500);
                    }
                }
            )
        );
        return box;
    }
}