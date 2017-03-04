console.log(5+6);
$(document).ready(function() {

  $("#submit").on("click", function(event) {
        event.preventDefault();
        console.log("hello");
        // Here we grab the form elements
        var newReservation = {
            name: $("#res_name").val().trim(),
            phone: $("#res_phone").val().trim(),
            email: $("#res_email").val().trim(),
            date: $("#res_date").val().trim()
        };
        console.log(newReservation);

        $.post("/api/reservation_db", newReservation,
            function(data) {
                // If a table is available... tell user they are booked.
                if (data) {
                    alert("Yay! You are officially booked!");
                }
                // If a table is available... tell user they on the waiting list.
                else {
                    alert("Sorry you are on the wait list");
                }
                // Clear the form when submitting
                $("#res_name").val("");
                $("#res_phone").val("");
                $("#res_email").val("");
                $("#res_date").val("");
            });
    });
  // Getting a reference to the input field where user adds a new reservation
 /* var newItemInput = $("input.new-item");
  var newName = $("#res_name");
  var newPhone = $("#res_phone");
  var newEmail= $("#res_email");
  var newDate = $("#res_date");
  // Our new reservation will go inside the reservationContainer
  var reservationContainer = $(".reservation-container");
  // Adding event listeners for deleting, editing, and adding reservations
  $(document).on("click", "button.delete", deleteReservation);
  
  $(document).on("click", ".reservation-item", editReservation);
  //$(document).on("keyup", ".reservation-item", finishEdit);
  $(document).on("blur", ".reservation-item", cancelEdit);
  $(document).on("submit", ".submit", insertReservation);

  // Our initial reservation array above part would be rendered for the admin
  var reservations;

  // Getting reservations from database when page loads this part would actually be on the admin side
  getReservation();

  // This function resets the reservation displayed with new reservations from the database
  function initializeRows() {
    reservationContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < reservations.length; i++) {
      rowsToAdd.push(createNewRow(reservations[i]));
    }
    reservationContainer.prepend(rowsToAdd);
  }

  // This function grabs reservations from the database and updates the view to render for admin
  function getReservation() {
    $.get("/api/reservation_db", function(data) {
      console.log("Reservations", data);
      reservation = data;
      initializeRows();
    });
  }

  // This function deletes a reservation when the user clicks the delete button, only for admin
  function deleteReservation() {
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/reservation_db/" + id
    })
    .done(function() {
      getReservation();
    });
  }

  

  // This function handles showing the input box for a user to edit a reservation for admin
  function editReservation() {
    var currentReservation = $(this).data("reservations");
    $(this)
      .children()
      .hide();
    $(this)
      .children("input.edit")
      .val(currentReservation.text);
    $(this)
      .children("input.edit")
      .show();
    $(this)
      .children("input.edit")
      .focus();
  }

  

  // This function updates a reservation in our database will probably be for admin
  function updateReservation(reservation) {
    $.ajax({
      method: "PUT",
      url: "/api/reservation_db",
      data: reservation
    })
    .done(function() {
      getReservation();
    });
  }

  // This function is called whenever a reservation item is in edit mode and loses focus
  // This cancels any edits being made, this would be rendered for admin
  function cancelEdit() {
    var currentReservation = $(this).data("reservations");
    $(this)
      .children()
      .hide();
    $(this)
      .children("input.edit")
      .val(currentReservation.text);
    $(this)
      .children("span")
      .show();
    $(this)
      .children("button")
      .show();
  }

  // This function constructs a reservation-item row, all rendered for admin
  function createNewRow(reservation) {
    var newInputRow = $("<li>");
    newInputRow.addClass("list-group-item reservation-item");
    var newReservationSpan = $("<span>");
    newReservationSpan.text(reservation.text);
    newInputRow.append(newReservationSpan);
    var newReservationInput = $("<input>");
    newReservationInput.attr("type", "text");
    newReservationInput.addClass("edit");
    newReservationInput.css("display", "none");
    newInputRow.append(newReservationInput);
    var newDeleteBtn = $("<button>");
    newDeleteBtn.addClass("delete btn btn-default");
    newDeleteBtn.text("x");
    newDeleteBtn.data("id", reservations.id);
    var newCompleteBtn = $("<button>");
    newCompleteBtn.addClass("complete btn btn-default");
    newCompleteBtn.text("✓");
    newInputRow.append(newDeleteBtn);
    newInputRow.append(newCompleteBtn);
    newInputRow.data("reservations", reservations);
    if (reservations.complete) {
      newReservationSpan.css("text-decoration", "line-through");
    }
    return newInputRow;
  }

  // This function inserts a new reservation into our database and then updates the view
  function insertReservation(event) {
    event.preventDefault();
    
     if (!newReservation.val().trim()) {   return; }
    var reservation = {
      name: newReservation
        .val()
        .trim(),
      phone: newReservation
        .val()
        .trim(),
      email: newReservation
        .val()
        .trim(),
      date: newReservation
        .val()
        .trim(),

    };

    // Posting the new reservation, calling getReservation when done
    $.post("/api/reservation_db", reservations, function() {
      getReservation();
    });
    newItemInput.val("");
  }
*/
});
