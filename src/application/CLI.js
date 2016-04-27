import { loadDefaultTasks, executeTask, loadPipelines } from '../tasks';

class CLI {
  constructor({ application, gulp }) {
    this.application = application;
    this.gulp = gulp;
  }

  start() {
    this.application.initialize()
      .then(() => this.initializeTasks())
      .then(() => this.initializePipelines())
      .then(() => this.prePipelines())
      .then(() => this.postPipelines())
      .then(() => this.closePipelines())
      .then(() => this.executeTask())
      .catch((error) => {
        throw error;
      });
  }

  initializeTasks() {
    loadDefaultTasks(this);
  }

  initializePipelines() {
    this._pipelines = loadPipelines(this);
  }

  prePipelines() {
    const application = this.application;

    return this.application.emitAsync('assets:pre', { application, cli: this });
  }

  postPipelines() {
    const application = this.application;

    return this.application.emitAsync('assets:post', { application, cli: this });
  }

  closePipelines() {
    const application = this.application;

    return this.application.emitAsync('assets:close', { application, cli: this });
  }

  executeTask() {
    executeTask(this);
  }

  task(...args) {
    this.gulp.task(...args);
  }

  pipeline(asset, pipe) {
    this._pipelines[asset].push(pipe);
  }
}

export default CLI;
