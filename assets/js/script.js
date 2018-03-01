var currentlyPlayList = [];
var shufflePlayList = [];
var tempPlayList = [];
var audioElement;
var mouseDown = false;
var currentIndex = 0;
var repeat = false;
var shuffle = false;
var userLoggedIn;

function openPage(url){
	if (url.indexOf("?")==-1){
		url = url + "?";
	}
	var encodedUrl = encodeURI(url + "&userLoggedIn=" + userLoggedIn);
	$("#mainContent").load(encodedUrl);
	$("body").scrollTop(0);
	history.pushState(null,null,url);
}

function formatTime(seconds){
	var time = Math.round(seconds);
	var mins = Math.floor(time / 60);
	var secs = time - mins*60;
	var extraZero;
	if(secs<10){
		extraZero = "0";
	}
	else {
		extraZero = "";
	}
	return mins + ":" + extraZero + secs;
}

function updateTimeProgressBar(audio){
	$(".progressTime.current").text(formatTime(audio.currentTime));
	$(".progressTime.remaining").text(formatTime(audio.duration - audio.currentTime));
	var progress = audio.currentTime / audio.duration * 100;
	$(".playbackBar .progress").css("width",progress + "%");
}

function updateVolumProgressBar(audio){
	var volume = audio.volume * 100;
	$(".volumeBar .progress").css("width",volume + "%");
}

function Audio(){

	this.currentlyPlaying;
	this.audio = document.createElement('audio');

	this.audio.addEventListener("ended",function(){
		nextSong();
	});

	this.audio.addEventListener("canplay",function(){
		var duration = formatTime(this.duration);
		$(".progressTime.remaining").text(duration);

	})

	this.audio.addEventListener("timeupdate",function(){
		if(this.duration){
			updateTimeProgressBar(this);
		}
	})
	this.audio.addEventListener("volumechange",function(){
		updateVolumProgressBar(this);
	});

	this.setTrack = function(track){
		this.currentlyPlaying = track;
		this.audio.src = track.path;
	}
	this.play = function(){
		this.audio.play();
	}
	this.pause = function(){
		this.audio.pause();
	}
	this.setTime = function(seconds){
		this.audio.currentTime = seconds;
	}



}