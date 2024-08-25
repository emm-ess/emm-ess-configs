# Shared Eslint Config

typeChecked needs additional config
```
    {
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
```
