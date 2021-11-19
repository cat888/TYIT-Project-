function changeNumberFormat(number, decimals, recursiveCall) {
    const decimalPoints = decimals || 2;
    let displayStr;
    let isPlural;

    // Rounds off digits to decimalPoints decimal places
    function roundOf(integer) {
        return +integer.toLocaleString(undefined, {
            minimumFractionDigits: decimalPoints,
            maximumFractionDigits: decimalPoints,
        });
    }

    const noOfLakhs = roundOf(number / 100000);

    if (noOfLakhs >= 100) {
        const crores = roundOf(noOfLakhs / 100);
        const crorePrefix = crores >= 100000 ? changeNumberFormat(crores, decimals, true) : crores;
        isPlural = crores > 1 && !recursiveCall;
        displayStr = `${crorePrefix} Crore${isPlural ? 's' : ''}`;
    } else if (noOfLakhs >= 1  && !recursiveCall) {
        isPlural = true;
        displayStr = `${noOfLakhs} Lakh${isPlural ? 's' : ''}`;
    } else {
        displayStr = roundOf(+number);
    }

    return displayStr;
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
        if(uiBHK[i].checked) {
            return parseInt(i)+1
            }
        }
        return -1; // Invalid syntax
    }

function onClickedEstimatedPrice() {
    console.log("Estate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
    var years = document.getElementById("uiYears")
    var years_value = years.options[years.selectedIndex].value
    var final_price;

    var url = "http://127.0.0.1:5000/model/predict_home_price";

    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        location: location.value,
    },function(data, status) {
        console.log("Fetched Successfully");
        price = parseFloat(data.estimated_price);
        price_rise = parseFloat(data.estimated_price_rise);
        console.log(years_value);
        if(years_value=="Current")
        {
            final_price = changeNumberFormat(price);
            estPrice.innerHTML = "<h2><i class='fa fa-inr'> " + final_price + "</i></h2>";
//            estPrice.innerHTML += "<h2>" + data.estimated_price_rise.toString() + " Rs</h2>";
            console.log(status);
        }
        else{
            console.log("Fetched Successfully");
            years_value = parseInt(years_value);
            for(var i=1;i<=years_value;i++)
            {
                price = price + price * price_rise;
            }
          final_price = changeNumberFormat(price);
          estPrice.innerHTML = "<h2><i class='fa fa-inr'> " + final_price + "</i></h2>";
        }
    });
}

function onPageLoad() {
    console.log("document loaded");
    var url = "http://127.0.0.1:5000/model/get_location_names";
    $.get(url,function(data, status){
        console.log("Got response for get_location_names request");
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $("#uiLocations").empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

window.onload = onPageLoad;