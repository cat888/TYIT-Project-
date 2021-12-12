const login_form = document.getElementById('login-form');
const login_email = document.getElementById('login-email');
const login_password = document.getElementById('login-password');
const login_registration = document.getElementById('login-Registration');

// add event to login form
login_form.addEventListener('submit', (event) => {
    event.preventDefault();

    var data = {};
    data.email = login_email.value;
    data.password = login_password.value;
    data.Registration = login_registration.value;

    var xmlRequest = $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/login",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: 'json',
        success: function (result) {
            console.log("Result:");
            console.log(result); 
            // var returnedData = JSON.parse(result);
            if (result["msg"] != "" && result["msg"] === "Login Successfull") {
                window.location.href = "http://127.0.0.1:5000";
            }
        },
        error: function (jqXHR, result) {
            var result = JSON.parse(jqXHR.responseText);
            console.log(result.msg);
            $("#error").text(result.msg);
            // document.getElementById('error').innerHTML = jqXHR.responseText;
            // window.location.href = window.location.href;
        }
    });
})