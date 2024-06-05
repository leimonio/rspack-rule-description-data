# Rspack Project
## (a reproduction of `descriptionData` issue)

When using `module.rules.descriptionData` for filtering rules based on the module `package.json` data, `descriptionData` won't match custom `package.json` keys.

## Setup + Run

```bash
pnpm install
pnpm run dev
```

## Reproduce issue

Try each of `descriptionData` separately, from the `rspack.config.js`


```bash
descriptionData: {
    // 1. this works
    version: (versionData) => {
        console.log("🚀 ~ file: rspack.config.js:97 ~ descriptionData:version", versionData);
        return true;
    },
    // 2. this doesn't work
    componentId: (componentIdData) => {
        console.log("🚀 ~ file: rspack.config.js:102 ~ descriptionData:componentId", componentIdData);
        return true;
    },
    // 3. this doesn't work
    "_custom_key": (customKeyData) => {
        console.log("🚀 ~ file: rspack.config.js:107 ~ descriptionData:_custom_key", customKeyData);
        return true;
    }
},

```

Custom `package.json` data:

```
"_custom_key": true,
"componentId": {
    "scope": "bitdev.react",
    "name": "examples/button",
    "version": "1.0.1"
},
```

## Expected behaviour

`descriptionData` rule filtering is applied for custom `package.json` data.