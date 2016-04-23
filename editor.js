
/*
*		init
*/
$(document).ready(function(){
  $('.modal-trigger').leanModal();
});





/*  nouislider  */

var $cueSlider = document.getElementById('cue-slider');
noUiSlider.create($cueSlider, {
	start: [0, 100],
	connect: true,
	range: {
		'min': 0,
		'max': 1
	},
	step: 1,
	margin: 1,
	behaviour: 'tap-drag'
});

var updateSlider = function(){
	$cueSlider.noUiSlider.updateOptions({
		range: {
			'min': 0,
			'max': cueList.cues.length
		},
		step: 1,
		margin: 1
	});
	$cueSlider.noUiSlider.set( [null, $cueSlider.noUiSlider.get()[1]*1+1] );
};
$cueSlider.noUiSlider.on('slide', function(){
	var value = $cueSlider.noUiSlider.get();
	$('.cue').each(function( index ){
		if( index < value[0]*1 ){
			if( !$(this).is(":hidden") ){
				$(this).hide(300);
			}
		}
		else if( index > value[1]*1 ){
			if( !$(this).is(":hidden") ){
				$(this).hide(300);
			}
		}
		else{
			if( $(this).is(":hidden") ){
				$(this).show(300);
			}
		}
	});
});





/*  me-js player  */

var player;
var initMovie = function(src, type){
  var $container = $('#video-container');
  $container.html('');
  var $player = $('<video id="player" class="responsive-video" />');
	var $source = $('<source type="video/mp4" accept="video/*"/>').appendTo( $player );
  var $track = $('<track id="caption" label="Korean" kind="subtitles" srclang="ko" src="test.srt">').appendTo( $player );
  $container.append( $player );

	// layout change
	$('#editor-menu').show();

	switch(type){
		case 'youtube':
			$source.attr('type', 'video/youtube');
			$source.attr('src', src);
		break;
		case 'mp4':
			$source.attr('type', 'video/mp4');
			$source.attr('src', src);
		break;
	}

  var renderCaption = function(){
    if( !initMovie.first ){
      initMovie.first = true;
      createCue();
      setTimeout(function(){
        renderEntries();
      },100);
    }
  };

	player = new MediaElementPlayer('#player', {
		success: function (mediaElement, domObject) {
			console.log('load success');

			// default caption
			if(type=='mp4'){
				mediaElement.addEventListener('loadeddata', function(e) {
					player.setTrack('ko');
					$('#mep_0_captions_ko').attr('checked','checked');

					renderCaption();
        }, false);
			}
			else if(type='youtube'){
				player.setTrack('ko');
				$('#mep_0_captions_ko').attr('checked','checked');

				renderCaption();
			}

			/*
      auto move

			mediaElement.addEventListener('timeupdate', function(e) {
				if(AUTO_TIMEMOVE && !player.media.paused){
					var time = mediaElement.currentTime;
					if( time<cueList.currentCue.$startTime.val() || time>cueList.currentCue.$endTime.val() ){
						var cue = getCueByStartTime(time);
						if(cue){
							cueList.currentCue = cue;
							if(cueList.currentCue.$li.attr('class').match("active")) return;
							cueList.currentCue.$li.children().trigger('click');
						}
					}
				}
			}, false);
			*/

    }
	});
};

// http://jsfiddle.net/user/Ronny/fiddles/
var loadMP4 = function(that){
  var file = that.files[0];
  var type = file.type;
  var videoNode = document.querySelector('video');
  var canPlay = videoNode.canPlayType(type);
  canPlay = (canPlay === '' ? 'no' : canPlay);
  var message = 'Can play type "' + type + '": ' + canPlay;
  var isError = canPlay === 'no';
  console.log(message +'\n'+ isError);
  if (isError) {
      return;
  }
  var fileURL = URL.createObjectURL(file);
  initMovie(fileURL, 'mp4');

  $(that).val(null);
};





/*  caption parser  */

var loadCaption = function(that){
	SRTtoEntries( that.files[0] );
  $(that).val(null);
};

