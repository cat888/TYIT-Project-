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
        url: "/login",
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
            console.log(jqXHR.responseText);
            var result = JSON.parse(jqXHR.responseText);
            console.log(result.msg);
            $("#error").text(result.msg);
        }
    });
})
// validating email
// const isEmail = (emailVal) => {
//     var atSymbol = emailVal.indexOf("@");
//     if (atSymbol < 1) return false;
//     var dot = emailVal.lastIndexOf('.');
//     if (dot <= atSymbol + 2) return false;
//     if (dot === emailVal.length - 1) return false;

//     return true;
// }

// const emailval = login_email.value;

// const passwordval = login-password.value.trim();

//validate email
// if (emailval === "") {
//     setErrorMsg(login_email, 'Email cannot be blank');
//     flag_email = false;
// }
// else if (!isEmail(emailval)) {
//     setErrorMsg(login_email, 'Invalid Email');
//     flag_email = false;
// } else {
//     setSuccessMsg(login_email);
//     flag_email = true;
// }

//validate password
// if (passwordval == "") {
//     setErrorMsg(login-password, 'password  cannot be blank');
//     flag_pass = false;
// }
// else if (passwordval.length <= 5) {
//     setErrorMsg(login-password, 'minimum 6 char');
//     flag_pass = false;
// }
// else {
//     setSuccessMsg(login-password);
//     flag_pass = true;
// }