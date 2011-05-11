/**
 * This File sets up all the default info for graphs on the
 * energy monitoring page. As it stands it will loop through all 4 sets in
 * each category and build a placeholder graph for the prototype. A configuration
 * object must be built for each graph type and data must be collected from the server
 * for this to be fully functional.
 * 
 * @author Daniel Mestas
 * @netid mestas1
 * @email dan5446@gmail.com
 * @date Spring 2011
 */

/**
 * This variable holds the chart type currently being viewed 
 * so we dont reload an already loaded graph
 */
var selectedType = 'history';


/**
 * Sets up the power usage breakdown by category graphs
 * Add logic to grab the correct datum from a json object sent by the server
 */
var breakdown = new Array();
var setBreakdownCharts = function() {
	for(i=1;i<5;i++) {
		var graphic = "historyGraphic" + i;
		breakdown[i] = new Highcharts.Chart({
	      chart: {
	         renderTo: graphic,
	         margin: [50, 0, 0, 0],
	         plotBackgroundColor: 'none',
	         plotBorderWidth: 0,
			 backgroundColor: 'rgba(0,0,0,0)',
	         plotShadow: false            
	      },
		  credits: {
		  	enabled: false
		  },
	      title: {
	         text: 'Energy Usage Per Device/Category'
	      },
	      subtitle: {
	         text: 'Inner circle: Yesterday, outer circle: Today'
	      },
	      tooltip: {
	         formatter: function() {
	            return '<b>'+ this.series.name +'</b><br/>'+ 
	               this.point.name +': '+ this.y +' %';
	         }
	      },
	       series: [{
	         type: 'pie',
	         name: 'Yesterday',
	         size: '45%',
	         innerSize: '20%',
	         data: [
	            { name: 'Refridgerator', y: 44.2, color: '#4572A7' },
	            { name: 'Water Heater', y: 46.6, color: '#AA4643' },
	            { name: 'Stove', y: 3.1, color: '#89A54E' },
	            { name: 'Lights', y: 2.7, color: '#80699B' },
	            { name: 'Entertainment', y: 2.3, color: '#3D96AE' },
	            { name: 'Other', y: 0.4, color: '#DB843D' }
	         ],
	         dataLabels: {
	            enabled: false
	         }
	      }, {
	         type: 'pie',
	         name: 'Today',
	         innerSize: '45%',
	         data: [
	            { name: 'Refridgerator', y: 45.0, color: '#4572A7' },
	            { name: 'Water Heater', y: 26.8, color: '#AA4643' },
	            { name: 'Stove', y: 12.8, color: '#89A54E' },
	            { name: 'Lights', y: 8.5, color: '#80699B' },
	            { name: 'Entertainment', y: 6.2, color: '#3D96AE' },
	            { name: 'Other', y: 0.2, color: '#DB843D' }
	         ],
			 dataLabels: {
			 	color: '#FFFFFF'
			 }
	      }]
	   });	
	}	
};

/**
 * Sets up the power usage over time bar graphs
 * Add logic to grab the correct datum from a json object sent by the server
 */
var bargraphs = new Array();
var setBarCharts = function() {
	for(i=1;i<5;i++) {
		var graphic = "historyGraphic" + i;
		bargraphs[i] = new Highcharts.Chart({
	      chart: {
	         renderTo: graphic,
	         defaultSeriesType: 'column',
			 backgroundColor: 'rgba(0,0,0,0)'
	      },
		  credits: {
		  	enabled: false
		  },
	      title: {
	         text: 'Energy Usage By Category'
	      },
	      subtitle: {
	         text: 'By Month for 2011'
	      },
	      xAxis: {
	         categories: [
	            'Jan', 
	            'Feb', 
	            'Mar', 
	            'Apr', 
	            'May', 
	            'Jun'
	         ]
	      },
	      yAxis: {
	         min: 0,
	         title: {
	            text: 'Energy (kwh)'
	         },
			 minorGridLineWidth: 0, 
			 gridLineWidth: 0.1,
			 alternateGridColor: null,
	      },
	      legend: {
	         layout: 'vertical',
	         backgroundColor: 'rgba(50,50,50,0.7)',
	         align: 'left',
	         verticalAlign: 'top',
	         x: 60,
	         y: 60,
	         floating: true,
	         shadow: true
	      },
	      tooltip: {
	         formatter: function() {
	            return ''+
	               this.x +': '+ this.y +' kwh';
	         }
	      },
	      plotOptions: {
	         column: {
	            pointPadding: 0.2,
	            borderWidth: 0
	         }
	      },
	           series: [{
	         name: 'Lights',
	         data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0]
	   
	      }, {
	         name: 'Appliances',
	         data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5]
	   
	      }, {
	         name: 'Entertainment',
	         data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3]
	   
	      }, {
	         name: 'Other',
	         data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5]
	   
	      }]
	   });
	}	
};

/**
 * Sets up the power usage vs temperature graphs, this can be changed to any type 
 * of graph which is necessary.
 * Add logic to grab the correct datum from a json object sent by the server
 */
var otherCharts = new Array();
var setOtherCharts = function() {
	for(i=1;i<5;i++) {
		var graphic = "historyGraphic" + i;
		otherCharts[i] = new Highcharts.Chart({
	      chart: {
	         renderTo: graphic,
	         zoomType: 'xy',
			 backgroundColor: 'rgba(0,0,0,0)'
	      },
		  credits: {
		  	enabled: false
		  },
	      title: {
	         text: 'Average Monthly Temperature and Energy Usage'
	      },
	      subtitle: {
	         text: 'Via Temperature Sensors'
	      },
	      xAxis: [{
	         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
	            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	      }],
	      yAxis: [{ // Primary yAxis
	         labels: {
	            formatter: function() {
	               return this.value +'°C';
	            },
	            style: {
	               color: '#89A54E'
	            }
	         },
	         title: {
	            text: 'Temperature',
	            style: {
	               color: '#89A54E'
	            }
	         }
	      }, { // Secondary yAxis
	         title: {
	            text: 'Energy Usage',
	            style: {
	               color: '#4572A7'
	            }
	         },
	         labels: {
	            formatter: function() {
	               return this.value +' kwh';
	            },
	            style: {
	               color: '#4572A7'
	            }
	         },
	         opposite: true
	      }],
	      tooltip: {
	         formatter: function() {
	            return ''+
	               this.x +': '+ this.y +
	               (this.series.name == 'Energy' ? ' kwh' : '°C');
	         }
	      },
	      legend: {
	         layout: 'vertical',
	         align: 'left',
	         x: 70,
	         verticalAlign: 'top',
	         y: 70,
	         floating: true,
	         backgroundColor: 'rgba(50,50,50,0.7)'
	      },
	      series: [{
	         name: 'Energy Usage',
	         color: '#4572A7',
	         type: 'column',
	         yAxis: 1,
	         data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]      
	      
	      }, {
	         name: 'Temperature',
	         color: '#89A54E',
	         type: 'spline',
	         data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
	      }]
	   });
	}	
};