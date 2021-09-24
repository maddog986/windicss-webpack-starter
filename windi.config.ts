export default {
    extract: {
        // A common use case is scanning files from the root directory
        include: ['**/*.{vue,html,jsx,tsx,js}'],
        // if you are excluding files, make sure you always include node_modules and .git
        exclude: ['node_modules', '.git', 'dist'],
    }
}
