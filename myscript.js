//htmlが読み込んだ後に実行
window.onload = function() {
	draw();
}

var restTeamNumber;
var teamMaxNumber;
var winnerTeamName;
var stageWidth = 800;
var stageHeight = 600;

var scoreData;


function draw() {
	
	$.getJSON("http://133.208.22.167:8080/events/result/2.json?callback=?",
  	function(data) {
		data = [{name: "Absence", score: "0"},{name: "team2", score: "6"},{name: "チーム３", score: "8"},{name: "４番目のチーム", score: "4"},{name: "55555", score: "1"}];
		
		teamMaxNumber = data.length;
		restTeamNumber = data.length;
		winnerTeamName = "";
		
		var iconSideSpace = 30;
		var iconWidth = 50;
		var iconIconSpace = (stageWidth - (2 * iconSideSpace) - (teamMaxNumber * iconWidth)) / (teamMaxNumber - 1);
		
		var blockSideSpace = 30;
		var blockWidth = 50;
		var blockHeight = 20;
		var blockBlockSpace = (stageWidth - (2 * blockSideSpace) - (teamMaxNumber * blockWidth)) / (teamMaxNumber - 1);
		
		//stageを描写
		showStageArea(stageWidth, stageHeight);
		
		//icon表示
		for (i = 0; i < teamMaxNumber; i++) {
			//showIcon(stageHeight, iconSideSpace, iconWidth, iconIconSpace, i);
			showTeamName(stageHeight, iconSideSpace, iconWidth, iconIconSpace, i, data);
		}
		
		//バーを表示...test
		doBlockRoop (stageHeight, blockSideSpace, blockWidth, blockHeight, blockBlockSpace, 0, data);
  	});
}

//teamName
function showTeamName(stageHeight, iconSideSpace, iconWidth, iconIconSpace, teamNumber, scoreData) {
		var nameText = prepareCanvas();
		nameText.font = "20pt Arial";

		var positionY = stageHeight * (8/10) + 10 + 20;
		var positionX = iconSideSpace + (iconWidth + iconIconSpace) * teamNumber + 15;
		
		var nameTextN = "";
		for (k = 0; k < scoreData[teamNumber]["name"].length; k++) {
			nameTextN += scoreData[teamNumber]["name"].charAt(k) + "¥n";
		}
		
		var splittedNameText = nameTextN.split('¥n');
		var lineHeight = nameText.measureText("あ").width;
		
		splittedNameText.forEach(function(text, i) {
    			nameText.fillText(text, positionX, positionY + lineHeight * i);
		});
}


//blockRoop
function doBlockRoop (stageHeight, blockSideSpace, blockWidth, blockHeight, blockBlockSpace, blockRow, scoreData) {
	var timerFlg = false;
	if (timerFlg == false) {
		setTimeout( function() {
			timerFlg = true;
			if (restTeamNumber == teamMaxNumber) {
				showBarBlockRow(stageHeight, blockSideSpace, blockWidth, blockHeight, blockBlockSpace, blockRow, scoreData);
				doBlockRoop(stageHeight, blockSideSpace, blockWidth, blockHeight, blockBlockSpace, blockRow, scoreData);//得点のMAXを超えたら止める。
			}
			else if (restTeamNumber > 0) {
				showBarBlockRow(stageHeight, blockSideSpace, blockWidth, blockHeight, blockBlockSpace, blockRow + 1, scoreData);
				doBlockRoop(stageHeight, blockSideSpace, blockWidth, blockHeight, blockBlockSpace, blockRow + 1, scoreData);//得点のMAXを超えたら止める。
			}
			timerFlg=false;
		}, 1 * 1000);
		return;		
	}
}

function showBarBlockRow (stageHeight, blockSideSpace, blockWidth, blockHeight, blockBlockSpace, blockRow, scoreData) {
	for (j = 0; j < scoreData.length; j++) {
		if (scoreData[j]["score"] == blockRow) {
			restTeamNumber--;
			console.log("restTeamNumber" + restTeamNumber);
				if (restTeamNumber == 0) {
					console.log("ii");
					//[aaaaa//同率がいないかチェック
					winnerTeamName = scoreData[j]["name"];
					id = setTimeout(showWinnerName, 2 * 1000);
				}
			showBarBlock(stageHeight, blockSideSpace, blockWidth, blockHeight, blockBlockSpace, blockRow, j);
		}
		else if (scoreData[j]["score"] > blockRow) {
			showBarBlock(stageHeight, blockSideSpace, blockWidth, blockHeight, blockBlockSpace, blockRow, j);
		}
	}
}

function showWinnerName() {
	console.log("aa");
	
	var nameText = prepareCanvas();
	nameText.font = "34pt Arial";
	
	var sideSpace = 30;
	var topSpace = 200;
	var lineHeight = nameText.measureText("あ").width;
	
	var positionY = sideSpace + lineHeight;
	var positionX = topSpace;
	
	nameText.fillText("優勝：" + winnerTeamName, positionX, positionY);
}

function showBarBlock (stageHeight, blockSideSpace, blockWidth, blockHeight, blockBlockSpace, blockRow, blockColumn) {
	var block = prepareCanvas();
	
	var positionY = stageHeight * (8/10) - blockHeight * (blockRow + 1);
	var positionX = blockSideSpace + (blockWidth + blockBlockSpace) * blockColumn;
	
	if (blockRow >= 5) {
		block.fillStyle = 'rgb(255, 0, 0)';
		block.fillRect(positionX, positionY, blockWidth, blockHeight);
	}
	block.strokeRect(positionX, positionY, blockWidth, blockHeight);
}


//prepareCanvas
function prepareCanvas() {
	//htmlの要素を確認。なければエラー。
	var canvas = document.getElementById('mycanvas');
	if (!canvas || !canvas.getContext) return false;
	var rtnCanvas = canvas.getContext('2d');
	return rtnCanvas;
}

//stage
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

//icon
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

