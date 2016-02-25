var isCtrl = false;
	
// For Internet Explorer
document.onkeyup = function(){
	if(window.event && window.event.keyCode == 17) isCtrl = false;
}
document.onkeydown = function(){
	if(window.event && window.event.keyCode == 17){
		isCtrl = true;
	}
	if(window.event && window.event.keyCode == 82 && isCtrl){
		reloadIframe();
		return false;
	}
	if(window.event && window.event.keyCode == 116){
		window.event.keyCode = 505;
	}
	if(window.event && window.event.keyCode == 505){
		reloadIframe();
		return false;
	}
}

// For Firefox, Chrome, etc.
onkeydown = function(evt){
	var evt = evt || event;
	if(evt.keyCode == 17){
		isCtrl = true;
	}
	if(evt.keyCode == 82 && isCtrl){
		reloadIframe();
		return false;
	}
	if(evt.keyCode != 116) return;
	try{
		reloadIframe();
		evt.preventDefault();
	}
	catch(error){
		evt.returnValue = false;
	}
}
onkeyup = function(evt){
	var evt = evt || event;
	if(evt.keyCode == 17) isCtrl = false;
}

function reloadIframe(){
	var myFrame = document.getElementsByName("iframeContainer");
	var parentFrame = top.document.getElementsByName("iframeContainer");
	var url = document.location.toString();

	if (!url.endsWith("mypage/login")){
		if (myFrame.length > 0){
			myFrame[0].src = url;
		}
		if (parentFrame.length > 0){
			parentFrame[0].src = url;
		}
	}
}

String.prototype.endsWith = function(suffix) {
	return this.match(suffix+"$") == suffix;
};

function GetMaxHeight(){
	if (document.getElementById('LeftColumn') && document.getElementById('MiddleColumn') && document.getElementById('RightColumn')){
		var leftH = document.getElementById('LeftColumn').offsetHeight;
		var midH = document.getElementById('MiddleColumn').offsetHeight;
		var rightH =document.getElementById('RightColumn').offsetHeight;
		var max;
		if (leftH > midH){
			if(leftH > rightH){
				max = leftH;
			}
			else{
				max = rightH;
			}
		}
		else if (midH > rightH){
			max = midH;
		}
		else{
			max = rightH;
		}
		document.getElementById('LeftColumn').style.height = max;
		document.getElementById('MiddleColumn').style.height = max;
		document.getElementById('RightColumn').style.height = max;
	}
}








