const sentences = [
    "> Hi, welcome to Wheesh.",
    "> This website allows you to send messages anonymously to your loved ones, friends, or even strangers at a set time.",
    "> Press any key to continue..."
];
const topTextContainer = document.getElementById("typewriter-text-top");
const middleTextContainer = document.getElementById("typewriter-text-middle");
const bottomTextContainer = document.getElementById("typewriter-text-bottom");
  
function typeSentence(sentence, targetContainer) {
    let currentIndex = 0;
    const interval = setInterval(function() {
        if (currentIndex < sentence.length) {
            targetContainer.innerHTML += sentence.charAt(currentIndex);
            currentIndex++;
        }
        else {
            clearInterval(interval);
            if (sentence === "> Press any key to continue...") {
                // Add the cursor after the "Press any key to continue" text is fully typed
                targetContainer.innerHTML += '<span class="cursor"></span>';
            }
        }
    }, 50); // Adjust typing speed here
}
  
function handleKeyDown(event) {
    topTextContainer.innerHTML = ""; // Clear content of top text container
    middleTextContainer.innerHTML = ""; // Clear content of middle text container
    bottomTextContainer.innerHTML = ""; // Clear content of bottom text container
    document.removeEventListener("keydown", handleKeyDown); // Remove event listener
    
    const script = document.createElement("script");
    script.src = "secondpage.js";
    document.head.appendChild(script);
}
  
function type() {
    typeSentence(sentences[0], topTextContainer);
    setTimeout(function() {
      typeSentence(sentences[1], middleTextContainer);
    }, sentences[0].length * 50 + 250); // Wait for 0.5 seconds after typing the first sentence
    setTimeout(function() {
      typeSentence(sentences[2], bottomTextContainer);
    }, (sentences[0].length + sentences[1].length) * 50 + 500); // Wait for 0.5 seconds after typing the second sentence
    setTimeout(function() {
      document.addEventListener("keydown", handleKeyDown); // Listen for key press after "Press any key to continue" is typed
    }, (sentences[0].length + sentences[1].length + sentences[2].length) * 50 + 1000); // Wait for 1 seconds after typing the "Press any key to continue" sentence
}

type();