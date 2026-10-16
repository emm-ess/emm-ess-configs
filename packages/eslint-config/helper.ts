import path from 'node:path'

import {includeIgnoreFile} from 'eslint/config'

export {default as globals} from 'globals'

/**
files the JS/TS-only plugins (unicorn, sonarjs, import-x, …) get applied to;
use it for your own rule overrides
*/
export const scriptFiles = [
    '**/*.?(c|m)js?(x)',
    '**/*.?(c|m)ts?(x)',
    '**/*.vue',
]

export function addGitIgnore(gitIgnoreDirectory: string) {
    const gitignorePath = path.resolve(gitIgnoreDirectory, '.gitignore')
    return includeIgnoreFile(gitignorePath, {
        name: 'Imported .gitignore patterns',
        gitignoreResolution: true,
    })
}
