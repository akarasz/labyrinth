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
	var starting_point = [1, 1];

	
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
			$tr.append( $td );
		}
		$table.append( $tr );
	}
	$("#table-container").append($table);


	/* shifting the table to center the player's position */
	/** calculating cell-size, including border and padding **/
	var c = $(".lab-cell");
	var cell_dim = [c.height() + parseInt(c.css("border"))*2 + parseInt(c.css("padding"))*2,
					c.width() + parseInt(c.css("border"))*2 + parseInt(c.css("padding"))*2];

	/** calculating the cell that will be in the center of the playfield **/
	var center_idx = [ (($("#table-container").height() / cell_dim[0]) / 2 ) + 0.5,
						(($("#table-container").width() / cell_dim[1]) / 2 ) + 0.5 ];
	function shiftTable(){
		var shift_top, shift_left;
		shift_top = parseInt( ( $(".player-pos").parent().index() - center_idx[0] + 1 )*cell_dim[0] );
		shift_left = parseInt( ( $(".player-pos").index() - center_idx[1] +1 )*cell_dim[1] );
		$("#lab-table").css({
			"top" : -shift_top + "px",
			"left" : -shift_left + "px"
		});
	}
	/* moves the player indicator from one cell to another
		params:
			@to: future coordinates of player: Array= [row, column]
	*/
	function movePlayer(to){
		$(".player-pos").removeClass("player-pos");
		$("#" + to[0] + "_" + to[1]).addClass("player-pos");
		shiftTable();
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

	movePlayer(starting_point);
};