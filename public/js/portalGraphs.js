Highcharts.setOptions({
   global: {
      useUTC: false
   }
});

/*
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var d = new Date();
var currentHour = d.getHours();
var currentMonthWord = months[d.getMonth()];
var currentMonth = d.getMonth();
var currentDate = d.getDate();
var currentMinutes = d.getMinutes();
var currentYear = d.getFullYear();

var chartStart = new Array();
chartStart[0] = Date.UTC(currentYear, currentMonth, currentDate, currentHour-4, (parseInt(currentMinutes/10)+1)*10, 0);
chartStart[1] = Date.UTC(currentYear, currentMonth, currentDate, currentHour-12, (parseInt(currentMinutes/30)+1)*30, 0);
chartStart[2] = Date.UTC(currentYear, currentMonth, currentDate-1, currentHour+1, 0, 0);
chartStart[3] = Date.UTC(currentYear, currentMonth, currentDate-3, (currentHour+1), 0, 0);
*/
var chartSubtitles = new Array();
chartSubtitles[0] = 'Past 4 hours';
chartSubtitles[1] = 'Past 12 hours';
chartSubtitles[2] = 'Past 24 hours';
chartSubtitles[3] = 'Past 3 days';

// Intervals such that each chart requires 24 x values
var chartIntervals = new Array();
chartIntervals[0] = 600000; // 10 min
chartIntervals[1] = 1800000; // 30 min
chartIntervals[2] = 3600000; // 60 min
chartIntervals[3] = 10800000; // 3 hours

function getNextPoint( page, graph, duration )
{
  var handleGetNextPoint = function (response) { response = eval('('+response+')'); console.log(response); return response.point; };

  $.ajax({ url: WWW+'/ajax/getNextPoint.php', data: { page: page,  graph: graph, duration: duration }, success: handleGetNextPoint });
}

