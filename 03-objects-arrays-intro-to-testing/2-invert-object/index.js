/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
    if (!obj || typeof obj !== 'object') {
        return undefined;
    }
    const inverted = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            inverted[obj[key]] = key;
        }
    }
    return inverted;
}


