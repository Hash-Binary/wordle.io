document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    let guessedWords = [[]];
    let availableSpace = 1;
    let word = "dosa";
    let guessedWordCount = 0;
    const keys = document.querySelectorAll(".keyboard-row button");



    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }

    function updateGuessedWords(letter){
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr && currentWordArr.length < 4) {
            currentWordArr.push(letter);
            const availableSpaceEl = document.getElementById(availableSpace);
            availableSpace = availableSpace + 1;
            availableSpaceEl.textContent = letter;
        }
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);

        if(!isCorrectLetter){
            return "rgb(58,58,60)";
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = (letter === letterInThatPosition);

        if (isCorrectPosition){
            return "rgb(83,141,78)";
        }

        return "rgb(181, 159, 59)";
    }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        if(currentWordArr.length !==4){
            window.alert("Bruh, type 4 letters man");
        const currentWordArr = getCurrentWordArr();
            for (let i = currentWordArr.length; i > 0; i--) {
                console.log(currentWordArr.length);
                handleDeleteLetter();            
        }
    }
        else{
            const currentWord = currentWordArr.join("");

            const firstLetterId = guessedWordCount * 4 + 1;
            const interval = 200;
            currentWordArr.forEach((letter, index) => {
                setTimeout(() => {
                    const tileColor = getTileColor(letter, index);
                    const letterId = firstLetterId + index;
                    const letterEl = document.getElementById(letterId);
                    letterEl.classList.add("animate__flipInX");
                    letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
                }, interval * index);
            });
    
            guessedWordCount += 1;
    
            if (currentWord === word) {
                window.alert("About time you figured that out!");  
                const redirectiontime = 1500;
                setTimeout(()=>{
                    window.location.href="final.html";      
                }, redirectiontime);    
            }
    
            if (guessedWords.length === 6){
                window.alert("Are you fucking kidding me!!!!!!");
            }
    
            guessedWords.push([]);
        }
    }

    function createSquares() {
        const gameBoard = document.getElementById("board");
        for (let index = 0; index < 24; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }
    }

    function handleDeleteLetter(){
        const currentWordArr = getCurrentWordArr();
        const removedLetter = currentWordArr.pop();
        guessedWords[guessedWords.length - 1] = currentWordArr;
        const lastLetterEl = document.getElementById(String(availableSpace - 1));
        lastLetterEl.textContent = '';
        availableSpace = availableSpace - 1;
    }

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");
            if(letter === 'enter'){
                handleSubmitWord();
                return;
            }

            if(letter === 'del') {
                handleDeleteLetter();
                return;
            }

            updateGuessedWords(letter);
        };
    }
});