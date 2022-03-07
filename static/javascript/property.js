let property;
let proprietor;
/* Static View*/
function static_view(id) {

    property_info =
    {
        "view1":
        {
            "property": ["House1", "Andheri East", 15000000, "CSMT Airpot", 1, 250, "static/img/Property1.jpg"],
            "user": ["sahil", "sahil@gmail.com", 9578432100]
        },
        "view2":
        {
            "property": ["House2", "Boriwali", 14400000, "National Park", 2, 1250, "static/img/Property2.jpg"],
            "user": ["Burhan", "abc@gmail.com", 8655523912]
        },
        "view3":
        {
            "property": ["House3", "Bandra", 12000000, "Station", 1, 1650, "static/img/Property3.jpg"],
            "user": ["Sandeep", "sandeep@gmail.com", 8806822340]
        },
        "view4":
        {
            "property": ["House4", "Badlapur", 22200000, "SBI", 2, 2313, "static/img/Property4.jpg"],
            "user": ["Aakash Bharadwaz", "mnopqr@gmail.com", 8845637892]
        },
        "view5":
        {
            "property": ["House5", "4 bungalows", 13000000, "Station", 2, 920, "static/img/Property5.jpg"],
            "user": ["Sandeep", "sandeep@gmail.com", 8806822340]
        },
    }
    for (var key in property_info) {
        view = key;
        if (view == id) {
            var view_info = property_info[view]
            property = view_info["property"];
            proprietor = view_info["user"];
            // convert the price number into Lakh and Crores
            var price = property[2];
            var price_string;
            if (price / 10000000 >= 1) {
                price = price / 10000000;
                price_string = price + " Crores";
            } else {
                price = price / 10000000;
                price_string = price + " Lakhs";
            }


            // Get the modal
            var modal = document.getElementById("myModal");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
            // Take model info one by one
            // Fetch property values
            var model_price = document.getElementById("model-price");
            var model_bhk = document.getElementById("model-bhk");
            var model_area = document.getElementById("model-area");
            var model_property_name = document.getElementById("model-property-name");
            var model_location = document.getElementById("model-location");
            var model_view_link = document.getElementById("model-view-link");
            var model_thumbnail = document.getElementById("model-thumbnail");

            // Set the thumbnail
            model_thumbnail.src = property[6];

            // Fetch proprietor values
            var model_proprietor_name = document.getElementById("model-proprietor-name");
            var model_proprietor_contact = document.getElementById("model-proprietor-contact");
            var model_proprietor_mail = document.getElementById("model-proprietor-mail");

            // Set property values
            model_price.innerHTML = "₹ " + price_string;
            model_bhk.textContent = property[4] + " BHK";
            model_area.textContent = property[5] + " Sqft";
            model_property_name.innerHTML = property[0];
            model_location.textContent = "Near " + property[3] + ", " + property[1].toUpperCase();
            model_view_link.setAttribute('href', 'http://127.0.0.1:5000/' + view);

            // Set proprietor values
            model_proprietor_name.innerHTML = "Mr. " + proprietor[0];
            model_proprietor_contact.textContent = "+91-" + proprietor[2];
            model_proprietor_mail.textContent = proprietor[1];

            modal.style.display = "block";

            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }
    }
    console.log(id);
    console.log(property_info);

}



