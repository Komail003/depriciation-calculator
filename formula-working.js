$(document).ready(function () {

    $('[data-toggle="tooltip"]').tooltip();
    $('#dateStart').datepicker({
        format: "mm-yyyy",
        startView: 1,
        minViewMode: 1,
        clearBtn: true,
        language: "en-GB"
    }).datepicker("setDate", 'now');
    $('#additionalOneTimePaymentTime').datepicker({
        format: "mm-yyyy",
        startView: 1,
        minViewMode: 1,
        clearBtn: true,
        language: "en-GB"
    });

    $("#amortization").hide();

    calculate();
});

let click = 0;
document.getElementById('advance').addEventListener('click', advance);

function advance() {
    click++;
    if (click % 2 === 0) {
        $("#advance").text("Optional: Taxes, insurance, HOA fees v");
        $("#advance-options").hide(1250);

    } else {
        $("#advance").text("Optional: Taxes, insurance, HOA fees ^");
        $("#advance-options").show(900);
    }
}

function pmt(rate, nper, pv) {
    if (rate == 0) return -(pv) / nper;

    var pvif = Math.pow(1 + rate, nper);
    var PMT = rate / (pvif - 1) * -(pv * pvif);
    return PMT;
}

var options = {
    chart: {
        type: 'line',
        width : '100%',
        toolbar: {
            show: false,
        }
    },
    series: [{

        borderColor: '#4898FF',
        name: 'Principal paid',
        data: []
    },{

        borderColor: '#88dd9b',
        name: 'Interest paid',
        data: []
    },
        {

        borderColor: '#0041A7',
        name: 'Loan balance',
        data: []
    }],
    xaxis: {
        categories: []
    },
    yaxis: {
        tickAmount: 4,
        labels: {

            formatter: (value) => { return toComma(value) },
        }
    }
}

var chart = new ApexCharts(document.querySelector("#chart-2"), options);

chart.render();


var pieOptions = {
    series: [],
    chart: {
        type: 'donut',
        fontFamily: 'fahadFont',
        width: '100%',

    },

    legend: {
        show: false
    },

    dataLabels: {
        enabled: false,
        formatter: function (val) {
            return toComma(val) + "$"
        },
    },
    plotOptions: {
        pie: {
            donut: {
                labels: {
                    show: true,
                    fontFamily: 'fahadFont',
                    total: {

                        show: true,
                        showAlways: true,
                        label: 'Total monthly payment',
                        fontSize: '13px',
                        fontFamily: 'fahadFont',
                        fontWeight: 600,
                        color: '#373d3f',
                        formatter: function (w) {

                            return '$ ' + w.globals.seriesTotals.reduce((a, b) => {
                             return  Math.round(a + b);

                            }, 0)
                        }

                    }
                }

            }
        }
    },
    labels: ["Principal & Interest", "Property tax", "Homeowner's insurance", "PMI", "HOA fees"],
    colors:["#4898FF", "#52F074", "#7C64C3", "#70c6ff", "#003B99"],
    responsive: [{
        breakpoint: 480,
    }]
};


var pieChart = new ApexCharts(document.querySelector("#myChart"), pieOptions);
pieChart.render();



function updateDownPayment(){


    let downPaymentInPercent = parseFloat($("#downPaymentInPercent").val().replace(/,/g, ''));
    let homePrice = parseFloat($("#homePrice").val().replace(/,/g, ''));

    let newValue = (downPaymentInPercent/100) * homePrice;

    $('#downPayment').val(toComma2(newValue));
    calculate();

}

function updateDownPayment2(){

    let downPayment = parseFloat($("#downPayment").val().replace(/,/g, ''));

    let homePrice = parseFloat($("#homePrice").val().replace(/,/g, ''));

    let newValue = (downPayment/ homePrice ) * 100;

    $('#downPaymentInPercent').val(newValue);
    calculate();

}

