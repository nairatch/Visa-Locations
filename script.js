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
        "Belgium/Brussels": "Info will be added",
        "Bosnia & Herzegovina/Sarajevo": "Info will be added",
        "Croatia/Zagreb": "Info will be added",
        "Cyprus/Nicosia": "Info will be added",
        "Czech Republic/Prague": "Info will be added",
        "Denmark/Copenhagen": "Info will be added",
        "Estonia/Tallinn": "Info will be added",
        "Eswatini/Mbabane": "This location is actually burnt for us! It went good for a while, then messed up. The lady in Eswatini doesn't like to approve of people that were out of school for too long. So, an athlete must have a recent KCSE to go there.",
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
        "Japan/Tokyo": "Info will be added",
        "Latvia/Riga": "Info will be added",
        "Liberia/Monrovia": "Info will be added",
        "Lithuania/Vilnius": "Info will be added",
        "Luxembourg/Luxembourg": "Info will be added",
        "Madagascar/Antananarivo": "Info will be added",
        "Mauritius/Port Louis": "It depends on interviewer. No consistent luck with this location but it can still be evaluated. It's very important that no more that one person should go there next time. In 2024 we sent 4 athletes on the same day there and all of them were denied on. No Uber or Bolt is available. Shuttle must be booked upfront or athletes need enough money to pay local for transportation.",
        "Nigeria/Lagos": "Info will be added",
        "Nigeria/Abuja": "Info will be added",
        "Norway/Oslo": "Info will be added",
        "Poland/Warsaw": "Info will be added",
        "Poland/Krakow": "Info will be added",
        "Portugal/Lisbon": "Info will be added",
        "Romania/Bucharest": "Info will be added",
        "Senegal/Dakar": "Info will be added",
        "Serbia/Belgrade": "Info will be added",
        "South Africa/Cape Town": "Info will be added",
        "South Africa/Durban": "Info will be added",
        "South Africa/Johannesburg": "This location seems to depend on an interviewer, we avoid Johannesburg for Kenyans, they ideally should go to Cape Town. For other nationalities Johannesburg might be an option though.",
        "Sri Lanka/Colombo": "Info will be added",
        "Sweden/Stockholm": "Info will be added",
        "Switzerland/Bern": "Info will be added",
        "The Netherlands/Amsterdam": "Info will be added",
        "Togo/Lome": "Info will be added",
        "Zimbabwe/Harare": "Info will be added"
    };
    
    // Define detailed button information for locations
    const locationDetails = {
        "South Africa/Cape Town": {
            "waitingtime": "30 days (18.02.2025). <br> Please also check the <a href='https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/global-visa-wait-times.html' target='_blank'>Global Visa Wait Times</a> page.",
            "approval": "High",
            "processing": "Usually 3-4 business days - then delivery to pick up station (1-2 additional days).",
            "approved": `Nelly Jemeli, 
                        Brenda Kibor, 
                        Mercy Lomuria, 
                        Millicent Kemboi, 
                        Viola Jepleting, 
                        Naomi Jepleting, 
                        Faith Kipmaiyo, 
                        Caren Kiplagat`,
            "denied": "No one denied."
        }
    };

    visaLocationSelect.addEventListener("change", function () {
        const selectedLocation = visaLocationSelect.value;
    
        // Clear previously displayed information
        const infoBoxes = document.querySelectorAll(".info-box");
        infoBoxes.forEach(box => box.remove());
    
        if (selectedLocation) {
            infoText.textContent = locationMessages[selectedLocation] || "Information for this location will be added soon.";
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
            "waitingtime": "Details will be added. <br> Please also check the <a href='https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/global-visa-wait-times.html' target='_blank'>Global Visa Wait Times</a> page.",
            "approval": "Details will be added.",
            "questions": "Details will be added.",
            "processing": "Details will be added.",
            "approved": "Details will be added.",
            "denied": "Details will be added."
        };

        // Check if the selected location has specific data
        let displayText = moreInfo[infoType] || "More details will be updated soon.";
        if (selectedLocation && locationDetails[selectedLocation] && locationDetails[selectedLocation][infoType]) {
            displayText = locationDetails[selectedLocation][infoType];
        }

        // Check if an info box for this type already exists
        let existingInfoBox = document.querySelector(`.info-box[data-type="${infoType}"]`);
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
        let english = document.querySelector('input[name="english"]:checked')?.value;
        let kcse = document.querySelector('input[name="kcse"]:checked')?.value;
        let eu = document.querySelector('input[name="eu"]:checked')?.value;
        let denial = document.querySelector('input[name="denial"]:checked')?.value;
        let startdate = document.querySelector('input[name="startdate"]:checked')?.value;

        if (english === "yes" && kcse === "yes" && eu === "yes" && denial === "no") {
            suggestionDiv.textContent = "The athlete can go anywhere. The first choice in Europe would be Prague, Lisbon, or Brussels. Oslo and Stockholm would work as well, even though a bit more expensive for travelling. Bern is also expensive. Bratislava or Zagreb could work as well.";
        } else {
            suggestionDiv.textContent = "Will be updated.";
        }

        suggestionDiv.classList.remove("hidden");
    };
});
