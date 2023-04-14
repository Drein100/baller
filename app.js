const ballers = [];

fetch('ballers.json')
  .then(response => response.json())
  .then(data => {
    // Get a random footballer
    ballers.push(...data.ballers);
    const randomIndex = Math.floor(Math.random() * ballers.length);
    let randomFootballer = ballers[randomIndex];

    let playerAge = document.getElementById("playerAge");
    let playerNat = document.getElementById("playerNat");
    let playerPos = document.getElementById("playerPos");
    let playerTeam = document.getElementById("playerTeam");
    let playerLeague = document.getElementById("playerLeague");
    let difficultyButtons = document.getElementById("difficultyButtons");
    let difficultyText = document.getElementById("difficultyText");
    let guessPart = document.getElementById("guessPart");

    let numTries = 0;

    const infoBtn = document.getElementById("infoBtn");
    const info = document.getElementById("info");
    const closeBtn = document.getElementById("btn")
    infoBtn.addEventListener("click", () => {
      info.classList.remove("hidden");
      closeBtn.addEventListener("click", () => {
        info.classList.add("hidden");
      })
    });
    
    window.addEventListener("click", (event) => {
      if (event.target === info) {
        info.classList.add("hidden");
      }
    });



    var currentMode = "";
    // EASY MODE
    const easyButton = document.getElementById("easyButton");
    easyButton.addEventListener("click", function() {
        currentMode = "easy";
        guessPart.classList.remove("hidden");
        guessPart.classList.add("flex");
        difficultyButtons.classList.add("hidden");
        difficultyText.classList.add("hidden");
        playerNat.innerHTML = "Nationality: <span class='infos'>" + `${randomFootballer.nationality}` + "</span>";
        playerPos.innerHTML = "Position: <span class='infos'>" + `${randomFootballer.position}` + "</span>";
        playerLeague.innerHTML = "League: <span class='infos'>" + `${randomFootballer.league}` + "</span>";
    })
    // MEDIUM MODE
    const mediumButton = document.getElementById("mediumButton");
    mediumButton.addEventListener("click", function() {
        currentMode = "medium";
        guessPart.classList.remove("hidden");
        guessPart.classList.add("flex");
        difficultyButtons.classList.add("hidden");
        difficultyText.classList.add("hidden");
        playerNat.innerHTML = "Nationality: <span class='infos'>" + `${randomFootballer.nationality}` + "</span>";
        playerLeague.innerHTML = "League: <span class='infos'>" + `${randomFootballer.league}` + "</span>";
    })
    // HARD MODE
    const hardButton = document.getElementById("hardButton");
    hardButton.addEventListener("click", function() {
        currentMode = "hard";
        guessPart.classList.remove("hidden");
        guessPart.classList.add("flex");
        difficultyButtons.classList.add("hidden");
        difficultyText.classList.add("hidden");
        playerLeague.innerHTML = "League: <span class='infos'>" + `${randomFootballer.league}` + "</span>";
    })

    const inputText = document.getElementById("inputText");
    const submitButton = document.getElementById("submitButton");

    // Get popup 1
    const popup = document.getElementById("popup");
    const popupTitle = document.querySelector(".popup__title");
    const popupMessage = document.querySelector(".popup__message");
    const popupButton = document.querySelector(".popup__button");

    // Get popup 2
    const popup2 = document.getElementById("popup-2");
    const popupButton2 = document.querySelector(".popup__button-2");

    submitButton.addEventListener("click", function() {
        numTries++;
    //   Check Input
    if (!/^[a-zA-Z ]+$/.test(inputText.value.trim())) {
        popup2.classList.remove("hidden");
        inputText.value = "";
        popupButton2.addEventListener("click", () => {
            popup2.classList.add("hidden");
        });
        return;
      };
      if (currentMode == "easy") {
        if (numTries == 3) {
            playerAge.innerHTML = "Age: <span class='infos'>" + `${randomFootballer.age}` + "</span>";
        } else if (numTries == 6) {
            playerTeam.innerHTML = "Team: <span class='infos'>" + `${randomFootballer.team}` + "</span>";
        }
      };
      if (currentMode == "medium") {
        if (numTries == 3) {
            playerPos.innerHTML = "Position: <span class='infos'>" + `${randomFootballer.position}` + "</span>";
        } else if (numTries == 6) {
            playerAge.innerHTML = "Age: <span class='infos'>" + `${randomFootballer.age}` + "</span>";
        }
      };
      if (currentMode == "hard") {
        if (numTries == 3) {
            playerNat.innerHTML = "Nationality: <span class='infos'>" + `${randomFootballer.nationality}` + "</span>";
        } else if (numTries == 6) {
            playerPos.innerHTML = "Position: <span class='infos'>" + `${randomFootballer.position}` + "</span>";
        }
      };
    //   End Game
      if (inputText.value.trim().toLowerCase() === randomFootballer.name.toLowerCase()) {
        popupTitle.innerText = "Congratulations!";
        popupMessage.innerText = `You guessed the number in ${numTries} tries!`;
        popup.classList.remove("hidden");
        popupButton.addEventListener("click", () => {
            resetGame();
        });
        return;
      } else if (numTries === 8) {
        popupTitle.innerText = "Sorry!";
        popupMessage.innerText = `You failed to guess the player in ${numTries} tries. Answer was ${randomFootballer.name}.`;
        popup.classList.remove("hidden");
        popupButton.addEventListener("click", () => {
            resetGame();
        });
    }
    inputText.value = "";
    inputText.focus();
});

function resetGame() {
    // hide popups
    popup.classList.add("hidden");
    popup2.classList.add("hidden");

    // hide guessPart
    guessPart.classList.remove("flex");
    guessPart.classList.add("hidden");
    
    // reset numTries
    numTries = 0;

    // reset input
    inputText.value = "";
    inputText.focus();
    
    // generate new random footballer
    const randomIndex = Math.floor(Math.random() * ballers.length);
    randomFootballer = ballers[randomIndex];

    // show difficulty buttons and text
    difficultyButtons.classList.remove("hidden");
    difficultyText.classList.remove("hidden");

    // clear player information
    playerAge.innerText = "Age: ";
    playerNat.innerText = "Nationality: ";
    playerPos.innerText = "Position: ";
    playerTeam.innerText = "Team: ";
    playerLeague.innerText = "League: ";
}

}).catch(error => console.error(error));

