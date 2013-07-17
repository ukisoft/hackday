//htmlが読み込んだ後に実行
window.onload = function() {
	draw();
}

var restTeamNumber;
var teamMaxNumber;
var winnerTeamName = "";
var stageWidth = 800;
var stageHeight = 600;

var iconSideSpace = 30;
var iconWidth = 50;
var iconIconSpace;

var blockSideSpace = 30;
var blockWidth = 50;
var blockHeight = 20;
var blockBlockSpace;

var scoreData;
var firstBlockFlg = true;


function draw() {
	
	$.getJSON("http://133.208.22.167:8080/events/result/2.json?callback=?",
  	function(data) {
		//data = [{name: "Absence", score: "80"},{name: "team2", score: "14"},{name: "チーム３", score: "14"},{name: "４番目のチーム", score: "14"},{name: "55555", score: "1"}];
		
		console.dir(data);
		scoreData = data;
		
		teamMaxNumber = data.length;
		restTeamNumber = data.length;
		
		iconIconSpace = (stageWidth - (2 * iconSideSpace) - (teamMaxNumber * iconWidth)) / (teamMaxNumber - 1);
		blockBlockSpace = (stageWidth - (2 * blockSideSpace) - (teamMaxNumber * blockWidth)) / (teamMaxNumber - 1);
		
		var topSpace = 30;
		var maxPoint = 0;
		for (var x = 0; x < scoreData.length; x++) {
			console.log(scoreData[x]["score"]);
			if (scoreData[x]["score"] > maxPoint) {
				maxPoint = scoreData[x]["score"];
			}
		}
		if (maxPoint * blockHeight > stageHeight * (8/10)) {
			blockHeight = (stageHeight * (8/10) - topSpace) / maxPoint;
		}
		
		//stageを描写
		showStageArea();
		
		//teamName表示
		for (var i = 0; i < teamMaxNumber; i++) {
			showTeamName(i);
		}
		
		//バーを表示
		doBlockRoop(0);
  	});
}

function showTeamName(teamNumber) {
		var nameText = prepareCanvas();

		var positionY = stageHeight * (8/10) + 10 + 20;
		var positionX = iconSideSpace + (iconWidth + iconIconSpace) * teamNumber + 20;
		
		var fontSizeDefault = 20;
		do {
			nameText.font = fontSizeDefault + "pt Arial";
			var lineHeigth = nameText.measureText("あ").width;
			fontSizeDefault--;
		} while (stageHeight * (1.5/10) < lineHeigth * scoreData[teamNumber]["name"].length);
		
		var nameTextN = "";
		for (var k = 0; k < scoreData[teamNumber]["name"].length; k++) {
			nameTextN += scoreData[teamNumber]["name"].charAt(k) + "¥n";
		}
		
		var splittedNameText = nameTextN.split('¥n');
		var lineHeight = nameText.measureText("あ").width;
		
		splittedNameText.forEach(function(text, i) {
    			nameText.fillText(text, positionX, positionY + lineHeight * i);
		});
}

function doBlockRoop (blockRow) {
	var timerFlg = false;
	if (timerFlg == false) {
		setTimeout( function() {
			timerFlg = true;
			if (firstBlockFlg == true) {
				showBarBlockRow(blockRow);
				doBlockRoop(blockRow);//得点のMAXを超えたら止める。
				firstBlockFlg = false;
			}
			else if (restTeamNumber > 0) {
				showBarBlockRow(blockRow + 1);
				doBlockRoop(blockRow + 1);//得点のMAXを超えたら止める。
			}
			timerFlg=false;
		}, 1 * 10);
		return;		
	}
}

function showBarBlockRow (blockRow) {
	for (var j = 0; j < scoreData.length; j++) {
		if (scoreData[j]["score"] == blockRow) {
			restTeamNumber--;
				if (restTeamNumber == 0) {
					//同率がいないかチェック
					var sameScoreCount = 0;
					for (var m = 0; m < scoreData.length; m++) {
						if (scoreData[m]["score"] == scoreData[j]["score"]) {
							sameScoreCount++;
						}
					}
					
					if (sameScoreCount <= 1) {
						winnerTeamName = scoreData[j]["name"];
						id = setTimeout(showWinnerName, 2 * 1000);
					}
					else {
						id = setTimeout(showJanken, 2 * 1000);
					}
				}
		}
		else if (scoreData[j]["score"] > blockRow) {
			showBarBlock(blockRow, j);
		}
	}
}

