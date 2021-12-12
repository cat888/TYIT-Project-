const form = document.getElementById("registration-form")
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('contact');
const type = document.getElementById('type');
const birth_date = document.getElementById('birth_date');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');
const registration = document.getElementById('Registration');


var flag_username, flag_email, flag_phone, flag_type, flag_date, flag_pass, flag_cpass = false;

// add event
form.addEventListener('submit', (event) => {
    // debugger
    event.preventDefault();
    validate();

    if (flag_username && flag_email && flag_date && flag_phone && flag_type && flag_pass && flag_cpass) {
        // Sending request to url through ajax
        // const xhttp = new XMLHttpRequest();
        // const form = document.getElementById('form');
        // const formData = new FormData(form);

        // Create a json file
        var data = {};
        data.username = username.value;
        data.email = email.value;
        data.birth_date = birth_date.value;
        data.type = type.value;
        data.contact = phone.value;
        data.password = password.value;
        data["confirm-password"] = cpassword.value;
        data.Registration = registration.value;
        console.log(data);

        // Error :- ------------------------------

        // xhttp.open("POST", "http://127.0.0.1:5000/login");
        // // xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // gives error
        // xhttp.send(formData);

        // location.replace("http:127.0.0.1:5000/login");
        // Sending request to url through ajax
        // var xhttp = new XMLHttpRequest();
        // xhttp.onreadystatechange = function () {
        //     if (this.readyState == 4 && this.status == 200) {
        //         console.log("Done !!")
        //     }
        // };
        // xhttp.open("POST", "http://127.0.0.1:5000", true);
        // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // xhttp.send(form);

        // --------------------------------- //

        // Jquery :- 
        // https://www.tutorialsteacher.com/jquery/jquery-ajax-method ,
        // https://api.jquery.com/jquery.ajax/
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
                if (result["msg"] != "" && result["msg"] === "User Registered") {
                    alert("User registered");
                    // window.location.href = window.location.href;
                    window.location.href = "http://127.0.0.1:5000";
                }
            },
            error: function (jqXHR, result) {
                console.log(jqXHR.responseText);
                var result = JSON.parse(jqXHR.responseText);
                console.log(result.msg);
                $("#error_signup").text(result.msg);
            }
        });


    }
});

// validating email
const isEmail = (emailVal) => {
    var atSymbol = emailVal.indexOf("@");
    if (atSymbol < 1) return false;
    var dot = emailVal.lastIndexOf('.');
    if (dot <= atSymbol + 2) return false;
    if (dot === emailVal.length - 1) return false;

    return true;
}

// validating age
const isYoung = (birth_dateVal) => {
    date = new Date();
    date_year = date.getFullYear();
    console.log(date_year);
    birth_year = birth_dateVal.slice(0, 4); // thus will slice the date from 2021-11-28 to 2021
    console.log(birth_year);
    diff = date_year - parseInt(birth_year); // parseInt will convert the fetch string that is 2021 into integer and then subtract it from toda's date.
    console.log(diff);
    if (diff < 18) return false;

    return true;
}

// defining function
const validate = () => {

    // fetching values...
    const usernameval = username.value.trim();
    const emailval = email.value;
    const phoneval = phone.value.trim();
    const typeval = type.value;
    const birth_dateval = birth_date.value.trim();
    const passwordval = password.value.trim();
    const cpasswordval = cpassword.value.trim();
    const registrationval = registration.value;

    //validate username
    if (usernameval === "") {
        setErrorMsg(username, 'username cannot be blank');
        flag_username = false;
    }
    else if (usernameval.length <= 2) {
        setErrorMsg(username, 'username min 3 character');
        flag_username = false;
    } else {
        setSuccessMsg(username);
        flag_username = true;
    }


    //validate email
    if (emailval === "") {
        setErrorMsg(email, 'Email cannot be blank');
        flag_email = false;
    }
    else if (!isEmail(emailval)) {
        setErrorMsg(email, 'Invalid Email');
        flag_email = false;
    } else {
        setSuccessMsg(email);
        flag_email = true;
    }

    // validate birth_date var flag_username, flag_email, flag_phone, flag_type, flag_date, flag_pass, flag_cpass = false;
    if (birth_dateval === "") {
        setErrorMsg(birth_date, 'D.O.B cannot be blank');
        flag_date = false;
    } else if (!isYoung(birth_dateval)) {
        setErrorMsg(birth_date, 'Age should be greater than 18');
        flag_date = false;
    } else {
        setSuccessMsg(birth_date);
        flag_date = true;
    }

    //validate phone
    if (phoneval === "") {
        setErrorMsg(phone, 'Phone number cannot be blank');
        flag_phone = false;
    }
    else if (phoneval.length != 10) {
        setErrorMsg(phone, 'Invalid Phone number');
        flag_phone = false;
    }
    else {
        setSuccessMsg(phone);
        flag_phone = true;
    }

    //validate type
    if (typeval === "select") {
        setErrorMsg(type, 'Please select the appropriate Type');
        flag_type = false;
    } else {
        setSuccessMsg(type);
        flag_type = true;
    }

    //validate password
    if (passwordval == "") {
        setErrorMsg(password, 'password  cannot be blank');
        flag_pass = false;
    }
    else if (passwordval.length <= 5) {
        setErrorMsg(password, 'minimum 6 char');
        flag_pass = false;
    }
    else {
        setSuccessMsg(password);
        flag_pass = true;
    }

    //validate confirm password
    if (cpasswordval === "") {
        setErrorMsg(cpassword, 'please Re-Enter your password');
        flag_cpass = false;
    }
    else if (passwordval != cpasswordval) {
        setErrorMsg(cpassword, 'password did not match!');
        flag_cpass = false;
    } else {
        setSuccessMsg(cpassword);
        flag_cpass = true;
    }

    function setErrorMsg(input, errormsgs) {
        const formControl = input.parentElement;
        formControl.className = "form-control error";
        const small = formControl.querySelector('small');
        try {
            small.innerHTML = errormsgs;
        } catch (err) {
            console.log(err);
            console.log(input);
        }
    }

    function setSuccessMsg(input) {
        const formControl = input.parentElement;
        formControl.className = "form-control success";
    }

}