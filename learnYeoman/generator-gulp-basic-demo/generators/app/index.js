'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the pioneering ${chalk.red('generator-gulp-basic-demo')} generator!`)
    );

    const prompts = [
      {
        type: 'confirm',
        // 1
        name: 'install',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      // 2
      // 复制所有templates中的文件
      this.templatePath('**'),
      this.destinationPath('./')
    );
  }

  // 3
  install() {
    this.installDependencies({
      bower: false
    });
  }
};
