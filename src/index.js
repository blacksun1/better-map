'use strict';

// Imports
const Assert = require('assert');


// Internals
const internals = {};

internals.mapToObject = function mapToObject(obj) {

    Assert(obj instanceof Map, 'Must be a Map');
    const returnVal = {};

    for (const entry of obj) {
        const key = entry[0];
        const value = entry[1];

        Assert(typeof key === 'string', 'mapToObject can not convert a Map that contains non string keys');

        returnVal[key] = value;
    }

    return returnVal;
};

internals.setToArray = function setToArray(obj) {

    Assert(obj instanceof Set, 'Must be a Set');
    const returnVal = [];

    for (const value of obj) {
        returnVal.push(value);
    }

    return returnVal;
};

internals.stringifyMapReplacer = function stringifyMapReplacer(key, value) {

    if (value instanceof Map) {
        return internals.mapToObject(value);
    }

    if (value instanceof Set) {
        return internals.setToArray(value);
    }

    return value;
};


class BetterMap extends Map {

    constructor(iterable) {

        super(iterable);
    }

    entriesArray() {

        return Array.from(this);
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

    keysArray() {

        return Array.from(this.keys());
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

    stringify() {

        return JSON.stringify(this.toObject(), internals.stringifyMapReplacer);
    }

    toObject() {

        return internals.mapToObject(this);
    }

    valuesArray() {

        return Array.from(this.values());
    }
}

exports = module.exports = BetterMap;
