import { generateGroupCode, checkCode } from './scripts/joinOrCreate.js';
import { shuffleArray } from './scripts/utils.js';
import { checkForWin } from './scripts/win.js';
import { bingoCells } from './scripts/bingo.js';
import { returnPreparedCells } from './scripts/gameMode.js';

// Simple Testing Framework
const tests = [];
let passedTests = 0;
let failedTests = 0;

function test(description, fn) {
    tests.push({ description, fn });
}

function runTests() {
    console.log("Starting tests...");
    tests.forEach(test => {
        try {
            test.fn();
            console.log(`%c  ✓ ${test.description}`, 'color: green;');
            passedTests++;
        } catch (error) {
            console.error(`%c  ✗ ${test.description}`, 'color: red;');
            console.error(error);
            failedTests++;
        }
    });
    console.log("---------------------");
    console.log(`Tests finished. Passed: ${passedTests}, Failed: ${failedTests}`);
}

function assertEquals(expected, actual) {
    if (expected !== actual) {
        throw new Error(`Assertion failed: Expected ${expected}, but got ${actual}`);
    }
}

function assertTrue(actual) {
    if (actual !== true) {
        throw new Error(`Assertion failed: Expected true, but got ${actual}`);
    }
}

function assertFalse(actual) {
    if (actual !== false) {
        throw new Error(`Assertion failed: Expected false, but got ${actual}`);
    }
}

// --- Test Cases ---

test('generateGroupCode should return a 6-digit string', () => {
    const code = generateGroupCode();
    assertEquals(typeof code, 'string');
    assertEquals(code.length, 6);
    assertTrue(/^[0-9]{6}$/.test(code));
});

test('checkCode should validate a correct 6-digit code', () => {
    assertTrue(checkCode('123456'));
});

test('checkCode should invalidate codes that are too short, too long, or contain letters', () => {
    assertFalse(checkCode('12345'));
    assertFalse(checkCode('1234567'));
    assertFalse(checkCode('abcdef'));
    assertFalse(checkCode('123a56'));
});

test('shuffleArray should return an array with the same length and elements', () => {
    const originalArray = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray([...originalArray]);
    assertEquals(originalArray.length, shuffled.length);
    assertEquals(originalArray.sort().join(','), shuffled.sort().join(','));
});

test('returnPreparedCells should return the correct array for each selection', () => {
    const larsBingo = returnPreparedCells('1');
    const martinBingo = returnPreparedCells('2');
    const weihnachtsfilmBingo = returnPreparedCells('3');
    assertEquals(larsBingo.length, 25);
    assertEquals(martinBingo.length, 25);
    assertEquals(weihnachtsfilmBingo.length, 25);
    assertTrue(larsBingo.includes("Kommt zu spät"));
});

// --- Win Condition Tests ---

function setBingoState(clickedIndexes) {
    bingoCells.forEach((cell, index) => {
        cell.clicked = clickedIndexes.includes(index);
    });
}

test('checkForWin should detect a horizontal win', () => {
    setBingoState([0, 1, 2, 3, 4]);
    // This test will fail because checkForWin doesn't return a value.
    // It directly manipulates the DOM by creating a popup.
    // We can't test the popup creation here, but we can wrap checkForWin to test its effect.
    let popupCreated = false;
    const originalCreatePopup = window.createPopup;
    window.createPopup = () => { popupCreated = true; };

    checkForWin();

    assertTrue(popupCreated);

    window.createPopup = originalCreatePopup; // Restore original function
});

test('checkForWin should detect a vertical win', () => {
    setBingoState([0, 5, 10, 15, 20]);
    let popupCreated = false;
    const originalCreatePopup = window.createPopup;
    window.createPopup = () => { popupCreated = true; };

    checkForWin();

    assertTrue(popupCreated);

    window.createPopup = originalCreatePopup;
});

test('checkForWin should detect a diagonal win', () => {
    setBingoState([0, 6, 12, 18, 24]);
    let popupCreated = false;
    const originalCreatePopup = window.createPopup;
    window.createPopup = () => { popupCreated = true; };

    checkForWin();

    assertTrue(popupCreated);

    window.createPopup = originalCreatePopup;
});

test('checkForWin should not detect a win for an incomplete line', () => {
    setBingoState([0, 1, 2, 3]); // Missing one
    let popupCreated = false;
    const originalCreatePopup = window.createPopup;
    window.createPopup = () => { popupCreated = true; };

    checkForWin();

    assertFalse(popupCreated);

    window.createPopup = originalCreatePopup;
});


// Run all tests
runTests();
