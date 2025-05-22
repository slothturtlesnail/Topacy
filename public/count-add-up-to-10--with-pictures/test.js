// Import the functions we want to test
const {
    generateQuestion,
    getRandomEmoji,
    getEmojiName,
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
    setSecondsElapsed
} = require('./script.js');

describe('Question Generation', () => {
    test('generateQuestion returns valid numbers that sum to 10 or less', () => {
        const question = generateQuestion();
        expect(question.num1).toBeGreaterThan(0);
        expect(question.num1).toBeLessThanOrEqual(9);
        expect(question.num2).toBeGreaterThan(0);
        expect(question.num2).toBeLessThanOrEqual(9);
        expect(question.num1 + question.num2).toBeLessThanOrEqual(10);
        expect(emojis).toContain(question.emoji);
    });

    test('getRandomEmoji returns a valid emoji', () => {
        const emoji = getRandomEmoji();
        expect(emojis).toContain(emoji);
    });

    test('getEmojiName returns correct name for known emojis', () => {
        expect(getEmojiName('🍎')).toBe('apples');
        expect(getEmojiName('🚗')).toBe('cars');
        expect(getEmojiName('🐶')).toBe('dogs');
    });
});

describe('Game Logic', () => {
    let mockElements;
    let mockQuestions;

    beforeEach(() => {
        // Reset game state using setters
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setScore(0);

        // Create mock questions
        mockQuestions = [
            { num1: 2, num2: 3, emoji: '🍎', answer: 5 },
            { num1: 4, num2: 1, emoji: '🚗', answer: 5 }
        ];
        setQuestions(mockQuestions);
        setCurrentQuestionIndex(0);
        setScore(0);

        // Create mock DOM elements
        mockElements = {
            answerInput: { value: '' },
            feedbackArea: { innerHTML: '' },
            submitAnswerBtn: { disabled: false },
            nextQuestionBtn: { classList: { add: jest.fn(), remove: jest.fn() } },
            progressBar: { value: 0 },
            gameArea: { classList: { add: jest.fn(), remove: jest.fn() } },
            resultsArea: { classList: { add: jest.fn(), remove: jest.fn() } },
            correctAnswersDisplay: { textContent: '' },
            timeTakenDisplay: { textContent: '' },
            scorePercentageDisplay: { textContent: '' }
        };
    });

    test('handleAnswerSubmission with correct answer', () => {
        mockElements.answerInput.value = '5';
        handleAnswerSubmission(mockElements);
        expect(mockElements.feedbackArea.innerHTML).toContain('Correct');
        expect(mockElements.submitAnswerBtn.disabled).toBe(true);
        expect(mockElements.answerInput.disabled).toBe(true);
        expect(getScore()).toBe(1);
    });

    test('handleAnswerSubmission with incorrect answer', () => {
        mockElements.answerInput.value = '6';
        handleAnswerSubmission(mockElements);
        expect(mockElements.feedbackArea.innerHTML).toContain('Incorrect');
        expect(mockElements.submitAnswerBtn.disabled).toBe(true);
        expect(mockElements.answerInput.disabled).toBe(true);
        expect(mockElements.nextQuestionBtn.classList.remove).toHaveBeenCalledWith('is-hidden');
        expect(getScore()).toBe(0);
    });

    test('endGame calculates and displays correct score', () => {
        setScore(7);
        setSecondsElapsed(120);
        endGame(mockElements);
        expect(mockElements.correctAnswersDisplay.textContent).toBe('7');
        expect(mockElements.timeTakenDisplay.textContent).toBe('120s');
        expect(mockElements.scorePercentageDisplay.textContent).toBe('70');
    });
});

describe('Theme Management', () => {
    let mockElements;

    beforeEach(() => {
        mockElements = {
            progressBar: { classList: { add: jest.fn(), remove: jest.fn() } },
            submitAnswerBtn: { classList: { add: jest.fn(), remove: jest.fn() } },
            retakeBtn: { classList: { add: jest.fn(), remove: jest.fn() } },
            nextQuestionBtn: { classList: { add: jest.fn(), remove: jest.fn() } },
            gameContainer: { classList: { add: jest.fn(), remove: jest.fn() } }
        };
    });

    test('changeTheme selects a valid theme', () => {
        const theme = changeTheme();
        expect(themes).toContain(theme);
    });

    test('applyTheme updates all elements with new theme', () => {
        const newTheme = 'is-emerald';
        applyTheme(newTheme, mockElements);
        
        // Check that old themes were removed
        themes.forEach(theme => {
            expect(mockElements.progressBar.classList.remove).toHaveBeenCalledWith(theme);
            expect(mockElements.submitAnswerBtn.classList.remove).toHaveBeenCalledWith(theme);
            expect(mockElements.retakeBtn.classList.remove).toHaveBeenCalledWith(theme);
            expect(mockElements.nextQuestionBtn.classList.remove).toHaveBeenCalledWith(theme);
            expect(mockElements.gameContainer.classList.remove).toHaveBeenCalledWith(theme);
        });

        // Check that new theme was added
        expect(mockElements.progressBar.classList.add).toHaveBeenCalledWith(newTheme);
        expect(mockElements.submitAnswerBtn.classList.add).toHaveBeenCalledWith(newTheme);
        expect(mockElements.retakeBtn.classList.add).toHaveBeenCalledWith(newTheme);
        expect(mockElements.nextQuestionBtn.classList.add).toHaveBeenCalledWith(newTheme);
        expect(mockElements.gameContainer.classList.add).toHaveBeenCalledWith(newTheme);
    });
}); 