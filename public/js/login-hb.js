$(document).ready(function () {

    

});
     var options = {
        rememberLastLogin: true,
        auth: {
            redirect: false
        },
        autoclose: true

    };

    var lock = new Auth0Lock('w0afrsXkjEvuLPkJAmX7iI3GhWDVKTFB', 'bchang55.auth0.com', options, {
        auth: {
            params: {
                scope: 'openid name email'
            } //Details: https://auth0.com/docs/scopes
        }
    });


var loginGlobal = {
//     init: function(){

// }

    getProfile: function(){
    lock.getUserInfo(localStorage.access_token, function (error, profile) {
        if (error) {
            // Handle error
            return;
        }
        // console.log(profile);
        return profile;
    });
    }
}



function renderTable(){
        var source = $("#some-template").html();
    var template = Handlebars.compile(source);

    var data = {
        users: [{
            person: {
                firstName: "Garry",
                lastName: "Finch"
            },
            jobTitle: "Front End Technical Lead",
            twitter: "gazraa"
        }, {
            person: {
                firstName: "Garry",
                lastName: "Finch"
            },
            jobTitle: "Photographer",
            twitter: "photobasics"
        }, {
            person: {
                firstName: "Garry",
                lastName: "Finch"
            },
            jobTitle: "LEGO Geek",
            twitter: "minifigures"
        }]
    };

    Handlebars.registerHelper('fullName', function (person) {
        return person.firstName + " " + person.lastName;
    });

    $('body').append(template(data));
}
