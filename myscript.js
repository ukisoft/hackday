//htmlが読み込んだ後に実行
window.onload = function() {
	draw();
}

function draw() {
	//htmlの要素を確認。なければエラー。
	var canvas = document.getElementById('mycanvas');
	if (!canvas || !canvas.getContext) return false;
	
	//stageを描写
	showStageArea(800, 600);
	
	//描写の種類（2dしかない）
	var ctx = canvas.getContext('2d');
	
	ctx.strokeRect(10, 10, 50, 50);
}

function showStageArea(stageWidth, stageHeight) {
	//htmlの要素を確認。なければエラー。
	var canvas = document.getElementById('mycanvas');
	if (!canvas || !canvas.getContext) return false;
	
	//外枠（削除予定）
	var stageArea = canvas.getContext('2d');
	stageArea.strokeRect(0, 0, stageWidth, stageHeight);
	
	//baseline
	var baseline = canvas.getContext('2d');
	baseline.beginPath();
	baseline.moveTo(0, stageHeight * (8/10));
	baseline.lineTo(stageWidth, stageHeight * (8/10));
	baseline.stroke();
}