var chart = new Array();
var setCharts = function(chartData) {
  // eval the JSON
  chartData = eval('('+chartData+')');

	for(i=1;i<=4;i++) {
		var graphic = "portal-graph-" + i;
		chart[i] = new Highcharts.Chart({
			chart: {
				renderTo: graphic,
				defaultSeriesType: 'areaspline',
				backgroundColor: 'rgba(0,0,0,0)',
        events: {
          load: function() {
   
               // set up the updating of the chart each second
               var series = this.series[0];
               setInterval(function() {
                  var x = (new Date()).getTime(), // current time
                     y = getNextPoint('portal', 'timevspower', '4h');
                  series.addPoint([x, y], true, true);
               }, chartIntervals[i-1]);
            }
          }
			},
			title: {
				text: 'Time vs. Power'
			},
			subtitle: {
				text: chartSubtitles[i-1]
			},
			xAxis: {
				type: 'datetime',
        dateTimeLabelFormats: { second: '%H:%M' }
			},
			yAxis: {
				title: {
					text: 'Kilowatts'
				},
				min: 0,
				minorGridLineWidth: 0, 
				gridLineWidth: 0.1,
				alternateGridColor: null,
			},
			tooltip: {
				backgroundColor: 'rgba(50,50,50,0.7)',
				style: {
         			color: '#FFF'
      			},
				borderWidth: 0,
				crosshairs: true,
				shadow: true,
				snap: 25,
				formatter: function() {
		                return ''+
						Highcharts.dateFormat('%e. %b %Y, %H:%M', this.x) +': '+ this.y +' Kilowatts';
				}
			},
			colors: ['#d5d61d', '#1d90c6', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
			legend: 'null',
		    credits: 'null',
			plotOptions: {
				areaspline: {
					lineWidth: 3,
					states: {
						hover: {
							lineWidth: 3
						}
					},
					marker: {
						enabled: false,
						states: {
							hover: {
								enabled: true,
								symbol: 'circle',
								radius: 4,
								lineWidth: 0.1
							}
						}	
					},
					pointInterval: chartIntervals[i-1],
					pointStart: chartData[i-1][0][0]*1000
				}
			},
			series: [{
				fillColor: {
		                linearGradient: [0, 0, 0, 270],
		                stops: [
		                    [0, 'rgb(255, 246, 60)'],
		                    [1, 'rgba(2,0,0,0)']
		                ]
		            },
				data: chartData[i-1]
			}]
			,
			navigation: {
				menuItemStyle: {
					fontSize: '10px'
				}
			}
		});
	}
	
};

var thermChart = new Array();
var setThermCharts = function() {
	
	for(i=1;i<5;i++) {
		var graphic = "thermGraphic" + i;
		thermChart[i] = new Highcharts.Chart({
			chart: {
				renderTo: graphic,
				defaultSeriesType: 'areaspline',
				backgroundColor: 'rgba(0,0,0,0)',
			},
			title: {
				text: 'Power Usage vs Production For The Past Two Days'
			},
			subtitle: {
				text: 'August 6th and 7th 2011'
			},
			xAxis: {
				type: 'datetime'
			},
			yAxis: {
				title: {
					text: 'Kilowatts'
				},
				min: 0,
				minorGridLineWidth: 0, 
				gridLineWidth: 0.1,
				alternateGridColor: null,
			},
			tooltip: {
				backgroundColor: 'rgba(50,50,50,0.7)',
				style: {
         			color: '#FFF'
      			},
				borderWidth: 0,
				crosshairs: true,
				shadow: true,
				snap: 25,
				formatter: function() {
		                return ''+
						Highcharts.dateFormat('%e. %b %Y, %H:00', this.x) +': '+ this.y +' Kilowatts';
				}
			},
			colors: ['#d5d61d', '#1d90c6', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
			legend: 'null',
		    credits: 'null',
			plotOptions: {
				areaspline: {
					lineWidth: 3,
					states: {
						hover: {
							lineWidth: 3
						}
					},
					marker: {
						enabled: false,
						states: {
							hover: {
								enabled: true,
								symbol: 'circle',
								radius: 4,
								lineWidth: 0.1
							}
						}	
					},
					pointInterval: 3600000, // one hour
					pointStart: Date.UTC(2009, 9, 6, 0, 0, 0)
				}
			},
			series: [{
				fillColor: {
		                linearGradient: [0, 0, 0, 200],
		                stops: [
		                    [0, 'rgb(255, 246, 60)'],
		                    [1, 'rgba(2,0,0,0)']
		                ]
		            },
				data: [4.3+i, 5.1+i, 4.3+i, 5.2+i, 5.4+i, 4.7+i, 3.5+i, 4.1+i, 5.6+i, 7.4+i, 6.9+i, 7.1+i, 
					7.9, 7.9, 7.5, 6.7, 7.7, 7.7, 7.4, 7.0, 7.1, 5.8, 5.9, 7.4+i, 
					8.2, 8.5, 9.4, 8.1, 10.9, 10.4, 10.9, 12.4, 12.1, 9.5, 7.5+i, 
					7.1, 7.5, 8.1, 6.8, 3.4, 2.1, 1.9, 2.8, 2.9, 1.3+i*2, 4.4, 4.2+i, 
					3.0, 3.0]
		
			}, {
				fillColor: {
		                linearGradient: [0, 0, 0, 350],
		                stops: [
		                    [0, 'rgb(2, 130, 191)'],
		                    [1, 'rgba(2,0,0,0)']
		                ]
		            },
				data: [0.0+i, 0.0+i, 0.0, 0.0+i, 0.0+i, 0.0+i, 0.0, 0.0, 0.1, 0.0, 0.3, 0.0, 
					0.0, 0.4+i, 0.0, 0.1, 0.0+i, 0.0+i, 0.0+i, 0.0, 0.0, 0.0, 0.0, 0.0, 
					0.0, 0.6, 1.2+i, 1.7+i, 0.7, 2.9, 4.1, 2.6, 3.7, 3.9, 1.7, 2.3, 
					3.0, 3.3, 4.8, 5.0+i, 4.8+i, 5.0+i*2, 3.2, 2.0, 0.9, 0.4+i*3, 0.3, 0.5, 0.4]
			}]
			,
			navigation: {
				menuItemStyle: {
					fontSize: '10px'
				}
			}
		});
	}
	
};

var historyChart = new Array();
var sethistoryCharts = function() {
	
	for(i=1;i<5;i++) {
		var graphic = "historyGraphic" + i;
		historyChart[i] = new Highcharts.Chart({
			chart: {
				renderTo: graphic,
				defaultSeriesType: 'areaspline',
				backgroundColor: 'rgba(0,0,0,0)',
			},
			title: {
				text: 'Power Usage vs Production For The Past Two Days'
			},
			subtitle: {
				text: 'August 6th and 7th 2011'
			},
			xAxis: {
				type: 'datetime'
			},
			yAxis: {
				title: {
					text: 'Kilowatts'
				},
				min: 0,
				minorGridLineWidth: 0, 
				gridLineWidth: 0.1,
				alternateGridColor: null,
			},
			tooltip: {
				backgroundColor: 'rgba(50,50,50,0.7)',
				style: {
         			color: '#FFF'
      			},
				borderWidth: 0,
				crosshairs: true,
				shadow: true,
				snap: 25,
				formatter: function() {
		                return ''+
						Highcharts.dateFormat('%e. %b %Y, %H:00', this.x) +': '+ this.y +' Kilowatts';
				}
			},
			colors: ['#d5d61d', '#1d90c6', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
			legend: 'null',
		    credits: 'null',
			plotOptions: {
				areaspline: {
					lineWidth: 3,
					states: {
						hover: {
							lineWidth: 3
						}
					},
					marker: {
						enabled: false,
						states: {
							hover: {
								enabled: true,
								symbol: 'circle',
								radius: 4,
								lineWidth: 0.1
							}
						}	
					},
					pointInterval: 3600000, // one hour
					pointStart: Date.UTC(2009, 9, 6, 0, 0, 0)
				}
			},
			series: [{
				fillColor: {
		                linearGradient: [0, 0, 0, 270],
		                stops: [
		                    [0, 'rgb(255, 246, 60)'],
		                    [1, 'rgba(2,0,0,0)']
		                ]
		            },
				data: [4.3+i, 5.1+i, 4.3+i, 5.2+i, 5.4+i, 4.7+i, 3.5+i, 4.1+i, 5.6+i, 7.4+i, 6.9+i, 7.1+i, 
					7.9, 7.9, 7.5, 6.7, 7.7, 7.7, 7.4, 7.0, 7.1, 5.8, 5.9, 7.4+i, 
					8.2, 8.5, 9.4, 8.1, 10.9, 10.4, 10.9, 12.4, 12.1, 9.5, 7.5+i, 
					7.1, 7.5, 8.1, 6.8, 3.4, 2.1, 1.9, 2.8, 2.9, 1.3+i*2, 4.4, 4.2+i, 
					3.0, 3.0]
		
			}, {
				fillColor: {
		                linearGradient: [0, 0, 0, 400],
		                stops: [
		                    [0, 'rgb(2, 130, 191)'],
		                    [1, 'rgba(2,0,0,0)']
		                ]
		            },
				data: [0.0+i, 0.0+i, 0.0, 0.0+i, 0.0+i, 0.0+i, 0.0, 0.0, 0.1, 0.0, 0.3, 0.0, 
					0.0, 0.4+i, 0.0, 0.1, 0.0+i, 0.0+i, 0.0+i, 0.0, 0.0, 0.0, 0.0, 0.0, 
					0.0, 0.6, 1.2+i, 1.7+i, 0.7, 2.9, 4.1, 2.6, 3.7, 3.9, 1.7, 2.3, 
					3.0, 3.3, 4.8, 5.0+i, 4.8+i, 5.0+i*2, 3.2, 2.0, 0.9, 0.4+i*3, 0.3, 0.5, 0.4]
			}]
			,
			navigation: {
				menuItemStyle: {
					fontSize: '10px'
				}
			}
		});
	}
	
};

var sunChart = new Array();
var setSunCharts = function() {
	
	for(i=1;i<5;i++) {
		var graphic = "sunGraphic" + i;
		thermChart[i] = new Highcharts.Chart({
			chart: {
				renderTo: graphic,
				defaultSeriesType: 'areaspline',
				backgroundColor: 'rgba(0,0,0,0)',
			},
			title: {
				text: 'Power Usage vs Production For The Past Two Days'
			},
			subtitle: {
				text: 'August 6th and 7th 2011'
			},
			xAxis: {
				type: 'datetime'
			},
			yAxis: {
				title: {
					text: 'Kilowatts'
				},
				min: 0,
				minorGridLineWidth: 0, 
				gridLineWidth: 0.1,
				alternateGridColor: null,
			},
			tooltip: {
				backgroundColor: 'rgba(50,50,50,0.7)',
				style: {
         			color: '#FFF'
      			},
				borderWidth: 0,
				crosshairs: true,
				shadow: true,
				snap: 25,
				formatter: function() {
		                return ''+
						Highcharts.dateFormat('%e. %b %Y, %H:00', this.x) +': '+ this.y +' Kilowatts';
				}
			},
			colors: ['#d5d61d', '#1d90c6', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
			legend: 'null',
		    credits: 'null',
			plotOptions: {
				areaspline: {
					lineWidth: 3,
					states: {
						hover: {
							lineWidth: 3
						}
					},
					marker: {
						enabled: false,
						states: {
							hover: {
								enabled: true,
								symbol: 'circle',
								radius: 4,
								lineWidth: 0.1
							}
						}	
					},
					pointInterval: 3600000, // one hour
					pointStart: Date.UTC(2009, 9, 6, 0, 0, 0)
				}
			},
			series: [{
				fillColor: {
		                linearGradient: [0, 0, 0, 200],
		                stops: [
		                    [0, 'rgb(255, 246, 60)'],
		                    [1, 'rgba(2,0,0,0)']
		                ]
		            },
				data: [4.3+i, 5.1+i, 4.3+i, 5.2+i, 5.4+i, 4.7+i, 3.5+i, 4.1+i, 5.6+i, 7.4+i, 6.9+i, 7.1+i, 
					7.9, 7.9, 7.5, 6.7, 7.7, 7.7, 7.4, 7.0, 7.1, 5.8, 5.9, 7.4+i, 
					8.2, 8.5, 9.4, 8.1, 10.9, 10.4, 10.9, 12.4, 12.1, 9.5, 7.5+i, 
					7.1, 7.5, 8.1, 6.8, 3.4, 2.1, 1.9, 2.8, 2.9, 1.3+i*2, 4.4, 4.2+i, 
					3.0, 3.0]
		
			}, {
				fillColor: {
		                linearGradient: [0, 0, 0, 350],
		                stops: [
		                    [0, 'rgb(2, 130, 191)'],
		                    [1, 'rgba(2,0,0,0)']
		                ]
		            },
				data: [0.0+i, 0.0+i, 0.0, 0.0+i, 0.0+i, 0.0+i, 0.0, 0.0, 0.1, 0.0, 0.3, 0.0, 
					0.0, 0.4+i, 0.0, 0.1, 0.0+i, 0.0+i, 0.0+i, 0.0, 0.0, 0.0, 0.0, 0.0, 
					0.0, 0.6, 1.2+i, 1.7+i, 0.7, 2.9, 4.1, 2.6, 3.7, 3.9, 1.7, 2.3, 
					3.0, 3.3, 4.8, 5.0+i, 4.8+i, 5.0+i*2, 3.2, 2.0, 0.9, 0.4+i*3, 0.3, 0.5, 0.4]
			}]
			,
			navigation: {
				menuItemStyle: {
					fontSize: '10px'
				}
			}
		});
	}
	
};

var waterChart = new Array();
var setWaterCharts = function() {
	
	for(i=1;i<5;i++) {
		var graphic = "waterGraphic" + i;
		thermChart[i] = new Highcharts.Chart({
			chart: {
				renderTo: graphic,
				defaultSeriesType: 'areaspline',
				backgroundColor: 'rgba(0,0,0,0)',
			},
			title: {
				text: 'Power Usage vs Production For The Past Two Days'
			},
			subtitle: {
				text: 'August 6th and 7th 2011'
			},
			xAxis: {
				type: 'datetime'
			},
			yAxis: {
				title: {
					text: 'Kilowatts'
				},
				min: 0,
				minorGridLineWidth: 0, 
				gridLineWidth: 0.1,
				alternateGridColor: null,
			},
			tooltip: {
				backgroundColor: 'rgba(50,50,50,0.7)',
				style: {
         			color: '#FFF'
      			},
				borderWidth: 0,
				crosshairs: true,
				shadow: true,
				snap: 25,
				formatter: function() {
		                return ''+
						Highcharts.dateFormat('%e. %b %Y, %H:00', this.x) +': '+ this.y +' Kilowatts';
				}
			},
			colors: ['#d5d61d', '#1d90c6', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
			legend: 'null',
		    credits: 'null',
			plotOptions: {
				areaspline: {
					lineWidth: 3,
					states: {
						hover: {
							lineWidth: 3
						}
					},
					marker: {
						enabled: false,
						states: {
							hover: {
								enabled: true,
								symbol: 'circle',
								radius: 4,
								lineWidth: 0.1
							}
						}	
					},
					pointInterval: 3600000, // one hour
					pointStart: Date.UTC(2009, 9, 6, 0, 0, 0)
				}
			},
			series: [{
				fillColor: {
		                linearGradient: [0, 0, 0, 200],
		                stops: [
		                    [0, 'rgb(255, 246, 60)'],
		                    [1, 'rgba(2,0,0,0)']
		                ]
		            },
				data: [4.3+i, 5.1+i, 4.3+i, 5.2+i, 5.4+i, 4.7+i, 3.5+i, 4.1+i, 5.6+i, 7.4+i, 6.9+i, 7.1+i, 
					7.9, 7.9, 7.5, 6.7, 7.7, 7.7, 7.4, 7.0, 7.1, 5.8, 5.9, 7.4+i, 
					8.2, 8.5, 9.4, 8.1, 10.9, 10.4, 10.9, 12.4, 12.1, 9.5, 7.5+i, 
					7.1, 7.5, 8.1, 6.8, 3.4, 2.1, 1.9, 2.8, 2.9, 1.3+i*2, 4.4, 4.2+i, 
					3.0, 3.0]
		
			}, {
				fillColor: {
		                linearGradient: [0, 0, 0, 350],
		                stops: [
		                    [0, 'rgb(2, 130, 191)'],
		                    [1, 'rgba(2,0,0,0)']
		                ]
		            },
				data: [0.0+i, 0.0+i, 0.0, 0.0+i, 0.0+i, 0.0+i, 0.0, 0.0, 0.1, 0.0, 0.3, 0.0, 
					0.0, 0.4+i, 0.0, 0.1, 0.0+i, 0.0+i, 0.0+i, 0.0, 0.0, 0.0, 0.0, 0.0, 
					0.0, 0.6, 1.2+i, 1.7+i, 0.7, 2.9, 4.1, 2.6, 3.7, 3.9, 1.7, 2.3, 
					3.0, 3.3, 4.8, 5.0+i, 4.8+i, 5.0+i*2, 3.2, 2.0, 0.9, 0.4+i*3, 0.3, 0.5, 0.4]
			}]
			,
			navigation: {
				menuItemStyle: {
					fontSize: '10px'
				}
			}
		});
	}
	
};
