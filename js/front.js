
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
  });


  var options = {
    lines: { show: true },
    points: { 
      show: true
    },
    xaxes: [{
      axisLabel: 'Months'
    }],
    yaxes: [{
      axisLabel: 'Cost (USD)'
    }],
    pan: {
      interactive: true
    }
  };
  var data = [];
  var placeholder = $("#chart");
  if(placeholder.length > 0) {
    $.getJSON("/aws-data.json", function(json) {
      data = [];
      for(var row in json.rows) {
        prices = [];
        for(var i = 0; i <= 12; i+= 2) {
          prices.push([i, json.rows[row].price * i * 750 + json.rows[row].upfront]);
        }
        o = {"label": json.rows[row].label, data: prices};
        data.push(o);
      }

      $.plot(placeholder, data, options);
    });
  }
});

String.prototype.endsWith = function(suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
