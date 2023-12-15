import * as path from 'path';

export const getRelativePath = (
  target: string,
  current: string,
  projectRoot: string,
) => {
  const nodeModules = `${projectRoot}/node_modules/`;
  if (target.startsWith(nodeModules)) {
    return target.replace(nodeModules, '');
  }

  if (!target.startsWith(projectRoot)) {
    return target;
  }

  const relative = path
    .relative(current.replace(/\/[^/]+$/, ''), target);

  if (!relative.startsWith('..')) {
    return `./${relative}`;
  }

  if (relative.endsWith('..')) {
    return `${relative}/`;
  }

  return relative;
};