var saveCaption = function(){
  var element = document.createElement('a');
	var fileName = prompt('이름을 입력해주세요');
	if(!fileName) return;
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent( entriesToSRT(player.tracks[0].entries) ));
  element.setAttribute('download', fileName+'.srt');

  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  var time    = hours+':'+minutes+':'+seconds;
  return time;
};
String.prototype.toSec = function () {
	var times = this.split(':');
	var hour = parseInt(times[0],10)*3600;
	var min = parseInt(times[1],10)*60;
	var secs = times[2].split(',');
	var sec = parseFloat(secs[0]+'.'+secs[1]);
	var time = hour + min + sec;
	time = Math.round(time*10)/10;
  return time;
};

var entriesToSRT = function(e){
	var srt = '';
	for(var i=0; i<e.text.length; i++){

		srt += '\n';
		srt += e.times[i].identifier;
		srt += '\n';

		var startTime = (""+e.times[i].start).toHHMMSS() + ',' + ((""+e.times[i].start).split('.')[1]||'0')+'00';
		var endTime = (""+e.times[i].stop).toHHMMSS() + ',' + ((""+e.times[i].stop).split('.')[1]||'0')+'00';

		srt += startTime;
		srt += ' --> ';
		srt += endTime;
		srt += e.times[i].settings;
		srt += '\n';

		srt += e.text[i];
		srt += '\n';
	}
	return srt;
};

var SRTtoEntries = function(file){
	var srt = "";
  var reader  = new FileReader();
  reader.addEventListener("load", function (e) {
    srt = e.target.result;
		player.tracks[0].entries = SRTParser(srt);
		renderEntries();

  }, false);
  reader.readAsText(file);
};

var SRTParser = function(text){
	var json = {
		text: [],
		times: []
	};
	var state = null;
	var lines = text.split("\n");

	for(var i=0; i<lines.length; i++){
		// state check
		if( lines[i]=='' ){
			state = null;
		}
		else if( lines[i]*1 ){
			state = 'identifier';
		}
		else if( state == 'identifier' ){
			state = 'time';
		}
		else if( state == 'time' ){
			state = 'text';
		}
		// parsing
		if( state == 'identifier' ){
			json.text.push("");
			json.times.push({
				identifier: lines[i],
				setting: "",
				start: 0,
				stop: 0
			});
		}
		else if( state == 'time' ){
			var time = lines[i].split(' --> ');
			json.times[json.times.length-1].start = time[0].toSec();
			json.times[json.times.length-1].stop = time[1].toSec();
		}
		else if( state == 'text' ){
			if( json.text[json.text.length-1]=='' ){
				json.text[json.text.length-1] = lines[i];
			}
			else if( lines[i].trim()!='' ){
				json.text[json.text.length-1] += '\n'+lines[i];
			}
		}
	}
	return json;
};

var cueClear = function(){
	if( confirm('모든 자막이 삭제됩니다!') ){
		player.tracks[0].entries = {
			text: [], times:[]
		};
		renderEntries();
		updateSlider();
	}
};





/*
*		event
*/
var SHIFT_DOWN = false;
var ALT_DOWN = false;
var CTRL_DOWN = false;
var AUTO_TIMEMOVE = true;

// auto-timemove switch
$('#auto-timemove > input').change(function(event){
	AUTO_TIMEMOVE = $(this)[0].checked;
});

// player timeline click
$('#video-container').on('click', '.mejs-time-rail', function(){
	if( !AUTO_TIMEMOVE ) return;
	var time = player.media.currentTime;
	if( time<cueList.currentCue.$startTime.val() || time>cueList.currentCue.$endTime.val() ){
		var cue = getCueByStartTime(time);
		if(cue){
			cueList.currentCue = cue;
			if(cueList.currentCue.$li.attr('class').match("active")) return;
			cueList.currentCue.$li.children().trigger('click');
		}
	}
});

