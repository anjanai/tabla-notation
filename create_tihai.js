$( document ).ready(function() {
    let tr = "<tr>";
    $.each("N T=N*4+1 V P=INT(T/3) S Palla".split(' '), function (_,val) {
	tr += `<th>${val}</th>`;
    });
    tr += "</tr>";
    tr += "<tr>";
    for (let n=1; n<17;n++) {
	let t=n*4+1;
	let v = t%3;
	if (v) v = 3-v;
	let p = Math.trunc(t/3);
	let s = p - 1;
	if (v) s = p - v;
	let palla = "ABCDEFGHIJKLMNOPQRST".substring(0,s) + " dhaa " + " - ".repeat(v);
	
	tr += `<td>${n}</td>`;
	tr += `<td>${t}</td>`;
	tr += `<td>${v}</td>`;
	tr += `<td>${p}</td>`;
	tr += `<td>${s}</td>`;
	tr += `<td>${palla}</td>`;
        tr += "</tr>";
    }
    $("#tihai_table").append(tr);
});

