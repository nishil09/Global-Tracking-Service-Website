$("document").ready(function(){
		var d = new Date();
		var finalD = new Date(d.getFullYear(), (d.getMonth()+5), d.getDate());
		currentFont = (parseInt(getCookie('fontSize'))) ? parseInt(getCookie('fontSize')) : 70;
		
		if(!fontSize)
			fontSize = "false";
		
		if(fontSize == "true"){
			$("body")
				.css("font-size", currentFont + "%");
			// The function changeFontParent is called every 0.5 seconds until all the page is loaded
			// If all the elements are not loaded the font size can not be changed without errors.
			timerID = setInterval("changeFontParent()", 500);
			
			var LinkContainer = document.createElement("div");
				var LinkWrapper = document.createElement("p");
		
					var Small = document.createElement("a");
					$(Small)
						.attr("href","#")
						.attr("id","Small")
						.attr("title","Text size: Small")
						.attr("accesskey","-")
						.html("A-<span></span>")
						.click(function(ev){
							$("body")
								.css("font-size","70%");
							parent.changeFontSize(parent.document, "70%");
							setCookie('fontSize', 70, finalD, '/');
							$(this).addClass("Selected");
							$(Medium).removeClass("Selected");
							$(Large).removeClass("Selected");
							return false;
						});
					if (currentFont==70)
						$(Small).addClass("Selected");
		
					var Medium = document.createElement("a");
					$(Medium)
						.attr("href","#")
						.attr("id","Medium")
						.attr("title","Text size: Medium")
						.attr("accesskey","=")
						.html("A<span></span>")
						.click(function(ev){
							$("body")
								.css("font-size","80%");
							parent.changeFontSize(parent.document, "80%");
							setCookie('fontSize', 80, finalD, '/');
							$(Small).removeClass("Selected");
							$(this).addClass("Selected");
							$(Large).removeClass("Selected");
							return false;
						});
					if (currentFont==80)
						$(Medium).addClass("Selected");
		
					var Large = document.createElement("a");
					$(Large)
						.attr("href","#")
						.attr("id","Large")
						.attr("title","Text size: Large")
						.attr("accesskey","+")
						.html("A+<span></span>")
						.click(function(ev){
							$("body")
								.css("font-size","90%");
							parent.changeFontSize(parent.document, "90%");
							setCookie('fontSize', 90, finalD, '/');
							$(Small).removeClass("Selected");
							$(Medium).removeClass("Selected");
							$(this).addClass("Selected");
							return false;
						});
					if (currentFont==90)
						$(Large).addClass("Selected");
					
				$(LinkWrapper)
					.append(Small)
					.append("<span> | </span>")
					.append(Medium)
					.append("<span> | </span>")
					.append(Large);
			
			$(LinkContainer)
				.attr("id","TextSize")
				.append(LinkWrapper);
		
			$("#Language")
				.after(LinkContainer);
		}
});

// This function changes the font size of the parent page and other elements (footer and menu).
function changeFontParent(doc, size){
	if(loadIsFinished(parent.document)){
		if(timerID != ""){
			clearInterval(timerID);
			timerID = "";
		}
		parent.changeFontSize(parent.document, currentFont + "%");
	}
}