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
/**
 * Clean a single object (recursively) according to options.
 */
export declare function cleanObject(obj: Record<string, any>, opts: Required<CleanOptions>): any;
/**
 * Clean a value: document, array, or plain.
 */
export declare function clean<T = any>(value: T | T[], options?: CleanOptions): any;
export default clean;
