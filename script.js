"use strict";

const passwordInput =
    document.getElementById("password");

const lengthInput =
    document.getElementById("length");

const lengthValue =
    document.getElementById("lengthValue");

const uppercaseInput =
    document.getElementById("uppercase");

const lowercaseInput =
    document.getElementById("lowercase");

const numbersInput =
    document.getElementById("numbers");

const symbolsInput =
    document.getElementById("symbols");

const generateButton =
    document.getElementById("generateButton");

const copyButton =
    document.getElementById("copyButton");

const statusMessage =
    document.getElementById("statusMessage");

const characterSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
};

function updateLengthValue() {
    lengthValue.textContent =
        lengthInput.value;
}

function getCharacterPool() {
    let pool = "";

    if (uppercaseInput.checked) {
        pool += characterSets.uppercase;
    }

    if (lowercaseInput.checked) {
        pool += characterSets.lowercase;
    }

    if (numbersInput.checked) {
        pool += characterSets.numbers;
    }

    if (symbolsInput.checked) {
        pool += characterSets.symbols;
    }

    return pool;
}

function generatePassword() {
    const length =
        Number(lengthInput.value);

    const pool =
        getCharacterPool();

    if (pool.length === 0) {
        passwordInput.value = "";
        statusMessage.textContent =
            "Please select at least one character type.";
        return;
    }

    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex =
            Math.floor(
                Math.random() * pool.length
            );

        password += pool[randomIndex];
    }

    passwordInput.value =
        password;

    statusMessage.textContent =
        "New password generated.";
}

async function copyPassword() {
    const password =
        passwordInput.value;

    if (password === "") {
        statusMessage.textContent =
            "Generate a password first.";
        return;
    }

    try {
        await navigator.clipboard.writeText(password);

        statusMessage.textContent =
            "Password copied to clipboard.";
    } catch (error) {
        statusMessage.textContent =
            "Unable to copy the password.";
    }
}

lengthInput.addEventListener(
    "input",
    updateLengthValue
);

generateButton.addEventListener(
    "click",
    generatePassword
);

copyButton.addEventListener(
    "click",
    copyPassword
);

updateLengthValue();
generatePassword();