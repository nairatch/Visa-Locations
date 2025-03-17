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
    let startdate = document.querySelector('input[name="startdate"]:checked')?.value;

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

  const locationData = {
    "Austria/Vienna": "Info will be added.",
    "Bahrain/Manama": "Info will be added.",
    "Belgium/Brussels":
      "Good experience with 3x approvals. All athletes were first-timers, interviews were easy but the trip expensive, Uber can be used.",
    "Bosnia & Herzegovina/Sarajevo": "Info will be added.",
    "Croatia/Zagreb":
      "Approval rate is 50/50 with one denial and one approval. Questions were of medium difficulty. The travel to Zagreb was okay but not reliable, more experience is needed therefore.",
    "Cyprus/Nicosia": "Info will be added.",
    "Czech Republic/Prague":
      "Good experience but caution is needed with this location. 4 athletes were approved there. They were of mixed types: first timers, with previous denials, or older ones. Interviews were moderate. The first appointment was fine, then it was followed by a denial with Caren; Afterwards there was an administrative processing for Silas&Cosmas, which was ended with an approval within hours.",
    "Denmark/Copenhagen": "Info will be added.",
    "Estonia/Tallinn":
      "Like Vilnius there is no chance for approval, it apparently depends on an interviewer because questions were also difficult. 2 out of 2 were denied, Brenda and Nelly, who had also been denied in Vilnius 2 days before. They got a letter that both countries belong to the same booking system, this turned out to be the reason for this second denial. No further attempts were done in this location.",
    "Eswatini/Mbabane":
      "This location is actually burnt for us! It went good for a while, then messed up. The lady in Eswatini doesn't like to approve of people that were out of school for too long. So, an athlete must have a recent KCSE to go there.",
    "Finland/Helsinki": "Info will be added.",
    "France/Paris": "Info will be added.",
    "Germany/Berlin": "Info will be added.",
    "Germany/Munich": "Info will be added.",
    "Germany/Frankfurt": "Info will be added.",
    "Greece/Athens": "Info will be added.",
    "Hungary/Budapest": "Info will be added.",
    "Iceland/Reykjavik": "Info will be added.",
    "India/Chennai": "Info will be added.",
    "India/New Delhi": "Info will be added.",
    "India/Kolkata": "Info will be added.",
    "India/Mumbai": "Info will be added.",
    "India/Hyderabad": "Info will be added.",
    "Italy/Rome": "Info will be added.",
    "Italy/Milan": "Info will be added.",
    "Japan/Tokyo":
      "Dezmond Chepkosir, a Keynan athlete was approves in 2024. The interview questions were easy. It was actually an exception to apply in this location because the athlete was already in Japan.",
    "Latvia/Riga": "Info will be added.",
    "Liberia/Monrovia": "Info will be added.",
    "Lithuania/Vilnius":
      "No chance for approval, it apparently depends on an interviewer because questions were also difficult. 2 out of 2 were denied but those 2 were Brenda and Nelly, who also had previous denials. No further attempts were done in this location.",
    "Luxembourg/Luxembourg": "Info will be added.",
    "Madagascar/Antananarivo": "Info will be added.",
    "Mauritius/Port Louis":
      "It depends on interviewer. No consistent luck with this location but it can still be evaluated. It's very important that no more that one person should go there next time. In 2024 we sent 4 athletes on the same day there and all of them were denied on. No Uber or Bolt is available. Shuttle must be booked upfront or athletes need enough money to pay local for transportation.",
    "Nigeria/Lagos": "Info will be added.",
    "Nigeria/Abuja": "Info will be added.",
    "Norway/Oslo":
      "2 approvals in Oslo and both were first-try, they had no previous denials. Interviews were easy, the processing time quick (1 day) but the trip expensive.",
    "Poland/Warsaw":
      "No good location for athletes. Interview questions were easy but with no approval, 2 out 2 were denied. There is no chance for an approval because it apparently depends on a visa interviewer unlike Krakow.",
    "Poland/Krakow":
      "A top visa location in Europe! Athletes get approved even after multiple denials. So, it's a good backup option for those who get denied in Europe. We have to be careful with the location though, not many athletes should be sent there. Only those who have no chance elsewhere in Europe or those who are really really important. The trip to Poland is cheap and the hostel has a good locaiton as well.",
    "Portugal/Lisbon":
      "A very positive experience with this location! Interviews were easy and approvals quick. It seems to work well for older athletes with older KCSEs, with tough cases and multiple denials previously. Besides, the trip to Lisbon is not expensive.",
    "Romania/Bucharest": "Info will be added.",
    "Senegal/Dakar": "Info will be added.",
    "Serbia/Belgrade": "Info will be added.",
    "Slovakia/Bratislava":
      "Approval rate is 50/50 and the interiews difficult (Caren denied and Dismus approved). Besides, there are no good flights to Bratislava, one must fly to Vienna and then travel to Bratislava by train.",
    "South Africa/Cape Town":
      "This is the best visa location so far in Africa. It can work as a backup option for all. The consular officer is a nice interviewer, no one was denied, even athletes with multiple previous denials, older or young, with old KCSE or not. Tough cases were resovled and approved in Cape Town. P.S. There is no hostel close to the embassy, Uber is needed.",
    "South Africa/Durban": "Info will be added.",
    "South Africa/Johannesburg":
      "This location seems to depend on an interviewer, we avoid Johannesburg for Kenyans, they ideally should go to Cape Town. For other nationalities Johannesburg might be an option though.",
    "Sri Lanka/Colombo": "Info will be added.",
    "Sweden/Stockholm":
      "Good experience with the location, the trip was expensive though. There was one athlete with a first try and got approved. The interview was easy.",
    "Switzerland/Bern":
      "50/50. It worked well with the first 2 athletes but the following 2 were denied. None of the athletes had previous denials, the interviews were moderate, not easy but not difficult either. It is generally a good location but caution is needed not to burn it out. Besides, the trip was complicated and expensive (flight to Zurich, train to Bern , etc). Note also that during the most recent trip (Elsingi, Cynthia) the border control called Christian to check regarding entry status/race competitions.",
    "The Netherlands/Amsterdam": "Info will be added.",
    "Togo/Lome": "Info will be added",
    "Zambia/Lusaka":
      "So far we have had no experience there. It has been used by many other Kenyans. There are 2 consulars, one of which approves and another denies. Apparently a matter of luck.",
    "Zimbabwe/Harare": "Info will be added.",
  };

  const additionalInfoData = {
    "South Africa/Cape Town": {
      waitingtime: "30 days (18.02.2025)",
      approval: "100%",
      processing: "1 week (3-4 business days for processing + delivery)",
      approved:
        "Nelly Jemeli, Brenda Kibor, Mercy Lomuria, Millicent Kemboi, Viola Jepleting, Naomi Jepleting, Faith Kipmaiyo, Caren Kiplagat",
      denied: "No one denied",
      questions: [
        {
          name: "Viola",
          questionsAndAnswers: [
            {
              question: "Why do you want to go to America?",
              answer:
                "I want to go to America to study, and I have been offered a full scholarship which will cover all my study-related costs.",
            },
            {
              question: "How did you get to know about the school?",
              answer:
                "I got to know about the school due to my outstanding performance in a time trial, where I ran a good time. The school offered me a full scholarship.",
            },
            {
              question: "Do you live in Mauritius?",
              answer:
                "No, I am here for my visa interview because there is no valid visa date in my home country, Kenya.",
            },
            {
              question: "Which school are you going to?",
              answer: "I'm going to Mississippi State University.",
            },
          ],
        },
        {
          name: "Nelly Jemeli",
          questionsAndAnswers: [
            {
              question: "Do you know the coach of the school?",
              answer: "Yes, I know the coach.",
            },
            {
              question: "What are you going to do in America?",
              answer: "I will be studying and training in my field.",
            },
            {
              question: "Do you know the major?",
              answer: "Yes, I will be majoring in Sports Management.",
            },
          ],
        },
      ],
    },
    // Add other locations' additional information here
  };

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
