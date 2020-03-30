var langs = ["Python", "C++", "Java", "JavaScript", "HTML/CSS", "Lua", "VB.Net"]
var skill = [4, 4, 3, 3, 3, 2, 2]

Chart.defaults.global.defaultFontColor = "black";
Chart.defaults.global.defaultFontSize = 16;

// Plugin for filling background color 
Chart.pluginService.register({
    beforeDraw: function (chart) {
        if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
            var ctx = chart.chart.ctx;
            var chartArea = chart.chartArea;
            ctx.save();
            ctx.beginPath();

            // Fill background color
            ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
            ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
            
            // Draw right side border
            ctx.fillStyle = "black";
            ctx.moveTo(chartArea.right, chartArea.top - 1);
            ctx.lineTo(chartArea.right, chartArea.bottom);
            ctx.stroke();
            
            ctx.restore();
        }
    }
});

// Create chart object
var ctx = $("#skills_chart")[0].getContext("2d");
var chart = new Chart (ctx, {
    type: "bar",
    data: {
        labels: langs,
        datasets: [{
            label: "Language Skill",
            backgroundColor: 'rgb(0, 0, 0)',
            borderColor: 'rgb(0, 0, 0)',
            data: skill
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    stepSize: 1,
                    suggestedMin: 0,
                    suggestedMax: 5
                },
                gridLines: {
                    color: "Black"
                }
            }],
            xAxes: [{
                gridLines: {
                    color: "Black"
                }
            }]
        },
        legend: {
            display: false
        },
        chartArea: {
            backgroundColor: "White"
        },
        onResize: function(chart, size) {
            // Reduce font size when window is smaller to avoid formatting issues
            if (size.width < 800) {
                chart.options.scales.xAxes[0].ticks.fontSize = 12;
                chart.options.scales.yAxes[0].ticks.fontSize = 12;
                chart.options.scales.xAxes[0].ticks.minor.fontSize = 12;
                chart.options.scales.yAxes[0].ticks.minor.fontSize = 12;
            }
            else {
                chart.options.scales.xAxes[0].ticks.fontSize = 16;
                chart.options.scales.yAxes[0].ticks.fontSize = 16;
                chart.options.scales.xAxes[0].ticks.minor.fontSize = 16;
                chart.options.scales.yAxes[0].ticks.minor.fontSize = 16;
            }

            chart.update();          
        }
    } 
});