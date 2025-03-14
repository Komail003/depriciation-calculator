let details_ctx = document.getElementById("myChart");
let details_chart = new Chart(details_ctx, {
    type: "doughnut",

    data: {
        labels: ["Principal & Interest", "Property tax", "Homeowner's insurance", "PMI", "HOA fees"],
        datasets: [
            {

                backgroundColor: ["#4898FF", "#52F074", "#7C64C3", "#70c6ff", "#003B99"],
                data: [3.23.toFixed(2), 3.23.toFixed(2), 3.23.toFixed(2), 3.23.toFixed(2), 3.23.toFixed(2)],

            }

        ]
    },
    options: {
        cutoutPercentage: 65,
        fontFamily: "Abel",
        legend: {display: false},

        plugins: {
            tooltip: {
                callback: function (value) {
                    return toComma(value);
                }
            }
        }
    }
});



let chart2 = document.getElementById("chart-2");
let details_chart2 = new Chart(chart2, {
    type: "line",


    data: {
        labels: [0],
        datasets: [
            {   borderColor: '#4898FF',
                label: ' Principal paid',
                data: [],
                fill: false,
                tension: 0.1
            },
            {
                label: 'Interest paid',
                borderColor: '#88DD9B',
                data: [],
                fill: false,
                tension: 0.1
            },
            {
                label: 'Loan balance',
                borderColor: '#0041A7',
                data: [],
                fill: false,
                tension: 0.1
            }

        ],

    },
    options: {

        fontFamily: "Abel",
        legend: {display: false},
        elements : {
            point : {
                radius : 1.25,
                borderWidth : 0,
                pointStyle : 'line',

            },
            line : {
                tension : 6,
            },
            arc : {
                borderWidth : 6,
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "#1c154a",
                    fontStyle: "bold",
                    beginAtZero: false,
                    maxTicksLimit: 5,
                    padding: 20,
                    defaultFontFamily: 'Montserrat',
                    callback: function(data) {
                        return '$'+data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;

                    }

                },
                gridLines: {
                    drawTicks: true,
                    display: true
                },
                scaleLabel: {
                    display: false,
                    labelString: 'Money',
                    defaultFontFamily: 'Montserrat'
                }

            }],
            xAxes: [{
                gridLines: {
                    zeroLineColor: "transparent"
                },
                ticks: {
                    padding: 20,
                    fontColor: "#1c154a",
                    maxTicksLimit: 7,
                    fontStyle: "bold",
                    defaultFontFamily: 'Montserrat'
                },
                scaleLabel: {
                    display: false,
                    defaultFontFamily: 'Montserrat',
                    labelString: 'Years'
                }
            }]
        },

        plugins: {
            tooltip: {
                callback: function (value) {
                    return toComma(value);
                }
            }
        }
    }
});