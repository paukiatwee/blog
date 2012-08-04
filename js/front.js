
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
      zoom: {
        interactive: true
      },
      pan: {
        interactive: true
      }
    };
  var data = [];
  var placeholder = $("#chart");

  $.plot(placeholder, data, options);

  $.getJSON("/data.json", function(json) {
    data = [];
    for(var row in json.rows) {
      prices = [];
      for(var i = 0; i <= 12; i+= 2) {
        prices.push([i, json.rows[row].price * i * 750 + json.rows[row].upfront]);
      }
      o = {"label": json.rows[row].label, data: prices};
      data.push(o);
      console.log(o);
    }

    $.plot(placeholder, data, options);
  });

  //     var options = {series: {lines: {show: true}},
  //                  zoom: {interactive: true}, pan: {interactive: true}, axes: {xaxis: {label: "X Axis"}}};
  // var data = [[3, 2], [1, 6]];
  // // var options = {
  // //   series: {
  // //       lines: { show: true },
  // //       points: { show: true }
  // //   }
  // // };
  // $.plot($("#chart"), [
  //       {
  //           data: data
  //           // lines: { show: true }
  //       }], options
  // );
  // var plot2 = $.plot ($("#chart"), data, options);

});

// $(document).ready(function(){
//   var plot2 = $.plot ($("#chart"), [[3,7,9,1,4,6,8,2,5]], {
//       // Give the plot a title.
//       title: 'Plot With Options',
//       // You can specify options for all axes on the plot at once with
//       // the axesDefaults object.  Here, we're using a canvas renderer
//       // to draw the axis label which allows rotated text.
//       // axesDefaults: {
//       //   labelRenderer: $.jqplot.CanvasAxisLabelRenderer
//       // },
//       // An axes object holds options for all axes.
//       // Allowable axes are xaxis, x2axis, yaxis, y2axis, y3axis, ...
//       // Up to 9 y axes are supported.
//       axes: {
//         // options for each axis are specified in seperate option objects.
//         xaxis: {
//           label: "X Axis",
//           // Turn off "padding".  This will allow data point to lie on the
//           // edges of the grid.  Default padding is 1.2 and will keep all
//           // points inside the bounds of the grid.
//           pad: 0
//         },
//         yaxis: {
//           label: "Y Axis"
//         }
//       }
//     });
// });
String.prototype.endsWith = function(suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};