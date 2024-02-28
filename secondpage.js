const newsentences = [
    "> Please don't key in the details below.",
];
const topContainer = document.getElementById("typewriter-text-top");

function showSentence(newsentence, targetContainer) {
    let Index = 0;
    const subinterval = setInterval(function() {
        if (Index < newsentence.length) {
            targetContainer.innerHTML += newsentence[Index]; // Use newsentence[Index] to access individual characters
            Index++;
        }
        else {
            clearInterval(subinterval);
            if (newsentence === "> Press any key to continue...") {
                // Add the cursor after the "Press any key to continue" text is fully typed
                targetContainer.innerHTML += '<span class="cursor"></span>';
            }
        }
    }, 50); // Adjust typing speed here
}


function show() {
    showSentence(newsentences[0], topContainer);
    setTimeout(function() {
        showUserCredentialForm();
    }, newsentences[0].length * 50 + 500); // Wait for 0.5 seconds after typing the first sentence
}

function showUserCredentialForm() {
    // Create container for form
    const formContainer = document.createElement("div");
    formContainer.classList.add("container");

    // Create column for form
    const column = document.createElement("div");
    column.classList.add("column");
    // Add inline styles to change font color and background color
    column.style.color = "green"; // Change font color to white
    column.style.fontFamily = "VT323";
    column.style.textShadow = "0px 0px 10px green, 0px 0px 5px green";
    column.style.fontSize= "30px";
    column.style.backgroundColor = "#111111"; // Change background color to blue
    column.style.display = "flex"; // Use flexbox
    column.style.flexDirection = "column"; // Stack items vertically
    column.style.alignItems = "flex-start"; // Align items to the start of the cross axis
    column.innerHTML = `
        <h2 style="color: yellow;">User Credentials</h2> <!-- Change font color of the heading to yellow -->
        <form style="display: flex; flex-direction: column;">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <br>
            <label for="password">Password:&nbsp</label>
            <input type="password" id="password" name="password" required>
            <br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <br>
            <label for="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" required>
            <br>
            <label for="date">Date:</label>
            <input type="date" id="date" name="date" required>
            <br>
            <label for="additionalInfo">Additional Information:</label>
            <textarea id="additionalInfo" name="additionalInfo" rows="4" required></textarea>
            <br>
            <button type="submit">Submit</button>
        </form>
    `;
    formContainer.appendChild(column);

    // Append form container to the body of the document
    document.body.appendChild(formContainer);
}




show();

