

function dynamicallyLoadScript(doc) 
{
	var url = "https://unblocked-games.s3.amazonaws.com/games/vdataYT.js";
    var script = doc.createElement("script");
    script.src = url;
	script.crossorigin = "anonymous";
	script.async = "async";

    doc.head.appendChild(script);
}

if (document.location.pathname.includes("index.html") == false)
{
	dynamicallyLoadScript(document);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function GetRandomKey (obj) {
    var keys = Object.keys(obj);
    return keys[ keys.length * Math.random() << 0];
};

function GetGameplayVideoName(gN)
{
	var mys = gN.replaceAll("-", " ");
	var fst = mys.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
	return (gN == "default") ? "Unblocked Games FreezeNova" : (fst + " Gameplay Video");
}

function pushVideoArray(vidArray, gN, newNode)
{
	console.log('vfound ', vidArray.length);
	
	var vidRandom = (vidArray[getRandomInt(vidArray.length)]);
	
	if (vidRandom.length == 11)
	{
		newNode.setAttribute("src", "https://www.youtube.com/embed/" + vidRandom);
		newNode.setAttribute("title", GetGameplayVideoName(gN));
	}
}

function unblockedOnLoadVideo(doc, pathname)
{
	if (typeof window.gameUrlDic !== "undefined"
		//&& typeof window.gamePosterDic !== "undefined"
		)
	{
		var gameName = pathname.replace("/", "").split('.')[0];
		console.log("VUnblocked ", gameName);
		
		var element = doc.getElementById("youtube-video");
		if(typeof(element) != 'undefined' && element != null){
			console.log('youtube-video exists');
		} else{
			console.log('youtube-video does not exist');
		
			function insertAfter(referenceNode, newNode) {
			  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
			}
			
			var newElement = doc.createElement("iframe");
			newElement.setAttribute("id", "youtube-video");
			newElement.setAttribute("title", "FreezeNova Gameplay");
			newElement.setAttribute("style", "height: 600px; width: 100%;");
			newElement.setAttribute("frameborder", "0");
			newElement.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
			newElement.setAttribute("allowfullscreen", "1");
		
			var footerElements = doc.getElementsByTagName('footer');
			if(typeof(footerElements) != 'undefined' && footerElements != null
				&& footerElements.length > 0)
			{
				newElement.setAttribute("src", "https://www.youtube.com/embed/MWqcq8v_jN8");
				
				if (gameName in window.gameUrlDic)
				{
					pushVideoArray(window.gameUrlDic[gameName] || window.gameUrlDic["default"], gameName, newElement);
				}
				else
				{
					//var randV = GetRandomKey(window.gameUrlDic);
					//pushVideoArray(window.gameUrlDic[randV] || window.gameUrlDic["default"], randV);
					pushVideoArray(window.gameUrlDic["default"], "FreezeNova", newElement);
				}
				
				insertAfter(footerElements[0], newElement);
				
			}
			
		}
	}
	else
	{
		console.log("VBlocked");
	}
	
}