/* Dynamic View */
function dynamic_view(id) {
    console.log(id);

    $.ajax({
        type: "GET",
        url: "/model_info/" + id,
        success: function (result) {
            console.log(result);

            //Fetch the proprietor and property details through results
            let property = result["Property"];
            let proprietor = result['User'];

            // convert the price number into Lakh and Crores
            var price = property[5];
            var price_string;
            if (price / 10000000 >= 1) {
                price = price / 10000000;
                price_string = price + " Crores";
            } else {
                price = price / 10000000;
                price_string = price + " Lakhs";
            }

            // Fetch the thumbnail
            var model_thumbnail = document.getElementById("model-thumbnail");
            if (property.length == 12) {
                model_thumbnail.src = property[11];
            } else {
                model_thumbnail.src = "static/img/Property3.jpg";
            }

            // Get the modal
            var modal = document.getElementById("myModal");            

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // Take model info one by one
            // Fetch property values
            var model_price = document.getElementById("model-price");
            var model_bhk = document.getElementById("model-bhk");
            var model_area = document.getElementById("model-area");
            var model_property_name = document.getElementById("model-property-name");
            var model_location = document.getElementById("model-location");
            var model_view_link = document.getElementById("model-view-link");

            // Fetch proprietor values
            var model_proprietor_name = document.getElementById("model-proprietor-name");
            var model_proprietor_contact = document.getElementById("model-proprietor-contact");
            var model_proprietor_mail = document.getElementById("model-proprietor-mail");

            // Set property values
            model_price.innerHTML = "₹ " + price_string;
            model_bhk.textContent = property[8] + " BHK";
            model_area.textContent = property[9] + " Sqft";
            model_property_name.innerHTML = property[3];
            model_location.textContent = "Near " + property[7] + ", " + property[4].toUpperCase();
            model_view_link.setAttribute('href', 'http://127.0.0.1:5000/' + property[1] + "_" + property[10]);

            // Set proprietor values
            model_proprietor_name.innerHTML = "Mr. " + proprietor[1];
            model_proprietor_contact.textContent = "+91-" + proprietor[5];
            model_proprietor_mail.textContent = proprietor[2];

            modal.style.display = "block";

            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }

        },
        error: function (xhr, status, error) {
            window.location.href = window.location.href;
        }
    });
}

function sendMail() {
    var mail = document.getElementById("model-proprietor-mail").textContent;
    var model_property_name = document.getElementById("model-property-name").textContent;
    var model_location = document.getElementById("model-location").textContent.toLowerCase();
    var message = "I am interested in " + model_property_name + ", " + model_location;
    console.log(mail);
    var email_info = { "mail": mail, "message": message };
    $.ajax({
        type: "POST",
        url: "/mail_proprietor",
        data: JSON.stringify(email_info),
        contentType: "application/json",
        dataType: 'json',
        success: function (result) {
            alert("Mail sent successfully");
        },
        error: function (xhr, status, error) {
            alert("Failed to send the mail");
        }
    });

}

function getPageList(totalPages, page, maxLength) {
    function range(start, end) {
        return Array.from(Array(end - start + 1), (_, i) => i + start);
    }

    var sideWidth = maxLength < 9 ? 1 : 2;
    var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

    if (totalPages <= maxLength) {
        return range(1, totalPages);
    }

    if (page <= maxLength - sideWidth - 1 - rightWidth) {
        return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));

    }

    if (page >= totalPages - sideWidth - 1 - rightWidth) {
        return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
    }

    return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
}

$(function () {
    var numberOfItems = $(".property-grid .card-box-a").length;
    var limitPerPage = 6;
    var totalPages = Math.ceil(numberOfItems / limitPerPage);
    var paginationSize = 7;
    var currentPage;

    function showPage(whichPage) {
        if (whichPage < 1 || whichPage > totalPages) return false;

        currentPage = whichPage;

        $(".property-grid .card-box-a").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();

        $(".pagination li").slice(1, -1).remove();

        getPageList(totalPages, currentPage, paginationSize).forEach(item => {
            $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots")
                .toggleClass("active", item === currentPage).append($("<a>").addClass("page-link")
                    .attr({ href: "javascript:void(0)" }).text(item || "...")).insertBefore(".next-page");
        });

        $(".previous-page").toggleClass(" disable", currentPage === 1);
        $(".next-page").toggleClass(" disable", currentPage === totalPages);
        return true;
    }

    $(".pagination").append(
        $("<li>").addClass("page-item").addClass("previous-page").append($("<a>").addClass("page-link")
            .attr({ href: "javascript:void(0)" }).text("Prev")),
        $("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link")
            .attr({ href: "javascript:void(0)" }).text("Next")),
    );

    $(".property-grid").show();
    showPage(1);

    $(document).on("click", ".pagination li.current-page:not(.active)", function () {
        return showPage(+$(this).text());
    });

    $(".next-page").on("click", function () {
        return showPage(currentPage + 1);
    });

    $(".previous-page").on("click", function () {
        return showPage(currentPage - 1);
    });
});