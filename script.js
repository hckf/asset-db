// Updates the border and validation message of each textbox if certain conditions are met.
function fieldFormat(inputId, errorStr = "no-error") {
  const fieldValidationPairs = {
    "device-name": "name-valid",
    "device-version": "version-valid",
    "serial-number": "serial-valid",
    "device-status": "status-valid",
    location: "location-valid",
    "user-issued": "issued-valid",
    notes: "notes-valid",
  };

  let inputField = document.getElementById(inputId);
  let validField = document.getElementById(fieldValidationPairs[inputId]);
  if (inputId == "notes") {
  } else {
    if (errorStr == "no-error") {
      inputField.style.border = "1px solid lightgreen";
      validField.style.color = "transparent";
      validField.innerText = "Valid input.";
    } else {
      inputField.style.border = "1px dashed red";
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

function fieldValidation(className) {
  let fields = Array.from(document.getElementsByClassName(className));
  for (const field of fields) {
    field.addEventListener("blur", (e) => {
      let regex = /[a-z]+[a-z0-9/\s.\'-_\/]*$/gi;
      let regAlpha = /[a-z]/gi;
      let regOtherChar = /[/\s.'-_\/]/;
      field.value = field.value.trim();
      switch (field.id) {
        case "serial-number":
          regex = /[a-z0-9]+[a-z0-9/\s.\'-_\/]*$/gi;
          if (!field.value) {
            fieldFormat(field.id, "empty");
          } else if (
            !regAlpha.test(field.value) &&
            regOtherChar.test(field.value)
          ) {
            fieldFormat(field.id, "no-letters");
          } else if (!regex.test(field.value)) {
            fieldFormat(field.id, "regex-failed");
          } else {
            fieldFormat(field.id);
          }
          break;
        case "device-status":
          if (!field.value) {
            fieldFormat(field.id, "empty");
          } else if (
            !regAlpha.test(field.value) &&
            regOtherChar.test(field.value)
          ) {
            fieldFormat(field.id, "no-letters");
          } else {
            fieldFormat(field.id);
          }
          break;
        case "notes":
          regex = /[a-z]+[a-z0-9/\s.\'-_\/]*$/gi;
          if (regex.test(field.value) || field.value == "") {
            fieldFormat(field.id);
          } else if (
            !regAlpha.test(field.value) &&
            regOtherChar.test(field.value)
          ) {
            fieldFormat(field.id, "no-letters");
          } else {
            fieldFormat(field.id, "regex-failed");
          }
          break;
        default:
          if (!field.value) {
            fieldFormat(field.id, "empty");
          } else if (
            !regAlpha.test(field.value) &&
            regOtherChar.test(field.value)
          ) {
            fieldFormat(field.id, "no-letters");
          } else if (!regex.test(field.value)) {
            fieldFormat(field.id, "regex-failed");
          } else {
            fieldFormat(field.id);
          }
      }
    });
  }
}

function statusUpdate() {
  let statusDropdown = document.getElementById("device-status");
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
    console.log("Submission accepted!");
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

    let fields = Array.from(document.getElementsByClassName("text-input"));
    for (let i = 0; i < fields.length; i++) {
      if (i == fields.length - 1) {
        parameters = parameters + `${columnTable[i]}=${fields[i].value}`;
      } else {
        parameters = parameters + `${columnTable[i]}=${fields[i].value}&`;
      }
    }

    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
        if (http.responseText == 1) {
          console.log("Done!");
        } else if (http.responseText == 0) {
          console.log("There was an error.");
        }
      }
    };
    http.send(parameters);
    http.onload = function () {
      alert("Asset information sent to asset database.");
    };
  });
}

fieldValidation("text-input");
submitForm();
