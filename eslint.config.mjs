import eslintConfigNext from 'eslint-config-next'

export default [
  eslintConfigNext,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]
