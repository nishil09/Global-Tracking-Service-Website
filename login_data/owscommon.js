// Check the label correspondent to each application
var timerID;

function getWindowData(n,i){
	var ifr=document.getElementById(i).contentWindow.document || document.getElementById(i).contentDocument;
	var widthViewport,heightViewport,xScroll,yScroll,widthTotal,heightTotal;
	if (typeof window.frames[n].innerWidth != 'undefined'){
		widthViewport= window.frames[n].innerWidth;
		heightViewport= window.frames[n].innerHeight;
	}else if(typeof ifr.documentElement != 'undefined' && typeof ifr.documentElement.clientWidth !='undefined' && ifr.documentElement.clientWidth != 0){
		widthViewport=ifr.documentElement.clientWidth;
		heightViewport=ifr.documentElement.clientHeight;
	}else{
		widthViewport= ifr.getElementsByTagName('body')[0].clientWidth;
		heightViewport=ifr.getElementsByTagName('body')[0].clientHeight;
	}
	xScroll=window.frames[n].pageXOffset || (ifr.documentElement.scrollLeft+ifr.body.scrollLeft);
	yScroll=window.frames[n].pageYOffset || (ifr.documentElement.scrollTop+ifr.body.scrollTop);
	widthTotal=Math.max(ifr.documentElement.scrollWidth,ifr.body.scrollWidth,widthViewport);
	heightTotal=Math.max(ifr.documentElement.scrollHeight,ifr.body.scrollHeight,heightViewport);
	return [widthViewport,heightViewport,xScroll,yScroll,widthTotal,heightTotal];
} 

function resizeIframe(ID,NOMBRE){
	var minHeight = 500;
	document.getElementById(ID).height = null;
	//document.getElementById(ID).width=null;
	var browser = navigator.userAgent.toLowerCase();
	if (browser.indexOf("safari") != -1){
		window.location='#'; // needed for safari browser
	}
	var m=getWindowData(NOMBRE,ID); 
	if (m[5] == 0 ){
		document.getElementById(ID).height = minHeight;
	}
	else{
		document.getElementById(ID).height = m[5];
		//document.getElementById(ID).width=m[4]+22;
	}
} 

function addEvent(obj, evType, fn, useCapture){
 if (obj.addEventListener){
	obj.addEventListener(evType, fn, useCapture);
	
  } else if (obj.attachEvent){
	obj.attachEvent("on"+evType, fn);
   
  } else {
   obj['on'+evType]=fn;
  }
}

// Example of function for change the language of labels without change the application.
// Used only by OWSCommon/index.htm
/*function changeLanguage(lang){
	var iframeHeader = document.getElementById("iframeHeader");
	var iframeFooter = document.getElementById("iframeFooter");
	var iframeMenu = document.getElementById("iframeMenu");
	document.getElementById("lang").value = lang;	

	if (iframeHeader != null) {
		var headerSrc = iframeHeader.src.split("?");
		iframeHeader.src = headerSrc[0] + "?" + "lang=" + lang + iframeHeader.src.substring(iframeHeader.src.indexOf("lang=") + 7, iframeHeader.src.length);	
	}

	if (iframeFooter != null) {
		var footerSrc = iframeFooter.src.split("?");
		iframeFooter.src = footerSrc[0] + "?" + "lang=" + lang + iframeFooter.src.substring(iframeFooter.src.indexOf("lang=") + 7, iframeFooter.src.length);
	}

	if (iframeMenu != null) {
		var menuSrc = iframeMenu.src.split("?");
		iframeMenu.src = menuSrc[0] + "?" + "lang=" + lang + iframeMenu.src.substring(iframeMenu.src.indexOf("lang=") + 7, iframeMenu.src.length);
	}

	selectLanguage();
}*/

function updateLabel(app,claw){
	label = getMenuID(app,claw);
	document.getElementById(label).innerHTML = labels.get(lang, label + "Label_text");
}

function getMenuID(app){
	return getmenuID(app, "");
}

function getMenuID(app, claw){
	var menuID = "";
	switch (app.toLowerCase()){
		case "findrep":
		case "pdm":
		case "mypage":
		case "eurolocarno":
		case "euronice":
		case "euroace":
		case "rcderenewal":
		case "ctmerenewal":
		case "ctmonline":
		case "rcdonline":
		case "ctmeopposition":
			menuID = "YOU";
			break;
		case "erecruitment":
		case "etrainee":
		case "hrrecruitment":
			menuID = "ABOUT";
			break;
		case "caselaw":
			if (claw == "rcd"){
				menuID = "RCD";
			}
			else{
				menuID = "CTM";
			}
			break;
		default:
			menuID = "YOU";
			break;
	}
	return menuID;
}

