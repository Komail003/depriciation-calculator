$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $("#dateStart")
    .datepicker({
      format: "mm-yyyy",
      startView: 1,
      minViewMode: 1,
      clearBtn: true,
      language: "en-GB",
    })
    .datepicker("setDate", "now");
  $("#additionalOneTimePaymentTime")
    .datepicker({
      format: "mm-yyyy",
      startView: 1,
      minViewMode: 1,
      clearBtn: true,
      language: "en-GB",
    })
    .datepicker("setDate", "now");

  $("#amortization").hide();

  calculate();
});

let click = 0;
document.getElementById("advance").addEventListener("click", advance);

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

// function pmt(rate, nper, pv) {
//   if (rate == 0) return -pv / nper;

//   var pvif = Math.pow(1 + rate, nper);
//   var PMT = (rate / (pvif - 1)) * -(pv * pvif);
//   return PMT;
// }

// var options = {
//   chart: {
//     type: "line",
//     width: "100%",
//     toolbar: {
//       show: false,
//     },
//   },
//   series: [
//     {
//       borderColor: "#4898FF",
//       name: "Principal paid",
//       data: [],
//     },
//     {
//       borderColor: "#88dd9b",
//       name: "Interest paid",
//       data: [],
//     },
//     {
//       borderColor: "#0041A7",
//       name: "Loan balance",
//       data: [],
//     },
//   ],
//   xaxis: {
//     categories: [],
//   },
//   yaxis: {
//     tickAmount: 4,
//     labels: {
//       formatter: (value) => {
//         return toComma(value);
//       },
//     },
//   },
// };

// var chart = new ApexCharts(document.querySelector("#chart-2"), options);

// chart.render();

// var pieOptions = {
//   series: [],
//   chart: {
//     type: "donut",
//     fontFamily: "fahadFont",
//     width: "100%",
//   },

//   legend: {
//     show: false,
//   },

//   dataLabels: {
//     enabled: false,
//     formatter: function (val) {
//       return toComma(val) + "$";
//     },
//   },
//   plotOptions: {
//     pie: {
//       donut: {
//         labels: {
//           show: true,
//           fontFamily: "fahadFont",
//           total: {
//             show: true,
//             showAlways: true,
//             label: "Total monthly payment",
//             fontSize: "13px",
//             fontFamily: "fahadFont",
//             fontWeight: 600,
//             color: "#373d3f",
//             formatter: function (w) {
//               return (
//                 "$ " +
//                 w.globals.seriesTotals.reduce((a, b) => {
//                   return Math.round(a + b);
//                 }, 0)
//               );
//             },
//           },
//         },
//       },
//     },
//   },
//   labels: [
//     "Principal & Interest",
//     "Property tax",
//     "Homeowner's insurance",
//     "PMI",
//     "HOA fees",
//   ],
//   colors: ["#4898FF", "#52F074", "#7C64C3", "#70c6ff", "#003B99"],
//   responsive: [
//     {
//       breakpoint: 480,
//     },
//   ],
// };

// var pieChart = new ApexCharts(document.querySelector("#myChart"), pieOptions);
// pieChart.render();

// function updateDownPayment(){

//     let downPaymentInPercent = parseFloat($("#downPaymentInPercent").val().replace(/,/g, ''));
//     let homePrice = parseFloat($("#homePrice").val().replace(/,/g, ''));

//     let newValue = (downPaymentInPercent/100) * homePrice;

//     $('#downPayment').val(toComma2(newValue));
//     calculate();

// }

// function updateDownPayment2(){

//     let downPayment = parseFloat($("#downPayment").val().replace(/,/g, ''));

//     let homePrice = parseFloat($("#homePrice").val().replace(/,/g, ''));

//     let newValue = (downPayment/ homePrice ) * 100;

//     $('#downPaymentInPercent').val(newValue);
//     calculate();

// }

// function calculate() {

//     let interestRate = parseFloat($("#interestRate").val());
//     let downPayment = parseFloat($("#downPayment").val().replace(/,/g, ''));
//     let homePrice = parseFloat($("#homePrice").val().replace(/,/g, ''));
//     let loanTerm = parseFloat($("#loanTerm").val());

