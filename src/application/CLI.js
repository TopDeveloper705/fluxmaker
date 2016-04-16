import runSequence from 'run-sequence';

import initializeTasks from '../tasks';

class CLI {
  constructor({ application, gulp }) {
    this.application = application;
    this.gulp = gulp;
    this.runSequence = runSequence.use(gulp);

    this.INITIALIZE_TASK = '» fmk:initialize';
    this.createInitializeTask();
  }

  createInitializeTask() {
    this.gulp.task(this.INITIALIZE_TASK, () => {
      if(this.initialized) {
        return;
      }

      this.initialized = true;

      return this.application.initialize()
        .then(() => this.initializeTasks());
    });
  }

  initializeTasks() {
    initializeTasks(this);
  }

  task(name, deps, task) {
    const internalName = `» ${name}`;
    let dependencies = deps;

    if(Array.isArray(dependencies)) {
      dependencies = dependencies.map((dep) => `» ${dep}`);
    }

    this.gulp.task(internalName, dependencies, task);

    this.gulp.task(name, (callback) => {
      const tasks = [internalName, callback];

      if(!this.initialized) {
        tasks.unshift(this.INITIALIZE_TASK);
      }

      this.runSequence(...tasks);
    });
  }
}

export default CLI;
