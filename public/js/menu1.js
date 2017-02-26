$(document).ready(function() {
	// Getting a reference to the input field where user adds a new todo
	var newNameInput = $("#apetizer");
	var newInfoInput = $("#appDesc");
	var newPriceInput = $("#appPrice");
  // Adding an event listener for when the form is submitted
	$(document).on("submit", "#app", handleFormSubmit);

	// A function for handling what happens when the form to create a new apetizer is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the apetizer if we are missing a name, info, or price
    // if (!nameInput.val().trim() || !infoInput.val().trim() || !priceInput.val()) {
    //   return;
    //  }
    // Constructing a newStart object to hand to the database
    var Start = {
      Name: newNameInput
        .val(),
      Info: newInfoInput
        .val(),
      Price: newPriceInput.val()
    };
    console.log(Start);
    $.post("/api/menu", Start, function() {
      //getStart();
    });
}
});