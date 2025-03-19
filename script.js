import { locationData } from "./locationData.js";
import additionalInfoData from "./additionalInfo.js";

document.addEventListener("DOMContentLoaded", function () {
  const introText = document.getElementById("introText");
  const questionnaireDiv = document.getElementById("questionnaire");
  const recommendButton = document.getElementById("recommendButton");
  const resetButton = document.getElementById("resetButton");
  const warningMessage = document.getElementById("warningMessage");
  const suggestionDiv = document.getElementById("suggestion");

  // Questions list
  const questions = [
    "ageGroup",
    "english",
    "kcse",
    "eu",
    "denial",
    "startdate",
  ];

  let currentQuestionIndex = 0;
  let firstAnswerSelected = false; // Track if the first answer has been selected

  // Function to show the next question
  function showNextQuestion(index) {
    if (index < questions.length) {
      document.getElementById(questions[index] + "Div").style.display = "block";
    }
  }

  // Function to reset the questionnaire
  function resetQuestionnaire() {
    // Hide all questions
    questions.forEach((q) => {
      document.getElementById(q + "Div").style.display = "none";
    });

    // Reset all radio inputs
    document.querySelectorAll("input[type='radio']").forEach((input) => {
      input.checked = false;
    });

    // Hide results and warning message
    suggestionDiv.style.display = "none";
    warningMessage.style.display = "none";

    // Reset tracking index
    currentQuestionIndex = 0;
    firstAnswerSelected = false; // Reset first answer flag

    // Hide reset button
    resetButton.style.display = "none";

    // Show only the intro text and buttons
    introText.style.display = "block";
    questionnaireDiv.style.display = "none";
  }

  // Function to check if all questions are answered
  function validateForm() {
    let allAnswered = questions.every(
      (q) => document.querySelector(`input[name="${q}"]:checked`) !== null
    );

    // If all questions are answered, hide the warning
    if (allAnswered) {
      warningMessage.style.display = "none";
    }
  }

  // Function to check answers and show suggestions
  function checkAnswers() {
    let values = {};
    questions.forEach((q) => {
      let selected = document.querySelector(`input[name="${q}"]:checked`);
      values[q] = selected ? selected.value : null;
    });

    // Show warning if not all questions are answered
    if (Object.values(values).includes(null)) {
      warningMessage.style.display = "block";
      suggestionDiv.style.display = "none"; // Hide suggestions if form is incomplete
    } else {
      warningMessage.style.display = "none"; // Hide warning if all questions are answered
      suggestLocation(); // Call suggestion function
    }
  }

  // Function to handle the suggestion logic
  function suggestLocation() {
    let english = document.querySelector(
      'input[name="english"]:checked'
    )?.value;
    let kcse = document.querySelector('input[name="kcse"]:checked')?.value;
    let eu = document.querySelector('input[name="eu"]:checked')?.value;
    let denial = document.querySelector('input[name="denial"]:checked')?.value;
    let startdate = document.querySelector(
      'input[name="startdate"]:checked'
    )?.value;

    // Ensure the div remains hidden unless a suggestion is made
    if (english && kcse && eu && denial && startdate) {
      if (
        english === "yes" &&
        kcse === "yes" &&
        eu === "yes" &&
        denial === "no"
      ) {
        suggestionDiv.textContent =
          "The athlete can go anywhere. The first choice in Europe would be Prague, Lisbon, or Brussels. Oslo and Stockholm would work as well, even though a bit more expensive for travelling. Bern is also expensive. Bratislava or Zagreb could work as well.";
      } else {
        suggestionDiv.textContent = "Will be updated.";
      }

      // Make suggestion div visible only when there's content
      suggestionDiv.style.display = "block";
    } else {
      // Hide the div completely if fields are missing
      suggestionDiv.style.display = "none";
    }
  }

  // Show questionnaire and first question when "Start a Questionnaire" is clicked
  introText.addEventListener("click", function () {
    questionnaireDiv.style.display = "block"; // Show questionnaire
    document.getElementById("ageGroupDiv").style.display = "block"; // Show first question
    resetButton.style.display = "block"; // Show Reset button immediately
  });

  // Handle answer selection to move to the next question
  questions.forEach((q, index) => {
    document.querySelectorAll(`input[name="${q}"]`).forEach((input) => {
      input.addEventListener("change", function () {
        // Hide the suggestion when a new answer is selected
        suggestionDiv.style.display = "none";
        warningMessage.style.display = "none";

        // Show only the next question (no skipping)
        if (index + 1 < questions.length) {
          currentQuestionIndex = index + 1;
          showNextQuestion(currentQuestionIndex);
        }

        // Show reset button after the first answer is selected
        if (!firstAnswerSelected) {
          firstAnswerSelected = true;
          resetButton.style.display = "block";
        }

        // Validate the form after selection
        validateForm();
      });
    });
  });

  // Handle recommend button click
  recommendButton.addEventListener("click", function () {
    checkAnswers(); // Check answers when the button is clicked
  });

  // Handle reset button click
  resetButton.addEventListener("click", function () {
    resetQuestionnaire(); // Reset the questionnaire when the button is clicked
  });

  // Initialize the form in a reset state
  resetQuestionnaire();

  // Location info section
  const select = document.getElementById("visaLocation");
  const locationInfoDiv = document.getElementById("locationInfo");
  const infoText = document.getElementById("infoText");
  const additionalInfoDiv = document.getElementById("additionalInfo");
  const additionalInfoText = document.getElementById("additionalInfoText");

  function showLocationInfo() {
    const selectedLocation = select.value;

    if (selectedLocation) {
      infoText.innerHTML =
        locationData[selectedLocation] || "No location info available.";
      locationInfoDiv.style.display = "block";
      additionalInfoDiv.style.display = "none"; // Hide additional info initially
    } else {
      locationInfoDiv.style.display = "none";
    }
  }

  function showMoreInfo(infoType) {
    const selectedLocation = select.value;

    if (selectedLocation && additionalInfoData[selectedLocation]) {
      const locationDetails = additionalInfoData[selectedLocation];

      // Show specific information based on button clicked
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
          // Loop through the questions and answers to format them properly
          let questionsHTML = "<strong>Interview Questions:</strong><br>";

          locationDetails.questions.forEach((person) => {
            questionsHTML += `<strong>${person.name}:</strong><br>`;

            person.questionsAndAnswers.forEach((qna) => {
              // Now accessing the question and answer properties
              questionsHTML += `<em>Q:</em> ${qna.question}<br><em>A:</em> ${qna.answer}<br><br>`;
            });
          });

          // Set the innerHTML with the formatted questions and answers
          additionalInfoText.innerHTML = questionsHTML;
          break;
        default:
          additionalInfoText.innerHTML =
            "<strong>No additional information available.</strong>";
          break;
      }

      additionalInfoDiv.style.display = "block"; // Show the additional info section
    } else {
      additionalInfoText.innerHTML =
        "<strong>No additional information available.</strong>";
      additionalInfoDiv.style.display = "none";
    }
  }

  // Add event listeners for location change
  select.addEventListener("change", showLocationInfo);

  // Add event listeners for the buttons to show more info
  const waitingTimeButton = document.getElementById("waitingTimeButton");
  const approvalButton = document.getElementById("approvalButton");
  const processingButton = document.getElementById("processingButton");
  const approvedButton = document.getElementById("approvedButton");
  const deniedButton = document.getElementById("deniedButton");
  const questionsButton = document.getElementById("questionsButton");

  waitingTime.addEventListener("click", function () {
    showMoreInfo("waitingtime");
  });
  approvalButton.addEventListener("click", function () {
    showMoreInfo("approval");
  });
  processingButton.addEventListener("click", function () {
    showMoreInfo("processing");
  });
  approvedButton.addEventListener("click", function () {
    showMoreInfo("approved");
  });
  deniedButton.addEventListener("click", function () {
    showMoreInfo("denied");
  });
  questionsButton.addEventListener("click", function () {
    showMoreInfo("questions");
  });
});
