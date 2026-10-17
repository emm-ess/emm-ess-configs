import {defineConfig} from 'eslint/config'
import compat from 'eslint-plugin-compat'

import {scriptFiles} from './helper.js'

// add-on for code running in the browser: checks web APIs against the project's browserslist
export default defineConfig({
    name: 'emm-ess-config/browser',
    files: scriptFiles,
    extends: [compat.configs['flat/recommended']],
})
