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
        this.forEach((value, key) => {

            returnVal.push(callback.call(thisArg, value, key, this));
        });

        return returnVal;
    }

    reduce(callback, initialValue) {

        let previousValue = initialValue;
        this.forEach((value, key) => {

            previousValue = callback.call(null, previousValue, value, key, this);
        });

        return previousValue;
    }
}

exports = module.exports = BetterMap;
