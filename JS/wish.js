
document.addEventListener("DOMContentLoaded", () => {
    
    createSquares();
    let word = ['h','a','p','p','y','b','u','d','d','a','e','r','i','s','h','i','l','o','u','j','u','u','!','!'];
    let guessedWords = ['h','a','p','p','y',' ','b','u','d','d','a','e','r','i','s','h',' ',' ','i',' ',' ',' ',' ',' ','l','o','u',' ',' ',' ','j','u','u','!','!','!'];
    let numberOfTile = 1;
    const keys = document.querySelectorAll(".keyboard-row button");
    updateLetters();
    function createSquares() {
        const gameBoard = document.getElementById("board");
        for (let index = 0; index < 36; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }
    }

    function getTileColor(letter) {
        const isCorrectLetter = word.includes(letter);

        if(!isCorrectLetter){
            return "rgb(58,58,60)";
        }
        else{
            return "rgb(83,141,78)";
        }
    }

    function updateLetters(){
        const numberEl = document.getElementById(numberOfTile);
        for (let i = 0; i < 36; i++) {
            const numberEl = document.getElementById(numberOfTile);
            numberEl.textContent = guessedWords[i];
            numberOfTile++;
        }
        animateLetters();
    }

    function animateLetters(){
        const interval = 150;
        guessedWords.forEach((letter, index) => {
            setTimeout(()=> {
                const tileColor = getTileColor(letter);
                const numberEl = document.getElementById(index+1);
                numberEl.classList.add("animate__flipInX");
                numberEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index);
        });
    }

});