//     // let extraYearly = parseFloat($("#additionalYearlyAmount").val());
//     let extraMonthly = parseFloat(document.getElementById("additionalMonthlyAmount").value.replace(/,/g, '').replace('$','')) || 0;
//     let extraYearly = parseFloat(document.getElementById("additionalYearlyAmount").value.replace(/,/g, '').replace('$','')) || 0;
//     let additionalOneTimePayment = parseFloat(document.getElementById("additionalOneTimePayment").value.replace(/,/g, '').replace('$','')) || 0;
//     let additionalYearlyAmountMonth = $("#additionalYearlyAmountMonth").val();
//     // let oneTimeAddition = parseFloat($("#additionalOneTimePayment").val());
//     //

//     let oneTimePaymentStart = $("#additionalOneTimePaymentTime").val();

//     let oneTimePaymentDateSplit = oneTimePaymentStart.split("-");

//     let reverseOneTimePaymentDateArray = oneTimePaymentDateSplit.reverse();

//     var oneTimePaymentDate = new Date(reverseOneTimePaymentDateArray);

//     let oneTimeMonth = oneTimePaymentDateSplit[0];
//     let oneTimeYear = oneTimePaymentDateSplit[1];

//     let loanAmount = homePrice - downPayment;
//     let creditScore = parseFloat(document.getElementById("creditScore").value.replace(/,/g, '')) || 0;
//     let HOA = parseFloat(document.getElementById("HOA").value.replace(/,/g, '')) || 0;
//     let PMI = parseFloat(document.getElementById("PMI").value.replace(/,/g, '')) || 0;
//     let homeownerInsurance = parseFloat(document.getElementById("homeownerInsurance").value.replace(/,/g, '')) || 0;
//     let propertyTax = parseFloat(document.getElementById("propertyTax").value.replace(/,/g, '')) || 0;

//     let extraAmounts = HOA + PMI + homeownerInsurance + propertyTax;

//     let dateStart = $("#dateStart").val();

//     var splitString = dateStart.split("-");

//     var reverseDateArray = splitString.reverse();

//     loanTerm = loanTerm * 12;
//     var date = new Date(reverseDateArray);

//     if (date.getDay() <= 5) {
//         date.setDate(date.getDay() + 5);
//     }

//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//     let Parent = document.getElementById("tableBody");
//     while (Parent.hasChildNodes()) {
//         Parent.removeChild(Parent.firstChild);
//     }

//     const paymentPerMonth = -pmt(interestRate / 1200, loanTerm, loanAmount);

//     $("#PPM").text(toComma(paymentPerMonth.toFixed(2)));
//     let balance = loanAmount;
//     let counter = 1,
//         interest, principal;

//     let totalInterest = 0, totalPayment = 0;
//     let monthlyPayment = 0;

//     let amortization_table = document.getElementById('amortization_table');
//     amortization_table.innerHTML = "";

//     let principalArray = [];
//     let interestArray = [];
//     let balanceArray = [];
//     let labelArray = [];

//     for (let i = 0; i < loanTerm; i++) {

//         if (Math.round(balance) <= 0) break;

//         interest = (interestRate / 1200) * balance;

//         date.setMonth(date.getMonth() + 1);
//         oneTimePaymentDate.setMonth(oneTimePaymentDate.getMonth() + 1);
//         // var dd = date.getDate();
//         var yr = date.getFullYear();
//         var mm = months[date.getMonth()];
//         var mm2 = months[oneTimePaymentDate.getMonth()];

//         if (yr == oneTimeYear && mm == mm2) {
//             principal = principal + additionalOneTimePayment;
//         }
//         var someFormattedDate = mm + '-' + yr;

//         if (balance >= paymentPerMonth) {
//             if (mm === additionalYearlyAmountMonth) {
//                 principal = (paymentPerMonth - interest) + (extraMonthly + extraYearly);
//             } else {
//                 principal = (paymentPerMonth - interest) + (extraMonthly );
//             }

//         }
//         else {
//             principal = balance;
//         // principal = (paymentPerMonth - interest) + extraMonthly;
//         }
//         balance -= principal;

//         var row = amortization_table.insertRow(i);

//         var cell1 = row.insertCell(0);
//         var cell2 = row.insertCell(1);
//         var cell3 = row.insertCell(2);
//         var cell4 = row.insertCell(3);

