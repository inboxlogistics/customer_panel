(function ($) {
  "use strict";
  if ($("#paymentChart").length) {
    var paymentData = {
      labels: [
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
      ],
      datasets: [
        {
          label: "# of Votes",
          data: [
            10,
            10,
            10,
            10,
            10,
            10,
            12,
            10,
            13,
            10,
            12,
            10,
            11,
            10,
            10,
            10,
            10,
            10,
            10,
            10,
            10,
            10,
            10,
          ],
          borderColor: "#ddd",

          borderWidth: 2,
          fill: false,
        },
      ],
    };
    var paymentOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            display: false,
            gridLines: {
              drawBorder: false,
              display: false,
              drawTicks: false,
            },
            ticks: {
              beginAtZero: true,
              stepSize: 10,
            },
          },
        ],
        xAxes: [
          {
            display: false,
            position: "bottom",
            gridLines: {
              drawBorder: false,
              display: false,
              drawTicks: false,
            },
            ticks: {
              beginAtZero: true,
              stepSize: 10,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      elements: {
        point: {
          radius: 0,
        },
        line: {
          tension: 0,
        },
      },
      tooltips: {
        backgroundColor: "#dbdfe3",
      },
    };

    var paymentChartCanvas = $("#paymentChart").get(0).getContext("2d");
    var paymentChart = new Chart(paymentChartCanvas, {
      type: "line",
      data: paymentData,
      options: paymentOptions,
    });
  }
  if ($("#revenueChart").length) {
    var revenueData = {
      labels: [
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
      ],
      datasets: [
        {
          label: "# of Votes",
          data: [
            10,
            10,
            10,
            10,
            10,
            10,
            12,
            10,
            13,
            10,
            12,
            10,
            11,
            10,
            10,
            10,
            10,
            10,
            10,
            10,
            10,
            10,
            10,
          ],
          borderColor: "#ddd",
          borderWidth: 2,
          fill: false,
        },
      ],
    };
    var revenueOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            display: false,
            gridLines: {
              drawBorder: false,
              display: false,
              drawTicks: false,
            },
            ticks: {
              beginAtZero: true,
              stepSize: 10,
            },
          },
        ],
        xAxes: [
          {
            display: false,
            position: "bottom",
            gridLines: {
              drawBorder: false,
              display: false,
              drawTicks: false,
            },
            ticks: {
              beginAtZero: true,
              stepSize: 10,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      elements: {
        point: {
          radius: 0,
        },
        line: {
          tension: 0,
        },
      },
      tooltips: {
        backgroundColor: "#dbdfe3",
      },
    };

    var revenueChartCanvas = $("#revenueChart").get(0).getContext("2d");
    var revenueChart = new Chart(revenueChartCanvas, {
      type: "line",
      data: revenueData,
      options: revenueOptions,
    });
  }
  if ($("#orderChart").length) {
    var orderData = {
      labels: [
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
      ],
      datasets: [
        {
          label: "# of Votes",
          data: [
            10,
            10,
            10,
            10,
            10,
            10,
            12,
            10,
            13,
            10,
            12,
            10,
            11,
            10,
            10,
            10,
            10,
            10,
            10,
            10,
            10,
            10,
            10,
          ],
          borderColor: "#ddd",
          borderWidth: 2,
          fill: false,
        },
      ],
    };
    var orderOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            display: false,
            gridLines: {
              drawBorder: false,
              display: false,
              drawTicks: false,
            },
            ticks: {
              beginAtZero: true,
              stepSize: 10,
            },
          },
        ],
        xAxes: [
          {
            display: false,
            position: "bottom",
            gridLines: {
              drawBorder: false,
              display: false,
              drawTicks: false,
            },
            ticks: {
              beginAtZero: true,
              stepSize: 10,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      elements: {
        point: {
          radius: 0,
        },
        line: {
          tension: 0,
        },
      },
      tooltips: {
        backgroundColor: "#dbdfe3",
      },
    };

    var orderChartCanvas = $("#orderChart").get(0).getContext("2d");
    var orderChart = new Chart(orderChartCanvas, {
      type: "line",
      data: orderData,
      options: orderOptions,
    });
  }

  if ($("#performanceChart").length) {
    var performanceData = {
      labels: [
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
      ],
      datasets: [
        {
          label: "# of Votes",
          data: [35, 20, 28, 46, 57, 63, 48, 51, 35],
          backgroundColor: [
            "rgba(0, 205, 183, .33)",
            "rgba(0, 205, 183, .33)",
            "rgba(0, 205, 183, .33)",
            "rgba(0, 205, 183, .33)",
            "rgba(0, 205, 183, .33)",
            "rgba(0, 205, 183, .33)",
            "rgba(0, 205, 183, .33)",
            "rgba(0, 205, 183, .33)",
            "rgba(0, 205, 183, 1)",
          ],
          borderColor: [
            "rgba(0, 205, 183, .33)",
            "rgba(0, 205, 183, .33)",
            "rgba(0, 205, 183, .33)",
            "rgba(0, 205, 183, .33)",
            "rgba(0, 205, 183, .33)",
            "rgba(0, 205, 183, .33)",
            "rgba(0, 205, 183, .33)",
            "rgba(0, 205, 183, .33)",
            "rgba(0, 205, 183, 1)",
          ],
          borderWidth: 0,
          fill: false,
        },
      ],
    };
    var performanceOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            display: false,
            gridLines: {
              drawBorder: false,
              display: false,
              drawTicks: false,
            },
            ticks: {
              beginAtZero: true,
              stepSize: 10,
            },
          },
        ],
        xAxes: [
          {
            display: false,
            position: "bottom",
            gridLines: {
              drawBorder: false,
              display: false,
              drawTicks: false,
            },
            ticks: {
              beginAtZero: true,
              stepSize: 10,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      elements: {
        point: {
          radius: 0,
        },
        line: {
          tension: 0,
        },
      },
      tooltips: {
        backgroundColor: "#dbdfe3",
      },
    };

    var barChartCanvas = $("#performanceChart").get(0).getContext("2d");
    // This will get the first returned node in the jQuery collection.
    var barChart = new Chart(barChartCanvas, {
      type: "bar",
      data: performanceData,
      options: performanceOptions,
    });
  }

  if ($("#performanceAreaChart").length) {
    var performanceAreaChartData = {
      labels: ["2000", "2001", "2002", "2003", "2004", "2005"],
      datasets: [
        {
          label: "# of Votes",
          data: [10, 13, 11, 16, 12, 15],
          borderColor: ["#04c9b7"],
          backgroundColor: ["#acefe8"],
          borderWidth: 2,
          fill: true,
        },
      ],
    };
    var performanceAreaChartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        yAxes: [
          {
            display: false,
            gridLines: {
              drawBorder: false,
              display: false,
              drawTicks: false,
            },
            ticks: {
              beginAtZero: true,
              stepSize: 10,
            },
          },
        ],
        xAxes: [
          {
            display: false,
            position: "bottom",
            gridLines: {
              drawBorder: false,
              display: false,
              drawTicks: false,
            },
            ticks: {
              beginAtZero: true,
              stepSize: 10,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      elements: {
        point: {
          radius: 0,
        },
        line: {
          tension: 0,
        },
      },
      tooltips: {
        backgroundColor: "#dbdfe3",
      },
    };

    var performanceAreaChartCanvas = $("#performanceAreaChart")
      .get(0)
      .getContext("2d");
    var performanceAreaChartChart = new Chart(performanceAreaChartCanvas, {
      type: "line",
      data: performanceAreaChartData,
      options: performanceAreaChartOptions,
    });
  }
  if ($("#taskAreaChart").length) {
    var taskAreaChartData = {
      labels: ["2000", "2001", "2002", "2003", "2004", "2005"],
      datasets: [
        {
          label: "# of Votes",
          data: [10, 13, 11, 16, 12, 15],
          borderColor: ["#04c9b7"],
          backgroundColor: ["#acefe8"],
          borderWidth: 2,
          fill: true,
        },
      ],
    };
    var taskAreaChartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        yAxes: [
          {
            display: false,
            gridLines: {
              drawBorder: false,
              display: false,
              drawTicks: false,
            },
            ticks: {
              beginAtZero: true,
              stepSize: 10,
            },
          },
        ],
        xAxes: [
          {
            display: false,
            position: "bottom",
            gridLines: {
              drawBorder: false,
              display: false,
              drawTicks: false,
            },
            ticks: {
              beginAtZero: true,
              stepSize: 10,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      elements: {
        point: {
          radius: 0,
        },
        line: {
          tension: 0,
        },
      },
      tooltips: {
        backgroundColor: "#dbdfe3",
      },
    };

    var taskAreaChartCanvas = $("#taskAreaChart").get(0).getContext("2d");
    var taskAreaChartChart = new Chart(taskAreaChartCanvas, {
      type: "line",
      data: taskAreaChartData,
      options: taskAreaChartOptions,
    });
  }

  if ($("#salesTopChart").length) {
    var graphGradient = document
      .getElementById("salesTopChart")
      .getContext("2d");
    var saleGradientBg = graphGradient.createLinearGradient(25, 0, 75, 150);
    saleGradientBg.addColorStop(0, "rgba(254, 255, 255, 0.33)");
    saleGradientBg.addColorStop(1, "rgba(174, 224, 221, 0.33)");
    var salesTopData = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "# of Votes",
          data: [250, 260, 290, 200, 280, 200, 300, 270, 285, 350, 340, 300],
          backgroundColor: saleGradientBg,
          borderColor: ["#04c9b7"],
          borderWidth: 1,
          fill: true, // 3: no fill
          pointBorderWidth: 0,
          pointRadius: [0, 0, 0, 0, 0],
          pointHoverRadius: [0, 0, 0, 0, 0],
        },
      ],
    };

    var salesTopOptions = {
      scales: {
        yAxes: [
          {
            gridLines: {
              display: true,
              drawBorder: false,
              color: "rgba(236, 242, 251, 0.68)",
              zeroLineColor: "rgba(236, 242, 251, 0)",
            },
            ticks: {
              beginAtZero: true,
              fontColor: "#bababa",
              fontSize: 9,
              stepSize: 100,
              callback: function (value, index, values) {
                return "$" + value.toFixed();
              },
            },
          },
        ],

        xAxes: [
          {
            display: true,
            position: "bottom",
            gridLines: {
              drawBorder: false,
              display: false,
              drawTicks: false,
            },
            ticks: {
              beginAtZero: true,
              fontColor: "#bababa",
              fontSize: 9,
              stepSize: 100,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      elements: {
        line: {
          tension: 0.3,
        },
      },
      tooltips: {
        backgroundColor: "rgba(31, 59, 179, 1)",
      },
    };
    var salesTop = new Chart(graphGradient, {
      type: "line",
      data: salesTopData,
      options: salesTopOptions,
    });
  }
  $("#vmap").vectorMap({
    map: "world_mill_en",
    panOnDrag: true,
    focusOn: {
      x: 0.5,
      y: 0.5,
      scale: 1,
      animate: true,
    },
    series: {
      regions: [
        {
          scale: ["#00cdb7"],
          normalizeFunction: "polynomial",
          values: {
            AF: 16.63,
            AL: 11.58,
            DZ: 158.97,
            AO: 85.81,
            AG: 1.1,
            AR: 351.02,
            AM: 8.83,
            AU: 1219.72,
            AT: 366.26,
            AZ: 52.17,
            BS: 7.54,
            BH: 21.73,
            BD: 105.4,
            BB: 3.96,
            BY: 52.89,
            BE: 461.33,
            BZ: 1.43,
            BJ: 6.49,
            BT: 1.4,
            BO: 19.18,
            BA: 16.2,
            BW: 12.5,
            BR: 2023.53,
            BN: 11.96,
            BG: 44.84,
            BF: 8.67,
            BI: 1.47,
            KH: 11.36,
            CM: 21.88,
            CA: 1563.66,
            CV: 1.57,
            CF: 2.11,
            TD: 7.59,
            CL: 199.18,
            CN: 5745.13,
            CO: 283.11,
            KM: 0.56,
            CD: 12.6,
            CG: 11.88,
            CR: 35.02,
            CI: 22.38,
            HR: 59.92,
            CY: 22.75,
            CZ: 195.23,
            DK: 304.56,
            DJ: 1.14,
            DM: 0.38,
            DO: 50.87,
            EC: 61.49,
            EG: 216.83,
            SV: 21.8,
            GQ: 14.55,
            ER: 2.25,
            EE: 19.22,
            ET: 30.94,
            FJ: 3.15,
            FI: 231.98,
            FR: 2555.44,
            GA: 12.56,
            GM: 1.04,
            GE: 11.23,
            DE: 3305.9,
            GH: 18.06,
            GR: 305.01,
            GD: 0.65,
            GT: 40.77,
            GN: 4.34,
            GW: 0.83,
            GY: 2.2,
            HT: 6.5,
            HN: 15.34,
            HK: 226.49,
            HU: 132.28,
            IS: 12.77,
            IN: 1430.02,
            ID: 695.06,
            IR: 337.9,
            IQ: 84.14,
            IE: 204.14,
            IL: 201.25,
            IT: 2036.69,
            JM: 13.74,
            JP: 5390.9,
            JO: 27.13,
            KZ: 129.76,
            KE: 32.42,
            KI: 0.15,
            KR: 986.26,
            KW: 117.32,
            KG: 4.44,
            LA: 6.34,
            LV: 23.39,
            LB: 39.15,
            LS: 1.8,
            LR: 0.98,
            LY: 77.91,
            LT: 35.73,
            LU: 52.43,
            MK: 9.58,
            MG: 8.33,
            MW: 5.04,
            MY: 218.95,
            MV: 1.43,
            ML: 9.08,
            MT: 7.8,
            MR: 3.49,
            MU: 9.43,
            MX: 1004.04,
            MD: 5.36,
            MN: 5.81,
            ME: 3.88,
            MA: 91.7,
            MZ: 10.21,
            MM: 35.65,
            NA: 11.45,
            NP: 15.11,
            NL: 770.31,
            NZ: 138,
            NI: 6.38,
            NE: 5.6,
            NG: 206.66,
            NO: 413.51,
            OM: 53.78,
            PK: 174.79,
            PA: 27.2,
            PG: 8.81,
            PY: 17.17,
            PE: 153.55,
            PH: 189.06,
            PL: 438.88,
            PT: 223.7,
            QA: 126.52,
            RO: 158.39,
            RU: 1476.91,
            RW: 5.69,
            WS: 0.55,
            ST: 0.19,
            SA: 434.44,
            SN: 12.66,
            RS: 38.92,
            SC: 0.92,
            SL: 1.9,
            SG: 217.38,
            SK: 86.26,
            SI: 46.44,
            SB: 0.67,
            ZA: 354.41,
            ES: 1374.78,
            LK: 48.24,
            KN: 0.56,
            LC: 1,
            VC: 0.58,
            SD: 65.93,
            SR: 3.3,
            SZ: 3.17,
            SE: 444.59,
            CH: 522.44,
            SY: 59.63,
            TW: 426.98,
            TJ: 5.58,
            TZ: 22.43,
            TH: 312.61,
            TL: 0.62,
            TG: 3.07,
            TO: 0.3,
            TT: 21.2,
            TN: 43.86,
            TR: 729.05,
            TM: 0,
            UG: 17.12,
            UA: 136.56,
            AE: 239.65,
            GB: 2258.57,
            US: 14624.18,
            UY: 40.71,
            UZ: 37.72,
            VU: 0.72,
            VE: 285.21,
            VN: 101.99,
            YE: 30.02,
            ZM: 15.69,
            ZW: 5.57,
          },
        },
      ],
    },
  });

  if ($("#scatterChart").length) {
    var scatterChartData = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Item 1",
          pointBorderWidth: 10,
          data: [
            {
              x: 10,
              y: 150,
            },
            {
              x: 5,
              y: 170,
            },
            {
              x: 12,
              y: 180,
            },
            {
              x: 12,
              y: 140,
            },
            {
              x: 18,
              y: 145,
            },
            {
              x: 20,
              y: 150,
            },
            {
              x: 22,
              y: 163,
            },
            {
              x: 24,
              y: 170,
            },
            {
              x: 26,
              y: 340,
            },
            {
              x: 28,
              y: 200,
            },
            {
              x: 30,
              y: 220,
            },
            {
              x: 32,
              y: 190,
            },
            {
              x: 34,
              y: 165,
            },
            {
              x: 36,
              y: 155,
            },
            {
              x: 38,
              y: 135,
            },
            {
              x: 40,
              y: 125,
            },
          ],
          backgroundColor: [
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
          ],
          borderColor: [
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
            "#00cdb7",
          ],
          borderWidth: 1,
        },
        {
          label: "Item 1",
          data: [
            {
              x: 10,
              y: 120,
            },
            {
              x: 13,
              y: 140,
            },
            {
              x: 14,
              y: 150,
            },
            {
              x: 15,
              y: 180,
            },
            {
              x: 38,
              y: 145,
            },
            {
              x: 42,
              y: 170,
            },
            {
              x: 21,
              y: 143,
            },
            {
              x: 29,
              y: 170,
            },
            {
              x: 35,
              y: 340,
            },
            {
              x: 26,
              y: 200,
            },
            {
              x: 27,
              y: 220,
            },
            {
              x: 40,
              y: 190,
            },
            {
              x: 33,
              y: 165,
            },
            {
              x: 28,
              y: 155,
            },
            {
              x: 33,
              y: 135,
            },
            {
              x: 37,
              y: 125,
            },
          ],
          backgroundColor: [
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
          ],
          borderColor: [
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
            "#0084de",
          ],
          borderWidth: 1,
        },
      ],
    };

    var scatterChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            type: "linear",
            position: "bottom",
            gridLines: {
              display: true,
              drawBorder: false,
              tickColor: "rgba(0,0,0,.05)",
              zeroLineColor: "rgba(236, 242, 251, 0)",
            },
            ticks: {
              display: false,
              fontColor: "#bababa",
              fontSize: 9,
              stepSize: 100,
            },
          },
        ],
        yAxes: [
          {
            position: "bottom",
            gridLines: {
              display: true,
              drawBorder: false,
              tickColor: "rgba(0,0,0,.05)",
              zeroLineColor: "rgba(236, 242, 251, 0)",
            },
            ticks: {
              beginAtZero: true,
              fontColor: "#bababa",
              fontSize: 9,
              stepSize: 100,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      legendCallback: function (chart) {
        var text = [];
        text.push('<div class="row">');
        for (var i = 0; i < chart.data.datasets.length; i++) {
          text.push(
            '<div class="d-flex align-items-center"><span class="legend-label" style="background-color:' +
              chart.data.datasets[i].backgroundColor[i] +
              '"></span><p class="mr-4 font-weight-medium text-medium mb-0">' +
              chart.data.datasets[i].label +
              "</p>"
          );
          text.push("</div>");
        }
        text.push("</div>");
        return text.join("");
      },
    };
    var scatterChartCanvas = $("#scatterChart").get(0).getContext("2d");
    var scatterChart = new Chart(scatterChartCanvas, {
      type: "scatter",
      data: scatterChartData,
      options: scatterChartOptions,
    });
    document.getElementById(
      "chart-legends-visitor"
    ).innerHTML = scatterChart.generateLegend();
  }

  // flot chart script
  $(function () {
    "use strict";

    var dashData4 = [
      [0, 50],
      [1, 50],
      [2, 55],
      [3, 55],
      [4, 57],
      [5, 53],
      [6, 49],
      [7, 45],
      [8, 54],
      [9, 52],
      [10, 50],
      [11, 45],
      [12, 41],
      [13, 37],
      [14, 54],
      [15, 49],
      [16, 52],
      [17, 52],
      [18, 52],
      [19, 50],
      [20, 49],
      [21, 45],
      [22, 45],
      [23, 45],
      [24, 58],
      [25, 57],
      [26, 56],
      [27, 54],
      [28, 54],
      [29, 54],
      [30, 50],
      [31, 49],
      [32, 48],
      [33, 47],
      [34, 46],
      [35, 48],
      [36, 49],
      [37, 50],
      [38, 51],
      [39, 53],
      [40, 55],
      [41, 59],
      [42, 65],
      [43, 71],
      [44, 76],
      [45, 74],
      [46, 74],
      [47, 74],
      [48, 74],
      [49, 67],
      [50, 60],
      [51, 58],
      [52, 57],
      [53, 56],
      [54, 59],
      [55, 64],
      [56, 67],
      [57, 65],
      [58, 67],
      [59, 70],
      [60, 68],
      [61, 66],
      [62, 64],
      [63, 59],
      [64, 57],
      [65, 59],
      [66, 56],
      [67, 53],
      [68, 45],
      [69, 50],
      [70, 55],
      [71, 57],
      [72, 62],
      [73, 65],
      [74, 63],
      [75, 64],
      [76, 68],
      [77, 65],
      [78, 60],
      [79, 62],
      [80, 59],
      [81, 57],
      [82, 55],
      [83, 54],
      [84, 50],
      [85, 55],
      [86, 53],
      [87, 50],
      [88, 48],
      [89, 49],
      [90, 50],
    ];

    function bgFlotData(num, val) {
      var data = [];
      for (var i = 0; i < num; ++i) {
        data.push([i, val]);
      }
      return data;
    }

    function bgFlotData(num, val) {
      var data = [];
      for (var i = 0; i < num; ++i) {
        data.push([i, val]);
      }
      return data;
    }

    var plot = $.plot(
      "#flotChart",
      [
        {
          data: dashData4,
          color: "#04c9b7",
          lines: {
            fillColor: "rgba(174, 224, 221, .12)",
          },
        },
      ],
      {
        series: {
          shadowSize: 0,
          lines: {
            show: true,
            lineWidth: 2,
            fill: true,
          },
        },
        grid: {
          borderWidth: 0,
          labelMargin: 8,
        },
        yaxis: {
          show: true,
          min: 0,
          max: 100,
          ticks: true,
          tickLength: 0,
          tickColor: "#000",
        },
        xaxis: {
          show: true,
          color: "#fff",
          tickColor: "#fff",
          ticks: [
            [0, "Jan"],
            [10, "Feb"],
            [20, "Mar"],
            [30, "Apr"],
            [40, "May"],
            [50, "Jun"],
            [60, "Jul"],
            [70, "Aug"],
            [80, "Sep"],
            [90, "Oct"],
          ],
          tickLength: 0,
        },
        yaxis: {
          show: true,
          color: "#fff",
          // tickColor: "#edf2fa",
          tickColor: "rgba(0,0,0,.05)",
          ticks: [
            [0, "0"],
            [20, "$100"],
            [40, "$1200"],
            [60, "$300"],
            [80, "$400"],
          ],
        },
      }
    );
  });
})(jQuery);

function requestFullScreen() {
  var el = document.body;

  // Supports most browsers and their versions.
  var requestMethod =
    el.requestFullScreen ||
    el.webkitRequestFullScreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullScreen;

  if (requestMethod) {
    // Native full screen.
    requestMethod.call(el);
  } else if (typeof window.ActiveXObject !== "undefined") {
    // Older IE.
    var wscript = new ActiveXObject("WScript.Shell");

    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
}
