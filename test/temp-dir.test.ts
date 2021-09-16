/* eslint-disable max-lines-per-function */

import * as fs from 'fs';
import * as os from 'os';

import bytes from 'bytes';
import { expect } from 'chai';
import rimraf from 'rimraf';

import { tempDir, tempDirWithFiles } from '../src/index';

const powSum = (n = 3, x = 3): number => {
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    sum += Math.pow(x, i);
  }
  return sum;
};

describe('Folder', function () {
  describe('tempDir', function () {
    let name: string | undefined = undefined;

    let reEnd: RegExp;
    let reMatch: RegExp;

    beforeEach(function () {
      reEnd = process.platform === 'win32' ? /\\test-[\w\d_-]+$/ : /\/test-[\w\d_-]+$/;
      reMatch = process.platform === 'win32' ? /\\test-[\w\d_-]+-folder$/ : /\/test-[\w\d_-]+-folder$/;
    });

    afterEach(async function () {
      if (name !== undefined) {
        await fs.promises.rmdir(name);
        name = undefined;
      }
    });

    it(`calling tempDir() should create an empty directory in ${os.tmpdir()}`, async function () {
      const promise = tempDir();
      expect(promise instanceof Promise).to.be.true;

      name = (await promise) as string;
      const stat = await fs.promises.stat(name);

      expect(name.indexOf(os.tmpdir())).to.equal(0);
      expect(stat.isDirectory()).to.be.true;
    });

    it(`calling tempDir({}, callback) should create an empty directory in ${os.tmpdir()}`, function (done) {
      const promise = tempDir({}, (err: Error | null, dirName?: string) => {
        if (err) {
          throw err;
        }

        expect(dirName).to.be.an('string');

        name = dirName;
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        fs.promises.stat(dirName!).then((stat) => {
          expect(dirName!.indexOf(os.tmpdir())).to.equal(0);
          expect(stat.isDirectory()).to.be.true;

          done();
        });
        /* eslint-enable @typescript-eslint/no-non-null-assertion */
      });

      expect(promise).to.be.undefined;
    });

    it(`calling tempDir({pattern:'test-'}) should create an empty directory \
in ${os.tmpdir()} with name matching \${reEnd}`, async function () {
      name = (await tempDir({ pattern: 'test-' })) as string;

      expect(name).to.match(reEnd);
    });

    it(`calling tempDir({pattern:'test-*-folder'}) should create an empty directory \
in ${os.tmpdir()} with name matching \${reMatch}`, async function () {
      name = (await tempDir({ pattern: 'test-*-folder' })) as string;

      expect(name).to.match(reMatch);
    });

    it(`calling tempDir({dir: __dirname}) should create an empty directory in ${__dirname}`, async function () {
      name = (await tempDir({ dir: __dirname })) as string;

      expect(name.indexOf(__dirname)).to.equal(0);
    });

    it(`calling tempDir({default: true}) should throw an error because 'pattern' is not mentioned`, async function () {
      let err: Error | undefined = undefined;
      try {
        await tempDir({ default: true });
      } catch (e) {
        err = e as Error;
      }
      expect(err instanceof Error).to.be.true;
      expect((err as Error).toString()).to.equal('Error: invalid `options.pattern` value: please add pattern value');
    });

    it(`calling tempDir({default: true}, callback) should throw an error because 'pattern' \
is not mentioned`, function (done) {
      const promise = tempDir({ default: true }, (err: Error | null) => {
        expect(err instanceof Error).to.be.true;
        expect((err as Error).toString()).to.equal('Error: invalid `options.pattern` value: please add pattern value');

        done();
      });

      expect(promise).to.be.undefined;
    });

    it(`calling tempDir({default: true, pattern: 'test-'}) should create an empty directory \
in ${os.tmpdir()}`, async function () {
      const promise = tempDir({ default: true, pattern: 'test-' });
      expect(promise instanceof Promise).to.be.true;

      name = (await promise) as string;
      const stat = await fs.promises.stat(name);

      expect(name.indexOf(os.tmpdir())).to.equal(0);
      expect(stat.isDirectory()).to.be.true;
    });
  });

  describe('tempDirWithFiles', function () {
    let dwfResult: [string, string[], string[]] | undefined = undefined;
    let folderCount: number;
    let fileCount: number;

    beforeEach(function () {
      folderCount = powSum(3);
      fileCount = powSum(4) - 1;
    });

    afterEach(async function () {
      if (dwfResult !== undefined) {
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        await new Promise((resolve) => rimraf(dwfResult![0], {}, resolve));
        /* eslint-enable @typescript-eslint/no-non-null-assertion */
        dwfResult = undefined;
      }
    });

    it(`calling tempDirWithFiles() should create a directory \
in ${os.tmpdir()} with \${folderCount} folders and \${fileCount} files`, async function () {
      const promise = tempDirWithFiles({
        maxFileSize: '100b',
        pattern: 'tempjs-*',
      });
      expect(promise instanceof Promise).to.be.true;

      dwfResult = (await promise) as [string, string[], string[]];
      expect(dwfResult[0].indexOf(os.tmpdir())).to.equal(0);

      for (const dir of dwfResult[1]) {
        const stat = await fs.promises.stat(dir);
        expect(stat.isDirectory()).to.be.true;
      }

      for (const file of dwfResult[2]) {
        const stat = await fs.promises.stat(file);
        expect(stat.isFile()).to.be.true;
        expect(stat.size).to.equal(bytes('100b'));
      }

      expect(dwfResult[1].length).to.equal(folderCount);

      expect(dwfResult[2].length).to.equal(fileCount);
    });

    it(`calling tempDirWithFiles({}, callback) should create a directory \
in ${os.tmpdir()} with \${folderCount} folders and \${fileCount} files`, function (done) {
      const promise = tempDirWithFiles(
        {
          maxFileSize: '100b',
          pattern: 'tempjs-*',
        },
        (err: Error | null, result?: [string, string[], string[]]) => {
          if (err) {
            throw err;
          }

          expect(result).to.be.an('array');

          dwfResult = result;
          /* eslint-disable @typescript-eslint/no-non-null-assertion */
          expect(dwfResult![0].indexOf(os.tmpdir())).to.equal(0);

          expect(dwfResult![1].length).to.equal(folderCount);

          expect(dwfResult![2].length).to.equal(fileCount);
          /* eslint-enable @typescript-eslint/no-non-null-assertion */

          done();
        },
      );

      expect(promise).to.be.undefined;
    });

    it(`calling tempDirWithFiles({randomize: true}) should create a directory \
in ${os.tmpdir()} with less than \${folderCount} folders and less than \${fileCount} files`, async function () {
      const promise = tempDirWithFiles({
        maxFileSize: '100b',
        pattern: 'tempjs-*',
        randomize: true,
      });
      expect(promise instanceof Promise).to.be.true;

      dwfResult = (await promise) as [string, string[], string[]];
      expect(dwfResult[0].indexOf(os.tmpdir())).to.equal(0);

      for (const dir of dwfResult[1]) {
        const stat = await fs.promises.stat(dir);
        expect(stat.isDirectory()).to.be.true;
      }

      for (const file of dwfResult[2]) {
        const stat = await fs.promises.stat(file);
        expect(stat.isFile()).to.be.true;
        expect(stat.size).to.lessThan(bytes('100b'));
      }

      expect(dwfResult[1].length).to.be.lessThan(folderCount);

      expect(dwfResult[2].length).to.be.lessThan(fileCount);
    });
  });
});

/* eslint-enable max-lines-per-function */
