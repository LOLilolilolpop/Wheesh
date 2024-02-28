const sentences = [
  "This is the first sentence.",
  "This is the second sentence.",
  "Press any key to continue...",
  "hi i am handsome"
];
const topTextContainer = document.getElementById("typewriter-text-top");
const middleTextContainer = document.getElementById("typewriter-text-middle");
const bottomTextContainer = document.getElementById("typewriter-text-bottom");

let currentOutputIndex = 0;

function typeSentence(sentence, targetContainer) {
  let currentIndex = 0;
  const interval = setInterval(function() {
    if (currentIndex < sentence.length) {
      targetContainer.innerHTML += sentence.charAt(currentIndex);
      currentIndex++;
    } else {
      clearInterval(interval);
      if (sentence === "Press any key to continue...") {
        // Add the cursor after the "Press any key to continue..." text is fully typed
        targetContainer.innerHTML += '<span class="cursor"></span>';
        document.addEventListener("keydown", handleKeyDown); // Listen for key press after "Press any key to continue..." is typed
      }
    }
  }, 100); // Adjust typing speed here
}

function handleKeyDown(event) {
  topTextContainer.innerHTML = ""; // Clear content of top text container
  middleTextContainer.innerHTML = ""; // Clear content of middle text container
  bottomTextContainer.innerHTML = ""; // Clear content of bottom text container
  // Remove event listener
  document.removeEventListener("keydown", handleKeyDown);
  // Increment the current output index
  currentOutputIndex++;
  // If there's another output to type, proceed to typing it
  if (currentOutputIndex < sentences.length) {
    typeSentence(sentences[currentOutputIndex], bottomTextContainer);
  }
}

function type() {
  // Start typing the first sentence
  typeSentence(sentences[0], topTextContainer);
  // After typing the first sentence, proceed to typing the second sentence
  setTimeout(function() {
    typeSentence(sentences[1], middleTextContainer);
  }, sentences[0].length * 100 + 2000);
  // After typing the second sentence, proceed to typing "Press any key to continue..."
  setTimeout(function() {
    typeSentence(sentences[2], bottomTextContainer);
  }, (sentences[0].length + sentences[1].length) * 100 + 2000);
}

type();
