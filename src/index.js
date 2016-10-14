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

    map(callback) {

        const returnVal = [];
        this.forEach((value, key) => returnVal.push(callback(value, key, this)));

        return returnVal;
    }

    reduce(callback, initialValue) {

        let previousValue = initialValue;
        this.forEach((value, key) => {

            previousValue = callback(previousValue, value, key, this);
        });

        return previousValue;
    }
}

exports = module.exports = BetterMap;
