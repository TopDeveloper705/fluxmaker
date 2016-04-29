import createCSSPipeline from './css';

export function loadPipelines(cli) {
  const css = createCSSPipeline(cli);

  return {
    css
  };
}
