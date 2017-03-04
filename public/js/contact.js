$(document).ready(function () {
    // input references
    var res_name = $("#name");
    var res_user = $("#nickname");
    var res_addr = $("#address");
    var res_phne = $("#phone");
    var res_hour = $("#hours");
    var res_emil = $("#email"); 

var lock = new Auth0Lock('w0afrsXkjEvuLPkJAmX7iI3GhWDVKTFB', 'bchang55.auth0.com', options, {
    auth: {
      params: {
        scope: 'openid name email'
      } //Details: https://auth0.com/docs/scopes
    }
  });  



    $("#submit").on("click", function () {
        console.log(res_name.val());
        console.log(res_user.text());
        console.log(res_addr.val());
        console.log(res_phne.val());
        console.log(res_hour.val());
        console.log(res_emil.val());
        var contact = {
            name: res_name.val(),
            user_name: res_user.text(),
            address: res_addr.val(),
            phone: res_phne.val(),
            hour: res_hour.val(),
            email: res_emil.val()
        };
        console.log(contact);
        $.post("/api/create", contact, function () {
            getContacts();
        });
    });

    function getContacts() {
        $.get("/api/get", function (data) {
            console.log(data);
            createContact(data);
        });
    }

    function createContact(contact){
        //var ul = $("<ul class='list-group'>");
        var li = $("<li class='list-group-item'>");
        for(i in contact){
            console.log(contact[i]);
            li.text(contact[i].address);
            $(".list-group").append(li);
        }

    }
    getContacts();
});





function sendUserDataDB(newUser) {
    var currentURL = window.location.origin;

    var newUserObject = {
      email: newUser.email,
      username: newUser.nickname,
      firstname: newUser.givenName,
      lastname: newUser.familyName,
    };


    $.post(currentURL + "/api/newUser", newUserObject).then(function (data) {
      console.log(data);
      console.log("new user data sent");

    }, function (err) {
      console.log(err);
    });
    // Alternate ajax post for testing

    //     $.ajax({
    //     url : "/api/newUser",
    //     type: "POST",
    //     dataType: "json",
    //     data : JSON.stringify(newUserObject),
    //     success: function(data, textStatus, jqXHR)
    //     {
    //         //data - response from server
    //         console.log(data);
    //         console.log("new user data sent");
    //     },
    //     error: function (jqXHR, textStatus, errorThrown)
    //     {

    //     }
    // });


  }

      lock.getUserInfo(authResult.accessToken, function (error, profile) {
                  if (error) {
                      // Handle error
                      return;
                  }
                  var newUserObject = {
                        email: profile.email,
                        username: profile.nickname,
                        firstname: profile.givenName,
                        lastname: profile.familyName,
                        };


                        $.post(currentURL + "/api/newUser", newUserObject).then(function (data) {
                        console.log(data);
                        console.log("new user data sent");

                        }, function (err) {
                        console.log(err);
                        });
      });