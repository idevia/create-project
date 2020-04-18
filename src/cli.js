import arg from 'arg'
import inquirer from 'inquirer';
import { createProject } from './main';

function parseArgumentsInOptions(rawArguments) {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--no-install': Boolean,
      '--version': Boolean,
      '--template': String,
      '-t': '--template',
      '-v': '--version',
      '-y': '--yes'
    },
    {
      argv: rawArguments.splice(2)
    }
  );

  return {
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    name: args._[0],
    template: args['--template'],
    noInstall: args['--no-install'] || false,
  }
}

const choices = [
  'express-api',
  'html'
]

async function promptForMissingOptions(options) {
  const defaultTemplate = 'express-api';

  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate
    }
  }

  const questions = [];

  if (!options.name) {

    questions.push({
      name: "name",
      type: "input",
      message: "what is the name of your project?\n",
      validate: function (input) {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        else
          return "Project name may only include letters, numbers, underscores and hashes.";
      }
    })
  }


  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose a template to use',
      choices,
    })
  }

  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize a git repository?',
      default: true
    })
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git
  };
}

export async function cli(args) {
  let options = parseArgumentsInOptions(args);
  options = await promptForMissingOptions(options)
  await createProject(options)
}