function getBreadcrumbUrl(label, lang){
	var url = "javascript:void(0);";
	switch (label){
		case "CTM":
			url ="http://oami.europa.eu/ows/rw/pages/CTM/index." + lang + ".do";
			break;
		case "RCD":
			url="http://oami.europa.eu/ows/rw/pages/RCD/index." + lang + ".do";
			break;
		case "YOU":
			url="http://oami.europa.eu/ows/rw/pages/QPLUS/index." + lang + ".do";
			break;
		case "ABOUT":
			url="http://oami.europa.eu/ows/rw/pages/OHIM/index." + lang + ".do";
			break;
	}
	return url;
}

function getBreadcrumbLastElement(app){
	var element = "";
	switch (app.toLowerCase()){
		case "pdm":
		case "mypage":
			element = labels.get(lang, "YOUMyPage");
			break;
		case "ctmeopposition":
		case "rcderenewal":
		case "ctmerenewal":
			element = labels.get(lang, "YOUFormsFilings");
			break;
		case "findrep":
		case "eurolocarno":
		case "euronice":
		case "euroace":
		case "ctmonline":
		case "rcdonline":
			element = labels.get(lang, "YOUDatabases");
			break;
		case "erecruitment":
		case "etrainee":
		case "hrrecruitment":
			element = labels.get(lang, "ABOUTCareer");
			break;
		case "caselaw":
			element = labels.get(lang, "caselaw");
			break;
		default:
			element = labels.get(lang, "YOUDatabases");
			break;
	}
	return element;
}

function getSelectedText(lang, app){
	var element = "";
	switch (app.toLowerCase()){
	case "ctmonline":
		element = labels.get(lang, "YOUSearchCTM");
		break;
	case "rcdonline":
		element = labels.get(lang, "YOUSearchRCD");
		break;
	case "findrep":
		element = labels.get(lang, "YOUFindRep");
		break;
	case "erecruitment":
	case "etrainee":
	case "hrrecruitment":
		element = labels.get(lang, "ABOUTCareer");//////////////////////////Sure?
		break;
	case "caselaw":
		element = labels.get(lang, "caselaw");
		break;
	case "eurolocarno":
		element = labels.get(lang, "YOUSearchEurolocarno");
		break;
	case "euroace":
	case "euronice":
		element = labels.get(lang, "YOUSearchEuronice");
		break;
	default:
		element = "undefined";
		break;
	}
	return element;
}

function getHTTPUrl(){
	var location = document.location;
	return (location.protocol + '//' + location.host + '/OWSCommon/');
}

function changeFontSize(doc, size){
	doc.body.style.fontSize = size;
	if(doc.getElementById("iframeMenu")){
		doc.getElementById("iframeMenu").contentWindow.document.body.style.fontSize = size;
		resizeIframe("iframeMenu", "iframeMenu");
	}
	if(doc.getElementById("iframeFooter")){
		doc.getElementById("iframeFooter").contentWindow.document.body.style.fontSize = size;		
	}
}

// This function checks if all the elements of the page are loaded.
function loadIsFinished(doc){
	var footer = false;
	var menu = false;
	if (doc.getElementById("iframeFooter") && doc.getElementById("iframeFooter").contentWindow.document.getElementById("isLoaded").value == "true"){
		footer = true;
	}
	if(doc.getElementById("iframeMenu")){
		if (doc.getElementById("iframeMenu").contentWindow.document.getElementById("isLoaded").value == "true"){
			menu = true;
		}
	}
	else{
		menu = true;
	}
	if(footer && menu){
		return true;
	}
	else{
		return false;
	}
}

function selectCorrespondentLink(lang, app){
	var selectedLink = getSelectedText(lang, app);
	var myDiv = document.getElementById("Menu");
	var elms = myDiv.getElementsByTagName("A");
	for(var i = 0; i < elms.length; i++){
		try{
			if (elms[i].innerHTML == htmlDecode(selectedLink)){
				elms[i].className = "Selected";
			}
		}
		catch(err){
			//alert(i + ": " + err.description);
		}
	}
}

function htmlDecode(text) {
	var toReturn;
	var ta = document.createElement("textarea");
	ta.innerHTML = text.replace(/</g,"&lt;").replace(/>/g,"&gt;");
	toReturn = ta.value;
	ta = null;
	
	return toReturn;
}

function HtmlEncode(text){
	var el = document.createElement("div");
	el.innerText = el.textContent = text;
	text = el.innerHTML;
	delete el;
	return text;
}

function isDatabasesSection(app){
	if(app == "ctmerenewal" || app == "rcderenewal" || app == "ctmeopposition"){
		return false;
	}
	return true;
}
