"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empty = void 0;
const empty = (val) => {
    const valString = val.toString();
    if (val == undefined || val == null) {
        return false;
    }
    if (valString.trim().length == 0) {
        return true;
    }
    return false;
};
exports.empty = empty;
