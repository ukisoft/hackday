//htmlが読み込んだ後に実行
window.onload = function() {
	draw();
}

function draw() {
	var stageWidth = 800;
	var stageHeight = 600;
	var iconSideSpace = 20;
	var iconWidth = 50;
	var teamMaxNumber = 8;
	
	var iconIconSpace = (stageWidth - (2 * iconSideSpace) - (teamMaxNumber * iconWidth)) / (teamMaxNumber - 1);
		
	//stageを描写
	showStageArea(stageWidth, stageHeight);
	
	//icon表示
	for (i = 0; i < teamMaxNumber; i++) {
		showIcon(stageWidth, stageHeight, iconSideSpace, iconWidth, iconIconSpace, i);
	}
	
	
}

function prepareCanvas() {
	//htmlの要素を確認。なければエラー。
	var canvas = document.getElementById('mycanvas');
	if (!canvas || !canvas.getContext) return false;
	return canvas;
}

function showStageArea(stageWidth, stageHeight) {
	var canvas = prepareCanvas();
	
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

function showIcon(stageWidth, stageHeight, iconSideSpace, iconWidth, iconIconSpace, teamNumber) {
	var iconImg = new Image();
	//var iconFilePath = new iconImg.File("icon" + teamNumber + ".jpg");
	//if (iconFilePath.exists) {
	
		
		iconImg.src = "icon" + teamNumber + ".jpg";
		//if (iconImg.FileExists) {
			var canvas = prepareCanvas();
			var icon = canvas.getContext('2d');
			
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


