
var x;
var y;

$(function(){
  $.ajax({

    url: 'https://localhost/dados',
    type: 'GET',
    success : function(data) {
      chartData = data;

      x = data.x;
      y = data.y;


      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: x,
        datasets: [{
          label: 'apples',
          data: y,
          backgroundColor: "rgba(153,255,51,0.4)"
          }]
        }
      });
     /* var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
      type: 'line',
      data: {
      labels: y,
      datasets: [{
        label: 'Temperatura',
          data: x,
         backgroundColor: "rgba(153,255,51,0.4)"
        }]
      }
      });*/
      /*var template = Handlebars.compile($("#tabular-template").html());
      $("#table-location").html(template(data));

      var chartProperties = {
        "caption": "Ultimas medições",
        "numberprefix": "Rs",
        "xAxisName": "Temperature",
        "yAxisName": ""
      };

      var categoriesArray = [{
          "category" : data["categories"]
      }];

      var lineChart = new FusionCharts({
        type: 'msline',
        renderAt: 'chart-location',
        width: '1000',
        height: '600',
        dataFormat: 'json',
        dataSource: {
          chart: chartProperties,
          categories : categoriesArray,
          dataset : data["dataset"]
        }
      });
      lineChart.render();*/
    }, async: false
  });
});
