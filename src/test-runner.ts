import clean from "./index";

const sample = {
    _id: { toString: () => "64c1c1a1b2c3d4e5f6" },
    name: "Ali",
    password: "secret",
    __v: 3,
    profile: {
        _id: "nestedid",
        bio: "hello",
        _privateNote: "should remain or not"
    },
    tags: [
        { _id: "t1", label: "tag1" },
        { _id: "t2", label: "tag2" }
    ],
    _internal: "keep?"
};

console.log("Default clean:");
console.log(JSON.stringify(clean(sample), null, 2));

console.log("\nClean with removeUnderscoreFields=true:");
console.log(JSON.stringify(clean(sample, { removeUnderscoreFields: true }), null, 2));
