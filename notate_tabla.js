var tabla_bols = {};		// कत् -> K4
var vishwa_bols = {};		// K4 -> कत्
var english_bols = {};		// कत् -> kat
var hindi_bols = {};		// kat -> कत् 
var current_format = "devanagari"


var bols = `
. . . कत् K4 kat    कि K2 ki	क्ड​ (K2D8) kDa	के K1 ke    क K3	ka
    गे G1 ge 	 गद् G3 gad	गत् G3 gat 	ग G3 ga
    घें H1 ghen घे H1 ghe	 घिं H2 ghin	घि H2 ghi 
    ता T1 taa	 तिं T2 tin	तू T3 too	ति T4 ti
    तेत् T6 tet	 त्र T9 tra	त T7 ta		धा D1 dhaa
    धिं D2 dhin	 धि D4 dhi	धेत् D6 dhet	धे D6 dhe	ध D6 dha 
    दी D7 di	 दिं D7 din  दि  D7 di  	ना N1 naa	ने N2 ne		न n2 na
    ट T8 Ta 	 डा D8 Daa ड D8 Da	रा R1 raa	र R1 ra
`.trim().split(/\s+/);

var phrases = `
. तिट कत गदी गने धात्रक धेतिट धा-ने 
धिरधिर किटतक तिरकिट ता-तिर
`.trim().split(/\s+/);

function makeTihai () {
    let orig = $("#notation").val().trim();
    tihai = orig + " <spanclass=tihai1>" + orig + " <spanclass=tihai2>" + orig;
    $("#notation").val(tihai);
    createNotation();
    html = document.getElementById("formatted").outerHTML;
    console.log(navigator.clipboard.writeText(html));
    $("#notation").val(orig);
    saveNotation();
}

function saveNotation () {
    format = ($('input[name=format]:checked').val());
    txt = $("#notation").val();
    localStorage.setItem("tabla_notation_format", format);
    localStorage.setItem("tabla_notation", txt);
}

function vishwaLine(l, bols_per_beat, beats_per_line) {
    //Replace numbers by -
    l = l.replace(/ \d /g, " - ");
    
    l = l.trim().split(/\s+/);
    let lines = [];
    let chunk = bols_per_beat * beats_per_line;
    for (let i=0; i<l.length; i+=chunk) {
	let temparray = l.slice(i,i+chunk);
	let line = ""
	for (let k=0; k<temparray.length; k+=bols_per_beat) {
	    line += temparray.slice(k,k+bols_per_beat).join("");
	    line += " | ";
	}
	line = line.replace(/\| $/, '');
	lines.push(line);
    }

    /*
    //line = line.replace(/(-|\d)/g, '$1|');
    
    //Remove all the | chars inside brackets
    line = line.replace(/(\(.*?\))/g, function(m, match) {
	return m.replace(/\|/g, "");
    });
    line = line.replace(/(\{.*?\})/g, function(m, match) {
	return m.replace(/\|/g, "");
    });
    
    line = line.replace(/\}/g, '}|');
    
    line = line.replace(/\)/g, ')|');
    
    line = line.replace(/\| $/, '');
*/
    return lines;
}

function copyVishwamohini() {
    createVishwamohini();
    console.log(navigator.clipboard.writeText($("#converted").html()));
}

function copyNotation() {
    createNotation();
    html = document.getElementById("formatted").outerHTML;
    console.log(navigator.clipboard.writeText(html));
}


function createNotation() {
    saveNotation();
    tbody = $("#formatted tbody"); 
    tbody.empty();
    let orig;
    orig = $("#notation").val().trim();
    
    format = ($('input[name=format]:checked').val());
    if (format === 'english') {
	for (let key in tabla_bols) {
	    orig = orig.replace(new RegExp(key, "g"), english_bols[key]);
	}
    }
    

    let lines = orig.split("\n");
    let bols_per_beat = Number($("#bols_per_beat").val());
    let beats_per_line = $("#beats_per_line").val();

    
    $.each(lines, function (i, line) {
	line = line.trim().split(/\s+/);
	markup = "<tr>";
	for (let i=0, j=0, k=0; i < line.length; i++) {
	    if (j++ == 0) markup += "<td>"
	    if (bols_per_beat > 0 || line[i] != "|") {
		markup += line[i] + " ";
	    }
	    if ((bols_per_beat <= 0 && line[i] == "|") ||
		(bols_per_beat > 0 && j == bols_per_beat)) {
		markup += "</td>"
		j =0;
		if (++k == beats_per_line) {
		    markup += "</tr><tr>"
		    k=0;
		}
		
	    }
	}
	
	markup += "</tr>\n";
	if (markup.includes("tihai"))
	    markup = colorTihai(markup); 
	tbody.append(markup); 
    });
    
}

