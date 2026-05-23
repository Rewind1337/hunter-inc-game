
// actually copy the contents of a jsobj into a new object, not whatever it usually does
// do not use this when theres functions saved in the objects, they get lost
function deepCopy(obj) { return JSON.parse(JSON.stringify(obj)) }

// this is for you to make fancy lmao
function niceFormat(number, decimalSpaces = 0, seperator = ".") {
    return number.toFixed(decimalSpaces).replace(".", seperator)
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