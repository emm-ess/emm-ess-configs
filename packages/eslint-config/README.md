# Shared Eslint Config

For being able to not having to install every dependency again, you should add the following line to the eslint-config:

```js
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-patch/modern-module-resolution')
```

[More info](https://www.npmjs.com/package/@rushstack/eslint-patch)
