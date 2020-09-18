var create_cipher_scene_lvl1 = function (game) {
    level1Grid = new Grid();
    ruleInLine1 = new Rule(1,0,true,1);
    ruleInLine2 = new Rule(2,0,true,1);
    ruleInLine3 = new Rule(3,0,true,2);
    ruleInLine4 = new Rule(0,1,true,1);
    ruleInLine5 = new Rule(0,2,true,1);
    ruleInLine6 = new Rule(0,3,true,2);
    square1 = new Polynomial();
    square1.add(1,1);
    square2 = new Polynomial();
    square2.add(2,1);
    square3 = new Polynomial();
    square3.add(3,1);
    square4 = new Polynomial();
    square4.add(1,2);
    square5 = new Polynomial();
    square5.add(2,2);
    square6 = new Polynomial();
    square6.add(1,3);
    square7 = new Polynomial();
    square7.add(2,3);
    square8 = new Polynomial();
    square8.add(3,3);
    level1Grid.addComponent(ruleInLine1);
    level1Grid.addComponent(ruleInLine2);
    level1Grid.addComponent(ruleInLine3);
    level1Grid.addComponent(ruleInLine4);
    level1Grid.addComponent(ruleInLine5);
    level1Grid.addComponent(ruleInLine6);
    level1Grid.addComponent(square1);
    level1Grid.addComponent(square2);
    level1Grid.addComponent(square3);
    level1Grid.addComponent(square4);
    level1Grid.addComponent(square5);
    level1Grid.addComponent(square6);
    level1Grid.addComponent(square7);
    level1Grid.addComponent(square8);

    var on_succeed = function () {
        game.add_arena(create_cipher_scene_lvl2(game));
        game.change_scene_by_name("Cipher2");
    };

    level1Cipher = new CipherGame(game, level1Grid, "Cipher1", on_succeed);
    level1Cipher.set_x_shift(2);
    level1Cipher.set_y_shift(1);
    level1Cipher.buildMeshes();

    arena = level1Cipher.arena;

    return arena;
}