
// Exercise 6
function validate() {

	var error = 0;
	// Temporally prevent default submit and page reload for validation testing purposes
	event.preventDefault();
	
	// Get the input fields
	var fName = document.getElementById("fName");
	var fEmail = document.getElementById("fEmail");
	var fAddress = document.getElementById("fAddress");
	var fLastN = document.getElementById("fLastN");
	var fPassword = document.getElementById("fPassword");
	var fPhone = document.getElementById("fPhone");

	// Reset invalid class in form re-submit validation
	var inputFields = [fName, fEmail, fAddress, fLastN, fPassword, fPhone];
	for (item in inputFields) {
		inputFields[item].classList.remove("is-invalid");
	}

	// Get the error elements
	// Finally not needed, as we used bootstrap "is-invalid" class in the inputs
	// var errorName = document.getElementById("errorName");
	// var errorEmail = document.getElementById("errorEmail");
	// var errorAddress = document.getElementById("errorAddress");
	// var errorLastN = document.getElementById("errorLastN");
	// var errorPassword = document.getElementById("errorPassword");
	// var errorPhone = document.getElementById("errorPhone");
	// var errorElements = [errorName, errorEmail, errorAddress, errorLastN, errorPassword, errorPhone];

	// Validate fields entered by the user: name, phone, password, and email

	// Validate each field for empty states and minimum characters
	for (item in inputFields) {
		if (!inputFields[item].value || inputFields[item].value.length < 3) {
			inputFields[item].classList.add("is-invalid");
			++error;
		}
	}

	// Name field value is only letters
	if (!/^[A-Za-z]*$/.test(fName.value)) {
		fName.classList.add("is-invalid");
		++error;
	}
	// Last Name field value is only letters
	if (!/^[A-Za-z]*$/.test(fLastN.value)) {
		fLastN.classList.add("is-invalid");
		++error;
	}
	// Phone field value is only numbers
	if (!/^[0-9]*$/.test(fPhone.value) || fPhone.value.length != 9) {
		fPhone.classList.add("is-invalid");
		++error;
	}
	// Password field value is numbers and letters
	if (/^[0-9]*$/.test(fPassword.value) || /^[A-Za-z]*$/.test(fPassword.value)) {
		fPassword.classList.add("is-invalid");
		++error;
	}
	// Email field value is a valid email string
	if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(fEmail.value)) {
		fEmail.classList.add("is-invalid");
		++error;
	}

	// Show error alert? Is it really needed?
	if(error>0){
		// alert("Error");
	}else{
		alert("Form validation is OK");
	}

}
