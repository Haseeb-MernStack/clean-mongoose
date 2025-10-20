"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanObject = cleanObject;
exports.clean = clean;
const defaultOptions = {
    convertId: true,
    removeV: true,
    removePassword: true,
    removeUnderscoreFields: false,
    extraRemove: []
};
function isObject(val) {
    return typeof val === "object" && val !== null && !Array.isArray(val);
}
/**
 * Clean a single object (recursively) according to options.
 */
function cleanObject(obj, opts) {
    if (!isObject(obj))
        return obj;
    const result = {};
    for (const key of Object.keys(obj)) {
        const val = obj[key];
        // Remove __v
        if (opts.removeV && key === "__v")
            continue;
        // Remove password
        if (opts.removePassword && key.toLowerCase() === "password")
            continue;
        // Remove extraRemove fields
        if (opts.extraRemove.includes(key))
            continue;
        // Remove keys starting with underscore
        if (opts.removeUnderscoreFields && key.startsWith("_"))
            continue;
        // convert _id to id
        if (opts.convertId && key === "_id") {
            // Keep primitive or object (mongoose ObjectId has toString)
            if (val && typeof val.toString === "function") {
                result["id"] = typeof val === "object" ? val.toString() : val;
            }
            else {
                result["id"] = val;
            }
            continue;
        }
        // Recurse for arrays
        if (Array.isArray(val)) {
            result[key] = val.map((item) => {
                if (isObject(item))
                    return cleanObject(item, opts);
                return item;
            });
            continue;
        }
        // Recurse for nested objects
        if (isObject(val)) {
            result[key] = cleanObject(val, opts);
            continue;
        }
        // Primitive values
        result[key] = val;
    }
    return result;
}
/**
 * Clean a value: document, array, or plain.
 */
function clean(value, options) {
    const opts = { ...defaultOptions, ...(options || {}) };
    if (Array.isArray(value)) {
        return value.map((v) => (isObject(v) ? cleanObject(v, opts) : v));
    }
    if (isObject(value)) {
        return cleanObject(value, opts);
    }
    return value;
}
exports.default = clean;
