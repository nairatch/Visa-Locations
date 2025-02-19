document.addEventListener("DOMContentLoaded", function () {
  const visaLocationSelect = document.getElementById("visaLocation");
  const locationInfoDiv = document.getElementById("locationInfo");
  const infoText = document.getElementById("infoText");
  const additionalInfoDiv = document.getElementById("additionalInfo");
  const questionnaireDiv = document.getElementById("questionnaire");
  const suggestionDiv = document.getElementById("suggestion");

  // Define location messages
  const locationMessages = {
    "Austria/Vienna": "Info will be added",
    "Bahrain/Manama": "Info will be added",
    "Belgium/Brussels":
      "Good experience with 3x approvals. All athletes were first-timers, interviews were easy but the trip expensive, Uber can be used.",
    "Bosnia & Herzegovina/Sarajevo": "Info will be added",
    "Croatia/Zagreb":
      "Approval rate is 50/50 with one denial and one approval. Questions were of medium difficulty. The travel to Zagreb was okay but not reliable, more experience is needed therefore.",
    "Cyprus/Nicosia": "Info will be added",
    "Czech Republic/Prague":
      "Good experience but caution is needed with this location. 4 athletes were approved there. They were of mixed types: first timers, with previous denials, or older ones. Interviews were moderate. The first appointment was fine, then it was followed by a denial with Caren; Afterwards there was an administrative processing for Silas&Cosmas, which was ended with an approval within hours.",
    "Denmark/Copenhagen": "Info will be added",
    "Estonia/Tallinn":
      "Like Vilnius there is no chance for approval, it apparently depends on an interviewer because questions were also difficult. 2 out of 2 were denied, Brenda and Nelly, who had also been denied in Vilnius 2 days before. They got a letter that both countries belong to the same booking system, this turned out to be the reason for this second denial. No further attempts were done in this location.",
    "Eswatini/Mbabane":
      "This location is actually burnt for us! It went good for a while, then messed up. The lady in Eswatini doesn't like to approve of people that were out of school for too long. So, an athlete must have a recent KCSE to go there.",
    "Finland/Helsinki": "Info will be added",
    "France/Paris": "Info will be added",
    "Germany/Berlin": "Info will be added",
    "Germany/Munich": "Info will be added",
    "Germany/Frankfurt": "Info will be added",
    "Greece/Athens": "Info will be added",
    "Hungary/Budapest": "Info will be added",
    "Iceland/Reykjavik": "Info will be added",
    "India/Chennai": "Info will be added",
    "India/New Delhi": "Info will be added",
    "India/Kolkata": "Info will be added",
    "India/Mumbai": "Info will be added",
    "India/Hyderabad": "Info will be added",
    "Italy/Rome": "Info will be added",
    "Italy/Milan": "Info will be added",
    "Japan/Tokyo":
      "Dezmond Chepkosir, a Keynan athlete was approves in 2024. The interview questions were easy. It was actually an exception to apply in this location because the athlete was already in Japan.",
    "Latvia/Riga": "Info will be added",
    "Liberia/Monrovia": "Info will be added",
    "Lithuania/Vilnius":
      "No chance for approval, it apparently depends on an interviewer because questions were also difficult. 2 out of 2 were denied but those 2 were Brenda and Nelly, who also had previous denials. No further attempts were done in this location.",
    "Luxembourg/Luxembourg": "Info will be added",
    "Madagascar/Antananarivo": "Info will be added",
    "Mauritius/Port Louis":
      "It depends on interviewer. No consistent luck with this location but it can still be evaluated. It's very important that no more that one person should go there next time. In 2024 we sent 4 athletes on the same day there and all of them were denied on. No Uber or Bolt is available. Shuttle must be booked upfront or athletes need enough money to pay local for transportation.",
    "Nigeria/Lagos": "Info will be added",
    "Nigeria/Abuja": "Info will be added",
    "Norway/Oslo":
      "2 approvals in Oslo and both were first-try, they had no previous denials. Interviews were easy, the processing time quick (1 day) but the trip expensive.",
    "Poland/Warsaw":
      "No good location for athletes. Interview questions were easy but with no approval, 2 out 2 were denied. There is no chance for an approval because it apparently depends on a visa interviewer unlike Krakow.",
    "Poland/Krakow":
      "A top visa location in Europe! Athletes get approved even after multiple denials. So, it's a good backup option for those who get denied in Europe. We have to be careful with the location though, not many athletes should be sent there. Only those who have no chance elsewhere in Europe or those who are really really important. The trip to Poland is cheap and the hostel has a good locaiton as well.",
    "Portugal/Lisbon":
      "A very positive experience with this location! Interviews were easy and approvals quick. It seems to work well for older athletes with older KCSEs, with tough cases and multiple denials previously. Besides, the trip to Lisbon is not expensive.",
    "Romania/Bucharest": "Info will be added",
    "Senegal/Dakar": "Info will be added",
    "Serbia/Belgrade": "Info will be added",
    "Slovakia/Bratislava":
      "Approval rate is 50/50 and the interiews difficult (Caren denied and Dismus approved). Besides, there are no good flights to Bratislava, one must fly to Vienna and then travel to Bratislava by train.",
    "South Africa/Cape Town":
      "This is the best visa location so far in Africa. It can work as a backup option for all. The consular officer is a nice interviewer, no one was denied, even athletes with multiple previous denials, older or young, with old KCSE or not. Tough cases were resovled and approved in Cape Town. P.S. There is no hostel close to the embassy, Uber is needed.",
    "South Africa/Durban": "Info will be added",
    "South Africa/Johannesburg":
      "This location seems to depend on an interviewer, we avoid Johannesburg for Kenyans, they ideally should go to Cape Town. For other nationalities Johannesburg might be an option though.",
    "Sri Lanka/Colombo": "Info will be added",
    "Sweden/Stockholm":
      "Good experience with the location, the trip was expensive though. There was one athlete with a first try and got approved. The interview was easy.",
    "Switzerland/Bern":
      "50/50. It worked well with the first 2 athletes but the following 2 were denied. None of the athletes had previous denials, the interviews were moderate, not easy but not difficult either. It is generally a good location but caution is needed not to burn it out. Besides, the trip was complicated and expensive (flight to Zurich, train to Bern , etc). Note also that during the most recent trip (Elsingi, Cynthia) the border control called Christian to check regarding entry status/race competitions.",
    "The Netherlands/Amsterdam": "Info will be added",
    "Togo/Lome": "Info will be added",
    "Zambia/Lusaka":
      "So far we have had no experience there. It has been used by many other Kenyans. There are 2 consulars, one of which approves and another denies. Apparently a matter of luck.",
    "Zimbabwe/Harare": "Info will be added",
  };

  // Define detailed button information for locations
  const locationDetails = {
    "South Africa/Cape Town": {
      waitingtime:
        "30 days (18.02.2025). <br> Please also check the <a href='https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/global-visa-wait-times.html' target='_blank'>Global Visa Wait Times</a> page.",
      approval: "High",
      processing:
        "It has relatively long processing time, 1 week in total incl. delivery (3-4 business days for processing + delivery to the pick up station with 1-2 additional days). Once a visa issued, an email with the DHL tracking information arrives and it takes approx. 1-2 days until a passport can be picked up; The pick up location is right next to the airport.",
      approved: `Nelly Jemeli, 
                        Brenda Kibor, 
                        Mercy Lomuria, 
                        Millicent Kemboi, 
                        Viola Jepleting, 
                        Naomi Jepleting, 
                        Faith Kipmaiyo, 
                        Caren Kiplagat`,
      denied: "No one denied.",
      questions:
        "<b>Viola</b> <br> 1) Why do you want to go to America?<br>Answer: I want to go to America to study, and I have been offered a full scholarship with that am able to cover my all cost in related to my studies.<br>2) How did you get to know about the school?<br>Answer: I get to know about the school due to my outstanding performance in a time trial, whereby I ran a good time the school offered me a full scholarship.<br>3) Do you live in Mauritius?<br>Answer: No I am here for my visa interview because there is no valid date in my home country Kenya.<br>4) Which school are you going?<br>Answer: I'm going to Mississippi state university.<br><br><b>Nelly Jemeli</b><br>1) Do you know the coach of school?<br>2) What are you going to do in America?<br>3) Do you know the major?",
    },
  };

  visaLocationSelect.addEventListener("change", function () {
    const selectedLocation = visaLocationSelect.value;

    // Clear previously displayed information
    const infoBoxes = document.querySelectorAll(".info-box");
    infoBoxes.forEach((box) => box.remove());

    if (selectedLocation) {
      infoText.textContent =
        locationMessages[selectedLocation] ||
        "Information for this location will be added soon.";
      infoText.classList.add("message-box"); // Apply styling class
      locationInfoDiv.classList.remove("hidden");
      locationInfoDiv.dataset.location = selectedLocation;
    } else {
      locationInfoDiv.classList.add("hidden");
    }
  });

  window.showMoreInfo = function (infoType) {
    const selectedLocation = locationInfoDiv.dataset.location;
    let moreInfo = {
      waitingtime:
        "Details will be added. <br> Please also check the <a href='https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/global-visa-wait-times.html' target='_blank'>Global Visa Wait Times</a> page.",
      approval: "Details will be added.",
      questions: "Details will be added.",
      processing: "Details will be added.",
      approved: "Details will be added.",
      denied: "Details will be added.",
    };

    // Check if the selected location has specific data
    let displayText =
      moreInfo[infoType] || "More details will be updated soon.";
    if (
      selectedLocation &&
      locationDetails[selectedLocation] &&
      locationDetails[selectedLocation][infoType]
    ) {
      displayText = locationDetails[selectedLocation][infoType];
    }

    // Check if an info box for this type already exists
    let existingInfoBox = document.querySelector(
      `.info-box[data-type="${infoType}"]`
    );
    if (!existingInfoBox) {
      // Create a new info box if it doesn’t exist
      let infoBox = document.createElement("div");
      infoBox.className = "info-box";
      infoBox.setAttribute("data-type", infoType);

      // Use innerHTML to insert the HTML content (so the link works)
      infoBox.innerHTML = displayText;

      // Insert info box right after the corresponding button
      let button = document.querySelector(`button[data-type="${infoType}"]`);
      if (button) {
        button.insertAdjacentElement("afterend", infoBox);
      }
    }
  };

  // Function to display athlete questions based on age
  window.showQuestions = function (ageGroup) {
    questionnaireDiv.classList.remove("hidden");
  };

  // Function to handle the suggestion logic
  window.suggestLocation = function () {
    let english = document.querySelector(
      'input[name="english"]:checked'
    )?.value;
    let kcse = document.querySelector('input[name="kcse"]:checked')?.value;
    let eu = document.querySelector('input[name="eu"]:checked')?.value;
    let denial = document.querySelector('input[name="denial"]:checked')?.value;
    let startdate = document.querySelector(
      'input[name="startdate"]:checked'
    )?.value;

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

    suggestionDiv.classList.remove("hidden");
  };
});
