$(document).ready(function(){

        
        //inizializzo il contenitore per il grafico
 $("#main-content").append('<div id="container" style="width:100%; height:400px;"></div>');
       
     Highcharts.setOptions({
                global: {
                    useUTC: false
                }

     }); 

        $("#container").highcharts('StockChart', {
        chart: {
            type: 'scatter',
            margin: [50, 50, 60, 80],
        },
        xAxis: {
        		type: 'datetime',
            gridLineWidth: 1,
            minPadding: 0.2,
            maxPadding: 0.2,
            minRange: 2,
            tickInterval: 2,
            dateTimeLabelFormats: {
                second: '%H:%M:%S'
            },
            units: [[
			     'second',
                [2]
            ]],
        },
        yAxis: {
            gridLineWidth: 1,
            floor: 0,
            min: 0,
            ceiling: 100,
            max: 100,
            title: {
                text: 'Valore'
            },
            minPadding: 0.2,
            maxPadding: 0.2,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },

        rangeSelector: {
            buttons: [{
                count: 10,
                type: 'second',
                text: '10sec'
            }, {
                count: 30,
                type: 'second',
                text: '30sec'
            }, {
                count: 60,
                type: 'second',
                text: '1min'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 1
        },

        title : {
            text : 'Live random data'
        },

        exporting: {
            enabled: false
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: true
                },
            pointStart: new Date().getTime(),
            },
            series: {
                lineWidth: 1
            }
        },
				credits: {
        		enabled: false
       	},
        legend: {
                enabled: true,
                floating: true,
                verticalAlign: 'bottom',
                layout: 'horizontal', 
                align: 'center',
                y: -60
            },
        series : [{
            name: 'Attention',
            data: [],
            color: '#e60000'
        },
        {
            name: 'Relaxation',
            data: [],
            color: '#00bfff'
        },{
            name: 'Events',
            showInLegend: false,
            data: [],
            color: '#FFFFFF'
        },{
            name: 'Light Intensity',
            showInLegend: true,
            data: [],
            color: '#00cc00'
        },
                 {
            name: 'Music Intensity',
            showInLegend: true,
            data: [],
            color: '#000000'
        }]
    });
});