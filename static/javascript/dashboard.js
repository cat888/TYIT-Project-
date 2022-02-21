// Earnings and balance are static while total_property_price and pending_property are dynamic
var total_property_price = document.getElementById('total_property_price');
var earnings = document.getElementById('earnings');
var balance = document.getElementById('balance');
var pending_property = document.getElementById('pending_property');

let property_price = [];
let property_name = [];
var no_pending_property = 0;
var total_price = 0;

for (i = 0; i < property_records.length; i++) {
  property = property_records[i];
  var price = property[5];
  var final_price = [];
  if (price.includes("Crore")) {
    if (price.includes("Crores")) {
      final_price = price.split(" Crores");
    }
    else {
      final_price = price.split(" Crore");
    }
    price = parseFloat(final_price[0]) * 10000000;
    total_price = total_price + price;
  }
  else {
    if (price.includes("Lakhs")) {
      final_price = price.split(" Lakhs");
    }
    else {
      final_price = price.split(" Lakhs");
    }
    price = parseFloat(final_price[0]) * 100000;
    total_price = total_price + price;
  }
  property_price.push(price);
  property_name.push(property[3]);

  // Increments the pending preoperty
  no_pending_property = no_pending_property + 1;
}
console.log(property_name);
console.log(property_price);
console.log(no_pending_property);

// set the attributes
if ((total_price / 100000) > 100) {
  total_price = (total_price / 10000000).toString() + " Crores";
}
else {
  total_price = (total_price / 100000).toString() + " Lakhs";
}
total_property_price.innerHTML = "Rs " + total_price;
pending_property.innerHTML = no_pending_property;

// Fetching property_name and property_count dynamically
var location_info = {};
var location_name = [];
var single_property_record = [];
for (var i=0; i<property_records.length; i++) {
  debugger
  single_property_record = property_records[i];
  location_name.push(single_property_record[4]);
  location_info[single_property_record[4]] = 1;
  for (var j=0; j<location_name.length; j++) {
    if (i==j) {
      continue;
    }
    else {
      if (single_property_record[4] == location_name[j]) {
        var count = location_info[single_property_record[4]];
        count = count + 1;
        location_info[single_property_record[4]] = count;
    }
  }
  }
}
console.log(location_info);

// Appending keys and values in list
let property_loc = [];
let property_count = [];
for([key, val] of Object.entries(location_info)) {
  property_loc.push(key);
  property_count.push(val);
}
console.log(property_loc);
console.log(property_count);

// Adding extra details so that bar chart look nice
property_loc.push("ambernath east");
property_count.push(20);


// Draw the bar chart
var ctx = document.getElementById('bar_chart').getContext('2d');
const data = {
  labels: property_loc,
  datasets: [{
    label: 'Location Wise Properties',
    data: property_count,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }]
};

var myChart = new Chart(ctx, {
  type: 'bar',
  data: data
})

// Draw the line chart
var ctx_2 = document.getElementById('line_chart').getContext('2d');
const data_2 = {
  labels: property_name,
  datasets: [{
    label: 'Property_Rate',
    data: property_price,
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

var myChart_2 = new Chart(ctx_2, {
  type: 'line',
  data: data_2
})

function delproperty(property) {

  // send delete request
  var view = property.id;
  console.log(view);

  // show the confirm pop up
  let text = "Do you really want to delete the property ?";
  if (confirm(text)) {

    console.log("You clicked okay");
    $.ajax({
      type: "DELETE",
      url: "/delete/" + view,
      success: function (result) {
        window.location.href = window.location.href;
      },
      error: function (jqXHR, result) {
        console.log("Property deletion failed");
      }
    });
  }
  else {
    console.log("You cancelled");
  }
}

function editproperty(property) {

  // send the put request
  var view = property.id;
  console.log(view);

  window.location.href = "/editproperty/"+view;

}

// --------------------
// function editproperty(property) {

//   // send the put request
//   debugger;
//   var view = property.id; // ex:- view 6
//   var url;
//   for(i=0; i < property_records.length; i++)
//   {
//     console.log(property_records[i]);
//     single_property = property_records[i];
//     if (view == single_property[10])
//     {
//       console.log(single_property[10])
//       proprietor_id = single_property[1];
//       url = proprietor_id+"_"+view;
//     }
//   }
//   console.log(view);

//   window.location.href = "/editproperty/"+url;

// }
