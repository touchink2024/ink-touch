document.addEventListener("DOMContentLoaded", function () {
  var chartBar1 = function () {
      var options1 = {
          series: [
              {
                  data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54, 89, 63, 25, 80],
              },
          ],
          colors: ["#58BD7D"],
          chart: {
              type: "area",
              width: 100,
              height: 40,
              sparkline: { enabled: true },
          },
          plotOptions: { bar: { columnWidth: "50%" } },
          xaxis: { crosshairs: { width: 1 } },
          stroke: {
              show: true,
              curve: "smooth",
              lineCap: "butt",
              colors: undefined,
              width: 2,
              dashArray: 0,
          },
          tooltip: {
              fixed: { enabled: false },
              x: { show: false },
              y: {
                  title: {
                      formatter: function () {
                          return "";
                      },
                  },
              },
              marker: { show: false },
          },
          states: {
              hover: {
                  filter: {
                      type: "none",
                      value: 0,
                  },
              },
          },
      };

      var chart1 = new ApexCharts(document.querySelector("#total-revenue-chart-1"), options1);
      chart1.render();
  };


  var chartBar2 = function () {
    var options1 = {
        series: [
            {
                data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54, 89, 63, 25, 80],
            },
        ],
        colors: ["#58BD7D"],
        chart: {
            type: "area",
            width: 100,
            height: 40,
            sparkline: { enabled: true },
        },
        plotOptions: { bar: { columnWidth: "50%" } },
        xaxis: { crosshairs: { width: 1 } },
        stroke: {
            show: true,
            curve: "smooth",
            lineCap: "butt",
            colors: undefined,
            width: 2,
            dashArray: 0,
        },
        tooltip: {
            fixed: { enabled: false },
            x: { show: false },
            y: {
                title: {
                    formatter: function () {
                        return "";
                    },
                },
            },
            marker: { show: false },
        },
        states: {
            hover: {
                filter: {
                    type: "none",
                    value: 0,
                },
            },
        },
    };

    var chart1 = new ApexCharts(document.querySelector("#total-revenue-chart-2"), options1);
    chart1.render();
};

var chartBar3 = function () {
  var options1 = {
      series: [
          {
              data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54, 89, 63, 25, 80],
          },
      ],
      colors: ["#58BD7D"],
      chart: {
          type: "area",
          width: 100,
          height: 40,
          sparkline: { enabled: true },
      },
      plotOptions: { bar: { columnWidth: "50%" } },
      xaxis: { crosshairs: { width: 1 } },
      stroke: {
          show: true,
          curve: "smooth",
          lineCap: "butt",
          colors: undefined,
          width: 2,
          dashArray: 0,
      },
      tooltip: {
          fixed: { enabled: false },
          x: { show: false },
          y: {
              title: {
                  formatter: function () {
                      return "";
                  },
              },
          },
          marker: { show: false },
      },
      states: {
          hover: {
              filter: {
                  type: "none",
                  value: 0,
              },
          },
      },
  };

  var chart1 = new ApexCharts(document.querySelector("#total-revenue-chart-3"), options1);
  chart1.render();
};

var chartBar4 = function () {
  var options1 = {
      series: [
          {
              data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54, 89, 63, 25, 80],
          },
      ],
      colors: ["#58BD7D"],
      chart: {
          type: "area",
          width: 100,
          height: 40,
          sparkline: { enabled: true },
      },
      plotOptions: { bar: { columnWidth: "50%" } },
      xaxis: { crosshairs: { width: 1 } },
      stroke: {
          show: true,
          curve: "smooth",
          lineCap: "butt",
          colors: undefined,
          width: 2,
          dashArray: 0,
      },
      tooltip: {
          fixed: { enabled: false },
          x: { show: false },
          y: {
              title: {
                  formatter: function () {
                      return "";
                  },
              },
          },
          marker: { show: false },
      },
      states: {
          hover: {
              filter: {
                  type: "none",
                  value: 0,
              },
          },
      },
  };

  var chart4 = new ApexCharts(document.querySelector("#total-revenue-chart-4"), options1);
  chart4.render();
};

var chartBar5 = function () {
  var options1 = {
      series: [
          {
              data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54, 89, 63, 25, 80],
          },
      ],
      colors: ["#CB1F1F"],
      chart: {
          type: "area",
          width: 100,
          height: 40,
          sparkline: { enabled: true },
      },
      plotOptions: { bar: { columnWidth: "50%" } },
      xaxis: { crosshairs: { width: 1 } },
      stroke: {
          show: true,
          curve: "smooth",
          lineCap: "butt",
          colors: undefined,
          width: 2,
          dashArray: 0,
      },
      tooltip: {
          fixed: { enabled: false },
          x: { show: false },
          y: {
              title: {
                  formatter: function () {
                      return "";
                  },
              },
          },
          marker: { show: false },
      },
      states: {
          hover: {
              filter: {
                  type: "none",
                  value: 0,
              },
          },
      },
  };

  var chart5 = new ApexCharts(document.querySelector("#total-revenue-chart-5"), options1);
  chart5.render();
};

var chartBar6 = function () {
  var options1 = {
      series: [
          {
              data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54, 89, 63, 25, 80],
          },
      ],
      colors: ["#CB1F1F"],
      chart: {
          type: "area",
          width: 100,
          height: 40,
          sparkline: { enabled: true },
      },
      plotOptions: { bar: { columnWidth: "50%" } },
      xaxis: { crosshairs: { width: 1 } },
      stroke: {
          show: true,
          curve: "smooth",
          lineCap: "butt",
          colors: undefined,
          width: 2,
          dashArray: 0,
      },
      tooltip: {
          fixed: { enabled: false },
          x: { show: false },
          y: {
              title: {
                  formatter: function () {
                      return "";
                  },
              },
          },
          marker: { show: false },
      },
      states: {
          hover: {
              filter: {
                  type: "none",
                  value: 0,
              },
          },
      },
  };

  var chart6 = new ApexCharts(document.querySelector("#total-revenue-chart-6"), options1);
  chart6.render();
};

  // Call the function to render the chart
  chartBar1();
  chartBar2();
  chartBar3();
  chartBar4();
  chartBar5();
  chartBar6();

});