# Shared Eslint Config

typeChecked needs additional config
```json lines
{
    languageOptions: {
        parserOptions: {
            project: true,
            tsconfigRootDir: import.meta.dirname,
        },
    },
}
```
