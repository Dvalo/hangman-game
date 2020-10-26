const gameCore = $("#gameCore");
const wordDisplay = $("#wordToGuess");
const livesDisplay = $(".livesText");
const heartsDisplay = $(".heartsDisplay");
const usedLettersTextDisplay = $(".usedLettersText");
const usedLettersDisplay = $(".usedLetters");
const newGameBtn = $("#newGameBtn");

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

const animals = ["aardvark", "albatross", "alligator", "alpaca", "ant", "anteater", "antelope", "ape", "armadillo", "donkey", "baboon", "badger", "barracuda", "bat", "bear", "beaver", "bee", "bison",
    "boar", "buffalo", "butterfly", "camel", "capybara", "caribou", "cassowary", "cat", "caterpillar", "cattle", "chamois", "cheetah", "chicken", "chimpanzee", "chinchilla", "chough", "clam", "cobra", "cockroach",
    "cod", "cormorant", "coyote", "crab", "crane", "crocodile", "crow", "curlew", "deer", "dinosaur", "dog", "dogfish", "dolphin", "donkey", "dotterel", "dove", "dragonfly", "duck", "dugong", "dunlin", "eagle",
    "echidna", "eel", "eland", "elephant", "elephant-seal", "elk", "emu", "falcon", "ferret", "finch", "fish", "flamingo", "fly", "fox", "frog", "gaur", "gazelle", "gerbil", "giant-panda",
    "giraffe", "gnat", "gnu", "goat", "goose", "goldfinch", "goldfish", "gorilla", "goshawk", "grasshopper", "grouse", "guanaco", "guinea-fowl", "guinea-pig", "gull", "hamster", "hare", "hawk",
    "hedgehog", "heron", "herring", "hippopotamus", "hornet", "horse", "human", "hummingbird", "hyena", "ibex", "ibis", "jackal", "jaguar", "jay", "jellyfish", "kangaroo", "kingfisher", "koala",
    "komodo-dragon", "kookabura", "kouprey", "kudu", "lapwing", "lark", "lemur", "leopard", "lion", "llama", "lobster", "locust", "loris", "louse", "lyrebird", "magpie", "mallard", "manatee", "mandrill",
    "mantis", "marten", "meerkat", "mink", "mole", "mongoose", "monkey", "moose", "mouse", "mosquito", "mule", "narwhal", "newt", "nightingale", "octopus", "okapi", "opossum", "oryx", "ostrich", "otter",
    "owl", "ox", "oyster", "panther", "parrot", "partridge", "peafowl", "pelican", "penguin", "pheasant", "pig", "pigeon", "polar-bear", "pony", "porcupine", "porpoise", "prairie-dog", "quail", "quelea",
    "quetzal", "rabbit", "raccoon", "rail", "ram", "rat", "raven", "red-deer", "red-panda", "reindeer", "rhinoceros", "rook", "salamander", "salmon", "sand-dollar", "sandpiper", "sardine", "scorpion",
    "sea-lion", "sea-urchin", "seahorse", "seal", "shark", "sheep", "shrew", "skunk", "snail", "snake", "sparrow", "spider", "spoonbill", "squid", "squirrel", "starling", "stingray", "stinkbug", "stork",
    "swallow", "swan", "tapir", "tarsier", "termite", "tiger", "toad", "trout", "turkey", "turtle", "vicuña", "viper", "vulture", "wallaby", "walrus", "wasp", "water-buffalo", "weasel", "whale", "wolf",
    "wolverine", "wombat", "woodcock", "woodpecker", "worm", "wren", "yak", "zebra"
];

const countryList = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina",
    "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Cayman Islands",
    "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos Islands", "Colombia", "Comoros", "Congo", "Congo", "Cook Islands",
    "Costa Rica", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czechia", "Côte d'Ivoire", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
    "Eswatini", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia",
    "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See", "Honduras",
    "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran ", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
    "Korea ", "Korea ", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
    "Luxembourg", "Macao", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia",
    "Moldova ", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua",
    "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine, State of", "Panama", "Papua New Guinea", "Paraguay", "Peru",
    "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Republic of North Macedonia", "Romania", "Russian Federation", "Rwanda", "Réunion", "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines",
    "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten", "Slovakia", "Slovenia",
    "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen",
    "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", , "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom of Great Britain", "United States Minor Outlying Islands",
    "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Viet Nam", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"
];

