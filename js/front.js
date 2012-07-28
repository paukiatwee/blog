
$(function() {
  // auto active nav item
  $("ul.nav li a").each(function() {
    var url = window.location.pathname;
    if(url.endsWith("/") && url.length > 1) {
      url = url.substring(0, url.length - 1);
    }
    if(url === $(this).attr("href")) {
      $(this).parent().addClass("active");
    }
  })
  google.setOnLoadCallback(drawCharts);
})

function drawCharts() {
  $(".chart").each(function() {
    $.getJSON($(this).data("remote"), function(json) {
      // var raw = [
      //     ['Month', 'On Demand', 'Reserved - Light'],
      //     ['2004',  1000,      400],
      //     ['2005',  1170,      460],
      //     ['2006',  660,       1120],
      //     ['2007',  1030,      540]
      //   ];
      // // console.log(json.rows.grade)
      // var data = google.visualization.arrayToDataTable(raw);
      var data = new google.visualization.DataTable();
      for(var column in json.columns) {
        data.addColumn(json.columns[column].type, json.columns[column].label);
      }
      for(var row in json.rows) {
        if(json.rows[row].grade === 'on-demand') {
          
        console.log(json.rows[row].type);
        console.log(json.rows[row].price);
        data.addRow([json.rows[row].type, json.rows[row].price]);
        }
      }
      // Set chart options
      var options = {'title':'How Much Pizza I Ate Last Night',
                       'width':730,
                       'height':350};
      var chart = new google.visualization.LineChart(document.getElementById('chart'));
      chart.draw(data, options);
    });
  })
}

String.prototype.endsWith = function(suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};