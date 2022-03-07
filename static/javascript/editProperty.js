let fileInput = document.getElementById("fileInput");
let fileName = [];
let fileType = [];
var uploadedPropertyDetails = [];
let numOfFiles = document.getElementById("num-of-files");
var thumbnail;
let roomLocation = document.getElementById("uiLocations");
let area = document.getElementById("sqft");
let nameClick = document.getElementById("nameClick");
let landClick = document.getElementById("landClick");
var bhk;
let price = document.getElementById("price");
var images = [];

console.log(view);

function changeRange() {
    var sqft = document.getElementById('sqft-range').value;
    console.log(sqft);
	document.getElementById("sqft").value = sqft;
    return sqft;
	}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i in uiBHK) {
        if (uiBHK[i].checked) {
            return parseInt(i) + 1
        }
    }
    return -1; // Invalid syntax
}

function image_show() {
    var image = "";
    images.forEach((i) => {
        image += `<div class="image_container d-flex justify-content-center position-relative">
                <img src="`+ i.url + `" alt="Image">
                <span class="position-absolute" onclick="delete_image(`+ images.indexOf(i) + `)">&times;</span>
          </div>`;
    })
    return image;
}

function delete_image(e) {
    images.splice(e, 1);
    document.getElementById('container').innerHTML = image_show();
}

function image_select(image) {
    // var image = document.getElementById('image').files;
    for (i = 0; i < image.length; i++) {
        images.push({
            "name": image[i].name,
            "url": URL.createObjectURL(image[i]),
            "file": image[i],
        })
    }

    document.getElementById('container').innerHTML = image_show();
}

function preview() {
    debugger
    numOfFiles.textContent = `${fileInput.files.length} Files Selected`;
    var image = fileInput.files
    image_select(image)

    for (i of image) {
        debugger
        var roomType = $('.Users').val();
        let reader = new FileReader();
        let figure = document.createElement("figure");
        let figCap = document.createElement("figcaption");
        figCap.innerText = i.name;
        fileName.push(i.name);
        console.log(i.name)
        fileType.push(i.type);
        // rooms.push(roomType);
        figure.appendChild(figCap);
        reader.onload = () => {
            debugger
            var temporaryFiles = {};
            fileContent = reader.result;
            // fileContentArray.push(fileContent); // error in this
            temporaryFiles['file-content'] = fileContent;
            temporaryFiles['roomType'] = roomType;
            uploadedPropertyDetails.push(temporaryFiles);

            // let img = document.createElement("img");
            // img.setAttribute("src", reader.result);
            // figure.insertBefore(img, figCap);
        }
        // imageContainer.appendChild(figure);
        reader.readAsDataURL(i);
    }
}

function preview1(){
    debugger
    // numOfFiles.textContent = `${fileInput.files.length} Files Selected`;
    var image = fileInput1.files


    for (i of image) {
        debugger
        // var roomType = $('.Users').val();
        let reader = new FileReader();
        let figure = document.createElement("figure");
        let figCap = document.createElement("figcaption");
        figCap.innerText = i.name;
        // rooms.push(roomType);
        figure.appendChild(figCap);
        
            fileName.push(i.name);
            console.log(i.name)
            fileType.push(i.type);
            reader.onload = () => {
                debugger
                // var temporaryFiles1 = {};
                fileContent1 = reader.result;
                // fileContentArray.push(fileContent); // error in this
                thumbnail = fileContent1;
                // temporaryFiles['roomType'] = roomType;
                // uploadedPropertyDetails1.push(temporaryFiles1);

                // let img = document.createElement("img");
                // img.setAttribute("src", reader.result);
                // figure.insertBefore(img, figCap);
            }
            // imageContainer.appendChild(figure);
            reader.readAsDataURL(i);
            image_select(image)
        }
}

$( document ).ready(function() {
    $( "#save_property" ).submit(function( event ) {
        // alert( "Handler for .submit() called." );
        event.preventDefault();
      });
});

function myFunction() {
    debugger
    var dataSend = {};
    dataSend['name'] = nameClick.value;
    dataSend['location'] = roomLocation.value;
    dataSend['area'] = changeRange();
    dataSend['bhk'] = getBHKValue();
    dataSend['price'] = price.value;
    dataSend['landmark'] = landClick.value;
    dataSend['fileName'] = fileName;
    dataSend['fileType'] = fileType;
    dataSend['filedata'] = uploadedPropertyDetails;
    dataSend['thumbnail_image'] = thumbnail;
    console.log(dataSend);
    
    
    $.ajax({
        type: "PUT",
        url: "/editproperty/"+proprietor_id+"_"+view,
        // xhrFields: {withCredentials: true},
        // data: dataSend,
        data: JSON.stringify(dataSend),
        contentType: "application/json",
        dataType: 'json',
        // cors: true ,
        // secure: true,
        // headers: {
        //     'Access-Control-Allow-Origin': '*',
        // },
        // beforeSend: function (xhr) {
        //     xhr.setRequestHeader ("Authorization", "Basic " + btoa(""));
        // },
        success: function (result) {
            alert("Property Successfully Updated");
            window.location.href = "/myproperty";
        },
        error: function (xhr, status, error) {
            alert("Your File Failed to Update....");
        }
    });
    
}
function onPageLoad() {
    console.log("document loaded");
    var url = "http://127.0.0.1:5000/model/get_location_names";
    $.get(url, function (data, status) {
        console.log("Got response for get_location_names request");
        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $("#uiLocations").empty();
            for (var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
    document.getElementById("sqft").disabled = true;
}
window.onload = onPageLoad;
