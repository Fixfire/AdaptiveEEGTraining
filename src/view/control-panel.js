$(document).ready(function(){
        
        //inizializzo il contenitore per il grafico
    $("#main-content").append('<div id="cont1" style="width:100%; height:400px;"></div>');
    $("#main-content").append('<div id="cont2" style="width:100%; height:400px;"></div>');
    
    chart1 = AmCharts.makeChart("cont1",
				{
					"type": "serial",
					"categoryField": "date",
					"dataDateFormat": "YYYY-MM-DD HH:NN:SS",
					"maxSelectedSeries": -1,
					"marginTop": 16,
					"colors": [
						"#e60000",
						"#0D8ECF",
						"#ffffff",
						"#FCD202",
						"#2A0CD0",
						"#CD0D74",
						"#CC0000",
						"#00CC00",
						"#0000CC",
						"#DDDDDD",
						"#999999",
						"#333333",
						"#990000"
					],
					"categoryAxis": {
						"minPeriod": "ss",
						"parseDates": true
					},
					"chartCursor": {
						"enabled": true,
						"categoryBalloonDateFormat": "JJ:NN:SS"
					},
					"chartScrollbar": {
						"enabled": true
					},
					"trendLines": [],
					"graphs": [
						{
							"bullet": "round",
							"id": "Attention",
							"title": "Attention",
							"valueField": "column-1"
						},
						{
							"bullet": "square",
							"id": "Relaxation",
							"title": "Relaxation",
							"valueField": "column-2"
						},
						{
							"customBulletField": "customBullet",
							"id": "Event",
							"title": "Event",
							"valueField": "column-3",
                            "bulletSize": 20
						}
					],
					"guides": [],
					"valueAxes": [
						{
							"id": "ValueAxis-1",
							"maximum": 100,
							"minimum": 0,
							"title": "Value"
						}
					],
					"allLabels": [],
					"balloon": {},
					"legend": {
						"enabled": true,
						"useGraphSettings": true
					},
					"titles": [
						{
							"id": "Title-1",
							"size": 15,
							"text": "Realtime EEG levels"
						}
					],
					"dataProvider": []
				}
			);
    
    chart2 = AmCharts.makeChart("cont2",
				{
					"type": "serial",
					"categoryField": "date",
					"dataDateFormat": "YYYY-MM-DD HH:NN:SS",
					"maxSelectedSeries": -1,
					"marginTop": 16,
        	        "zoomOutOnDataUpdate": false,
					"colors": [
						"#e60000",
						"#FCD202",
						"#ffffff",
						"#0D8ECF",
						"#2A0CD0",
						"#CD0D74",
						"#CC0000",
						"#00CC00",
						"#0000CC",
						"#DDDDDD",
						"#999999",
						"#333333",
						"#990000"
					],
					"categoryAxis": {
						"minPeriod": "ss",
						"parseDates": true
					},
					"chartCursor": {
						"enabled": true,
						"categoryBalloonDateFormat": "JJ:NN:SS"
					},
					"chartScrollbar": {
						"enabled": true
					},
					"trendLines": [],
					"graphs": [
						{
							"bullet": "square",
							"id": "Light",
							"title": "Lights Intensity",
							"valueField": "column-1"
						},{
							"bullet": "round",
							"id": "Music",
							"title": "Music Volume",
							"valueField": "column-2"
						}
					],
					"guides": [],
					"valueAxes": [
						{
							"id": "ValueAxis-1",
							"maximum": 100,
							"minimum": 0,
							"title": "Value"
						}
					],
					"allLabels": [],
					"balloon": {},
					"legend": {
						"enabled": true,
						"useGraphSettings": true
					},
					"titles": [
						{
							"id": "Title-1",
							"size": 15,
							"text": "Responsive levels"
						}
					],
					"dataProvider": []
				}
			);
    
    chart1.addListener("dataUpdated", scale1);
    chart2.addListener("dataUpdated", scale2);
        
});

function scale1(){
    if(chart1.dataProvider.length > 10)
    
    chart1.zoomToIndexes(chart1.dataProvider.length - 10, chart1.dataProvider.length -1);   
}

function scale2(){
    if(chart2.dataProvider.length > 10)
    
    chart2.zoomToCategoryValues(chart2.dataProvider.length - 10, chart2.dataProvider.length -1);   
}