//         cell1.innerHTML = someFormattedDate;
//         cell1.style.textAlign = "center";
//         labelArray.push(someFormattedDate);

//         cell2.innerHTML = toComma(principal.toFixed(2));
//         cell2.style.textAlign = "center";

//         cell3.innerHTML = toComma(interest.toFixed(2));
//         cell3.style.textAlign = "center";

//         monthlyPayment = interest + principal;

//         totalInterest += interest;
//         totalPayment += monthlyPayment;

//         cell4.innerHTML = toComma(balance.toFixed(2));
//         cell4.style.textAlign = "center";
//         interestArray.push(totalInterest.toFixed(0));
//         principalArray.push(totalPayment.toFixed(0));
//         balanceArray.push(balance.toFixed(0));
//         counter++;
//         var finalDate = someFormattedDate;
//     }

//     $("#lastPaymentMonth").text(finalDate.replace(',',' '));
//     $("#payoffDate").text(finalDate.replace(',',' '));
//     $(".p_i").text(toComma(monthlyPayment.toFixed(2)));
//     $(".hoa").text(toComma(HOA.toFixed(2)));
//     $(".propertyTax").text(toComma(propertyTax.toFixed(2)));
//     $(".pmi").text(toComma(PMI.toFixed(2)));
//     $(".homeOwner").text(toComma(homeownerInsurance.toFixed(2)));
//     $(".totalPayment").text(toComma((monthlyPayment + extraAmounts).toFixed(0)));

//     $(".totalInterest").text(toComma(totalInterest.toFixed(0)));
//     $("#totalPayment").text(toComma(totalPayment.toFixed(0)));
//     //
//     $(".loanAmount").text(toComma(loanAmount.toFixed(0)));
//     // $(".totalPayments").text(loanTerm);
//     // $(".annualRate").text(interestRate + "%");

//     //
//     //
//     // let principalFinal = totalPayment - totalInterest;

//     chart.updateOptions({
//         series : [
//             { data : [...principalArray]
//             },
//             {
//                 data : [...interestArray]
//             },
//             {
//                 data : [...balanceArray]
//             }
//         ],
//         xaxis: {
//             categories: [...labelArray],
//             tickAmount: 6,
//         }
//     });

//     pieChart.updateOptions(
//         {
//             series : [monthlyPayment,propertyTax,homeownerInsurance,PMI,HOA]
//         }

//     );

//     // details_chart.data.datasets[0].data[0] = monthlyPayment.toFixed(2);
//     // details_chart.data.datasets[0].data[1] = propertyTax.toFixed(2);
//     // details_chart.data.datasets[0].data[2] = homeownerInsurance.toFixed(2);
//     // details_chart.data.datasets[0].data[3] = PMI.toFixed(2);
//     // details_chart.data.datasets[0].data[4] = HOA.toFixed(2);
//     // details_chart.update();

//     // details_chart2.data.labels = [...labelArray];
//     // details_chart2.data.datasets[0].data = [...principalArray];
//     // details_chart2.data.datasets[1].data = [...interestArray];
//     // details_chart2.data.datasets[2].data = [...balanceArray];
//     //
//     // details_chart2.update();

