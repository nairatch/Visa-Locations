document.addEventListener("DOMContentLoaded", function () {
    const visaLocationSelect = document.getElementById("visaLocation");
    const locationInfoDiv = document.getElementById("locationInfo");
    const infoText = document.getElementById("infoText");
    const additionalInfoDiv = document.getElementById("additionalInfo");
    const questionnaireDiv = document.getElementById("questionnaire");
    const suggestionDiv = document.getElementById("suggestion");

    // Define location messages
    const locationMessages = {
        "Eswatini/Mbabane": "This location is currently burnt for us!",
        "South Africa/Cape Town": "This location is perfect, it could work for any athlete!",
        "South Africa/Johannesburg": "Consider this location carefully, some applications are rejected.",
        "Mauritius/Port Louis": "deatils will be added.",
        "Zambia/Lusaka": "Processing times here are slightly longer than usual.",
        "Zimbabwe/Harare": "Athletes have mixed results here, check requirements.",
        "Nigeria/Lagos": "High rejection rates, proceed with caution.",
        "Turkey/Istanbul": "info will be added",
        "Poland/Warsaw": "info will be added",
        "India/Mumbai": "info will be added",
        "Sri Lanka/Colombo": "info will be added."
    };
// Define detailed button information for locations
const locationDetails = {
    "South Africa/Cape Town": {
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

    if (selectedLocation) {
        infoText.textContent = locationMessages[selectedLocation] || "Information for this location will be added soon.";
        locationInfoDiv.classList.remove("hidden");
        locationInfoDiv.dataset.location = selectedLocation; // Set the data-location attribute
    } else {
        locationInfoDiv.classList.add("hidden");
    }
});


    window.showMoreInfo = function (infoType) {
        const selectedLocation = locationInfoDiv.dataset.location;
        let moreInfo = {
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
            infoBox.textContent = displayText;
    
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

        if (english === "yes" && kcse === "yes" && eu === "yes" && denial === "no") {
            suggestionDiv.textContent = "The athlete can go anywhwere. The first choice in Europe would be Prague, Lisbon, or Brussels. Oslo and Stockholm would work as well, even though a bit more expensive for travelling. Bern is also expensice. Bratislava or Zagreb could work as well.";
        } else {
            suggestionDiv.textContent = "Will be updated.";
        }

        suggestionDiv.classList.remove("hidden");
    };
});
