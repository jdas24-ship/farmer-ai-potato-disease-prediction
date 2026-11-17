
const imageInput = document.getElementById("imageInput");
const dropArea = document.getElementById("dropArea");
const previewContainer = document.getElementById("previewContainer");
const previewImage = document.getElementById("previewImage");
const removeBtn = document.getElementById("removeBtn");
const predictBtn = document.getElementById("predictBtn");
const resultBox = document.getElementById("resultBox");
const statusMessage = document.getElementById("statusMessage");

let selectedFile = null;

// Image upload
imageInput.addEventListener("change", function () {
    if (this.files.length > 0) {
        handleImage(this.files[0]);
    }
});

// Handle image
function handleImage(file) {

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {
        alert("Please upload JPG, PNG or WEBP image.");
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5 MB.");
        return;
    }

    selectedFile = file;

    const reader = new FileReader();

    reader.onload = function (event) {
        previewImage.src = event.target.result;
        previewContainer.style.display = "block";
        predictBtn.disabled = false;

        statusMessage.textContent = "Image uploaded successfully!";
        statusMessage.style.color = "green";
    };

    reader.readAsDataURL(file);
}

// Drag and Drop
dropArea.addEventListener("dragover", function (event) {
    event.preventDefault();
    dropArea.classList.add("dragging");
});

dropArea.addEventListener("dragleave", function () {
    dropArea.classList.remove("dragging");
});

dropArea.addEventListener("drop", function (event) {
    event.preventDefault();
    dropArea.classList.remove("dragging");

    const file = event.dataTransfer.files[0];

    if (file) {
        handleImage(file);
    }
});

// Remove Image
removeBtn.addEventListener("click", function () {

    selectedFile = null;
    imageInput.value = "";

    previewImage.src = "";
    previewContainer.style.display = "none";

    predictBtn.disabled = true;

    statusMessage.textContent = "Image removed.";

    resultBox.innerHTML = `
        <div class="result-icon">🌱</div>
        <h2>Ready for Prediction</h2>
        <p>Upload a potato leaf image to get started.</p>
    `;
});

// Predict Disease
predictBtn.addEventListener("click", async function () {

    if (!selectedFile) {
        alert("Please upload an image first!");
        return;
    }

    predictBtn.disabled = true;
    predictBtn.textContent = "Analyzing Image...";

    statusMessage.textContent = "Connecting to prediction server...";

    try {

        // FastAPI backend connection
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await fetch(
            "http://127.0.0.1:8000/predict",
            {
                method: "POST",
                body: formData
            }
        );

        if (!response.ok) {
            throw new Error("Prediction server error: " + response.status);
        }

        const data = await response.json();

        
// Display actual model prediction
resultBox.innerHTML = `
    <div class="result-icon">🌿</div>
    <h2>${data.class}</h2>
    <p>Prediction completed successfully!</p>

    <div class="result-details">
        <p><strong>Disease:</strong> ${data.class}</p>
        <p><strong>Confidence:</strong> ${Number(data.confidence).toFixed(2)}%</p>
    </div>`
    ;
        statusMessage.textContent = "Prediction completed!";

    } catch (error) {

        console.error(error);

        statusMessage.textContent =
            "Backend not connected. Please start your FastAPI server.";

        statusMessage.style.color = "red";

    } finally {

        predictBtn.disabled = false;
        predictBtn.textContent = "🔍 Predict Disease";

    }
});
