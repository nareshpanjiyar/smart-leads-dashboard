module.exports = {
  ignoreFiles: ['src/index.css'],
  extends: 'stylelint-config-standard',
  rules: {
    // allow Tailwind's at-rules
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen'],
      },
    ],
  },
};
