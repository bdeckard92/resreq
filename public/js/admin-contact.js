$(document).ready(function(){

    getResContactInfo()

});

function getResContactInfo(){

 $.ajax({
         url: "/api/contactInfo/" + localStorage.resId + "/" + localStorage.userId,
         type: "GET",
         dataType: "json",
         error: function (jqXHR, textStatus, errorThrown) {
             console.log(jqXHR.responseText);
         }
     })
     .done(function (data) {
        $("#addArea").text(data.address);
        $("#phoneArea").text(data.phone);
        $("#emailArea").text(data.email);
        $("#hoursArea").text(data.hour);

         console.log(data);
     });
}