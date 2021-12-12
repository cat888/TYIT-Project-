let fileInput = document.getElementById("file-input");
let fileContent;
let fileName;
let fileType;
let imageContainer = document.getElementById("images");
let numOfFiles = document.getElementById("num-of-files");

function preview() {
    debugger
    imageContainer.innerHTML = "";
    numOfFiles.textContent = `${fileInput.files.length} Files Selected`;

    for (i of fileInput.files) {
        let reader = new FileReader();
        let figure = document.createElement("figure");
        let figCap = document.createElement("figcaption");
        figCap.innerText = i.name;
        fileName = i.name;
        fileType = i.type;
        figure.appendChild(figCap);
        reader.onload = () => {
            debugger
            fileContent = reader.result;
            let img = document.createElement("img");
            img.setAttribute("src", reader.result);
            figure.insertBefore(img, figCap);
        }
        imageContainer.appendChild(figure);
        reader.readAsDataURL(i);
    }
}
function myFunction() {
    debugger
    var roomType = $('.Users').val();
    if (roomType === 'select' && (fileName == undefined || fileType == undefined || fileContent == undefined)) {
        alert("Please select appropriate fields!");
    } else if (roomType === 'select') {
        alert("Please select appropriate room Type!");
    } else if (fileName == undefined || fileType == undefined || fileContent == undefined) {
        alert("please browse appropriate files!");
    } else {
        //busuness logic
        var dataSend = {};
        dataSend['roomType'] = roomType;
        dataSend['fileName'] = fileName;
        dataSend['fileType'] = fileType;
        dataSend['filedata'] = fileContent;
        console.log(dataSend);

        $.ajax({
            url: "  ",
            // data: dataSend,
            data: JSON.stringify(dataSend),
            contentType: "application/json",
            dataType: 'json',

            success: function(result){
                alert("Your File Uploaded Sucessfully...."); 
            },
            error: function(xhr,status,error){
                alert("Your File Uploaded Failed....");
            }
        });
    }
    
}