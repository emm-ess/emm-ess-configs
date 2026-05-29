import path from 'node:path'

import {includeIgnoreFile} from '@eslint/config-helpers'

export {default as globals} from 'globals'

export function addGitIgnore(gitIgnoreDir: string) {
    const gitignorePath = path.resolve(gitIgnoreDir, '.gitignore')
    return includeIgnoreFile(gitignorePath, {
        gitignoreResolution: true,
    })
}
