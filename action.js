function init(){
	for(var i=0; i<4; i++){
		createrow();
	}
	$('main').onclick = function(ev){
		judge(ev);
	}
	clock = window.setInterval('move()',30);
}
function $(id){
	return document.getElementById(id);
}
//create div
function creatediv(className){
	var div = document.createElement('div');
	div.className = className;
	return div;
}

//创建一个<div class="row">并且有四个子节点<div class="cell">
function createrow(){
	var con = $('con');
	var row = creatediv('row');
	var arr = createcell();
	con.appendChild(row);
	for (var i = 0; i < 4; i++){
		row.appendChild(creatediv(arr[i]));
	}
	if(con.firstChild == null){
		con.appendChild(row);
	}
	else{
		con.insertBefore(row, con.firstChild);
	}
}

//删除div#con的子节点中最后那个<div class="row"> 
function delrow(){
	var con = $('con');
	if(con.childNodes.length == 6){
		con.removeChild(con.lastChild);
	}
}

function createcell(){
	var temp = ['cell','cell','cell','cell'];
	var i = Math.floor(Math.random()*4);
	temp[i] = 'cell black';
	return temp;
}

function move(){
	var con = $('con');
	var top = parseInt(window.getComputedStyle(con, null)['top']);
	if(speed + top > 0){
		top = 0;
	}
	else{
		top += speed;
	}
	con.style.top = top + 'px';

	if(top == 0){
		createrow();
		con.style.top = '-100px';
		delrow();
	}
	//有一行抵达底边，判定游戏fail
	else if(top == (-100+speed)){
		var rows = con.childNodes;
		if((rows.length = 5) && (rows[rows.length-1].pass !== 1)){
			fail();
		}
	}
}

function fail(){
	clearInterval(clock);
	confirm('your final score is '+parseInt($('score').innerHTML));
}

function judge(ev){
	if (ev.target.className.indexOf('black')!=-1) {
		ev.target.className = 'cell';
		ev.target.parentNode.pass = 1;
		score();
	}
}

function score(){
	var newscore = parseInt($('score').innerHTML)+1;
	$('score').innerHTML = newscore;
	// if(newscore%10==0){
	// 	speedup();
	// }
}