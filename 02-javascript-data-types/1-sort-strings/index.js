/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */

export function sortStrings(arr, param = 'asc') {

    const arrCopy = [...arr];

    if (param === 'asc') {
        return arrCopy.sort((a, b) => {
            if (a.localeCompare(b, 'ru-RU', { sensitivity: 'base' }) <= 0) {
                return -1;
            } else {
                return 1;
            }
        });
    } else if (param === 'desc') {
        return arrCopy.sort((a, b) => {
            if (a.localeCompare(b, 'ru-RU', { sensitivity: 'base' }) >= 0) {
                return -1;
            } else {
                return 1;
            }
        });
    } else {
        throw new Error('Invalid order');
    }
}
