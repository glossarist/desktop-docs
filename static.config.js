import path from 'path'
import dirTree from 'directory-tree'
import fs from 'fs'
import yaml from 'js-yaml'

const DOCS_PATH = path.join(__dirname, 'docs');

export default {
  siteRoot: 'https://www.glossarist.org',
  entry: path.join(__dirname, 'src', 'index.tsx'),
  getRoutes: async () => {
    const docsTree = [dirTree(DOCS_PATH, { extensions:/\.yaml$/ })].map(dirEntryToDocsRoute);

    return [
      {
        path: 'desktop',
        template: 'src/containers/Desktop',
        children: docsTree,
      },
    ];
  },
  plugins: [
    'react-static-plugin-typescript',
    'react-static-plugin-styled-components',
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
  ],
}

function dirEntryToDocsRoute(entry) {
  const route = {
    path: `${path.basename(entry.name, '.yaml').replace(/index$/g, '') || '/'}`,
    children: entry.type !== 'file'
      ? entry.children.filter(c => c.name !== 'index.yaml' && c.name[0] !== '.').map(dirEntryToDocsRoute)
      : undefined,
    template: 'src/containers/DesktopDocPage',
    getData: async () => ({
      docPage: {
        id: entry.name,
        subpages: entry.type !== 'file'
          ? await Promise.all((entry.children || []).filter(e => e.name !== 'index.yaml' && e.name[0] !== '.').map(async (e) => {
              const _path = e.type === 'file' ? e.path : `${e.path}/index.yaml`;
              return {
                title: (await yaml.load(
                  fs.readFileSync(_path, { encoding: 'utf-8' })
                )).title || '',
                path: path.basename(e.name, '.yaml'),
              }
            }))
          : undefined,
        data: entry.type === 'file'
          ? await yaml.load(fs.readFileSync(entry.path, { encoding: 'utf-8' }))
          : await yaml.load(fs.readFileSync(`${entry.path}/index.yaml`, { encoding: 'utf-8' })),
      },
    }),
  };
  return route;
}