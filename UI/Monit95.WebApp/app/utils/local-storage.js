"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearLocalStorage = exports.setToLocalStorage = exports.removeFromLocalStorage = exports.getFromLocalStorage = void 0;
/**
 * Gets keys value from storage
 * @param {string} key in local storage
 * @returns {any}
 */
function getFromLocalStorage(key) {
    var value = localStorage.getItem(key);
    try {
        return JSON.parse(value);
    }
    catch (e) {
        return value;
    }
}
exports.getFromLocalStorage = getFromLocalStorage;
/**
 * Removes key with value from storage
 * @param {string} key
 */
function removeFromLocalStorage(key) {
    key = Array.isArray(key) ? key : [key];
    key.map(function (k) { return localStorage.removeItem(k); });
}
exports.removeFromLocalStorage = removeFromLocalStorage;
/**
 * Sets the key to storage with given values
 * @param {string} key will be saved in local storage
 * @param data
 */
function setToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    }
    catch (e) {
        localStorage.setItem(key, data);
    }
}
exports.setToLocalStorage = setToLocalStorage;
/**
 * Clear local storage
 */
function clearLocalStorage() {
    localStorage.clear();
}
exports.clearLocalStorage = clearLocalStorage;
//# sourceMappingURL=local-storage.js.map