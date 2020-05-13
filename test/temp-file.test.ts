import * as fs from 'fs';

import * as os from 'os';

import bytes from 'bytes';

import {expect} from 'chai';

import {FileHandle, tempFile, tempFileOfSize} from '../src/index';

describe('File', () => {
  describe('tempFile', function () {
    let fh: FileHandle | undefined = undefined;

    const reEnd = process.platform === 'win32' ? /\\test-[\w\d_\-]+$/ : /\/test-[\w\d_\-]+$/;
    const reMatch = process.platform === 'win32' ? /\\test-[\w\d_\-]+\.txt$/ : /\/test-[\w\d_\-]+\.txt$/;

    // beforeEach(() => {});

    afterEach(async () => {
      if (fh !== undefined) {
        fh.close();
        await fs.promises.unlink(fh.name);
        fh = undefined;
      }
    });

    it(`calling tempFile() should create an empty file in ${os.tmpdir()}`, async () => {
      const promise = tempFile();
      expect(promise instanceof Promise).to.be.true;

      fh = (await promise) as FileHandle;
      const stat = await fs.promises.stat(fh.name);

      expect(fh.name.indexOf(os.tmpdir())).to.equal(0);
      expect(stat.isFile()).to.be.true;
      expect(stat.size).to.equal(0);
    });

    it(`calling tempFile({}, callback) should create an empty file in ${os.tmpdir()}`, (done) => {
      const promise = tempFile({}, (err: Error | null, handle?: FileHandle) => {
        if (err) throw err;

        expect(handle).to.be.an('object');

        fh = handle;
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        fs.promises.stat(fh!.name).then((stat) => {
          expect(fh!.name.indexOf(os.tmpdir())).to.equal(0);
          expect(stat.isFile()).to.be.true;
          expect(stat.size).to.equal(0);

          done();
        });
        /* eslint-enable @typescript-eslint/no-non-null-assertion */
      });

      expect(promise).to.be.undefined;
    });

    it(`calling tempFile({pattern:'test-'}) should create an empty file in ${os.tmpdir()} with name matching ${reEnd}`, async () => {
      fh = (await tempFile({pattern: 'test-'})) as FileHandle;

      expect(fh.name).to.match(reEnd);
    });

    it(`calling tempFile({pattern:'test-*.txt'}) should create an empty file in ${os.tmpdir()} with name matching ${reMatch}`, async () => {
      fh = (await tempFile({pattern: 'test-*.txt'})) as FileHandle;

      expect(fh.name).to.match(reMatch);
    });

    it(`calling tempFile({dir: __dirname}) should create an empty file in ${__dirname}`, async () => {
      fh = (await tempFile({dir: __dirname})) as FileHandle;

      expect(fh.name.indexOf(__dirname)).to.equal(0);
    });
  });

  describe('tempFileOfSize', function () {
    let fh: FileHandle | undefined = undefined;

    // beforeEach(() => {});

    afterEach(async () => {
      if (fh !== undefined) {
        fh.close();
        await fs.promises.unlink(fh.name);
        fh = undefined;
      }
    });

    it(`calling tempFileOfSize({size: '1Mb'}) should create a file of 1Mb`, async () => {
      const promise = tempFileOfSize({size: '1Mb'});
      expect(promise instanceof Promise).to.be.true;

      fh = (await promise) as FileHandle;
      const stat = await fs.promises.stat(fh.name);
      expect(stat.size).to.equal(bytes('1Mb'));
    });

    it(`calling tempFileOfSize({size: '1Mb'}, callback) should create a file of 1Mb`, (done) => {
      const promise = tempFileOfSize({size: '1Mb'}, (err: Error | null, handle?: FileHandle) => {
        if (err) throw err;

        expect(handle).to.be.an('object');

        fh = handle;
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        fs.promises.stat(fh!.name).then((stat) => {
          expect(stat.size).to.equal(bytes('1Mb'));

          done();
        });
        /* eslint-enable @typescript-eslint/no-non-null-assertion */
      });

      expect(promise).to.be.undefined;
    });

    it(`calling tempFileOfSize({size: '20Mb'}) should create a file of 20Mb`, async () => {
      const promise = tempFileOfSize({size: '20Mb'});
      expect(promise instanceof Promise).to.be.true;

      fh = (await promise) as FileHandle;
      const stat = await fs.promises.stat(fh.name);
      expect(stat.size).to.equal(bytes('20Mb'));
    });

    it(`calling tempFileOfSize({size: 'sadfds'}) should create a file of 0 bytes`, async () => {
      const promise = tempFileOfSize({size: 'sadfds'});
      expect(promise instanceof Promise).to.be.true;

      fh = (await promise) as FileHandle;
      const stat = await fs.promises.stat(fh.name);
      expect(stat.size).to.equal(0);
    });
  });
});
