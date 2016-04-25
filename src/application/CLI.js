import { loadDefaultTasks, executeTask } from '../tasks';

class CLI {
  constructor({ application, gulp }) {
    this.application = application;
    this.gulp = gulp;
  }

  start() {
    this.application.initialize()
      .then(() => this.initializeTasks())
      .then(() => this.executeTask());
  }

  initializeTasks() {
    loadDefaultTasks(this);
  }

  executeTask() {
    executeTask(this);
  }

  task(...args) {
    this.gulp.task(...args);
  }
}

export default CLI;
