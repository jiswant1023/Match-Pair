document.addEventListener('DOMContentLoaded', () => {
    
    const gameBoard = document.getElementById('gameBoard');
    const attemptCountElem = document.getElementById('attemptCount');
    const restartButton = document.getElementById('restartBtn');

    const cardValues = ['🍢', '🍢', '🍩', '🍩', '🍓', '🍓', '🍤', '🍤', '🍌', '🍌', '🍜', '🍜', '🍤', '🍤', '🍩', '🍩'];
    let firstCard, secondCard;
    let attempts = 0;
    let isFlipping = false;
    

    function createCard(value) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        return card;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function GameSetup() {
        const shuffledValues = shuffle([...cardValues]);
        gameBoard.innerHTML = '';
        shuffledValues.forEach(value => {
            const card = createCard(value);
            gameBoard.appendChild(card);
        });
        attempts = 0;
        attemptCountElem.textContent = attempts;
        firstCard = secondCard = null;
        isFlipping = false;
    }

    async function flipCard() {
        if (isFlipping) return;
        if (this === firstCard) return;

        this.classList.add('flipped');
        attempts++;
        attemptCountElem.textContent = attempts;

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        isFlipping = true;

        await checkForMatch();
    }

    function checkForMatch() {
        if (firstCard.dataset.value === secondCard.dataset.value) {
            resetCards();
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                resetCards();
            }, 1000);
        }
    }

    function resetCards() {
        [firstCard, secondCard] = [null, null];
        isFlipping = false;
        // attempts++;
        attemptCountElem.textContent = attempts;
    }

    restartButton.addEventListener('click', GameSetup);

    GameSetup(); // Initial setup
});
