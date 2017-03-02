$(document).ready(function () {
    // input references
    var res_name = $("#name");
    var res_addr = $("#address");
    var res_phne = $("#phone");
    var res_hour = $("#hours");
    var res_emil = $("#email");

    $("#submit").on("click", function () {
        console.log(res_name.val());
        console.log(res_addr.val());
        console.log(res_phne.val());
        console.log(res_hour.val());
        console.log(res_emil.val());
        var contact = {
            name: res_name.val(),
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