var create_cipher_scene_lvl2 = function (game) {
    level2Grid = new Grid();
    ruleInLine1 = new Rule(1,0,true,1);
    ruleInLine2 = new Rule(2,0,true,1);
    ruleInLine3 = new Rule(0,1,true,1);
    ruleAround1 = new Rule(3,1,false,1);
    ruleAround2 = new Rule(1,2,false,2);
    ruleAround3 = new Rule(2,3,false,2);
    square1 = new Polynomial();
    square1.add(1,1);
    square2 = new Polynomial();
    square2.add(2,1);
    square3 = new Polynomial();
    square3.add(2,2);
    square4 = new Polynomial();
    square4.add(3,2);
    square5 = new Polynomial();
    square5.add(1,3);
    square6 = new Polynomial();
    square6.add(3,3);
    level2Grid.addComponent(ruleInLine1);
    level2Grid.addComponent(ruleInLine2);
    level2Grid.addComponent(ruleInLine3);
    level2Grid.addComponent(ruleAround1);
    level2Grid.addComponent(ruleAround2);
    level2Grid.addComponent(ruleAround3);
    level2Grid.addComponent(square1);
    level2Grid.addComponent(square2);
    level2Grid.addComponent(square3);
    level2Grid.addComponent(square4);
    level2Grid.addComponent(square5);
    level2Grid.addComponent(square6);

    var on_succeed = function () {
        game.change_scene_by_name("CrimeRoom", Location.CRIME_ROOM_FROM_HALL);
    };

    level2Cipher = new CipherGame(game, level2Grid, "Cipher2", on_succeed);
    level2Cipher.set_x_shift(2);
    level2Cipher.set_y_shift(1);
    level2Cipher.buildMeshes();

    arena = level2Cipher.arena;

    return arena;
}