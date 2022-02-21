// Take the id city and on the page load fetch and put all the locations there.
function changeRange() {
    var price = document.getElementById("price").value;
    document.getElementById("price_input").value = price;
    return price;
}

function changeRangeOfArea() {
    var area = document.getElementById("sqft-range").value;
    document.getElementById("sqft").value = area;
    return area;
}

function searchProperty() {
    debugger
    let location = document.getElementById("location").value;
    let landmark = document.getElementById("landmark").value;
    let area = document.getElementById("sqft-range").value;
    let bhk = document.getElementById("bhk").value;
    let price = changeRange();
    let button = document.getElementById("search").value;
    data_send = {};
    data_send["landmark"] = landmark;
    data_send["area"] = area;
    data_send["location"] = location;
    data_send["bhk"] = bhk;
    data_send["price"] = price;
    data_send["button"] = button;
    
    $.ajax({
        dataType: 'json',
        url: '/searchproperty',
        data: data_send,
        contentType: "application/json",
        success: function (result) {
            window.location.href = "/property";
        },
        error: function(jqXHR, result) {
            window.location.href = "/login"
        }
    });
}
