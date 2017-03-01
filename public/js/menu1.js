$(document).ready(function() {
	// Getting a reference to the input field where user adds a new item
	var appNameInput = $("#apetizer");
	var appInfoInput = $("#appDesc");
	var appPriceInput = $("#appPrice");
  var applist = $(".applist");
  var app;
  // Adding an event listener for when the form is submitted
	$(document).on("submit", "#app", handleFormSubmit);
  $(document).on("click", "button.delete", deleteItem);
  $(document).on("click", "button.Update", updateItem);
  $(document).on("click", ".new-item", editTodo);

	// A function for handling what happens when the form to create a new apetizer is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the apetizer if we are missing a name, info, or price
     if (!appNameInput.val().trim() || !appInfoInput.val().trim() || !appPriceInput.val()) {
       return;
      }
    // Constructing a newStart object to hand to the database
    var start = {
      Name: appNameInput
        .val(),
      Info: appInfoInput
        .val(),
      Price: appPriceInput.val()
    };
    console.log(start);
    $.post("/api/menu", start, function() {
      getStart();
    });
}

// This function grabs todos from the database and updates the view
  function getStart() {
    $.get("/api/menu", function(data) {
      console.log("Start");
      app = data;
      console.log(data);
      initializeRows();
    });
  }

  // This function resets the items displayed with new items from the database
  function initializeRows() {
    var appToAdd = [];
    for (var i = 0; i < app.length; i++) {
      appToAdd.push(createNewRow(app[i]));
    }
    applist.append(appToAdd);
  }

  // This function constructs a appetizer row
  function createNewRow(app) {
    var newInputRow = $("<li>");
    newInputRow.addClass("list-group-item new-item");
    var newDeleteBtn = $("<button>");
    newDeleteBtn.addClass("delete btn btn-default");
    newDeleteBtn.text("Remove");
    newDeleteBtn.data("id", app.id);
    var newUpdateBtn = $("<button>");
    newUpdateBtn.addClass("update btn btn-default");
    newUpdateBtn.text("Update");
    newInputRow.append(app.Name + "<br>" + app.Info + "<br>" + app.Price);
    newInputRow.append(newUpdateBtn);
    newInputRow.append(newDeleteBtn);
    newInputRow.data("Start", app);
    
    return newInputRow;
    console.log(newInputRow);
  }

  // This function deletes a todo when the user clicks the delete button
  function deleteItem() {
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/menu/" + id
    })
    .done(function() {
      //getStart();
    });
  }

  // This function updates a todo in our database
  function updateItem(item) {
    $.ajax({
      method: "PUT",
      url: "/api/menu",
      data: item
    })
    .done(function() {
      getStart();
    });
  }

    // This function handles showing the input box for a user to edit a item
  function editTodo() {
    var currentItem = $(this).data("Start");
    $(this)
      .children()
      .hide();
    $(this)
      .children("input.edit")
      .val(currentItem.text);
    $(this)
      .children("input.edit")
      .show();
    $(this)
      .children("input.edit")
      .focus();
  }


});