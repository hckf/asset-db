// Updates the border and validation message of each textbox if certain conditions are met.
function fieldFormat(field, errorStr = "no-error") {
  const fieldValidationPairs = {
    "device-name": "name-valid",
    "device-version": "version-valid",
    "serial-number": "serial-valid",
    "device-status": "status-valid",
    location: "location-valid",
    "user-issued": "issued-valid",
    notes: "notes-valid",
  };

  let validField = document.getElementById(fieldValidationPairs[field.id]);
  if (field.id == "notes") {
  } else if (field.disabled) {
    field.style.border = "1px solid #999";
    validField.style.color = "transparent";
  } else {
    if (errorStr == "no-error") {
      field.style.border = "1px solid lightgreen";
      validField.style.color = "transparent";
      validField.innerText = "Valid input.";
    } else {
      field.style.border = "1px dashed red";
      validField.style.color = "red";
      if (errorStr == "empty") {
        validField.innerText = "Please ensure fields are completed.";
      } else if (errorStr == "no-letters") {
        validField.innerText = "Alphabetic characters are required (A-Z)";
      } else if (errorStr == "regex-failed") {
        validField.innerText = "Alphanumeric characters and . ' - _ / only.";
      }
    }
  }
}

function fieldValidation(field) {
  let regex = /^[a-z0-9]+[a-z0-9\s.\'\-_\/]*$/gi;
  let regAlpha = /[a-z]/gi;
  let regOtherChar = /[/\s.'-_\/]/;

  if (!field.disabled) {
    field.value = field.value.trim();
    switch (field.id) {
      case "serial-number":
        regex = /^[a-z0-9]+[a-z0-9\s.\'\-_\/]*$/gi;
        if (!field.value) {
          fieldFormat(field, "empty");
          return false;
        } else if (
          !regAlpha.test(field.value) &&
          regOtherChar.test(field.value)
        ) {
          fieldFormat(field, "no-letters");
          return false;
        } else if (!regex.test(field.value)) {
          fieldFormat(field, "regex-failed");
          return false;
        } else {
          fieldFormat(field);
        }
        break;
      case "device-status":
        if (!field.value) {
          fieldFormat(field, "empty");
          return false;
        } else if (
          !regAlpha.test(field.value) &&
          regOtherChar.test(field.value)
        ) {
          fieldFormat(field, "no-letters");
          return false;
        } else {
          fieldFormat(field);
        }
        break;
      case "notes":
        regex = /^[a-z0-9]+[a-z0-9\s.\'\-_\/]*$/gi;
        if (regex.test(field.value) || field.value == "") {
          fieldFormat(field);
        } else if (
          !regAlpha.test(field.value) &&
          regOtherChar.test(field.value)
        ) {
          fieldFormat(field, "no-letters");
        } else {
          fieldFormat(field, "regex-failed");
        }
        break;
      default:
        if (!field.value) {
          fieldFormat(field, "empty");
          return false;
        } else if (
          !regAlpha.test(field.value) &&
          regOtherChar.test(field.value)
        ) {
          fieldFormat(field, "no-letters");
          return false;
        } else if (!regex.test(field.value)) {
          fieldFormat(field, "regex-failed");
          return false;
        } else {
          fieldFormat(field);
        }
    }
  }
  return true;
}

function setupFields(className) {
  let fields = Array.from(document.getElementsByClassName(className));
  for (const field of fields) {
    field.addEventListener("blur", (e) => {
      fieldValidation(field);
    });
  }
}

function statusUpdate() {
  let statusDropdown = document.getElementById("device-status");
  statusDropdown.addEventListener("change", (e) => {
    let statusChoice =
      statusDropdown.options[statusDropdown.selectedIndex].value;
    console.log(statusChoice);
    let locationField = document.getElementById("location");
    let issuedField = document.getElementById("user-issued");
    let issuedValid = document.getElementById("issued-valid");
    let locationValid = document.getElementById("location-valid");
    switch (statusChoice) {
      case "option-storage":
        locationField.disabled = false;
        issuedField.disabled = true;
        issuedField.value = null;
        issuedField.style.border = "1px solid #999";
        issuedValid.style.color = "transparent";
        break;
      case "option-issued":
        locationField.disabled = true;
        locationField.value = null;
        locationField.style.border = "1px solid #999";
        locationValid.style.color = "transparent";
        issuedField.disabled = false;
        break;
      case "option-return":
        locationField.disabled = false;
        issuedField.disabled = false;
        break;
      case "option-lost":
        locationField.disabled = true;
        locationField.value = null;
        locationField.style.border = "1px solid #999";
        locationValid.style.color = "transparent";
        issuedField.disabled = false;
        break;
      default:
        locationField.disabled = true;
        locationField.value = null;
        locationField.style.border = "1px solid #999";
        locationValid.style.color = "transparent";
        issuedField.disabled = true;
        issuedField.value = null;
        issuedField.style.border = "1px solid #999";
        issuedValid.style.color = "transparent";
        break;
    }
  });
  let statusChoice = statusDropdown.options[statusDropdown.selectedIndex].value;
  console.log(statusChoice);
  let locationField = document.getElementById("location");
  let issuedField = document.getElementById("user-issued");
  switch (statusChoice) {
    case "option-storage":
      locationField.disabled = false;
      issuedField.disabled = true;
      issuedField.value = null;
      break;
    case "option-issued":
      locationField.disabled = true;
      locationField.value = null;
      issuedField.disabled = false;
      break;
    case "option-return":
      locationField.disabled = false;
      issuedField.disabled = false;
      break;
    case "option-lost":
      locationField.disabled = true;
      locationField.value = null;
      issuedField.disabled = false;
      break;
    default:
      locationField.disabled = true;
      locationField.value = null;
      issuedField.disabled = true;
      issuedField.value = null;
      break;
  }
}

function submitForm() {
  let assetForm = document.getElementById("asset-form");
  assetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let fields = Array.from(document.getElementsByClassName("text-input"));
    let fieldsValid = true;
    for (let field of fields) {
      if (!fieldValidation(field)) {
        fieldsValid = false;
      }
    }
    let submitButton = document.getElementById("submit-button");
    if (fieldsValid) {
      let http = new XMLHttpRequest();
      let url = "database.php";
      let parameters = "";
      let columnTable = {
        0: "devicename",
        1: "deviceversion",
        2: "serialnumber",
        3: "devicestatus",
        4: "location",
        5: "userissued",
        6: "notes",
      };

      for (let i = 0; i < fields.length; i++) {
        if (i == fields.length - 1) {
          parameters = parameters + `${columnTable[i]}=${fields[i].value}`;
        } else {
          parameters = parameters + `${columnTable[i]}=${fields[i].value}&`;
        }
      }

      http.open("POST", url, true);
      http.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );

      http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
          if (http.responseText == 1) {
            console.log("1");
            console.log(http.responseText);
          } else if (http.responseText == 0) {
            console.log("0");
          }
        }
      };

      http.send(parameters);
      http.onload = function () {
        submitButton.innerText = "Done!";
        submitButton.style.backgroundColor = "lightgreen";
        // Reset field values
        for (let field of fields) {
          field.value = null;
          field.style.border = "1px solid #999";
          if (field.id == "location" || field.id == "user-issued") {
            field.disabled = true;
          }
        }
        setTimeout(function () {
          submitButton.style.backgroundColor = "#24a0ed";
          submitButton.innerText = "Submit";
        }, 1000); // for 1s = 1000ms
      };
    } else {
      submitButton.style.backgroundColor = "red";
      submitButton.innerText = "Invalid";
      setTimeout(function () {
        submitButton.style.backgroundColor = "#24a0ed";
        submitButton.innerText = "Submit";
      }, 1000);
    }
    // Used to prevent form refresh?
    return false;
  });
}

setupFields("text-input");
statusUpdate();
submitForm();
