var n = 0;
var td_array ;
var beep = new Audio('https://www.soundjay.com/button/beep-08b.mp3');;
var timeouts = [];
var stopped = false;

function stopTihai() {
    for (var i=0; i<timeouts.length; i++) {
	clearTimeout(timeouts[i]);
    }
    stopped = true;
}

function startTihai(table_num) {
    stopTihai();
    stopped = false;
    n = 0;
    let table = "#table" + table_num + " tbody tr td";
    let bpm = $("#bpm"+table_num).val();

    // 60,000 / bpm = Ms
    
    let time = 60000/bpm;
    $(table).removeClass("mark");
    td_array = $(table);;
    colorNext(time);
}

function colorNext(time) {
    if (stopped) return;
    td_array.eq(n++).addClass("mark");
    if (n > td_array.length) return;
    setTimeout(colorNext.bind(null, time), time);
    beep.play(); 
}
