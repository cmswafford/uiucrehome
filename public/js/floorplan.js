
function drawFloorPlan() {
	this.paper = new Raphael(document.getElementById("holder"), 465, 730); 
 
	var office =  paper.rect(7.649,420.289,234.119,186.509,undefined,undefined).attr({"fill": "#3E3E3E", "stroke": "#000000", "stroke-width": 0, "opacity": 0.4, 'stroke-opacity':'0'});
	var bathroom =  paper.rect(353.063,362.191,105.048,159.005,undefined,undefined).attr({"fill": "#3E3E3E", "stroke": "#000000", "stroke-width": 0, "opacity": 0.4, 'stroke-opacity':'0'});
	var livingroom = paper.path('M 241.8 128.9 L 230.2 128.9 L 230.2 8.9 L 7.6 8.9 L 7.6 128.9 L 7.6 420.3 L 241.8 420.3 L 241.8 128.9').attr({"fill": "#3E3E3E", "stroke": "#000000", "stroke-width": 0, "opacity": 0.4, 'stroke-opacity':'0'}); 
	var bedroom = paper.rect(241.769,521.196,216.343,204.668,undefined,undefined).attr({"fill": "#3E3E3E", "stroke": "#000000", "stroke-width": 0, "opacity": 0.4, 'stroke-opacity':'0'});
	var hall =  paper.rect(241.155,361.281,112.799,159.916,undefined,undefined).attr({"fill": "#3E3E3E", "stroke": "#000000", "stroke-width": 0, "opacity": 0.4, 'stroke-opacity':'0'});
	var kitchen =  paper.rect(241.155,128.944,216.956,233.247,undefined,undefined).attr({"fill": "#3E3E3E", "stroke": "#000000", "stroke-width": 0, "opacity": 0.4, 'stroke-opacity':'0'});


	var outerDoors = paper.path('M 241.8 128.9 L 241.2 128.9 L 230.2 128.9 L 230.2 8.9 L 7.6 8.9 L 7.6 128.9 L 7.6 420.3 L 7.6 606.8 L 241.8 606.8 L 241.8 725.9 L 458.1 725.9 L 458.1 521.2 L 458.1 362.2 L 458.1 128.9 L 241.8 128.9').attr({'fill':'none','stroke':'#cccccc','stroke-width':'2','fill-opacity':'1','stroke-opacity':'0.4'}); 

	var innerDoors = paper.path('M 241.8 431.7 L 241.8 521.2 L 353.1 521.2 L 353.1 447.9').attr({'fill':'none','stroke':'#cccccc','stroke-width':'2','fill-opacity':'0','stroke-opacity':'0.4'}); 

	var outerWalls =   paper.path('M 238.4 620.6 L 238.4 610.3 L 11.1 610.3 L 7.6 610.3 L 4.2 610.3 L 4.2 395.8 L 11.1 395.8 L 11.1 416.8 L 238.4 416.8 L 238.4 357.6 L 245.4 357.6 L 245.4 441.8 L 238.4 441.8 L 238.4 423.8 L 11.1 423.8 L 11.1 603.3 L 238.4 603.3 L 238.4 493 L 245.4 493 L 245.4 517.7 L 254.2 517.7 L 254.2 524.7 L 245.4 524.7 L 245.4 620.6 L 238.4 620.6 M 226.1 12.4 L 226.1 132 L 229.6 132 L 233.1 132 L 254.2 132 L 254.2 125 L 233.1 125 L 233.1 5.4 L 229.6 5.4 L 226.1 5.4 L 11.1 5.4 L 7.6 5.4 L 4.2 5.4 L 4.2 344.6 L 11.1 344.6 L 11.1 12.4 L 226.1 12.4 M 461.6 125 L 454.8 125 L 454.8 125 L 305.9 125 L 305.9 132 L 454.6 132 L 454.6 357.8 L 305.9 357.8 L 305.9 364.8 L 349.8 364.8 L 349.8 460.4 L 356.8 460.4 L 356.8 364.8 L 454.6 364.8 L 454.6 517.7 L 356.8 517.7 L 356.8 511.4 L 349.8 511.4 L 349.8 517.7 L 305.9 517.7 L 305.9 524.7 L 454.6 524.7 L 454.6 722.4 L 245.8 722.4 L 245.8 671 L 238.8 671 L 238.8 729.4 L 241.2 729.4 L 245.8 729.4 L 454.6 729.4 L 454.8 729.4 L 461.6 729.4 L 461.6 125').attr({fill:'45-#1a1a1a-#333:25-#555:50-#333:75-#1a1a1a','fill-opacity':'1', 'stroke':'#d9d9d9','stroke-width':'2','stroke-opacity':'0.4'});

	var rooms = paper.set();
	rooms.push(
		kitchen,
		livingroom,
		hall,
		office,
		bathroom,
		bedroom
	);
	kitchen.key = "Kitchen";
	livingroom.key = "Living Room";
	hall.key = "Hallway";
	office.key = "Office";
	bathroom.key = "Bathroom";
	bedroom.key = "Bedroom";
	rooms.mouseover(function (event) {
	    this.attr({"opacity": 1});
	});
	rooms.mouseout(function (event) {
	    this.attr({"opacity": 0.4});
	});
	rooms.click(function (event) {
	    document.getElementById("space").innerHTML = "<h3>"+this.key+"</h3>";
		Cufon.replace('h3', { fontFamily: 'Thin' }); // Font Replacement: update the replacement at every refresh
		$('.device').removeClass('deviceSelected');
		$('.lightSwitch').addClass('inactive');
	});
	
	this.paper2 = new Raphael(document.getElementById("infoIcon"), 30, 30);
	var infoIconShadow = paper2.path('M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.982,21.375h-1.969v-1.889h1.969V21.375zM16.982,17.469v0.625h-1.969v-0.769c0-2.321,2.641-2.689,2.641-4.337c0-0.752-0.672-1.329-1.553-1.329c-0.912,0-1.713,0.672-1.713,0.672l-1.12-1.393c0,0,1.104-1.153,3.009-1.153c1.81,0,3.49,1.121,3.49,3.009C19.768,15.437,16.982,15.741,16.982,17.469z');
	var infoIcon = paper2.path('M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.982,21.375h-1.969v-1.889h1.969V21.375zM16.982,17.469v0.625h-1.969v-0.769c0-2.321,2.641-2.689,2.641-4.337c0-0.752-0.672-1.329-1.553-1.329c-0.912,0-1.713,0.672-1.713,0.672l-1.12-1.393c0,0,1.104-1.153,3.009-1.153c1.81,0,3.49,1.121,3.49,3.009C19.768,15.437,16.982,15.741,16.982,17.469z');
	infoIcon.attr({"fill": "white"});
	infoIconShadow.attr({"fill": "black", "opacity": "0.2", "scale":"1.1"});


}

window.onload = drawFloorPlan;