function showJanken() {
	var jankenWord = "優勝が複数チームいます！";
	var jankenWord2 = "じゃんけんで勝者を決めてください！";
	
	var jankenText = prepareCanvas();
	jankenText.font = "34pt Arial";
	
	var topSpace = stageHeight * (1/3);
	var lineHeigth = jankenText.measureText("あ").width;
	
	var positionY = topSpace + lineHeigth;
	var positionX = (stageWidth - lineHeigth * jankenWord.length) / 2;
	
	var positionY2 = positionY + lineHeigth + 10;
	var positionX2 = (stageWidth - lineHeigth * jankenWord2.length) / 2;
	
	var sideSpaceb = 10;
	var topSpaceb = 10;
	var positionYb = positionY - lineHeigth - topSpaceb / 2;
	var positionXb = positionX2 - sideSpaceb;
	var boardWidth = lineHeigth * jankenWord2.length + sideSpaceb * 2;
	var boardHeight = lineHeigth * 2 + topSpaceb * 2 + 10;
	
	var backBoard = prepareCanvas();
	backBoard.fillStyle = 'rgb(255, 255, 255)';
	backBoard.shadowColor = 'gray';
  	backBoard.shadowOffsetX = 2;
  	backBoard.shadowOffsetY = 2;
  	backBoard.shadowBlur = 2;
	backBoard.fillRect(positionXb, positionYb, boardWidth, boardHeight);
	backBoard.strokeRect(positionXb, positionYb, boardWidth, boardHeight);
	
	jankenText.fillStyle = 'rgba(255, 0, 0, 1)';
	jankenText.fillText(jankenWord, positionX, positionY);
	jankenText.fillText(jankenWord2, positionX2, positionY2);
}

function showWinnerName() {
	var nameText = prepareCanvas();
	nameText.font = "34pt Arial";
	
	var topSpace = stageHeight * (1/3);
	var lineHeigth = nameText.measureText("あ").width;
	
	var positionY = topSpace + lineHeigth;
	var positionX = (stageWidth - lineHeigth * (winnerTeamName.length + 8)) / 2;
	
	var sideSpaceb = 20;
	var topSpaceb = 10;
	var positionYb = positionY - lineHeigth - topSpaceb / 2;
	var positionXb = positionX - sideSpaceb;
	var boardWidth = lineHeigth * (winnerTeamName.length + 8) + sideSpaceb * 2;
	var boardHeight = lineHeigth + topSpaceb * 2;
	
	var backBoard = prepareCanvas();
	backBoard.fillStyle = 'rgb(255, 255, 255)';
	backBoard.shadowColor = 'gray';
  	backBoard.shadowOffsetX = 2;
  	backBoard.shadowOffsetY = 2;
  	backBoard.shadowBlur = 2;
	backBoard.fillRect(positionXb, positionYb, boardWidth, boardHeight);
	backBoard.strokeRect(positionXb, positionYb, boardWidth, boardHeight);
	
	nameText.fillStyle = 'rgba(255, 0, 0, 1)';
	nameText.fillText("The Winner is " + winnerTeamName + "!!", positionX + 20, positionY);
}

function showBarBlock (blockRow, blockColumn) {
	var block = prepareCanvas();
	
	var positionY = stageHeight * (8/10) - blockHeight * (blockRow + 1);
	var positionX = blockSideSpace + (blockWidth + blockBlockSpace) * blockColumn;
	
	if (blockRow >= 5 && blockRow < 10) {
		block.fillStyle = 'rgb(255, 100, 100)';
		block.fillRect(positionX, positionY, blockWidth, blockHeight);
	}
	else if (blockRow >= 10) {
		block.fillStyle = 'rgb(255, 0, 0)';
		block.fillRect(positionX, positionY, blockWidth, blockHeight);
	}
	block.strokeRect(positionX, positionY, blockWidth, blockHeight);
}

function prepareCanvas() {
	//htmlの要素を確認。なければエラー。
	var canvas = document.getElementById('mycanvas');
	if (!canvas || !canvas.getContext) return false;
	var rtnCanvas = canvas.getContext('2d');
	return rtnCanvas;
}

function showStageArea() {
	
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

