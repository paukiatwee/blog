
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

      var raw = [
          ['Month', 'On Demand', 'Reserved - Light', 'Reserved - Medium', 'Reserved - Heavy', 'Sport Instance'],
          ['0',  0,     json.aml, json.amm, json.amh, 0],
          ['2',  json.am_d * 750 * 2, json.am_l * 750 * 2 + json.aml, json.am_m * 750 * 2 + json.amm, json.am_h * 750 * 2 + json.amh, json.am_s * 750 * 2],
          ['4',  json.am_d * 750 * 4, json.am_l * 750 * 4 + json.aml, json.am_m * 750 * 4 + json.amm, json.am_h * 750 * 4 + json.amh, json.am_s * 750 * 4],
          ['6',  json.am_d * 750 * 6, json.am_l * 750 * 6 + json.aml, json.am_m * 750 * 6 + json.amm, json.am_h * 750 * 6 + json.amh, json.am_s * 750 * 6],
          ['8',  json.am_d * 750 * 8, json.am_l * 750 * 8 + json.aml, json.am_m * 750 * 8 + json.amm, json.am_h * 750 * 8 + json.amh, json.am_s * 750 * 8],
          ['10',  json.am_d * 750 * 10, json.am_l * 750 * 10 + json.aml, json.am_m * 750 * 10 + json.amm, json.am_h * 750 * 10 + json.amh, json.am_s * 750 * 10],
          ['12',  json.am_d * 750 * 12, json.am_l * 750 * 12 + json.aml, json.am_m * 750 * 12 + json.amm, json.am_h * 750 * 12 + json.amh, json.am_s * 750 * 12]
        ];

      var data = google.visualization.arrayToDataTable(raw);
      // Set chart options
      var options = {'width':730, 'height':500};
      var chart = new google.visualization.LineChart(document.getElementById('chart'));
      chart.draw(data, options);
    });
  })
}

String.prototype.endsWith = function(suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};