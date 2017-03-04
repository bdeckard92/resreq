$(document).ready(function () {
    // input references
    var res_name = $("#name");
    var res_user = $("#nickname");
    var res_addr = $("#address");
    var res_phne = $("#phone");
    var res_hour = $("#hours");
    var res_emil = $("#email");
    var user_email = localStorage.user_email;


    $("#submit").on("click", function () {
        console.log(res_name.val());
        console.log(res_user.text());
        console.log(res_addr.val());
        console.log(res_phne.val());
        console.log(res_hour.val());
        console.log(res_emil.val());
        $.get("/api/user/" + user_email, function (data) {
            console.log(data);
            // var res_id = getUserId();
            var restaurant = {
                name: res_name.val(),
                user_name: res_user.text(),
                address: res_addr.val(),
                phone: res_phne.val(),
                hour: res_hour.val(),
                email: res_emil.val(),
                userId: data[0].id
            };
            $.post("/api/create", restaurant, function () {
                getContacts();
            });
        });
    });

    function getContacts() {
        $.get("/api/get", function (data) {
            console.log(data);
            createContact(data);
        });
    }

    function createContact(contact) {
        //var ul = $("<ul class='list-group'>");
        var li = $("<li class='list-group-item'>");
        for (i in contact) {
            console.log(contact[i]);
            li.text(contact[i].name);
            $("#restaurant-info").append(li);
        }

    }
    getContacts();
});