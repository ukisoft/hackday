//htmlが読み込んだ後に実行
window.onload = function() {
	draw();
}

function draw() {
	var stageWidth = 800;
	var stageHeight = 600;
	var teamMaxNumber = 8;
	
	var iconSideSpace = 30;
	var iconWidth = 50;
	var iconIconSpace = (stageWidth - (2 * iconSideSpace) - (teamMaxNumber * iconWidth)) / (teamMaxNumber - 1);
	
	var blockSideSpace = 30;
	var blockWidth = 50;
	var blockHeight = 30;
	var blockBlockSpace = (stageWidth - (2 * blockSideSpace) - (teamMaxNumber * blockWidth)) / (teamMaxNumber - 1);
	
	//stageを描写
	showStageArea(stageWidth, stageHeight);
	
	//icon表示
	for (i = 0; i < teamMaxNumber; i++) {
		showIcon(stageHeight, iconSideSpace, iconWidth, iconIconSpace, i);
	}
	
	//バーを表示...test
	for (i = 0; i < 8; i++) {
		for (j = 0; j < 10; j++) {
			showBarBlock(stageHeight, blockSideSpace, blockWidth, blockHeight, blockBlockSpace, i, j);
		}
	}
}

function prepareCanvas() {
	//htmlの要素を確認。なければエラー。
	var canvas = document.getElementById('mycanvas');
	if (!canvas || !canvas.getContext) return false;
	var rtnCanvas = canvas.getContext('2d');
	return rtnCanvas;
}

function showStageArea(stageWidth, stageHeight) {
	
	//外枠（削除予定）
	var stageArea = prepareCanvas();
	stageArea.strokeRect(0, 0, stageWidth, stageHeight);
	
	//baseline
	var baseline = prepareCanvas();
	baseline.beginPath();
	baseline.moveTo(0, stageHeight * (8/10));
	baseline.lineTo(stageWidth, stageHeight * (8/10));
	baseline.stroke();
}

function showIcon(stageHeight, iconSideSpace, iconWidth, iconIconSpace, teamNumber) {
	var iconImg = new Image();		
		iconImg.src = "icon" + teamNumber + ".jpg";
		var icon = prepareCanvas();
		
		var positionY = stageHeight * (8/10) + 10;
		var positionX = iconSideSpace + (iconWidth + iconIconSpace) * teamNumber;
		var iconHeight = iconImg.height * (iconWidth / iconImg.width);
				
		iconImg.onload = function() {
			icon.drawImage(iconImg, positionX, positionY, iconWidth, iconHeight);
		}
	//}
	/*else {
		var canvas = prepareCanvas();
		var context = canvas.getContext('2d');
		context.font = "20pt Arial";
		var teamNumberPlus = teamNumber + 1;
		context.fillText(teamNumberPlus + "班", positionX, positionY);
	}*/
}

function showBarBlock(stageHeight, blockSideSpace, blockWidth, blockHeight, blockBlockSpace, blockRow, blockColumn) {
	var block = prepareCanvas();
	
	var positionY = stageHeight * (8/10) - blockHeight * (blockRow + 1);
	var positionX = blockSideSpace + (blockWidth + blockBlockSpace) * blockColumn;
	
	block.strokeRect(positionX, positionY, blockWidth, blockHeight);
}
