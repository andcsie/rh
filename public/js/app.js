function registerAction(){
    var userName = $('#registerUsername').val();
    var email = $('#registerEmail').val();
    var password = $('#regPasswd').val();
    var confirmPasswd = $('#confregPasswd').val();

    var account = {
        username : userName,
        password : password,
        email : email,
    };

    $.ajax({    
        url : "/create",
        method : "POST",
        headers : {
            "Content-Type":"application/json; charset=UTF-8"
        },
        data : JSON.stringify(account),
        success : function(data){
            console.log(data);
        },
        error : function(err){
            console.log(err);
        }
    });
}

function loginUser(){
    var username = $('#userName').val();
    var password = $('#password').val();
    var loginCredentials = {
        username : username,
        password : password
    };

    $.ajax({
        url : '/login',
        method : 'POST',
        headers : {
            "Content-Type":"application/json; charset=UTF-8"
        },
        data : JSON.stringify(loginCredentials),
        success : function(result){
            console.log(result);
        },
        error : function(err){
            console.log(err);
        }
    });
}

function validateFieldsLogin(){
    var username = $('#userName').val();
    var password = $('#password').val();

    if (username === "" || password === ""){
        alert("Please provide credentials!");
        return false;
    }

    return true;
}

function validateFieldsRegister(){
    var user = $('#registerUsername').val();
    var pass = $('#regPasswd').val();
    var confPass = $('#confregPasswd').val();
    var email = $('#registerEmail').val();

    if (user === "" || pass === "" || confPass === "" || email === ""){
        alert("All the fields should be completed!");
        return false;
    }

    if (pass !== confPass){
        alert("Passwords should match!");
        return false;
    }

    return true;
}

$('#register').click(function(){
    var bool = validateFieldsRegister();
    if (bool !== false){
        registerAction();
    }
});

$('#login').click(function(){
    var lgn = validateFieldsLogin();
    if (lgn !== false){
        loginUser();
    }
});