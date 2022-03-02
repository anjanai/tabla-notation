const str  = `2;Theka

2;Kaida main theme
धागे नाधा तीट तीट धागे तिंना केना 
ताके नाधा तीट तीट धागे धिंना गेना  

2;Kaida main theme : last part in 1.5x speed
धागे नाधा तीट तीट धागेना धागेतिं नाकेना
ताके नाधा तीट तीट धागेना धागेधिं नागेना

2;Kaida main theme : last part in 2x speed
धागे नाधा तीट तीट धागेधिंना गेनाधागे तिंनाकेना
ताके नाधा तीट तीट धागेधिंना गेनाधागे धिंनागेना

2;Kaida main theme : entirely in 2x speed : twice
धागेनाधा तीटतीट धागेतिंना केनाताके नाधातीट तीटधागे धिंनागेना
धागेनाधा तीटतीट धागेतिंना केनाताके नाधातीट तीटधागे धिंनागेना

2;Var  नाधा तीट धागे नाधा तीट तीट   MT

2;Var  धागे नाधा तीट धा- -धा तीट तीट    MT

2;Var  धागे नाधा तीट धागे नाधा गेना तीट   MT
`;

const cycles = str.split("\n\n");
const bpm = 100;
const beats = 14;
const cycle_time = beats/bpm * 60 * 1000;
console.log (cycle_time);

const begin_time = {
    hh:0,
    mm:55,
    ss:06,
};

$(document).ready(function () {
    var d = new Date();
    d.setHours(begin_time.hh, begin_time.mm, begin_time.ss);
    var html = "";
    let varnum=1;
    $.each(cycles, function (i, variation) {
	let txt = variation.substring(2);
	let num_cycles = variation.substring(0,1);
	if (txt.match(/Var/))
	    txt = txt.replace(/Var/, "Var " + varnum++);
	//2022-03-02T08:55:06.299Z
	let datetext = d.format("HH:MM:ss.l");
	let newd = new Date(d.getTime() + num_cycles * cycle_time );

	datetext += "," + newd.format("HH:MM:ss.l");
	console.log (datetext);
	d = newd;		    
	html += datetext + "\n" + txt + "\n\n";
    });
    $("#wrapper").append(html);
    
});
