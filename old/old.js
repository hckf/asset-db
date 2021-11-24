function fieldValidateV2(fieldId, validatorId) {
  let inputField = document.getElementById(fieldId);
  let validMessage = document.getElementById(validatorId);
  let regex = /^[a-zA-Z]+[a-zA-Z0-9\\s.'-\/]*$/;
  // Only allow alphanumeric,
  switch (fieldId) {
    case "serial_number":
      regex = /^[a-zA-Z0-9]+[a-zA-Z0-9\\s.'-\/]*$/;
      if (!inputField.value) {
        inputField.style.border = "1px dashed red";
        validMessage.style.color = "red";
        validMessage.innerText = "Please ensure fields are completed.";
      } else if (regex.test(inputField.value)) {
        inputField.style.border = "1px solid lightgreen";
        validMessage.style.color = "transparent";
        validMessage.innerText = "Valid input.";
      } else {
        inputField.style.border = "1px dashed red";
        validMessage.style.color = "red";
        validMessage.innerText = "Alphanumeric characters and . ' - / only.";
      }
      inputField.reportValidity();
      break;
    case "notes":
      regex = /^[a-zA-Z]+[a-zA-Z0-9.\s'-,]*/;
      if (regex.test(inputField.value) || inputField.value == "") {
        inputField.style.border = "1px solid lightgreen";
        validMessage.style.color = "transparent";
        validMessage.innerText = "Valid input.";
      } else {
        inputField.style.border = "1px dashed red";
        validMessage.style.color = "red";
        validMessage.innerText = "Alphanumeric characters and . ' - / only.";
      }
      break;
    default:
      if (!inputField.value) {
        validMessage.style.color = "red";
        validMessage.innerText = "Please ensure fields are completed.";
      } else if (regex.test(inputField.value)) {
        validMessage.style.color = "transparent";
        validMessage.innerText = "Valid input.";
      } else {
        validMessage.style.color = "red";
        validMessage.innerText = "Alphanumeric characters and . ' - / only.";
      }
  }
}

function fieldValidateV3(fieldId) {
  let inputField = document.getElementById(fieldId);
  const validityState = inputField.validity;
  let regex = /^[a-zA-Z]+[a-zA-Z0-9\\s.'-\/]*$/;
  // Only allow alphanumeric,
  switch (fieldId) {
    case "serial_number":
      regex = /^[a-zA-Z0-9]+[a-zA-Z0-9\\s.'-\/]*$/;
      if (!inputField.value) {
        inputField.setCustomValidity("Please ensure fields are completed.");
        inputField.style.border = "1px dashed red";
      } else if (regex.test(inputField.value)) {
        inputField.setCustomValidity("");
        inputField.style.border = "1px solid lightgreen";
      } else {
        inputField.setCustomValidity(
          "Alphanumeric characters and . ' - / only."
        );
        inputField.style.border = "1px dashed red";
      }
      inputField.reportValidity();
      break;
    case "notes":
      regex = /^[a-zA-Z]+[a-zA-Z0-9.\s'-,]*/;
      if (regex.test(inputField.value) || inputField.value == "") {
        inputField.style.border = "1px solid lightgreen";
        validMessage.style.color = "transparent";
        validMessage.innerText = "Valid input.";
      } else {
        inputField.style.border = "1px dashed red";
        validMessage.style.color = "red";
        validMessage.innerText = "Alphanumeric characters and . ' - / only.";
      }
      break;
    default:
      if (!inputField.value) {
        validMessage.style.color = "red";
        validMessage.innerText = "Please ensure fields are completed.";
      } else if (regex.test(inputField.value)) {
        validMessage.style.color = "transparent";
        validMessage.innerText = "Valid input.";
      } else {
        validMessage.style.color = "red";
        validMessage.innerText = "Alphanumeric characters and . ' - / only.";
      }
  }
}

function submitValidationV1(className) {
  document
    .getElementById("submit_button")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      let fields = Array.from(document.getElementsByClassName(className));
      for (const field of fields) {
        if (field.value == "") {
          console.log("Please ensure all fields are completed.");
          return false;
        } else {
          console.log("All fields completed!");
          submitPOST(className);
          return true;
        }
      }
    });
}

// Old HTML for custom form submission
// <!--onsubmit="event.preventDefault(); validateInputs('text_input');"-->
