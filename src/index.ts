export type CleanOptions = {
    /**
     * Convert _id => id. Default true.
     */
    convertId?: boolean;
    /**
     * Remove __v. Default true.
     */
    removeV?: boolean;
    /**
     * Remove properties named "password". Default true.
     */
    removePassword?: boolean;
    /**
     * Remove properties that start with underscore (e.g. _private). Default false.
     */
    removeUnderscoreFields?: boolean;
    /**
     * A set of extra field names to remove (top-level names or nested). Default [].
     */
    extraRemove?: string[];
};

const defaultOptions: Required<CleanOptions> = {
    convertId: true,
    removeV: true,
    removePassword: true,
    removeUnderscoreFields: false,
    extraRemove: []
};

function isObject(val: unknown): val is Record<string, unknown> {
    return typeof val === "object" && val !== null && !Array.isArray(val);
}

/**
 * Clean a single object (recursively) according to options.
 */
export function cleanObject(obj: Record<string, any>, opts: Required<CleanOptions>): any {
    if (!isObject(obj)) return obj;

    const result: Record<string, any> = {};

    for (const key of Object.keys(obj)) {
        const val = obj[key];

        // Remove __v
        if (opts.removeV && key === "__v") continue;
        // Remove password
        if (opts.removePassword && key.toLowerCase() === "password") continue;
        // Remove extraRemove fields
        if (opts.extraRemove.includes(key)) continue;
        // Remove keys starting with underscore
        if (opts.removeUnderscoreFields && key.startsWith("_")) continue;

        // convert _id to id
        if (opts.convertId && key === "_id") {
            // Keep primitive or object (mongoose ObjectId has toString)
            if (val && typeof (val as any).toString === "function") {
                result["id"] = typeof val === "object" ? (val as any).toString() : val;
            } else {
                result["id"] = val;
            }
            continue;
        }

        // Recurse for arrays
        if (Array.isArray(val)) {
            result[key] = val.map((item) => {
                if (isObject(item)) return cleanObject(item as Record<string, any>, opts);
                return item;
            });
            continue;
        }

        // Recurse for nested objects
        if (isObject(val)) {
            result[key] = cleanObject(val as Record<string, any>, opts);
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
export function clean<T = any>(value: T | T[], options?: CleanOptions): any {
    const opts: Required<CleanOptions> = { ...defaultOptions, ...(options || {}) };

    if (Array.isArray(value)) {
        return value.map((v) => (isObject(v) ? cleanObject(v as Record<string, any>, opts) : v));
    }

    if (isObject(value)) {
        return cleanObject(value as Record<string, any>, opts);
    }

    return value;
}

export default clean;
