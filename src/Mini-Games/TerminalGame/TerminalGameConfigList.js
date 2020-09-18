function generate_line(length) {
    var result           = '';
    var characters       = '()[]""!§?:,*£$-|}~é&/><';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function shuffle_array(array) {
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function random_hexa() {
    return '0x'+Math.floor(Math.random()*16777215).toString(16);
}

function generate_text(n_lines, lenght, words) {
    var words_copy = Array.from(["word1", "word2"]);
    var lines = [];
    var text = [];
    for (let i = 0 ; i < n_lines ; i ++) {
        text.push(generate_line(lenght));
        lines.push(i);
    }
    shuffle_array(lines);
    for (let i = 0 ; i < words.length ; i++) {
        var line = lines[i];
        var random_start = getRandomInt(0,lenght-words[i].length);
        var new_line = text[line].substring(0,random_start) + words[i] + text[line].substring(random_start+words[i].length,text[line].length);
        text[line] = new_line;

    }
    var new_text = "";
    for (let i = 0 ; i < n_lines ; i ++) {
        new_text += random_hexa() + "   " + text[i] + "\n";
    }
    return new_text;
}

/*
 ------------------ ALL CONFIGS
 */

var terminalConfigs = [];




var words2 = ["FINES", "FRIES","TRIED","LIKES","LIVES"];
var terminalText2 = generate_text(9,23,words2);
var terminalGameConfig2 = new TerminalGameConfig(terminalText2,words2, "LIKES",3);


var words4 = ["TANKS", "TIRES","TRICK","SKIES","TIMES"];
var terminalText4 = generate_text(9,23,words4);
var terminalGameConfig4 = new TerminalGameConfig(terminalText4,words4, "TIMES",3);

var words5 = ["THAT", "WHAT","WANT","MORE","VERY"];
var terminalText5 = generate_text(9,23,words5);
var terminalGameConfig5 = new TerminalGameConfig(terminalText5,words5, "MORE",3);

terminalConfigs.push(terminalGameConfig5);//0
terminalConfigs.push(terminalGameConfig2);//1
terminalConfigs.push(terminalGameConfig4);//2


var words1 = ["FALLING", "FALLOUT","FARTHER","FARMING","WARNING"];
var terminalText1 = generate_text(9,23,words1);
var terminalGameConfig1 = new TerminalGameConfig(terminalText1,words1, "FALLING",3);

var words3 = ["BONFIRE", "GUNFIRE","FOXFIRE","CONFINE","PREWORN"];
var terminalText3 = generate_text(9,23,words3);
var terminalGameConfig3 = new TerminalGameConfig(terminalText3,words3, "BONFIRE",3);

var words6 = ["ANYTHING", "ACTUALLY","ANYWHERE","HORRIBLE","SLEEPING"];
var terminalText6 = generate_text(9,23,words6);
var terminalGameConfig6 = new TerminalGameConfig(terminalText6,words6, "ANYWHERE",3);


terminalConfigs.push(terminalGameConfig1);//3
terminalConfigs.push(terminalGameConfig3);//4
terminalConfigs.push(terminalGameConfig6);//5

var words7 = ["SOMETHING", "SOMETIMES","SOMEWHERE","SITUATION","SERIOUSLY"];
var terminalText7 = generate_text(9,23,words7);
var terminalGameConfig7 = new TerminalGameConfig(terminalText7,words7, "SOMEWHERE",3);

var words8 = ["HAPPENING", "HIDEAWAYS","ABANDONED","ACROPOLIS","ABDOMINAL"];
var terminalText8 = generate_text(9,23,words8);
var terminalGameConfig8 = new TerminalGameConfig(terminalText8,words8, "ABANDONED",4);

terminalConfigs.push(terminalGameConfig7);//6
terminalConfigs.push(terminalGameConfig8);//7
