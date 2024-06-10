/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    if (size == undefined) return string;
    const arr = string.split('');
    let ch = arr[0];
    let result = '';
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (ch === arr[i] && count < size) {
            result += ch;
            count++;
        }
        if (i + 1 <= arr.length - 1) {
            ch = arr[i + 1];
            if (arr[i] !== arr[i + 1])
                count = 0;
        }
    }
    return result;
}

