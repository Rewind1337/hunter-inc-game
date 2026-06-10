
// actually copy the contents of a jsobj into a new object, not whatever it usually does
// do not use this when theres functions saved in the objects, they get lost
function deepCopy(obj) { return JSON.parse(JSON.stringify(obj)) }

let suffixLetters = ["", "K", "M", "B", "T",
    "Aa", "Ab", "Ac", "Ad", "Ae", "Af", "Ag", "Ah", "Ai", "Aj", "Ak", "Al", "Am", "An", "Ao", "Ap", "Aq", "Ar", "As", "At", "Au", "Av", "Aw", "Ax", "Ay", "Az",
    "Ba", "Bb", "Bc", "Bd", "Be", "Bf", "Bg", "Bh", "Bi", "Bj", "Bk", "Bl", "Bm", "Bn", "Bo", "Bp", "Bq", "Br", "Bs", "Bt", "Bu", "Bv", "Bw", "Bx", "By", "Bz",
    "Ca", "Cb", "Cc", "Cd", "Ce", "Cf", "Cg", "Ch", "Ci", "Cj", "Ck", "Cl", "Cm", "Cn", "Co", "Cp", "Cq", "Cr", "Cs", "Ct", "Cu", "Cv", "Cw", "Cx", "Cy", "Cz",
    "Da", "Db", "Dc", "Dd", "De", "Df", "Dg", "Dh", "Di", "Dj", "Dk", "Dl", "Dm", "Dn", "Do", "Dp", "Dq", "Dr", "Ds", "Dt", "Du"];

function format(input, seperator = ".", digitsBelowAThousand = 1, decimalSpaces = 1, suffixType = "mixed") {
    let logResult = Math.floor(Math.log10(input) / 3);
    let log10Result = Math.floor(Math.log10(input));

    if (input === 0) { return "0" }
    if (input < 0) {
        let absoluteInput = Math.abs(input)
        let absoluteFormat = format(absoluteInput, seperator, digitsBelowAThousand, decimalSpaces, suffixType)
        return "-" + absoluteFormat
    }
    if (input < 1000 && input > 0) {
        if (digitsBelowAThousand > 0)
            return input.toFixed(digitsBelowAThousand);
        else
            return "" + Math.floor(input);
    }
    if (input >= Number.MAX_VALUE || input === Infinity) {
        return "∞"
    }

    let offset = Math.floor(Math.log10(input)) % 3;
    let preComma = (Math.floor(input / Math.pow(1000, logResult))).toString();
    let ePreComma = (Math.floor(input / Math.pow(10, log10Result))).toString();
    let postComma = (Math.floor(input / Math.pow(1000, logResult - 1)) - 1000 * (preComma - 1)).toString();

    if (suffixType === "letters") {
        let suffixChoice = suffixLetters
        return preComma + seperator + postComma.substr(1, decimalSpaces) + suffixChoice[logResult];
    }
    if (suffixType === "e-notation") {
        return ePreComma + seperator + postComma.substr(1, decimalSpaces) + "e<sup>" + Math.floor(Math.log10(input)) + "</sup>";
    }
    if (suffixType === "mixed") {
        if (input < 1e15) {
            let suffixChoice = suffixLetters
            return preComma + seperator + postComma.substr(1, decimalSpaces) + suffixChoice[logResult];
        } else {
            return ePreComma + seperator + postComma.substr(1, decimalSpaces) + "e<sup>" + Math.floor(Math.log10(input)) + "</sup>";
        }

    }
}

function fancyFormat(input, seperator = ".", digitsBelowAThousand = 1, decimalSpaces = 1, suffixType = "mixed") {
    if (input < 1000 && input > 0) {
        let justTheNumber = format(input, seperator, digitsBelowAThousand, decimalSpaces, suffixType)
        return '<div class="number-value">' + justTheNumber + '</div>'
    }

    let formattedNumber = format(input, seperator, digitsBelowAThousand, decimalSpaces, suffixType)
    let theNumberPart = formattedNumber.substring(0, formattedNumber.indexOf(seperator) + 1 + decimalSpaces)
    let theSuffixPart = formattedNumber.substring(formattedNumber.indexOf(seperator) + 1 + decimalSpaces)
    let fancyHTMLNumberString = '<div class="number-value">' + theNumberPart + '</div>'
    fancyHTMLNumberString += '<div class="number-suffix">' + theSuffixPart + '</div>'
    return fancyHTMLNumberString
}

// what it says
// turns 1.01200 into 1.012, etc
function removeTrailingZeroesAndSeperator(input, seperator = ".") {
    let stringToBeTrimmed = input
    let hasSeperator = input.includes(seperator)

    let suffixString = ""
    let hasRegularSuffix = false
    let lastCharacter = input.charAt(input.length - 1)
    let secondLastCharacter = input.charAt(input.length - 2)
    if (suffixLetters.includes(lastCharacter)) {
        stringToBeTrimmed = input.substring(0, input.length - 1)
        hasRegularSuffix = true
        suffixString = input.substring(input.length - 1)
    } else if (suffixLetters.includes(secondLastCharacter + lastCharacter)) {
        console.log("double letter") // not actually called at the moment because scientific takes over at e15 (1000 T)
    }

    let hasExponent = false
    if (lastCharacter === ">") {
        let startOfFirstDiv = input.indexOf("<")
        let number = input.substring(0, startOfFirstDiv - 1)
        stringToBeTrimmed = number
        let endOfFirstDiv = input.indexOf(">")
        let splitWordStartingFromNumber = input.substring(endOfFirstDiv + 1)
        let eNumber = splitWordStartingFromNumber.substring(0, splitWordStartingFromNumber.indexOf("<"))
        hasExponent = true
        suffixString = "<sup>" + eNumber + "</sup>"
    }

    let trimmed = []
    let removeFlag = true
    for (let i = stringToBeTrimmed.length - 1; i >= 0; i--) {
        let char = stringToBeTrimmed.charAt(i)
        if (hasSeperator) {
            if (removeFlag === true) {
                if (char === "0") { }
                else if (char === ".") {
                    removeFlag = false
                }
                else {
                    trimmed.push(char);
                    removeFlag = false
                }
            } else {
                trimmed.push(char)
            }
        } else {
            return stringToBeTrimmed
        }
    }

    if (hasExponent) {
        return trimmed.reverse().join("") + "e" + suffixString
    } if (hasRegularSuffix) {
        return trimmed.reverse().join("") + suffixString
    } else {
        return trimmed.reverse().join("")
    }
}

function getScreenDimensions() {
    return { width: window.innerWidth, height: window.innerHeight }
}

// very primitive assert that lets us check some stuff
function assert(boolean, message) {
    if (!boolean) {
        if (message) {
            console.trace("» Assert failed (" + message + ")")
        } else {
            console.trace("» Assert failed")
        }
    }
    return boolean
}