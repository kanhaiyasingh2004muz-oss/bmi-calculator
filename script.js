function calculateBMI() {
    // Get input values
    let age = document.getElementById("age").value.trim();
    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);
    let gender = document.querySelector('input[name="gender"]:checked')?.value;

    // Validation
    if (!age || !weight || !height || !gender) {
        alert("Please fill all fields and select a gender!");
        return;
    }

    if (age <= 0 || weight <= 0 || height <= 0) {
        alert("Please enter valid positive numbers!");
        return;
    }

    if (height > 3) {
        alert("Height seems too large. Please enter height in meters (e.g., 1.75)");
        return;
    }

    // Calculate BMI
    let bmi = weight / (height * height);

    let status = "";
    let suggestion = "";

    document.getElementById("result").innerHTML =
        "Your BMI is: " + bmi.toFixed(2);

    if (bmi < 18.5) {

        status = "Underweight";

        suggestion =
            "Eat healthy food and increase calorie intake.";

    }

    else if (bmi >= 18.5 && bmi < 25) {

        status = "Normal Weight";

        suggestion =
            "Great! Maintain your healthy lifestyle.";

    }

    else if (bmi >= 25 && bmi < 30) {

        status = "Overweight";

        suggestion =
            "Exercise regularly and avoid junk food.";

    }

    else {

        status = "Obese";

        suggestion =
            "Consult a doctor and follow a healthy diet plan.";

    }

    document.getElementById("status").innerHTML = status;
    document.getElementById("suggestion").innerHTML = suggestion;

    saveHistory(age, weight, height, bmi, status, gender);
}

function saveHistory(age, weight, height, bmi, status, gender) {
    let history = JSON.parse(localStorage.getItem("bmiHistory")) || [];

    history.push({
        date: new Date().toLocaleDateString(),
        age: age,
        gender: gender,
        weight: weight,
        height: height,
        bmi: bmi.toFixed(2),
        status: status
    });

    localStorage.setItem("bmiHistory", JSON.stringify(history));
    showHistory();
}

function clearHistory() {
    if (confirm("Are you sure you want to delete all history?")) {
        localStorage.removeItem("bmiHistory");
        showHistory();
    }
}

function showHistory() {
    let history = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    let historyList = document.getElementById("history");

    historyList.innerHTML = "";

    if (history.length === 0) {
        historyList.innerHTML = "<li>No history yet</li>";
        return;
    }

    history.forEach(function (item) {
        let li = document.createElement("li");
        li.innerHTML = `${item.date} | Age: ${item.age} | ${item.gender} | Weight: ${item.weight}kg | Height: ${item.height}m | BMI: ${item.bmi} (${item.status})`;
        historyList.appendChild(li);
    });
}

// Load history when page loads
document.addEventListener("DOMContentLoaded", showHistory);