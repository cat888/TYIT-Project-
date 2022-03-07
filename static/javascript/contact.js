let uname=document.getElementById("uname");
let uemail=document.getElementById("email");
let usubject=document.getElementById("usub");
let msg=document.getElementById("msg");

$( document ).ready(function() {
    $( "#contact_agent" ).submit(function( event ) {
        // alert( "Handler for .submit() called." );
        event.preventDefault();
      });
});

function sendmsg(){
    debugger
    var msgData={};
    msgData['name'] = uname.value;
    msgData['email'] = uemail.value;
    msgData['subject'] = usubject.value;
    msgData['message'] = msg.value;
    console.log(msgData);

    $.ajax({
        type: "POST",
        URL:"/Contact",
        data: JSON.stringify(msgData),
        contentType: "application/json",
        dataType: 'json',
        success: function (result) {
            alert("Mail Sent Successfully");
            window.location.href = window.location.href;
        },
        error: function (xhr, status, error) {
            alert("Your send Message failed.....");
            window.location.href = window.location.href;
        }
    });
}