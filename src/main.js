import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import execa from 'execa';
import Listr from 'listr';
import fse from 'fs-extra';
import { projectInstall } from 'pkg-install';

const access = promisify(fs.access);
const copy = promisify(ncp);

const CURR_DIR = process.cwd();

async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: `${CURR_DIR}/${options.name}`
  });

  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize Git'));
  }
  return;
}

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false
  })
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: `${CURR_DIR}/${options.name}`
  };

  const templateDir = path.resolve(
    __dirname,
    '../templates',
    options.template.toLowerCase()
  );
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: 'Generate project files',
      task: () => copyTemplateFiles(options)
    },
    {
      title: 'Initializing Git',
      task: () => initGit(options),
      enabled: () => options.git
    },
    {
      title: 'Installing dependencies',
      task: () => projectInstall({
        cwd: options.targetDirectory
      }),
      skip: () => options.noInstall
    }
  ])

  try {
    await tasks.run();
  } catch (err) {
    fse.emptyDirSync(options.targetDirectory);
    fse.removeSync(options.targetDirectory);
    throw err;
  }

  console.log('%s Project is ready', chalk.green.bold('DONE'));
  return true;
}