document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.getElementById('test-results-container');
    const totalTestsDisplay = document.getElementById('total-tests');
    const passedTestsDisplay = document.getElementById('passed-tests');
    const failedTestsDisplay = document.getElementById('failed-tests');

    let testCount = 0;
    let passCount = 0;
    let failCount = 0;

    function runTest(description, testFn) {
        testCount++;
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('test-case');
        try {
            testFn();
            resultDiv.classList.add('passed');
            resultDiv.innerHTML = `<p><strong>PASSED:</strong> ${description}</p>`;
            passCount++;
        } catch (error) {
            resultDiv.classList.add('failed');
            resultDiv.innerHTML = 
                `<p><strong>FAILED:</strong> ${description}</p>
                 <p><small>${error.stack || error}</small></p>`;
            failCount++;
        }
        resultsContainer.appendChild(resultDiv);
        updateSummary();
    }

    function updateSummary() {
        totalTestsDisplay.textContent = testCount;
        passedTestsDisplay.textContent = passCount;
        failedTestsDisplay.textContent = failCount;
    }

    function assert(condition, message) {
        if (!condition) {
            throw new Error(message || "Assertion failed");
        }
    }

    function assertEqual(actual, expected, message) {
        if (actual !== expected) {
            throw new Error(message || `Expected ${expected} but got ${actual}`);
        }
    }

    // --- Test Cases ---

    // Tests for getRandomInt()
    runTest("getRandomInt: should return a number within the specified range", () => {
        const min = 1, max = 10;
        const result = getRandomInt(min, max);
        assert(result >= min && result <= max, `Result ${result} is not between ${min} and ${max}`);
        assert(Number.isInteger(result), `Result ${result} is not an integer`);
    });

    runTest("getRandomInt: should return min when min and max are the same", () => {
        const val = 5;
        assertEqual(getRandomInt(val, val), val, `Should return ${val} when min=max=${val}`);
    });

    // Tests for generateQuestion()
    runTest("generateQuestion: should return an object with num1, num2, emoji1, emoji2, and answer", () => {
        const q = generateQuestion();
        assert(typeof q === 'object' && q !== null, "Question should be an object");
        assert('num1' in q, "Question missing num1");
        assert('num2' in q, "Question missing num2");
        assert('emoji1' in q, "Question missing emoji1");
        assert('emoji2' in q, "Question missing emoji2");
        assert('answer' in q, "Question missing answer");
    });

    runTest("generateQuestion: num1 and num2 should be between 1 and 9", () => {
        for (let i = 0; i < 100; i++) { // Run multiple times for randomness
            const q = generateQuestion();
            assert(q.num1 >= 1 && q.num1 <= 9, `num1 (${q.num1}) out of range 1-9`);
            assert(q.num2 >= 1 && q.num2 <= 9, `num2 (${q.num2}) out of range 1-9`);
        }
    });

    runTest("generateQuestion: answer should be num1 + num2", () => {
        for (let i = 0; i < 100; i++) {
            const q = generateQuestion();
            assertEqual(q.answer, q.num1 + q.num2, `Answer ${q.answer} incorrect for ${q.num1} + ${q.num2}`);
        }
    });

    runTest("generateQuestion: sum of num1 and num2 should not exceed 10", () => {
        for (let i = 0; i < 100; i++) {
            const q = generateQuestion();
            assert(q.num1 + q.num2 <= 10, `Sum ${q.num1 + q.num2} exceeds 10`);
        }
    });

    runTest("generateQuestion: emojis should be strings from the emojis list", () => {
        const q = generateQuestion();
        assert(typeof q.emoji1 === 'string' && emojis.includes(q.emoji1), `emoji1 (${q.emoji1}) is invalid`);
        assert(typeof q.emoji2 === 'string' && emojis.includes(q.emoji2), `emoji2 (${q.emoji2}) is invalid`);
    });
    
    runTest("generateQuestion: should attempt to use different emojis for num1 and num2 if possible", () => {
        // This test is probabilistic, but with enough emojis, they should differ often.
        // If emojis list had only 1 item, this test would always fail due to the while loop logic in generateQuestion.
        // For this test to be robust, we assume emojis.length > 1
        if (emojis.length > 1) {
            let sameEmojiCount = 0;
            for (let i = 0; i < 100; i++) {
                const q = generateQuestion();
                if (q.emoji1 === q.emoji2) {
                    sameEmojiCount++;
                }
            }
            // It's hard to guarantee they are *always* different if num1 or num2 is 0, but our numbers are 1-9.
            // And if we pick the same emoji randomly twice. The logic tries to make them different.
            // Let's assert they are not *always* the same.
            assert(sameEmojiCount < 100, "Emojis were always the same, which is unlikely if trying to make them different.");
        } else {
            console.warn("Skipping emoji difference test as emoji list is too small.");
        }
    });

    // Tests for generateAllQuestions()
    runTest("generateAllQuestions: should populate the global 'questions' array with 'totalQuestions' items", () => {
        // Note: `questions` is global from script.js
        generateAllQuestions(); 
        assertEqual(questions.length, totalQuestions, `Generated ${questions.length} questions, expected ${totalQuestions}`);
        assert(questions.every(q => typeof q === 'object' && 'answer' in q), "Not all items in questions array are valid question objects.");
    });

    // Tests for theme logic (testing state, not DOM manipulation directly)
    runTest("applyTheme: should set currentTheme global variable", () => {
        const initialTheme = currentTheme;
        const newTheme = themes[1] || themes[0]; // Pick another theme or default if only one
        if (initialTheme !== newTheme) {
            applyTheme(newTheme); // This will update global `currentTheme`
            assertEqual(currentTheme, newTheme, `currentTheme should be ${newTheme}`);
            applyTheme(initialTheme); // Reset to initial for other tests
        } else {
            console.warn("Skipping applyTheme direct check as only one theme is available or newTheme is same as initial.");
        }
    });

    runTest("changeTheme: should change currentTheme to a different theme from the list (if multiple exist)", () => {
        if (themes.length > 1) {
            const initialTheme = currentTheme;
            changeTheme(); // This should pick a new theme and apply it
            assert(currentTheme !== initialTheme, `changeTheme did not change the theme from ${initialTheme}. New theme: ${currentTheme}`);
            assert(themes.includes(currentTheme), `New theme ${currentTheme} is not in the themes list.`);
            // Reset to a known state if necessary, though next test might also change it
            applyTheme(initialTheme); 
        } else {
            console.warn("Skipping changeTheme test as only one theme is available.");
            // If only one theme, currentTheme should remain the same
            const initialTheme = currentTheme;
            changeTheme();
            assertEqual(currentTheme, initialTheme, "Theme should not change if only one theme is available.");
        }
    });

    // Initial call to update summary for a clean slate before tests run (or if no tests)
    updateSummary();
}); 