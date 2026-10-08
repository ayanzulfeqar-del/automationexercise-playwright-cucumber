module.exports = {
  default: {
    paths: ['tests/features/*.feature'],
    require: [
      'tests/step_definitions/*.js',
      'tests/support/*.js',
    ],
    format: ['progress', 'html:cucumber-report.html'],
  },
};