$('body').keydown(function(event){
	//console.log(event.keyCode);
	switch(event.keyCode){
		case 16:  // shift
			SHIFT_DOWN = true;
		break;
		case 17:  // ctrl
			CTRL_DOWN = true;
		break;
		case 18:  // alt
			ALT_DOWN = true;
			event.preventDefault();
		break;

		case 9:  // tab
			event.preventDefault();
			// shift down
			if(SHIFT_DOWN){
				var prevCue = cueList.cues[ getCueIndexById(cueList.currentCue.id)-1 ];
				if( prevCue ){
					prevCue.$li.children().trigger('click');
				}
			}
			// shift up
			else{
				var nextCue = cueList.cues[ getCueIndexById(cueList.currentCue.id)+1 ];
				if( nextCue ){
					nextCue.$li.children().trigger('click');
				}
				else{
					endCue();
					createCue();
				}
			}
		break;

		case 13:  // enter
			if(SHIFT_DOWN) return;
			cueList.currentCue.$li.children().trigger('click');

			var nextCue = cueList.cues[ getCueIndexById(cueList.currentCue.id)+1 ];
			if( nextCue ){
				nextCue.$li.children().trigger('click');
			}
			event.preventDefault();
		break;

		case 45:  // insert
			if(!ALT_DOWN) return;
			cueList.currentCue.$li.children().trigger('click');
			endCue();
			createCue();
			event.preventDefault();
		break;

		case 35:  // end
			if(!ALT_DOWN) return;
			cueList.currentCue.$li.children().trigger('click');
			endCue();
			var args = {
				id: cueCount++,
				startTime: cueList.currentCue.$endTime.val(),
				endTime: "",
				text: ""
			};
			createCue(args);
			event.preventDefault();
		break;

    // home redirect denied
		case 36:  // home
			if(!ALT_DOWN) return;
			event.preventDefault();
		break;

		case 33:  // pageup
			if(!ALT_DOWN) return;
			cueList.currentCue.$startTime.val( Math.round(player.getCurrentTime()*10)/10 );
			event.preventDefault();
		break;

		case 34:  // pagedown
			if(!ALT_DOWN) return;
			cueList.currentCue.$endTime.val( Math.round(player.getCurrentTime()*10)/10 );
			event.preventDefault();
		break;

		// player control
		case 37:  // left
			if(!CTRL_DOWN) return;
			player.setCurrentTime( player.getCurrentTime()-1 );
			event.preventDefault();
		break;
		case 39:  // right
			if(!CTRL_DOWN) return;
			player.setCurrentTime( player.getCurrentTime()+1 );
			event.preventDefault();
		break;
		case 32:  // space
			if(!CTRL_DOWN) return;
			player.clickToPlayPauseCallback();
			event.preventDefault();
		break;
	}
});
$('body').keyup(function(event){
	switch(event.keyCode){
		case 16:  // shift
			SHIFT_DOWN = false;
		break;
		case 17:  // ctrl
			CTRL_DOWN = false;
		break;
		case 18:  // alt
			ALT_DOWN = false;
		break;
	}
});

// alt-tab
window.onfocus = function() {
  ALT_DOWN = false;
}





/*
*		cues
*/
var getCueById = function(id){
	for(var i=0; i<cueList.cues.length; i++){
		if(cueList.cues[i].id == id){
			return cueList.cues[i];
		}
	}
};
var getCueIndexById = function(id){
	for(var i=0; i<cueList.cues.length; i++){
		if(cueList.cues[i].id == id){
			return i;
		}
	}
};
var getCueByStartTime = function(time){
	var cue = null;
	for(var i=0; i<cueList.cues.length; i++){
		if( time>=cueList.cues[i].$startTime.val() ){
			cue = cueList.cues[i];
		}
		else if(cue){
			return cue;
		}
	}
};

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};



var cueList = {
	cues: [],
	currentCue: null,
	$ul: $('#cue-list')
};

