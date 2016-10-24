
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
type: 'line',
  data: {
    labels: Time,
    datasets: [{
      label: 'Temperatura',
        data: Temperature,
         backgroundColor: "rgba(153,255,51,0.4)"
        }]
      }
});