//htmlが読み込んだ後に実行
window.onload = function() {
	draw();
}

function draw() {
	//htmlの要素を確認。なければエラー。
	var canvas = document.getElementById('mycanvas');
	if (!canvas || !canvas.getContext) return false;
	
	//描写の種類（2dしかない）
	var ctx = canvas.getContext('2d');
	
	ctx.strokeRect(10, 10, 50, 50);
}

function showStageArea() {
	var stageArea = canvas.getContext('2d');
	
	
}