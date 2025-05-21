// Helper function to get emoji name
function getEmojiName(emoji) {
    const emojiNames = {
        // Fruits and Vegetables
        '🍎': 'apples',
        '🍊': 'oranges',
        '🍋': 'lemons',
        '🍌': 'bananas',
        '🍉': 'watermelons',
        '🍇': 'grapes',
        '🍓': 'strawberries',
        '🍒': 'cherries',
        '🍑': 'peaches',
        '🍍': 'pineapples',
        '🥥': 'coconuts',
        '🥝': 'kiwis',
        '🍅': 'tomatoes',
        '🍆': 'eggplants',
        '🥑': 'avocados',
        '🥕': 'carrots',
        '🌽': 'corn',
        '🌶️': 'peppers',
        '🍄': 'mushrooms',
        '🥜': 'peanuts',
        
        // Vehicles
        '🚗': 'cars',
        '🚕': 'taxis',
        '🚙': 'SUVs',
        '🚌': 'buses',
        '🚎': 'trolleybuses',
        '🏎️': 'race cars',
        '🚓': 'police cars',
        '🚑': 'ambulances',
        '🚒': 'fire trucks',
        '🚚': 'trucks',
        '🚛': 'articulated lorries',
        '🚜': 'tractors',
        '🛵': 'motorcycles',
        '🚲': 'bicycles',
        
        // Stars and Space
        '⭐': 'stars',
        '🌟': 'glowing stars',
        '✨': 'sparkles',
        '💫': 'dizzy stars',
        '🌠': 'shooting stars',
        '🌙': 'moons',
        '🌞': 'suns',
        '🌝': 'full moons',
        
        // Animals
        '🐶': 'dogs',
        '🐱': 'cats',
        '🐭': 'mice',
        '🐹': 'hamsters',
        '🐰': 'rabbits',
        '🦊': 'foxes',
        '🐻': 'bears',
        '🐼': 'pandas',
        '🐨': 'koalas',
        '🐯': 'tigers',
        '🦁': 'lions',
        '🐮': 'cows',
        '🐷': 'pigs',
        '🐸': 'frogs',
        '🐵': 'monkeys',
        
        // Birds
        '🐔': 'chickens',
        '🐧': 'penguins',
        '🦆': 'ducks',
        '🦅': 'eagles',
        '🦉': 'owls',
        '🦇': 'bats',
        '🦜': 'parrots',
        
        // Sea Creatures
        '🐠': 'fish',
        '🐟': 'fish',
        '🐡': 'blowfish',
        '🦈': 'sharks',
        '🐋': 'whales',
        '🐳': 'whales',
        '🐬': 'dolphins',
        '🐙': 'octopuses',
        '🦑': 'squids',
        '🦀': 'crabs',
        
        // Insects
        '🐞': 'ladybugs',
        '🐝': 'bees',
        '🐛': 'bugs',
        '🦋': 'butterflies',
        '🐌': 'snails',
        '🐜': 'ants',
        '🦗': 'crickets',
        
        // Toys and Games
        '🎮': 'game controllers',
        '🎲': 'dice',
        '🎯': 'darts',
        '🎨': 'paint palettes',
        '🎭': 'masks',
        '🎪': 'circus tents',
        '🎢': 'roller coasters',
        '🎡': 'ferris wheels',
        
        // Sports
        '⚽': 'soccer balls',
        '🏀': 'basketballs',
        '🏈': 'footballs',
        '⚾': 'baseballs',
        '🎾': 'tennis balls',
        '🏐': 'volleyballs',
        '🏉': 'rugby balls',
        '🎱': 'pool balls'
    };
    return emojiNames[emoji] || 'items';
}

// Global constants and utility functions for testability
const emojis = ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥕', '🌽', '🌶️', '🍄', '🥜', '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚚', '🚛', '🚜', '🛵', '🚲', '⭐', '🌟', '✨', '💫', '🌠', '🌙', '🌞', '🌝', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🦆', '🦅', '🦉', '🦇', '🦜', '🐠', '🐟', '🐡', '🦈', '🐋', '🐳', '🐬', '🐙', '🦑', '🦀', '🐞', '🐝', '🐛', '🦋', '🐌', '🐜', '🦗', '🎮', '🎲', '🎯', '🎨', '🎭', '🎪', '🎢', '🎡', '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱'];
const totalQuestions = 10;
const themes = [
    'is-emerald',    // Green
    'is-sky',        // Blue
    'is-amber',      // Yellow
    'is-rose',       // Pink
    'is-violet',     // Purple
    'is-teal',       // Teal
    'is-orange',     // Orange
    'is-fuchsia',    // Fuchsia
    'is-indigo',     // Indigo
    'is-cyan'        // Cyan
];

