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
    $("table tbody tr td").removeClass("mark");

}

function startTihai(table_num) {
    stopTihai();
    stopped = false;
    n = 0;
    td_array = $("#table" + table_num + " tbody tr td");
    let bpm = $("#bpm"+table_num).val();
    let repeat = $("#repeat"+table_num).val();

    // 60,000 / bpm = Ms
    let time = 60000/bpm;
    colorNext(time, repeat);
}

function colorNext(time, repeat) {
    if (stopped) return;
    td_array.eq(n++).addClass("mark");
    if (n > td_array.length) {
	repeat--;
	if (repeat == 0) return stopTihai();
	n=0;
	$("table tbody tr td").removeClass("mark");
    }
    setTimeout(colorNext.bind(null, time, repeat), time, repeat);
    beep.play(); 
}
