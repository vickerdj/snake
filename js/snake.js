$('document').ready(function(){
	var $container = $('.container');	

/*-----------------------Function to pad single digits*/
	var x;
	var y;
	var padNum = function(a,b){
		if (a < 10){
					x = "0" + a;	
				} else {
					x = a.toString();
				}
				if (b < 10){
					y = "0" + b;	
				} else {
					y = b.toString();
				}
				return x,y;
	};
/*----------------------------------------Function to render grid*/
	var render = function(){
		for (i = 1; i <= 40; i++){
			for (j = 1; j <= 40; j++){
				padNum(j,i);
				$container.append('<div class="pixel" id="c'+x+y+'"></div>');
			};
		};
	};
	render();
/*--------------------------------Function to update specific cell in grid*/
	var setCell = function (a,b){
		padNum(a[0],a[1]);
		$('#c'+x+y).html(b);
	};
/*--------------------------------Function to get specific cell content*/
	var cell;
	var getCell = function (a){
		padNum(a[0],a[1]);
		cell = $('#c'+x+y).html();
		return cell;
	};
/*-----------------------------------Initialize snake*/
	var snake = {
		dir: "r",
		tail: [20,20],
		head: [20,20],
		whole: [[20,20]],
		pic: '<img src="images/skull.png" class="snake">'
	};
/*-----------------------------------Function to add food*/
	var food = function(){
		var xcoord = parseInt(Math.random() * 40);
		var ycoord = parseInt(Math.random() * 40);	
		for(elt in snake.whole){
			if (xcoord===elt[0] && ycoord===elt[1]){
				food();
			} else {
				setCell([xcoord,ycoord],'<p class="food">F</p>');
			}
		};
	};
/*-----------------------------------Function to check if snake has hit itself*/
	var hitBody = function(a,b){
		for (var elt in b){
			if (b[elt][0]===a[0] && b[elt][1]===a[1]){
				gameOver = true;
			};
		};
		return gameOver;
	};
/*------------------------------------------------------Function to move snake*/
	/*---------------------------Listen for arrow key press*/
	var move = function(){
		$('html').keydown(function(event){
			switch(event.which){
				case 37:
					if(snake.dir != "r"){
						snake.dir = "l";
					};
					break;
				case 38:
					if(snake.dir != "d"){
						snake.dir = "u";	
					};
					break;
				case 39:
					if(snake.dir != "l"){
						snake.dir = "r";	
					};
					break;
				case 40:
					if(snake.dir != "u"){
						snake.dir = "d";	
					};
					break;
			};
		});	
	/*---------------------Increment or decrement x or y coordinate depending on direction*/
		switch(snake.dir){
			case "l":
				if(snake.head[0] > 1){
					snake.head[0] -= 1; 	
				} else {
					gameOver = true;
				}; 
				break;	
			case "u":
				if(snake.head[1] > 1){
					snake.head[1] -= 1; 	
				} else {
					gameOver = true;
				};
				break;
			case "r":
				if(snake.head[0] < 40){
					snake.head[0] += 1; 	
				} else {
					gameOver = true;
				}
				break;
			case "d":
				if(snake.head[1] < 40){
					snake.head[1] += 1; 	
				} else {
					gameOver = true;
				};
				break;		
		};	
	/*------------------------------------------------If find food then add new head and keep tail*/
		var newHead = [];
		getCell(snake.head);
		hitBody(snake.head,snake.whole);
		if(cell === '<p class="food">F</p>'){
			setCell(snake.head,snake.pic);
			newHead[0] = snake.head[0];
			newHead[1] = snake.head[1];	
			snake.whole.splice(0,0,newHead);
			score += (10 * snake.whole.length)/2;
			$('#score').html(score);
			loop -= 5;
			food();
	/*-------------------------------------------If no food then add new head and pop tail*/
		} else {
			var tailC = snake.whole.length - 1;
			setCell(snake.whole[tailC],"");
			setCell(snake.head,snake.pic);
			newHead[0] = snake.head[0];
			newHead[1] = snake.head[1];
			snake.whole.splice(0,0,newHead);	
			snake.whole.pop();
		};
	};
/*----------------------------The game loop function*/
	var loop = 200;
	var gameOver = false;
	var score = 0;
	var gameLoop = function(){
		var recursive = setTimeout(function(){
			move();
			gameLoop()},loop);
		if (!gameOver) {
			recursive();
		} else {
			clearTimeout(recursive);
			$container.append('<div class="gameOver">Game Over!</div>');
		};
	};
	$('.start').click(function(){
			init();
			gameLoop();
	});
/*----------------------------Initialize state*/
var init = function(){
	$container.empty();
	render();
	snake.dir = "r";
	snake.tail = [20,20];
	snake.head = [20,20];
	snake.whole = [[20,20]];
	setCell(snake.head,snake.pic);
	food();
	score = 0;
	$('#score').html(score);
	gameOver = false;
	loop = 200;
};

});