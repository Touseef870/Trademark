let currentStep = 1;

function nextStep(step) {
    const currentFormStep = document.getElementById(`step-${currentStep}`);
    const nextFormStep = document.getElementById(`step-${step}`);

    // Check if the current step's inputs are valid
    if (!validateCurrentStep(currentStep)) {
        const inputs = document.querySelectorAll(`#step-${step} input[required]`);
        if (!Array.from(inputs).every(input => input.value.trim() !== "")) {
            // Show the modal if validation fails
            const modal = new bootstrap.Modal(document.getElementById('requiredFieldsModal'));
            modal.show();
            return false;
        }
        return true;
    }

    currentFormStep.classList.remove('active');
    nextFormStep.classList.add('active');
    currentStep = step;

    // Update the review content on step change
    if (currentStep === 6) {
        updateReviewContent();
    }
}

function validateCurrentStep(step) {
    const inputs = document.querySelectorAll(`#step-${step} input[required], #step-${step} textarea[required]`);
    return Array.from(inputs).every(input => input.value.trim() !== "");
}

function updateReviewContent() {
    const reviewContent = document.getElementById("reviewContent");
    reviewContent.innerHTML = `
                <h4>Your Information:</h4>
                <p><strong>Mark Name:</strong> ${document.getElementById("markName").value}</p>
                <p><strong>Ownership Type:</strong> ${document.querySelector('input[name="ownershipType"]:checked').value}</p>
                <p><strong>First Name:</strong> ${document.getElementById("firstName").value}</p>
                <p><strong>Last Name:</strong> ${document.getElementById("lastName").value}</p>
                <p><strong>Country:</strong> ${document.getElementById("country").value}</p>
                <p><strong>Address:</strong> ${document.getElementById("address").value}</p>
                <p><strong>City:</strong> ${document.getElementById("city").value}</p>
                <p><strong>State:</strong> ${document.getElementById("state").value}</p>
                <p><strong>Zip:</strong> ${document.getElementById("zip").value}</p>
                <p><strong>Phone:</strong> ${document.getElementById("phone").value}</p>
                <p><strong>Email:</strong> ${document.getElementById("email").value}</p>
                <p><strong>Description:</strong> ${document.getElementById("description").value}</p>
                <p><strong>Search Type:</strong> ${document.querySelector('input[name="searchType"]:checked').value}</p>
                <p><strong>Package:</strong> ${document.querySelector('input[name="package"]:checked').value}</p>
            `;
}

function submitForm() {
    const formData = {
        markName: document.getElementById("markName").value,
        ownershipType: document.querySelector('input[name="ownershipType"]:checked').value,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        country: document.getElementById("country").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        zip: document.getElementById("zip").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        description: document.getElementById("description").value,
        searchType: document.querySelector('input[name="searchType"]:checked').value,
        package: document.querySelector('input[name="package"]:checked').value
    };

    // Send the email using Email.js
    emailjs.send("service_dmhl49c", "template_glih28d", formData)
        .then(function (response) {
            console.log("SUCCESS!", response.status, response.text);
            alert("Your application has been submitted and emailed!");
        }, function (error) {
            console.log("FAILED...", error);
            alert("There was an issue submitting your application. Please try again later.");
        });
}
