module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        '@nuxtjs/eslint-config-typescript',
        'plugin:nuxt/recommended',
        'prettier',
    ],
    plugins: [],
    // add your custom rules here
    rules: {
        'no-console': ["warn", { allow: ["warn", "error"] }],
        "vue/multi-word-component-names": ["error", {
            "ignores": ["components/**/*"]
        }]
    },
    overrides: [
        {
            files: ['pages/**', 'components/*/**'],
            rules: {
                'vue/multi-word-component-names': 'off',
            },
        },
    ]
}
