
// actually copy the contents of a jsobj into a new object, not whatever it usually does
// do not use this when theres functions saved in the objects, they get lost
function deepCopy(obj) { return JSON.parse(JSON.stringify(obj)) }

// this is for you to make fancy lmao
function niceFormat(number, decimalSpaces = 0, seperator = ".") {
    return number.toFixed(decimalSpaces).replace(".", seperator)
}

function format(input, seperator = ".", digitsBelowAThousand = 0, decimalSpaces = 1, suffixType = "mixed") {
    suffixLetters = ["", "K", "M", "B", "T",
        "Aa", "Ab", "Ac", "Ad", "Ae", "Af", "Ag", "Ah", "Ai", "Aj", "Ak", "Al", "Am", "An", "Ao", "Ap", "Aq", "Ar", "As", "At", "Au", "Av", "Aw", "Ax", "Ay", "Az",
        "Ba", "Bb", "Bc", "Bd", "Be", "Bf", "Bg", "Bh", "Bi", "Bj", "Bk", "Bl", "Bm", "Bn", "Bo", "Bp", "Bq", "Br", "Bs", "Bt", "Bu", "Bv", "Bw", "Bx", "By", "Bz",
        "Ca", "Cb", "Cc", "Cd", "Ce", "Cf", "Cg", "Ch", "Ci", "Cj", "Ck", "Cl", "Cm", "Cn", "Co", "Cp", "Cq", "Cr", "Cs", "Ct", "Cu", "Cv", "Cw", "Cx", "Cy", "Cz",
        "Da", "Db", "Dc", "Dd", "De", "Df", "Dg", "Dh", "Di", "Dj", "Dk", "Dl", "Dm", "Dn", "Do", "Dp", "Dq", "Dr", "Ds", "Dt", "Du"];
    let logResult = Math.floor(Math.log10(input) / 3);
    if (input <= 0) { return 0; }
    if (input < 1000 && input > 0) {
        if (digitsBelowAThousand > 0)
            return input.toFixed(digitsBelowAThousand);
        else
            return Math.floor(input);
    }
    if (input >= Number.MAX_VALUE || input === Infinity) {
        return "∞"
    }

    let offset = Math.floor(Math.log10(input)) % 3;
    let preComma = Math.floor(input / Math.pow(1000, logResult));
    let postComma = Math.floor(input / Math.pow(1000, logResult - 1)) - 1000 * (preComma - 1);
    if (suffixType === "letters") {
        let suffixChoice = suffixLetters
        return preComma.toString() + seperator + postComma.toString().substr(1, decimalSpaces) + suffixChoice[logResult];
    }
    if (suffixType === "e-notation") {
        return preComma.toString() + seperator + postComma.toString().substr(1, decimalSpaces) + "e" + Math.floor(Math.log10(input));
    }
    if (suffixType === "mixed") {
        if (input < 1e15) {
            let suffixChoice = suffixLetters
            return preComma.toString() + seperator + postComma.toString().substr(1, decimalSpaces) + suffixChoice[logResult];
        } else {
            return preComma.toString() + seperator + postComma.toString().substr(1, decimalSpaces) + "e" + Math.floor(Math.log10(input));
        }

    }
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