$(document).ready(function(){
	runAnimation();
	resizeElements();

	$("#titleDiv2").hide();
	$(".choiceDiv").hide();
	$("#scoreScreen").hide();

	//onclick of the button
	$("#fadeLetters").click(function(){
		//Fade the letters
		//$(".letterDiv").fadeOut()
		//Fade the title bar
		$("#titleDiv").fadeOut(200)
		//Fade the button
		$("#fadeLetters").fadeOut(200)
		//Refit the main div
		$("#mainDiv").css("height", "99%")
		$("#mainDiv").css("margin", "1%")
		$("#mainDiv").css("border-width", "0px")
		//fade in the new buttons
		$(".choiceDiv").fadeIn(3000)
		playGame();
	});

});

var firstRound = true;

function toggleColour(count){
	var offCol = "black";
	var onCol = "rgba(0, 0, 0, 0)";
	var time = 750;

	if (count==1){
		if (firstRound != true){
			$("#letter6").css("background-image", "url('./images/plain_letters/E.png')");
		}
		firstRound = false;
		$("#letter1").css("background-image", "url('./images/colour_letters/C.png')");
		setTimeout(function()
		{
			toggleColour(2)
		}, time);
	}
	else if (count==2){
		$("#letter1").css("background-image", "url('./images/plain_letters/C.png')");
		$("#letter2").css("background-image", "url('./images/colour_letters/H.png')");
		setTimeout(function()
		{
			toggleColour(3)
		}, time);
	}
	else if (count==3){
		$("#letter2").css("background-image", "url('./images/plain_letters/H.png')");
		$("#letter3").css("background-image", "url('./images/colour_letters/A.png')");
		setTimeout(function()
		{
			toggleColour(4)
		}, time);
	}
	else if (count==4){
		$("#letter3").css("background-image", "url('./images/plain_letters/A.png')");
		$("#letter4").css("background-image", "url('./images/colour_letters/N.png')");
		setTimeout(function()
		{
			toggleColour(5)
		}, time);
	}
	else if (count==5){
		$("#letter4").css("background-image", "url('./images/plain_letters/N.png')");
		$("#letter5").css("background-image", "url('./images/colour_letters/C.png')");
		setTimeout(function()
		{
			toggleColour(6)
		}, time);
	}
	else if (count==6){
		$("#letter5").css("background-image", "url('./images/plain_letters/C.png')");
		$("#letter6").css("background-image", "url('./images/colour_letters/E.png')");
		setTimeout(function()
		{
			toggleColour(1)
		}, time);
	}
}


function runAnimation(){
	toggleColour(1)
}

function resizeElements(){
	var letterWidth = $("#letter1").width();
	$(".letterDiv").css("height", letterWidth);
}


////////////////////////Code For Running The Game Here///////////////////////////////////

//List of songs, name, (0 for ar, 1 for 10d, 2 for other), mp3 path
var songs = [["Cocoa Butter Kisses", 0, "./audio/AR/cocoaCut.mp3"],
		["Juice", 0, "./audio/AR/juiceCut.mp3"],
		["Favourite Song", 0, "./audio/AR/favSongCut.mp3"],
		["Interlude (That's Love)", 0, "./audio/AR/loveCut.mp3"],
		["Good Ass Intro", 0, "./audio/AR/introCut.mp3"]
		//Level 1 up to here

];

//A list of songs already played in a level
var playedSongs = [];

function playGame(){
	var currentLevel = 1;
	var failed = false;
	var numOfSongs = 0;
	while (failed == false){
		while (numOfSongs < 4){
			var playLevelLoop = window.setInterval(playLevel(currentLevel), 50);
			numOfSongs++;
		}
	}
}

function playLevel(levelNum){
	var winningSong;
	var selectedAnswer;
	var answerChosen = false;
	currentSongs = selectSongs(levelNum);
	winningSong = selectWinningSong(currentSongs);
	drawButton(currentSongs, 0, "#choice1B");
	drawButton(currentSongs, 1, "#choice2B");
	drawButton(currentSongs, 2, "#choice3B");
	drawButton(currentSongs, 3, "#choice4B");
	answerChosen = false;
		//Play the song
	$("#playSong").attr("src", songs[winningSong][2]);
	var audio = $("#playSong")[0];
	audio.play();
		//Check answer
	var checkAnswerLoop = window.setInterval(checkAnswer(currentSongs,winningSong), 30);
	
	while (answerChosen == false){
		
	}
	alert("Got here");
}

function checkAnswer(currentSongs, winningSong){
	$("#choice1B").click(function() {
		selected = currentSongs[0];
		answerChosen = true;
		if (selected == winningSong){
			alert("correct!");
			clearInterval(checkAnswerLoop);
		}
		else{
			alert("wrong");
		}
	});
	$("#choice2B").click(function() {
		selected = currentSongs[1];
		answerChosen = true;
		if (selected == winningSong){
			alert("correct!");
			clearInterval(checkAnswerLoop);
		}
		else{
			alert("wrong");
		}
	});
	$("#choice3B").click(function() {
	selected = currentSongs[2];
	answerChosen = true;
		if (selected == winningSong){
			alert("correct!");
			clearInterval(checkAnswerLoop);
		}
		else{
			alert("wrong");
		}
	});
	$("#choice4B").click(function() {
		selected = currentSongs[3];
		answerChosen = true;
		if (selected == winningSong){
			alert("correct!");
			clearInterval(checkAnswerLoop);
		}
		else{
			alert("wrong");
		}
	});
}

function selectSongs(levelNum){
	var currentSongs = [];
	var uniqueNum;
	var newSongInt;
	
	while (currentSongs.length < 4){
		uniqueNum = true;
		newSongInt = Math.floor((Math.random() * 5) + (5*(levelNum-1)));
		//Loop through array of selected songs to check unique.
		for(var i=0; i<currentSongs.length; i++){
			if (newSongInt == currentSongs[i]){
				uniqueNum = false;
			};
		};
		if (uniqueNum == true) {
			currentSongs.push(newSongInt);
		};
	}

	return currentSongs;
}

function selectWinningSong(currentSongs){
	var newWinner = false;
	var winSongInt;
	while (newWinner == false){
		winSongInt = Math.floor(Math.random() * 3)
		newWinner = true;
		for(i=0; i<playedSongs.length; i++){
			if (winSongInt == playedSongs[i]){
				newWinner = false;
			}
		}
	var result = currentSongs[winSongInt];
	return result;
	}
}

function drawButton(currentSongs, songNum, button){
	var arSkin = "url('./images/acidButtonskin.png')";
	var tenSkin = "url('./images/tenButtonskin.png')";

	$(button).val(songs[currentSongs[songNum]][0]);

	//Set button skins
	if (songs[currentSongs[songNum]][1] == 0){
		$(button).css("background-image", arSkin);
	}
	else if (songs[currentSongs[songNum]][1] == 1){
		$(button).css("background-image", tenSkin);
	}
	else{
		$(button).css("background-image", tenSkin);
	};
}

function showScore(){
	$("#scoreScreen").fadeIn();
}