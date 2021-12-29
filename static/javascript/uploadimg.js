let fileInput = document.getElementById("fileInput");
let fileName = [];
let fileType = [];
var uploadedPropertyDetails = [];
let numOfFiles = document.getElementById("num-of-files");
let roomLocation = document.getElementById("uiLocations");
let area = document.getElementById("sqft");
let nameClick = document.getElementById("nameClick")
var bhk;
let price = document.getElementById("price");
var images = [];

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

function myFunction() {
    debugger
    // if (roomType === 'select' && (fileName == undefined || fileType == undefined || fileContent == undefined)) {
    //     alert("Please select appropriate fields!");
    // } else if (roomType === 'select') {
    //     alert("Please select appropriate room Type!");
    // } else if (fileName == undefined || fileType == undefined || fileContent == undefined) {
    //     alert("please browse appropriate files!");
    // } else {
    //busuness logic
    // const splitFileContent = [];
    // for (i = 0; i < fileContentArray.length; i++) {
    //     let split = fileContent.split("base64,")
    //     splitFileContent.push(split[1]);
    // }

    var dataSend = {};
    dataSend['name'] = nameClick.value;
    dataSend['location'] = roomLocation.value;
    dataSend['area'] = changeRange();
    dataSend['bhk'] = getBHKValue();
    dataSend['price'] = price.value;
    dataSend['fileName'] = fileName;
    dataSend['fileType'] = fileType;
    dataSend['filedata'] = uploadedPropertyDetails;
    console.log(dataSend);

    $.ajax({
        type: "POST",
        url: "/upload",
        // data: dataSend,
        // xhrFields: {withCredentials: true},
        // data: dataSend,
        data: JSON.stringify(dataSend),
        contentType: "application/json",
        dataType: 'json',
        //cors: true ,
        //secure: true,
        data: JSON.stringify(dataSend),
        contentType: "application/json",
        dataType: 'json',
        success: function (result) {
            window.location.href = "http://127.0.0.1:5000/property";
        },
        error: function (xhr, status, error) {
            alert("Your File Uploaded Failed....");
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
