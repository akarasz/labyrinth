window.onload = function() {
	$("#menu-button").on({
		"click" : function(){
			var menu = $("#menu");
			var mask = $("#table-mask");
			menu.addClass("menu-active");
			menu.removeClass("menu-inactive");
			
			mask.addClass("mask-active");
			mask.removeClass("mask-inactive");
		}
	});

	$("#menu-exit").on({
		"click" : function(){
			var menu = $("#menu");
			var mask = $("#table-mask");
			menu.addClass("menu-inactive");
			menu.removeClass("menu-active");
			
			mask.addClass("mask-inactive");
			mask.removeClass("mask-active");
		}
	});

	
	/* test sector */
	var map_width = 20;
	var map_height = 20;

	
	/* creating table, each cell with its own id and the class "lab-cell" 
		cell id format: "#row_column"
	*/
	var $table = $( "<table />", {
		"id" : "lab-table"
	} );

	for( var k = 0; k < map_height; k++ ){
		var $tr = ( $( "<tr />" ) );
		for( var i = 0; i < map_width; i++ ){
			var $td = $( "<td />", {
			"id" : k + "_" + i,
			"class" : "lab-cell"
			});
			if( k == map_height / 2 && i == map_width / 2 ){
				$td.addClass("player-pos");
			}
			$tr.append( $td );
		}
		$table.append( $tr );
	}
	$("#table-container").append($table);

	/* moves the player indicator from one cell to another
		params:
			@to: future coordinates of player: Array= [row, column]
	*/
	function movePlayer(to){
		$(".player-pos").removeClass("player-pos");
		$("#" + to[0] + "_" + to[1]).addClass("player-pos");
	}


	$( document ).keydown( function(event) {
		var coord = $(".player-pos").attr("id").split("_");
		coord[0] = +coord[0];	/* !!! might be a simpler solution !!! */
		coord[1] = +coord[1];
		switch(event.which){
			/* left arrow pressed */
			case 37:
				var new_coord = [coord[0], coord[1] - 1 ];
				movePlayer( new_coord );
				break;
			/* up arrow pressed */
			case 38:
				var new_coord = [coord[0] - 1, coord[1] ];
				movePlayer( new_coord );
				break;
			/* right arrow pressed */
			case 39:
				var new_coord = [coord[0], coord[1] + 1 ];
				movePlayer( new_coord );
				break;
			/* down arrow pressed */
			case 40:
				var new_coord = [coord[0] + 1, coord[1] ];
				movePlayer( new_coord );
				break;
		}
	});
};