var cueCount = 0;
var createCue = function(args){
	var cue = {
		id: 0,
	};

	var startTime = Math.round(player.getCurrentTime()*10)/10;
	var id = cueCount++;
	var endTime = "";
	var text = "";
	// args
	if(args){
		id = args.id;
		startTime = args.startTime;
		endTime = args.endTime;
		text = args.text;
	}
	// check same time
	for(var i=0; i<cueList.cues.length; i++){
		if( startTime == cueList.cues[i].$startTime.val() ){
			return;
		}
	}

	cue.id = id;
	cue.$startTime = $('<input type="number" min=0 />');
	cue.$startTime.val( startTime );
	cue.$endTime = $('<input type="number" min=0 />');
	cue.$endTime.val( endTime || "" );

	// html render
	cue.$li = $('<li id="cue'+cue.id+'" class="cue"/>');

	var $header = $('<div class="collapsible-header" />');
	cue.$time =				$('<div class="col s6 truncate">'+startTime+' ~ '+endTime+'</div>').appendTo($header);
	cue.$thumb =			$('<div class="col s5 truncate">'+text+'</div>').appendTo($header);
										$('<i class="fa fa-times delete-cue" aria-hidden="true"></i>').appendTo($header);

	var $body =   $('<div class="collapsible-body" />');
										$('<div class="col s6" />').append(cue.$startTime).appendTo($body);
										$('<div class="col s6" />').append(cue.$endTime).appendTo($body);
	cue.$textarea = 	$('<textarea class="materialize-textarea">'+text+'</textarea>').appendTo($body);

	cueList.$ul.append( cue.$li.append($header).append($body) );
	cueList.cues.push(cue);
	if(!args){
		$header.trigger('click');
	}

	updateSlider();
};

var endCue = function(){
	var cue = cueList.currentCue;
	if(!cue)
		return;
	var endTime = cue.$endTime.val() || Math.round(player.getCurrentTime()*10)/10;
	if( endTime == cue.$startTime.val() )
		return;
	cue.$endTime.val( endTime );
	cue.$time.text( cue.$startTime.val() + ' ~ ' + cue.$endTime.val() );
	cue.$thumb.text( cue.$textarea.val() );

	sortCues();
	cuesToEntries();
};

var cuesToEntries = function(){
	player.tracks[0].entries = {
		text: [], times: []
	};
	var e = player.tracks[0].entries;

	for(var i=0; i<cueList.cues.length; i++){

		var cue = cueList.cues[i];
		e.text.push( cue.$textarea.val() );
		e.times.push({
			identifier: i+1,
			settings: "",
			start: cue.$startTime.val(),
			stop: cue.$endTime.val()
		});
	}
};

var renderEntries = function(){
	var e = player.tracks[0].entries;
	cueList.$ul.html("");
	cueList.cues = [];
	var args = [];
	for(var i=0; i<e.text.length; i++){
		args[i] = {
			id: e.times[i].identifier*1-1,
			startTime: e.times[i].start,
			endTime: e.times[i].stop,
			text: e.text[i]
		};
	}
	for(var i=0; i<args.length; i++){
		createCue(args[i]);
	}
}

$('#cue-list').on('click', '.cue > .collapsible-header', function(event){
	endCue();

	var parent = this.parentElement;
	var id = $(parent).attr('id').match(/[0-9]+/)[0];

	// delete cue
	if( event.target.tagName == "I" ){
		$(parent).hide(300);
		updateSlider();
		setTimeout(function(){
			$(parent).remove();
			cueList.cues.remove( getCueIndexById(id) );
			cuesToEntries();
		},300);
	}
	//
	if( $(this).attr('class').match("active") ) return;

	cueList.currentCue = getCueById(id);
	if(AUTO_TIMEMOVE){
		player.setCurrentTime( cueList.currentCue.$startTime.val()*1+0.3 );
	}
	setTimeout(function(){
		cueList.currentCue.$textarea.focus();
	},100);
});
$('#cue-list').on('keyup', 'textarea', function(event){
	var $li = $(this.parentElement.parentElement);
	var id = $li.attr('id').match(/[0-9]+/)[0];
	player.tracks[0].entries.text[id] = $(this).val();
});

var sortCues = function(){
	var sorted = false;
	cueList.cues.sort(function(a, b){
		if (a.$startTime.val()*1 < b.$startTime.val()*1){
	    return -1;
		}
	  else if (a.$startTime.val()*1 > b.$startTime.val()*1){
			sorted = true;
	    return 1;
		}
	  else{
	    return 0;
		}
	});

	if(sorted){
		cueList.$ul.html("");
		for(var i=0; i<cueList.cues.length; i++){
			cueList.$ul.append( cueList.cues[i].$li )
		}
	}
};





/*
*		etc
*/
var XSSfilter = function( content ) {
	return tag = content.match(/<.*?>/g);
};
