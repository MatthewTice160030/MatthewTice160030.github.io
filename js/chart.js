var langs = ["Python", "C++", "Java", "JavaScript", "HTML/CSS", "Lua", "VB.Net"]
var skill = [4, 4, 3, 3, 3, 2, 2]

Chart.defaults.global.defaultFontColor = "black";
Chart.defaults.global.defaultFontSize = 16;

var ctx = $("#skills_chart")[0].getContext("2d");
var chart = new Chart (ctx, {
    type: "bar",
    data: {
        labels: langs,
        datasets: [{
            label: "Programming Languages",
            backgroundColor: 'rgb(0, 0, 0)',
            borderColor: 'rgb(0, 0, 0)',
            data: skill
        }]
    },
    options: {
    }
});