function calculate() {

    let interestRate = parseFloat($("#interestRate").val());
    let downPayment = parseFloat($("#downPayment").val().replace(/,/g, ''));
    let homePrice = parseFloat($("#homePrice").val().replace(/,/g, ''));
    let loanTerm = parseFloat($("#loanTerm").val());

    // let extraYearly = parseFloat($("#additionalYearlyAmount").val());
    // let extraMonthly = parseFloat($("#additionalMonthlyAmount").val());
    // let oneTimeAddition = parseFloat($("#additionalOneTimePayment").val());
    //
    // let additionalYearlyAmountMonth = $("#additionalYearlyAmountMonth").val();
    //
    // let oneTimePaymentStart = $("#additionalOneTimePaymentTime").val();
    //
    // let oneTimePaymentDateSplit = oneTimePaymentStart.split("-");
    // let oneTimeMonth = oneTimePaymentDateSplit[0];
    // let oneTime = oneTimePaymentDateSplit[0];

    let loanAmount = homePrice - downPayment;
    let creditScore = parseFloat(document.getElementById("creditScore").value.replace(/,/g, '')) || 0;
    let HOA = parseFloat(document.getElementById("HOA").value.replace(/,/g, '')) || 0;
    let PMI = parseFloat(document.getElementById("PMI").value.replace(/,/g, '')) || 0;
    let homeownerInsurance = parseFloat(document.getElementById("homeownerInsurance").value.replace(/,/g, '')) || 0;
    let propertyTax = parseFloat(document.getElementById("propertyTax").value.replace(/,/g, '')) || 0;

    let extraAmounts = HOA + PMI + homeownerInsurance + propertyTax;


    let dateStart = $("#dateStart").val();

    var splitString = dateStart.split("-");


    var reverseDateArray = splitString.reverse();

    loanTerm = loanTerm * 12;
    var date = new Date(reverseDateArray);

    if (date.getDay() <= 5) {
        date.setDate(date.getDay() + 5);
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    let Parent = document.getElementById("tableBody");
    while (Parent.hasChildNodes()) {
        Parent.removeChild(Parent.firstChild);
    }

    const paymentPerMonth = -pmt(interestRate / 1200, loanTerm, loanAmount);

    $("#PPM").text(toComma(paymentPerMonth.toFixed(2)));
    let balance = loanAmount;
    let counter = 1,
        interest, principal;

    let totalInterest = 0, totalPayment = 0;
    let monthlyPayment = 0;

    let amortization_table = document.getElementById('amortization_table');
    amortization_table.innerHTML = "";

    let principalArray = [];
    let interestArray = [];
    let balanceArray = [];
    let labelArray = [];

    for (let i = 0; i < loanTerm; i++) {


        if (Math.round(balance) == 0) break;

        interest = (interestRate / 1200) * balance;

        date.setMonth(date.getMonth() + 1);
        // var dd = date.getDate();
        var yr = date.getFullYear();
        var mm = months[date.getMonth()];


        var someFormattedDate = mm + '-' + yr;

        // if (yr == oneTimeYear && mm == oneTimeMonth) {
        //     principal = (paymentPerMonth - interest) + (oneTimeAddition);
        // }

        // if (balance >= paymentPerMonth) {
        //     if (mm === additionalYearlyAmountMonth) {
        //         principal = (paymentPerMonth - interest) + (extraMonthly + extraYearly );
        //     } else {
        //         principal = (paymentPerMonth - interest) + (extraMonthly );
        //     }
        //
        // } else {
        principal = (paymentPerMonth - interest)
        // }
        balance -= principal;

        var row = amortization_table.insertRow(i);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);


        cell1.innerHTML = someFormattedDate;
        cell1.style.textAlign = "center";
        labelArray.push(someFormattedDate);

        cell2.innerHTML = toComma(principal.toFixed(2));
        cell2.style.textAlign = "center";

        cell3.innerHTML = toComma(interest.toFixed(2));
        cell3.style.textAlign = "center";

        monthlyPayment = interest + principal;

        totalInterest += interest;
        totalPayment += monthlyPayment;

        cell4.innerHTML = toComma(balance.toFixed(2));
        cell4.style.textAlign = "center";
        interestArray.push(totalInterest.toFixed(0));
        principalArray.push(totalPayment.toFixed(0));
        balanceArray.push(balance.toFixed(0));
        counter++;
        var finalDate = someFormattedDate;
    }


    $("#lastPaymentMonth").text(finalDate.replace(',',' '));
    $("#payoffDate").text(finalDate.replace(',',' '));
    $(".p_i").text(toComma(monthlyPayment.toFixed(2)));
    $(".hoa").text(toComma(HOA.toFixed(2)));
    $(".propertyTax").text(toComma(propertyTax.toFixed(2)));
    $(".pmi").text(toComma(PMI.toFixed(2)));
    $(".homeOwner").text(toComma(homeownerInsurance.toFixed(2)));
    $(".totalPayment").text(toComma((monthlyPayment + extraAmounts).toFixed(0)));


    $(".totalInterest").text(toComma(totalInterest.toFixed(0)));
    $("#totalPayment").text(toComma(totalPayment.toFixed(0)));
    //
    $(".loanAmount").text(toComma(loanAmount.toFixed(0)));
    // $(".totalPayments").text(loanTerm);
    // $(".annualRate").text(interestRate + "%");

    //
    //
    // let principalFinal = totalPayment - totalInterest;

    chart.updateOptions({
        series : [
            { data : [...principalArray]
            },
            {
                data : [...interestArray]
            },
            {
                data : [...balanceArray]
            }
        ],
        xaxis: {
            categories: [...labelArray],
            tickAmount: 6,
        }
    });

    pieChart.updateOptions(
        {
            series : [monthlyPayment,propertyTax,homeownerInsurance,PMI,HOA]
        }


    );

    // details_chart.data.datasets[0].data[0] = monthlyPayment.toFixed(2);
    // details_chart.data.datasets[0].data[1] = propertyTax.toFixed(2);
    // details_chart.data.datasets[0].data[2] = homeownerInsurance.toFixed(2);
    // details_chart.data.datasets[0].data[3] = PMI.toFixed(2);
    // details_chart.data.datasets[0].data[4] = HOA.toFixed(2);
    // details_chart.update();


    // details_chart2.data.labels = [...labelArray];
    // details_chart2.data.datasets[0].data = [...principalArray];
    // details_chart2.data.datasets[1].data = [...interestArray];
    // details_chart2.data.datasets[2].data = [...balanceArray];
    //
    // details_chart2.update();


}

function toComma(x) {
    return "$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toComma2(x) {
    return  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function format(input) {
    var nStr = input.value + '';
    nStr = nStr.replace(/\,/g, "");
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    input.value = x1 + x2;
}


function loadBreakdown() {
    document.getElementById('breakdownPill').classList.add('active');
    document.getElementById('amortizationPill').classList.remove('active');

    $('#amortization').hide();
    $('#breakdown').show();


}

function loadAmortization() {
    document.getElementById('breakdownPill').classList.remove('active');
    document.getElementById('amortizationPill').classList.add('active');

    $('#breakdown').hide();
    $('#amortization').show();


}