let words = ["testing spacing"];

let activeWord;

let usedLetters = [];
let letterDivs = [];

let usedLettersCount = 0;
let correctLetters = 0;
let lives = 9;

let isPlaying = true;

$(document).ready(function() {
    $(document).keyup(function() {
        if (isPlaying) {
            let keyboardInp = (event.key).toLowerCase();
            if (alphabet.includes(keyboardInp)) {
                checkUsedKeys(keyboardInp);
            }
        }
    });
    startGame();
});

newGameBtn.click(function() {
    restartGame();
});

function startGame() {
    activeWord = animals[Math.floor(Math.random() * animals.length)].toLowerCase();

    updateDisplay();

    for (let i = 0; i < activeWord.length; i++) {
        let letterDiv = document.createElement('span');
        letterDiv.classList.add('letter');
        if (alphabet.indexOf(activeWord[i]) === -1) {
            letterDiv.innerHTML = ` `;
        } else {
            letterDiv.innerHTML = `_`;
        }
        wordDisplay.append(letterDiv);
        letterDivs.push(letterDiv);
    }

    for (let i = 0; i < lives; i++) {
        heartsDisplay.append('<span class="heart"><i class="fas fa-heart"></i></span>');
    }

}


function checkUsedKeys(key) {
    if (!usedLetters.includes(key)) {
        usedLettersCount++;
        checkLetterInWord(key);
        let usedLetterDiv = document.createElement('div');
        usedLetterDiv.classList.add('letter-guess');
        usedLetterDiv.classList.add('letter' + key.toUpperCase());
        usedLetterDiv.innerHTML = `${key}`;
        usedLettersDisplay.append(usedLetterDiv);
        usedLetters.push(key);

    } else {
        let repeatedLetter = $('.letter' + key.toUpperCase());
        repeatedLetter.addClass('animate__animated animate__tada');
        repeatedLetter.one('animationend', function(event) {
            repeatedLetter.removeClass('animate__animated animate__tada')
        });

    }
}

function checkLetterInWord(key) {
    for (var i = 0; i < activeWord.length; i++) {
        if (activeWord[i] === key) {
            letterDivs[i].innerHTML = key;
            correctLetters++;
            updateDisplay();
            correctLetter(key);
        }
    }
    let checkWrong = activeWord.indexOf(key);
    if (checkWrong === -1) {
        incorrectLetter(key);
    }
    checkGameStatus();
}

function checkGameStatus() {
    updateDisplay();
    if (lives === 0) {
        lostGame();
    }
    if (correctLetters === activeWord.replace(/[^a-z]/g, "").length) {
        wonGame();
    }
}

function updateDisplay() {
    livesDisplay.html(`Lives remaining: ${lives}`);
    usedLettersTextDisplay.html(`Used Letters: ${usedLettersCount}`);
}

function restartGame() {
    $('#newGameBtn').fadeOut();
    gameCore.fadeTo('fast', 1);
    usedLetters = [];
    letterDivs = [];
    usedLettersCount = 0;
    correctLetters = 0;
    lives = 9;
    isPlaying = true;
    heartsDisplay.html(``);
    wordDisplay.html(``);
    usedLettersDisplay.html(``);
    startGame();
}

function correctLetter(key) {
    iziToast.info({
        title: 'Success',
        message: `Correctly guessed letter <b>${key.toUpperCase()}</b>`,
    });
}

function incorrectLetter(key) {
    lives--;
    $('.heartsDisplay > span:last-child').remove();
    iziToast.warning({
        title: 'Wrong',
        message: `Incorrectly guessed letter <b>${key.toUpperCase()}</b>`,
    });
}

function lostGame() {
    isPlaying = false;
    gameCore.fadeTo('fast', 0.3);
    newGameBtn.html(`Restart Game`);
    $('#newGameBtn').fadeIn();

    iziToast.error({
        title: 'Yikes',
        message: `You have lost the game, the word was <b>${activeWord.toUpperCase()}</b>`,
        position: 'topCenter',
    });
}

function wonGame() {
    isPlaying = false;
    gameCore.fadeTo('fast', 0.3);
    newGameBtn.html(`New Game`);
    $('#newGameBtn').fadeIn();

    iziToast.success({
        title: 'Success',
        message: `You have won the game, the word was <b>${activeWord.toUpperCase()}</b>`,
        position: 'topCenter',
    });
}