
var basePage = '<div id="main_middle"><div id="header"><span class="battle_button">Home</span></div><div id="main_container"></div></div>';
var cssToLoad = ["css/main.css"];

var mainCont = document.getElementById("main");
if (mainCont) {
	document.body.innerHTML = basePage;
	document.getElementById("main_container").appendChild(mainCont);
}

cssToLoad.forEach(name => {
	var e = document.createElement("link");
	e.setAttribute("type", "text/css");
	e.setAttribute("rel", "stylesheet");
	e.href = name;
	document.head.appendChild(e);
})