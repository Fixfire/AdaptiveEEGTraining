$(document).ready(function(){

        
        //inizializzo il contenitore per il grafico
 $("#main-content").append('<div id="container" style="width:100%; height:400px;"></div>');
       

        $("#container").highcharts({
            chart: {
                type: 'scatter',
                margin: [50, 50, 60, 80],
            },
            title: {
                text: ''
            },
            legend: {
                enabled: true,
                floating: true,
                verticalAlign: 'bottom',
                layout: 'vertical', 
                align: 'center',
                y: 25
            },
            xAxis: {
                gridLineWidth: 1,
                minPadding: 0.2,
                maxPadding: 0.2,
                floor: 0,
                tickInterval: 2
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
            exporting: {
                enabled: false
            },
            scrollbar: {
                enabled: true
            },
            plotOptions: {
                area: {
                    pointStart: 0,
                    marker: {
                        enabled: true
                    },
                },
                series: {
                    lineWidth: 1
                }
            },
            series: [{
                name: 'Attenzione',
                color: '#ffbf00'
            },
            {
                name: 'Rilassamento',
                color: '#00bfff'
            }]
        });
    

});