/**
 * This Script sets up the floorplan widget, for this I am using
 * Raphael.js which is an svg framework for the web, http://raphaeljs.com/
 * any events based clicking rooms etc in the floorplan must be added here
 * 
 * @author Daniel Mestas <dan5446@gmail.com>
 * @netid mestas1
 * @date Spring 2011
 */
function drawFloorPlan() {
	this.paper = new Raphael(document.getElementById("holder"), 465, 730); 
 
 	/**
 	 * Declare the room shapes and define the shape
 	 */
	var office =  paper.rect(7.649,420.289,234.119,186.509,undefined,undefined).attr({"fill": "#3E3E3E", "stroke": "#000000", "stroke-width": 0, "opacity": 0.4, 'stroke-opacity':'0'});
	var bathroom =  paper.rect(353.063,362.191,105.048,159.005,undefined,undefined).attr({"fill": "#3E3E3E", "stroke": "#000000", "stroke-width": 0, "opacity": 0.4, 'stroke-opacity':'0'});
	var livingroom = paper.path('M 241.8 128.9 L 230.2 128.9 L 230.2 8.9 L 7.6 8.9 L 7.6 128.9 L 7.6 420.3 L 241.8 420.3 L 241.8 128.9').attr({"fill": "#3E3E3E", "stroke": "#000000", "stroke-width": 0, "opacity": 0.4, 'stroke-opacity':'0'}); 
	var bedroom = paper.rect(241.769,521.196,216.343,204.668,undefined,undefined).attr({"fill": "#3E3E3E", "stroke": "#000000", "stroke-width": 0, "opacity": 0.4, 'stroke-opacity':'0'});
	var hall =  paper.rect(241.155,361.281,112.799,159.916,undefined,undefined).attr({"fill": "#3E3E3E", "stroke": "#000000", "stroke-width": 0, "opacity": 0.4, 'stroke-opacity':'0'});
	var kitchen =  paper.rect(241.155,128.944,216.956,233.247,undefined,undefined).attr({"fill": "#3E3E3E", "stroke": "#000000", "stroke-width": 0, "opacity": 0.4, 'stroke-opacity':'0'});
	/**
 	* Declare the outside shapes which will not be clickable
 	*/
	var outerDoors = paper.path('M 241.8 128.9 L 241.2 128.9 L 230.2 128.9 L 230.2 8.9 L 7.6 8.9 L 7.6 128.9 L 7.6 420.3 L 7.6 606.8 L 241.8 606.8 L 241.8 725.9 L 458.1 725.9 L 458.1 521.2 L 458.1 362.2 L 458.1 128.9 L 241.8 128.9').attr({'fill':'none','stroke':'#cccccc','stroke-width':'2','fill-opacity':'1','stroke-opacity':'0.4'}); 
	var innerDoors = paper.path('M 241.8 431.7 L 241.8 521.2 L 353.1 521.2 L 353.1 447.9').attr({'fill':'none','stroke':'#cccccc','stroke-width':'2','fill-opacity':'0','stroke-opacity':'0.4'}); 
	var outerWalls =   paper.path('M 238.4 620.6 L 238.4 610.3 L 11.1 610.3 L 7.6 610.3 L 4.2 610.3 L 4.2 395.8 L 11.1 395.8 L 11.1 416.8 L 238.4 416.8 L 238.4 357.6 L 245.4 357.6 L 245.4 441.8 L 238.4 441.8 L 238.4 423.8 L 11.1 423.8 L 11.1 603.3 L 238.4 603.3 L 238.4 493 L 245.4 493 L 245.4 517.7 L 254.2 517.7 L 254.2 524.7 L 245.4 524.7 L 245.4 620.6 L 238.4 620.6 M 226.1 12.4 L 226.1 132 L 229.6 132 L 233.1 132 L 254.2 132 L 254.2 125 L 233.1 125 L 233.1 5.4 L 229.6 5.4 L 226.1 5.4 L 11.1 5.4 L 7.6 5.4 L 4.2 5.4 L 4.2 344.6 L 11.1 344.6 L 11.1 12.4 L 226.1 12.4 M 461.6 125 L 454.8 125 L 454.8 125 L 305.9 125 L 305.9 132 L 454.6 132 L 454.6 357.8 L 305.9 357.8 L 305.9 364.8 L 349.8 364.8 L 349.8 460.4 L 356.8 460.4 L 356.8 364.8 L 454.6 364.8 L 454.6 517.7 L 356.8 517.7 L 356.8 511.4 L 349.8 511.4 L 349.8 517.7 L 305.9 517.7 L 305.9 524.7 L 454.6 524.7 L 454.6 722.4 L 245.8 722.4 L 245.8 671 L 238.8 671 L 238.8 729.4 L 241.2 729.4 L 245.8 729.4 L 454.6 729.4 L 454.8 729.4 L 461.6 729.4 L 461.6 125').attr({fill:'45-#1a1a1a-#333:25-#555:50-#333:75-#1a1a1a','fill-opacity':'1', 'stroke':'#d9d9d9','stroke-width':'2','stroke-opacity':'0.4'});

	/**
	 * Push the rooms into an array in order to assign events to all of them at once
	 */
	var rooms = paper.set();
	rooms.push(
		kitchen,
		livingroom,
		hall,
		office,
		bathroom,
		bedroom
	);
	/**
	 * Give each room an identifier so we can decide which one has been selected and display it
	 */
	kitchen.key = "Kitchen";
	livingroom.key = "Living Room";
	hall.key = "Hallway";
	office.key = "Office";
	bathroom.key = "Bathroom";
	bedroom.key = "Bedroom";
	
	/**
	 * Assign handlers to the room objects to update the gui accordingly
	 * Add Logic to update the statistics data and chart data via ajax.
	 * @param {Object} event
	 */
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
	
}
