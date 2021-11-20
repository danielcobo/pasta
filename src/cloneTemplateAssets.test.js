const cloneTemplateAssets = require('./cloneTemplateAssets.js');
const fs = require('@danielcobo/fs');

beforeEach(async function () {
  const mockPaths = [
    './tmpTest/template/somefile.asset',
    './tmpTest/template/some/file.asset',
    './tmpTest/template/somefile.scss',
    './tmpTest/template/somefile.css',
    './tmpTest/template/somefile.js',
    './tmpTest/template/somefile.ts',
  ];

  await Promise.all(
    mockPaths.map(async function (mockPath) {
      return fs.mk(mockPath, 'hello world');
    })
  );
});

afterEach(async function () {
  await fs.rm('./tmpTest');
});

test('Test cloneTemplateAssets', async function () {
  const tree = await fs.read('./tmpTest/template');
  await cloneTemplateAssets(tree, './tmpTest/public');
  const actualClones = await fs.read('./tmpTest/public');
  const expectedClones = ['somefile.asset', 'some/file.asset'];
  expect(actualClones.pruned.files).toStrictEqual(expectedClones);
});
