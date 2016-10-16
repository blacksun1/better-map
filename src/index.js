'use strict';


class BetterMap extends Map {

    constructor(iterable) {

        super(iterable);
    }

    entriesArray() {

        return Array.from(this);
    }

    keysArray() {

        return Array.from(this.keys());
    }

    valuesArray() {

        return Array.from(this.values());
    }

    map(callback, thisArg) {

        const returnVal = [];
        for (const entry of this) {
            const key = entry[0];
            const value = entry[1];
            returnVal.push(callback.call(thisArg, value, key, this));
        }

        return returnVal;
    }

    reduce(callback, initialValue) {

        let previousValue = initialValue;
        for (const entry of this) {
            const key = entry[0];
            const value = entry[1];
            previousValue = callback.call(null, previousValue, value, key, this);
        }

        return previousValue;
    }

    some(callback, thisArg) {

        for (const entry of this) {
            const key = entry[0];
            const value = entry[1];
            if (callback.call(thisArg, value, key, this)) {
                return true;
            }
        }

        return false;
    }

    filter(callback, thisArg) {

        const returnVal = new BetterMap();
        for (const entry of this) {
            const key = entry[0];
            const value = entry[1];
            if (callback.call(thisArg, value, key, this)) {
                returnVal.set(key, value);
            }
        }

        return returnVal;
    }
}

exports = module.exports = BetterMap;
