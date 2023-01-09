"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyObject = exports.emptyArray = exports.empty = void 0;
const empty = (val) => {
    const valString = val.toString();
    if (val == undefined || val == null) {
        return true;
    }
    if (valString.trim().length == 0) {
        return true;
    }
    return false;
};
exports.empty = empty;
const emptyArray = (arr) => {
    if (arr.length > 0)
        return false;
    return true;
};
exports.emptyArray = emptyArray;
const emptyObject = (obj) => {
    if (Object.getOwnPropertyNames(obj).length > 0)
        return false;
    return true;
};
exports.emptyObject = emptyObject;
