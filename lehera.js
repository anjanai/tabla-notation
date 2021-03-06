var n = 0;
var td_array ;
var lehera_bpm = 50;
var lehera = new Audio('roopak_lehera_50.mp3');;
var stopped = false;

function stopTihai() {
    stopped = true;
    $("table tbody tr td").removeClass("mark");
    lehera.pause();
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
    lehera.loop = 1;
    lehera.currentTime = 0;
    lehera.playbackRate = bpm/lehera_bpm;    
    lehera.play();
}


function colorNext(time, repeat) {
    if (stopped) return;
    if (n == 0) 	lehera.currentTime = 0;

    td_array.eq(n++).addClass("mark");
    if (n == td_array.length) {
	repeat--;
	if (repeat == 0)  stopTihai();
	n=0;
	setTimeout(function() {
	    $("table tbody tr td").removeClass("mark");
	}, 100);
    }
    setTimeout(colorNext, time, time, repeat);
}
