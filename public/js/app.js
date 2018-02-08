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
    