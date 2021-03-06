
$(function() {
  // auto active nav item
  $("ul.nav li a").each(function() {
    var url = window.location.pathname;
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

  // external link by default is open in new window, i dont want use html each time
  // link to external page
  $("a").each(function() {
    var link = $(this).attr("href");
    
    if(link && (link.indexOf("http://") == 0 || link.indexOf("https://") == 0)) {
      $(this).attr("target", "_blank");
    }
  });

  // automatic add css class into img     
   $(".main img").each(function() {     
     $(this).addClass("thumbnail");
     $(this).addClass("center");
   });
});

String.prototype.endsWith = function(suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