// }
function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}
function calculate() {
  let currentYear = new Date().getFullYear();
  // alert("hi");
  housePrice = parseInt(document.getElementById("housePrice").value);
  ResidualValue = 0;
  Buildyear = parseInt(document.getElementById("Buildyear").value);
  EstimatedLife =40;
  // EstimatedLife
  //   let DVResult = diminishingValueDepreciation(
  //     housePrice,
  //     EstimatedLife,
  //     ResidualValue
  //   ).toFixed(2);
  //   document.getElementById("DiminishingValuepy").innerHTML =
  //     numberWithCommas(DVResult);
  var diminishingValueArray = [];
  var remainingValue = housePrice;
  var years1 = [];
  var depreciationPerYear1 = [];
  var accumulatedDepreciation1 = [];
  for (var i = 1; i <= EstimatedLife; i++) {
    years1.push(i+Buildyear);
    var depreciation = remainingValue * (1 / EstimatedLife) * 2;
    depreciationPerYear1.push(depreciation);
    accumulatedDepreciation1.push(depreciation);
    remainingValue -= depreciation;
    diminishingValueArray.push(remainingValue);
  }
  document.getElementById("DiminishingValuepy").innerHTML = numberWithCommas(
    (housePrice - diminishingValueArray[0]).toFixed(2)
  );
  let Accumulated1 = 0;
  var table1 =
    '<table border="1"><tr><th>Year</th><th>Depreciation per Year</th><th>Accumulated Depreciation</th><th>Home Value After Depreciation</th></tr>';
  for (var j = 0; j < years1.length; j++) {
    Accumulated1 += accumulatedDepreciation1[j];
    table1 +=
      "<tr><td>" +
      years1[j] +
      "</td><td>" +
      numberWithCommas(depreciationPerYear1[j].toFixed(2)) +
      "</td><td>" +
      numberWithCommas(Accumulated1.toFixed(2)) +
      "</td><td>" +
      numberWithCommas(diminishingValueArray[j].toFixed(2)) +
      "</td></tr>";
  }
  table1 += "</table>";
  let formattedBookValue1 = diminishingValueArray.map(function (value) {
    // Convert each value to fixed 2 decimal places
    return parseFloat(value.toFixed(2));
  });
  let formatteddepreciationPerYear1 = depreciationPerYear1.map(function (
    value
  ) {
    // Convert each value to fixed 2 decimal places
    return parseFloat(value.toFixed(2));
  });
  //   console.log(formattedBookValue);
  let stringYears1 = years1.map(String);
console.log(stringYears1);
  Highcharts.chart("graph1", {
    chart: {
      type: "line",
    },
    title: {
      text: "Diminishing Value Method Depreciation",
      style: {
        fontFamily: "Montserrat, sans-serif",
      },
    },
    xAxis: {
      title: {
        text: "Year",
        style: {
          fontFamily: "Montserrat, sans-serif",
        },
      },
      categories: stringYears1,
      labels: {
        style: {
          fontFamily: "Montserrat, sans-serif",
        },
      },
    },
    yAxis: {
      title: {
        text: "Amount Reduced to",
        style: {
          fontFamily: "Montserrat, sans-serif",
        },
        labels: {
          style: {
            fontFamily: "Montserrat, sans-serif",
          },
        }, // Change to "Amount" or any appropriate label
      },
    },
    series: [
      {
        name: "Depreciation Amount",
        data: formatteddepreciationPerYear1,
        color: "#b4b4b4",
        style: {
          fontFamily: "Montserrat, sans-serif",
        },
      },
      {
        name: "Home Value After Depreciation",
        data: formattedBookValue1,
        color: "#1c1c1c",
        style: {
          fontFamily: "Montserrat, sans-serif",
        },
      },
    ],
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: false,
      },
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          menuItems: ["downloadPNG"],
        },
      },
    },
  });

  document.getElementById("tableDV").innerHTML = table1;
  let PCresult = primeCostDepreciation(
    housePrice,
    EstimatedLife,
    ResidualValue
  ).toFixed(2);
  document.getElementById("PrimeCostpy").innerHTML = numberWithCommas(PCresult);
  var years = [];
  var depreciationPerYear = [];
  var accumulatedDepreciation = [];
  var bookValue = [];
  for (var i = 1; i <= EstimatedLife; i++) {
    var depreciation = (housePrice - ResidualValue) / EstimatedLife;
    years.push(i+Buildyear);
    depreciationPerYear.push(depreciation);
    accumulatedDepreciation.push(depreciation * i);
    // let book= ().toFixed(2);
    bookValue.push(housePrice - depreciation * i);
    // bookValue[i]=(bookValue[i]).toFixed(2);
  }
  //   alert(depreciationPerYear);
  //   let dataPrime = [];

  var table =
    '<table border="1"><tr><th>Year</th><th>Depreciation per Year</th><th>Accumulated Depreciation</th><th>Home Value After Depreciation</th></tr>';
  for (var j = 0; j < years.length; j++) {
    table +=
      "<tr><td>" +
      years[j] +
      "</td><td>" +
      numberWithCommas(depreciationPerYear[j].toFixed(2)) +
      "</td><td>" +
      numberWithCommas(accumulatedDepreciation[j].toFixed(2)) +
      "</td><td>" +
      numberWithCommas(bookValue[j].toFixed(2)) +
      "</td></tr>";
  }
  table += "</table>";

  document.getElementById("tablePC").innerHTML = table;

  let formattedBookValue = bookValue.map(function (value) {
    // Convert each value to fixed 2 decimal places
    return parseFloat(value.toFixed(2));
  });
  let formatteddepreciationPerYear = depreciationPerYear.map(function (value) {
    // Convert each value to fixed 2 decimal places
    return parseFloat(value.toFixed(2));
  });
  //   console.log(formattedBookValue);
  let stringYears = years.map(String);

  Highcharts.chart("graph", {
    chart: {
      type: "line",
    },
    title: {
      text: "Prime Cost Method Depreciation",
      style: {
        fontFamily: "Montserrat, sans-serif",
      },
    },
    xAxis: {
      title: {
        text: "Year",
        style: {
          fontFamily: "Montserrat, sans-serif",
        },
      },
      categories: stringYears,
      labels: {
        style: {
          fontFamily: "Montserrat, sans-serif",
        },
      },
    },
    yAxis: {
      title: {
        text: "Amount Reduced to",
        style: {
          fontFamily: "Montserrat, sans-serif",
        },
      },
      labels: {
        style: {
          fontFamily: "Montserrat, sans-serif",
        },
      },
    },
    series: [
      {
        name: "Depreciation Amount",
        data: formatteddepreciationPerYear,
        color: "#b4b4b4",
        style: {
          fontFamily: "Montserrat, sans-serif",
        },
      },
      {
        name: "Home Value After Depreciation",
        data: formattedBookValue,
        color: "#1c1c1c",
        style: {
          fontFamily: "Montserrat, sans-serif",
        },
      },
    ],
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: false,
      },
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          menuItems: ["downloadPNG"],
        },
      },
    },
  });

  let sumPC = 0;
  for (let k = 0; k < depreciationPerYear.length; k++) {
    sumPC += depreciationPerYear[k];
  }
  let primeCostAverage = sumPC / depreciationPerYear.length;
  document.getElementById("primeCostAverage").innerHTML = numberWithCommas(
    primeCostAverage.toFixed(2)
  );
  document.getElementById("primeCostTotal").innerHTML = numberWithCommas(
    accumulatedDepreciation[EstimatedLife - 1].toFixed(2)
  );

  let sumDV = 0;
  for (let l = 0; l < depreciationPerYear1.length; l++) {
    sumDV += depreciationPerYear1[l];
  }

  let diminishingValueAverage = sumDV / depreciationPerYear1.length;
  document.getElementById("diminishingValueAverage").innerHTML =
    numberWithCommas(diminishingValueAverage.toFixed(2));
  document.getElementById("DiminishingValueTotal").innerHTML = numberWithCommas(
    accumulatedDepreciation1[EstimatedLife - 1].toFixed(2)
  );
  // alert(1*ResidualValue);
}
function exportChartAsPNG() {
  var chart = Highcharts.charts[0]; // Get the first chart instance
  chart.exportChart({
    type: "image/png",
  });
}

// function diminishingValueDepreciation(cost, life, residualValue) {
//   var depreciation = 0;
//   for (var i = 1; i <= life; i++) {
//     depreciation += (cost - depreciation) * (1 / life);
//   }
//   return (cost - residualValue) / depreciation;
// }

function primeCostDepreciation(cost, life, residualValue) {
  return (cost - residualValue) / life;
}
// function toComma(x) {
//     return "$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

// function toComma2(x) {
//     return  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

function format(input) {
  var nStr = input.value + "";
  nStr = nStr.replace(/\,/g, "");
  x = nStr.split(".");
  x1 = x[0];
  x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  input.value = x1 + x2;
}

function loadBreakdown() {
  document.getElementById("breakdownPill").classList.add("active");
  document.getElementById("amortizationPill").classList.remove("active");

  $("#amortization").hide();
  $("#breakdown").show();
}

function loadAmortization() {
  document.getElementById("breakdownPill").classList.remove("active");
  document.getElementById("amortizationPill").classList.add("active");

  $("#breakdown").hide();
  $("#amortization").show();
}
