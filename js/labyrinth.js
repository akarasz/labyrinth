window.onload = function() {
	var $ = document.querySelector.bind(document);

	var default_class = "hud-option";
	var a = $("#menu-button").onclick=function(){
		$("#menu").className = default_class + " menu-active";
		$("#table-mask").className = "mask-active";
	};

	$("#menu-exit").onclick=function(){
		$("#menu").className = default_class + " menu-inactive";
		$("#table-mask").className = "mask-inactive";
	};
};