"use strict";
class GameServices {
    constructor() {
        this.ballCount = 6;
        const lotterySet = new Set(Array(60).keys());
        lotterySet.delete(0);
        this.lottery = this.shuffle(Array.from(lotterySet.values()));
    }
    entriesAreInvalid(lotterySelection) {
        if (lotterySelection.length < 6) {
            return true;
        }
        const invalidSelections = [];
        for (const number of lotterySelection.values()) {
            if (number < 1 || number > 59) {
                invalidSelections.push(number);
            }
        }
        return Boolean(invalidSelections.length);
    }
    getLuckyDip() {
        const luckyDip = new Set();
        while (luckyDip.size !== 6) {
            luckyDip.add(Math.ceil(Math.random() * (60 - 1)));
        }
        const sortedDip = Array.from(luckyDip.values()).sort(((a, b) => b - a));
        return sortedDip;
    }
    getLotteryDraw() {
        const lotteryDraw = [];
        for (let i = 0; i < this.ballCount; i += 1) {
            lotteryDraw.push(this.lottery[i]);
        }
        const sortedDraw = lotteryDraw.sort(((a, b) => a - b));
        return sortedDraw;
    }
    getInput() {
        const lotterySelection = [];
        for (let i = 0; i < this.ballCount; i += 1) {
            const inputElement = document.getElementById(`n${i}`);
            if (inputElement) {
                const value = Number(inputElement.value);
                if (Boolean(value)) {
                    lotterySelection.push(value);
                }
            }
        }
        return lotterySelection;
    }
    getMatches(lotteryDraw, lotterySelection) {
        return lotteryDraw.filter((n) => lotterySelection.includes(n));
    }
    getPrize(matches) {
        switch (matches) {
            case 3:
                alert('Congratulations, you win:\n 50pts');
                break;
            case 4:
                alert('Congratulations, you win:\n 100pts');
                break;
            case 5:
                alert('Congratulations, you win:\n 200pts');
                break;
            case 6:
                alert('Congratulations, you win:\n 500pts');
                break;
        }
    }
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}
let gameServices = new GameServices();
function startGame() {
    const input = gameServices.getInput();
    const entriesAreInvalid = gameServices.entriesAreInvalid(input);
    if (entriesAreInvalid) {
        alert('Invalid entries!\nPlease ensure each entry is an integer between 1 and 59');
    }
    else {
        const lotteryDraw = gameServices.getLotteryDraw();
        const matches = gameServices.getMatches(lotteryDraw, input);
        for (let i = 0; i < 6; i += 1) {
            const tableElement = document.getElementById(`l${i}`);
            if (tableElement) {
                tableElement.innerText = lotteryDraw[i].toString();
                if (matches.includes(lotteryDraw[i])) {
                    tableElement.style.backgroundColor = 'lime';
                }
            }
        }
    }
}
function luckyDip() {
    const luckyDip = gameServices.getLuckyDip();
    for (let i = 0; i < 6; i += 1) {
        const inputElement = document.getElementById(`n${i}`);
        if (inputElement) {
            inputElement.value = luckyDip.pop().toString();
        }
    }
}
function resetGame() {
    for (let i = 0; i < 6; i += 1) {
        const inputElement = document.getElementById(`n${i}`);
        const tableElement = document.getElementById(`l${i}`);
        if (inputElement) {
            inputElement.value = '';
        }
        if (tableElement) {
            tableElement.innerText = '';
            tableElement.style.backgroundColor = '';
        }
    }
    gameServices = new GameServices();
}
//# sourceMappingURL=Game.js.map