function colorTihai(str) {
    str = str.replace(/spanclass/g, "span class");
    let parts = str.match(/(.*tihai1)(.*)(tihai2.*)/);

    console.log(parts[2]);
    let tihai2 = parts[2].replace(/<td>/g, "<td> <span class=tihai1>");
    let tihai3 = parts[3].replace(/<td>/g, "<td> <span class=tihai2>");
    return (parts[1]+ tihai2 + tihai3);
}

function createEnglishNottion() {
    saveNotation();
    orig = $("#notation").val().trim();
    for (let key in tabla_bols) {
	orig = orig.replace(new RegExp(key, "g"), english_bols[key]);
    }
    
}



function createVishwamohini() {
    saveNotation();
    orig = $("#notation").val().trim();

    first_letter = orig[0];
    if (first_letter.match(/[a-z]/i)) {
	for (let key in hindi_bols) {
	    orig = orig.replace(new RegExp(key, "g"), hindi_bols[key]);
	}
    }
	
    console.log(orig);
    for (let key in tabla_bols) {
	orig = orig.replace(new RegExp(key, "g"), tabla_bols[key]);
    }

    let bols_per_beat = Number($("#bols_per_beat").val());
    let beats_per_line = $("#beats_per_line").val();
    
    if (bols_per_beat <= 0)
	repl = orig;
    else
	repl = orig.replace(/\|/g, "");
    
    let lines = repl.split("\n");
    converted = "[melody start]\n" ;

    $.each(lines, function (i, line) {
	line = line.trim();
	if (line == "") {
	    converted += line;
	    return true;
	}
	
	for (line of vishwaLine(line, bols_per_beat, beats_per_line))
             converted += "[" + line + "]" + " [tabla]" + "\n";
    });
    
    converted += "\n[melody end]\n";
    
    $("#converted").text(converted);
}

function insertNote(id, span) {
    console.log (span);
    format = ($('input[name=format]:checked').val());
    if (format == "vishwamohini") {
	if (span == "bols") 
	    id = tabla_bols[id];
	else {
	    for (let key in tabla_bols) {
		id = id.replace(new RegExp(key, "g"), tabla_bols[key]);
	    }
	}
    }
    $("#notation").insertAtCaret(id);
}


function addButtons() {
    let i=0;
    for (i=0; i<bols.length; i+=3) {
	if (bols[i] == '.') {
	    $("#bols").append("<br>");
	    continue;
	}
	tabla_bols[bols[i]] = bols[i+1];
	vishwa_bols[bols[i+1]] = bols[i];
	english_bols[bols[i]] = bols[i+2];
	hindi_bols[ bols[i+2]] = bols[i];
	
	let b = $('<button/>', {
	    text: bols[i],
	    id: bols[i],
	    click: function () { insertNote(this.id, "bols"); }
	});
	b.addClass("bol");
	$("#bols").append(b);	    
    }

    i=0;
    for (i=0; i<phrases.length; i++) {
	if (phrases[i] == '.') {
	    $("#phrases").append("<br>");
	    continue;
	}
	let b = $('<button/>', {
	    text: phrases[i],
	    id: phrases[i],
	    click: function () { insertNote(this.id, "phrases"); }
	});
	b.addClass("bol");
	$("#phrases").append(b);	    
    }
}


$(document).ready(function () {
    addButtons();

    let coll = document.getElementsByClassName("collapsible");
    let i;
    
    for (i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function() {
	    let content = this.nextElementSibling;
	    if ($(this).attr('id') == "show_text") createNotation();
	    else createVishwamohini();
	    
	    let txt = $(this).text().split(' ');
	    if (txt[0]=="Hide") txt[0] = "Show";
	    else txt[0] = "Hide";
	    txt = txt.join(' ')
	    $(this).html(txt);
	    this.classList.toggle("active");
	    if (content.style.display === "block") {
		content.style.display = "none";
	    } else {
		content.style.display = "block";
	    }
	});
    }
    
    jQuery.fn.extend({
        insertAtCaret: function (myValue) {
            return this.each(function (i) {
                if (document.selection) {
                    //For browsers like Internet Explorer
                    this.focus();
                    sel = document.selection.createRange();
                    sel.text = myValue;
                    this.focus();
                }
                else if (this.selectionStart || this.selectionStart == '0') {
                    //For browsers like Firefox and Webkit based
                    let startPos = this.selectionStart;
                    let endPos = this.selectionEnd;
                    let scrollTop = this.scrollTop;
                    this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos, this.value.length);
                    this.focus();
                    this.selectionStart = startPos + myValue.length;
                    this.selectionEnd = startPos + myValue.length;
                    this.scrollTop = scrollTop;
                } else {
                    this.value += myValue;
                    this.focus();
                }
            })
        }
    });
    
   $("#notation").on('change keyup paste', function() {
	localStorage.setItem("tabla_notation", $(this).val());
    });

    $('#notation').val(localStorage.getItem('tabla_notation'));
    $('tabla_notation_format').val(localStorage.getItem("tabla_notation_format"));
});
