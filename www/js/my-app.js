// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
	// Because we want to use dynamic navbar, we need to enable it for this view:
	dynamicNavbar: true
});


var song_files = [];
var current_song = null;  // Current song # being played. Nothing initially.
var WORKING_DIR = "audio/";  // Dir where the audio files are located
document.addEventListener('deviceready', onDeviceReady, false);

/**
 * More or less the main method.
 */
function onDeviceReady() {
	// REQUIURED TO ACTUALLY GET CONSOLE.LOG() TO WORK!!!
	if (window.cordova.logger) {
		window.cordova.logger.__onDeviceReady();
	}

	// Catch an errors on global level
	window.onerror = function(msg, url, line, col, error) {
		// Note that col & error are new to the HTML 5 spec and may not be 
		// supported in every browser.  It worked for me in Chrome.
		var extra = !col ? '' : '\ncolumn: ' + col;
		extra += !error ? '' : '\nerror: ' + error;

		// You can view the information in an alert to see things working like this:
		console.log("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);
	};

	// Get available songs
	console.log("Listing dirs");
	$$.getJSON(cordova.file.applicationDirectory + "www/songs.json", function (data) {
		console.log(data);
		song_files = data;
		for (var i = 0; i < song_files.length; i++){
			var name = song_files[i];
			var song_card = $$('<li class="item-content" data-number="' + i + '"><a href="javascript:void(0);" class="item-link item-content"><div class="item-inner"><div class="item-title">' + name + '</div></div></a></li>');
			song_card.click(function(){
				var num = parseInt($$(this).data("number"));
				console.log("Clicked song #", num);
				if (num !== current_song){
					playMP3(num);
				}
			});
			$$("#songs").append(song_card);
		}
	});
	console.log("end of onDeviceReady");
};

/**
 * Play an mp3 file.
 */
function playMP3(song_num) {
	if (song_files && song_num < song_files.length){
		var song_file = song_files[song_num];
		var fullpath = WORKING_DIR + song_file;
		var mp3URL = getMediaURL(fullpath);
		$$("#player").attr("src", mp3URL);
		$$("#player")[0].play();
		current_song = song_num;

		console.log("Playing file:", mp3URL);
	}
}


/**
 * Workaround for getting the path on android where the
 * www dir is under /android_asset.
 */
function getMediaURL(s) {
	if(device.platform.toLowerCase() === "android"){
		return "/android_asset/www/" + s;
	}
	return s;
}
