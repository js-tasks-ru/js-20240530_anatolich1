/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    const parts = path.split('.');
    return function (obj) {
        let current = obj;
        for (let i = 0; i < parts.length; i++) {
            if (current === null || current === undefined || !Object.prototype.hasOwnProperty.call(current, parts[i])) {
                return undefined;
            }
            current = current[parts[i]];
        }
        return current;
    };

}



