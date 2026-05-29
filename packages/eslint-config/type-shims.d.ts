declare module 'eslint-plugin-json' {
    import type {Linter} from 'eslint'

    export const configs: Record<'recommended' | 'recommended-with-comments', Linter.Config>
}