// Game state variables
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let secondsElapsed = 0;
let currentTheme = themes[0];

// Sound Effects Management
const sounds = {
    correct: null,
    incorrect: null,
    click: null
};

function initializeSounds() {
    try {
        sounds.correct = new Audio('sounds/correct.mp3');
        sounds.incorrect = new Audio('sounds/incorrect.mp3');
        sounds.click = new Audio('sounds/click.mp3');
    } catch (e) {
        console.error("Error initializing audio files:", e);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

function generateQuestion() {
    let num1 = getRandomInt(1, 9);
    let num2 = getRandomInt(1, 9);
    while (num1 + num2 > 10) {
        num1 = getRandomInt(1, 9);
        num2 = getRandomInt(1, 9);
    }
    const emoji = getRandomEmoji();
    return { num1, num2, emoji, answer: num1 + num2 };
}

function generateAllQuestions() {
    questions = [];
    for (let i = 0; i < totalQuestions; i++) {
        questions.push(generateQuestion());
    }
}

// Theme functions
let _domElementsForTheme = {};

function _setDomElementsForTheme(elements) {
    _domElementsForTheme = elements;
}

function applyTheme(theme, elements = _domElementsForTheme) {
    if (!elements.progressBar) {
        currentTheme = theme;
        return;
    }
    
    themes.forEach(t => {
        elements.progressBar.classList.remove(t);
        elements.submitAnswerBtn.classList.remove(t);
        elements.retakeBtn.classList.remove(t);
        elements.nextQuestionBtn.classList.remove(t);
        elements.gameContainer.classList.remove(t);
    });

    elements.progressBar.classList.add(theme);
    elements.submitAnswerBtn.classList.add(theme);
    elements.retakeBtn.classList.add(theme);
    elements.nextQuestionBtn.classList.add(theme);
    elements.gameContainer.classList.add(theme);
    
    currentTheme = theme;
}

function changeTheme() {
    const newTheme = themes[Math.floor(Math.random() * themes.length)];
    applyTheme(newTheme);
    return newTheme;
}

function playSound(soundType) {
    if (sounds[soundType]) {
        sounds[soundType].currentTime = 0;
        sounds[soundType].play().catch(error => {
            console.warn(`Could not play sound: ${soundType}`, error);
        });
    }
}

// Game logic functions
function handleAnswerSubmission(elements) {
    const userAnswer = elements.answerInput.value.trim();
    
    if (userAnswer === '') {
        elements.feedbackArea.innerHTML = '<p class="has-text-danger">Please enter an answer!</p>';
        elements.answerInput.focus();
        return;
    }

    const parsedAnswer = parseInt(userAnswer);
    const correctAnswer = questions[currentQuestionIndex].answer;
    
    if (parsedAnswer === correctAnswer) {
        elements.feedbackArea.innerHTML = '<p class="has-text-success">Correct! 🎉</p>';
        score++;
        elements.submitAnswerBtn.disabled = true;
        elements.answerInput.disabled = true;
        
        setTimeout(() => {
            handleNextQuestion(elements);
        }, 1000);
    } else {
        elements.feedbackArea.innerHTML = `<p class="has-text-danger">Incorrect. The correct answer is ${correctAnswer}.</p>`;
        elements.submitAnswerBtn.disabled = true;
        elements.answerInput.disabled = true;
        elements.nextQuestionBtn.classList.remove('is-hidden');
    }
    
    elements.progressBar.value = currentQuestionIndex + 1;
}

function handleNextQuestion(elements) {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        updateQuestionContent(elements);
    } else {
        endGame(elements);
    }
}

function updateQuestionContent(elements) {
    const q = questions[currentQuestionIndex];
    const emojiDisplay1 = Array(q.num1).fill(q.emoji).join(' ');
    const emojiDisplay2 = Array(q.num2).fill(q.emoji).join(' ');
    const questionText = `How many ${getEmojiName(q.emoji)} are there?`;
    
    elements.questionDisplay.innerHTML = `
        <div class="question-text">${questionText}</div>
        <div class="emoji-display">${emojiDisplay1}</div>
        <div class="operator">+</div>
        <div class="emoji-display">${emojiDisplay2}</div>
    `;
    
    elements.answerInput.value = '';
    elements.feedbackArea.textContent = '';
    elements.submitAnswerBtn.disabled = false;
    elements.answerInput.disabled = false;
    elements.nextQuestionBtn.classList.add('is-hidden');
    elements.progressBar.value = currentQuestionIndex;
    
    setTimeout(() => {
        elements.answerInput.focus();
    }, 100);
}

function endGame(elements) {
    clearInterval(timerInterval);
    
    elements.gameArea.classList.add('visually-hidden');
    setTimeout(() => {
        elements.gameArea.classList.add('is-hidden');
        elements.resultsArea.classList.remove('is-hidden');
        elements.resultsArea.classList.remove('visually-hidden');
        elements.resultsArea.classList.add('visible');
    }, 300);

    elements.correctAnswersDisplay.textContent = String(score);
    elements.timeTakenDisplay.textContent = `${secondsElapsed}s`;
    const percentage = (score / totalQuestions) * 100;
    elements.scorePercentageDisplay.textContent = percentage.toFixed(0);
}

function restartGame(elements) {
    currentQuestionIndex = 0;
    score = 0;
    secondsElapsed = 0;
    elements.nextQuestionBtn.textContent = 'Next Question';
    generateAllQuestions();
    
    elements.resultsArea.classList.add('is-hidden');
    elements.resultsArea.classList.remove('visible');
    elements.resultsArea.classList.add('visually-hidden');
    
    elements.gameArea.classList.remove('is-hidden');
    elements.gameArea.classList.remove('visually-hidden');
    
    changeTheme();
    startTimer(elements);
    updateQuestionContent(elements);
    elements.progressBar.value = 0;
}

function startTimer(elements) {
    secondsElapsed = 0;
    elements.timerDisplay.textContent = `${secondsElapsed}s`;
    if(timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        secondsElapsed++;
        elements.timerDisplay.textContent = `${secondsElapsed}s`;
    }, 1000);
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeSounds();

    const elements = {
        gameContainer: document.querySelector('.game-container'),
        progressBar: document.getElementById('progress-bar'),
        timerDisplay: document.getElementById('timer'),
        questionDisplay: document.getElementById('question-display'),
        answerInput: document.getElementById('answer-input'),
        submitAnswerBtn: document.getElementById('submit-answer-btn'),
        feedbackArea: document.getElementById('feedback-area'),
        nextQuestionBtn: document.getElementById('next-question-btn'),
        gameArea: document.getElementById('game-area'),
        resultsArea: document.getElementById('results-area'),
        correctAnswersDisplay: document.getElementById('correct-answers'),
        timeTakenDisplay: document.getElementById('time-taken'),
        scorePercentageDisplay: document.getElementById('score-percentage'),
        retakeBtn: document.getElementById('retake-btn')
    };

    _setDomElementsForTheme(elements);

    // Event Listeners
    elements.submitAnswerBtn.addEventListener('click', () => {
        handleAnswerSubmission(elements);
        playSound('click');
    });

    elements.answerInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && !elements.submitAnswerBtn.disabled) {
            handleAnswerSubmission(elements);
        }
    });

    elements.nextQuestionBtn.addEventListener('click', () => {
        handleNextQuestion(elements);
        playSound('click');
    });

    elements.retakeBtn.addEventListener('click', () => {
        restartGame(elements);
        playSound('click');
    });

    // Initial game setup
    changeTheme();
    generateAllQuestions();
    startTimer(elements);
    updateQuestionContent(elements);
});

// State setters/getters for testing
function setQuestions(qs) { questions = qs; }
function getQuestions() { return questions; }
function setCurrentQuestionIndex(idx) { currentQuestionIndex = idx; }
function getCurrentQuestionIndex() { return currentQuestionIndex; }
function setScore(val) { score = val; }
function getScore() { return score; }
function setSecondsElapsed(val) { secondsElapsed = val; }
function getSecondsElapsed() { return secondsElapsed; }

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getEmojiName,
        getRandomEmoji,
        generateQuestion,
        handleAnswerSubmission,
        handleNextQuestion,
        endGame,
        restartGame,
        changeTheme,
        applyTheme,
        emojis,
        themes,
        totalQuestions,
        setQuestions,
        getQuestions,
        setCurrentQuestionIndex,
        getCurrentQuestionIndex,
        setScore,
        getScore,
        setSecondsElapsed,
        getSecondsElapsed
    };
} 