$(document).ready(function() {
// Getting jQuery references to the apeitzer name, info, price
	var nameInput = $('#apetizer');
	var infoInput = $('#appDesc');
	var priceInput = $('#appPrice');
  // Adding an event listener for when the form is submitted
	$('#app').on("submit", handleFormSubmit);

	// A function for handling what happens when the form to create a new apetizer is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the apetizer if we are missing a name, info, or price
    if (!nameInput.val().trim() || !infoInput.val().trim() || !priceInput.val()) {
      return;
    }
    // Constructing a newStart object to hand to the database
    var newStart = {
      name: nameInput
        .val()
        .trim(),
      info: infoInput
        .val()
        .trim(),
      price: priceInput.val()
    };
}
});