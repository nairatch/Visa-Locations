import { locationData } from "./locationData.js";
import additionalInfoData from "./additionalInfo.js";

document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("visaLocation");
  const locationInfoDiv = document.getElementById("locationInfo");
  const infoText = document.getElementById("infoText");
  const additionalInfoDiv = document.getElementById("additionalInfo");
  const additionalInfoText = document.getElementById("additionalInfoText");

  // Show basic location info when a country is selected
  function showLocationInfo() {
    const selectedLocation = select.value;

    if (selectedLocation) {
      infoText.innerHTML =
        locationData[selectedLocation] || "No location info available.";
      locationInfoDiv.style.display = "block";
      additionalInfoDiv.style.display = "none"; // hide additional info initially
    } else {
      locationInfoDiv.style.display = "none";
    }
  }

  // Show detailed info based on button click
  function showMoreInfo(infoType) {
    const selectedLocation = select.value;

    if (selectedLocation && additionalInfoData[selectedLocation]) {
      const locationDetails = additionalInfoData[selectedLocation];

      switch (infoType) {
        case "waitingtime":
          additionalInfoText.innerHTML = `<strong>Average Waiting Time:</strong> ${locationDetails.waitingtime}`;
          break;
        case "approval":
          additionalInfoText.innerHTML = `<strong>Approval Rate:</strong> ${locationDetails.approval}`;
          break;
        case "processing":
          additionalInfoText.innerHTML = `<strong>Visa Processing Time and Delivery:</strong> ${locationDetails.processing}`;
          break;
        case "approved":
          additionalInfoText.innerHTML = `<strong>Athletes Approved:</strong> ${locationDetails.approved}`;
          break;
        case "denied":
          additionalInfoText.innerHTML = `<strong>Athletes Denied:</strong> ${locationDetails.denied}`;
          break;
        case "questions":
          let questionsHTML = "<strong>Interview Questions</strong><br>";
          locationDetails.questions.forEach((person) => {
            questionsHTML += `<strong>${person.name}</strong><br>`;
            person.questionsAndAnswers.forEach((qna) => {
              questionsHTML += `<em>Q:</em> ${qna.question}<br><em>A:</em> ${qna.answer}<br><br>`;
            });
          });
          additionalInfoText.innerHTML = questionsHTML;
          break;
        default:
          additionalInfoText.innerHTML =
            "<strong>No additional information available.</strong>";
      }

      additionalInfoDiv.style.display = "block"; // show section
    } else {
      additionalInfoText.innerHTML =
        "<strong>No additional information available.</strong>";
      additionalInfoDiv.style.display = "none";
    }
  }

  // Event listeners
  select.addEventListener("change", showLocationInfo);

 document.getElementById("waitingTime").addEventListener("click", () =>
  showMoreInfo("waitingtime")
);
document.getElementById("approvalButton").addEventListener("click", () =>
  showMoreInfo("approval")
);
document.getElementById("processingButton").addEventListener("click", () =>
  showMoreInfo("processing")
);
document.getElementById("approvedButton").addEventListener("click", () =>
  showMoreInfo("approved")
);
document.getElementById("deniedButton").addEventListener("click", () =>
  showMoreInfo("denied")
);
document.getElementById("questionsButton").addEventListener("click", () =>
  showMoreInfo("questions")
);

});
