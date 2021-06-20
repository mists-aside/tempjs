import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import bytes from 'bytes';
import crs from 'crypto-random-string';
import * as shortid from 'shortid';

/**
 * Enhancement of the [fs.promises.FileHandle](https://nodejs.org/api/fs.html#fs_class_filehandle), which is a wrapper
 * for a numeric file descriptor. Instances of FileHandle are distinct from numeric file descriptors in that they
 * provide an object oriented API for working with files.
 *
 * Read more about FileHandles at [NodeJs.org](https://nodejs.org/api/fs.html#fs_class_filehandle)
 */
export class FileHandle implements fs.promises.FileHandle {
  /**
   * Constructor of the FileHandle. Private. Use `create()` method instead.
   *
   * @param filename Name of created file
   * @param filehandle NodeJs stored [fs.promises.FileHandle](https://nodejs.org/api/fs.html#fs_class_filehandle)
   * @param fd See [fs.promises.FileHandle.fd](https://nodejs.org/api/fs.html#fs_filehandle_fd)
   */
  private constructor(private filename: string, private filehandle: fs.promises.FileHandle, public fd: number) {}

  /**
   * Asynchronous file create that returns a Promise that, when resolved, yields a FileHandle object.
   *
   * File will be created and opened with 'w+' flag
   * (see [support of file system flags](https://nodejs.org/api/fs.html#fs_file_system_flags)) and 0o666 mode.
   *
   * ``` typescript
   * const fh = FileHandle.create('/tmp/new-file.txt')
   * ```
   *
   * @param filename Name of the file to create.
   */
  public static async create(filename: string): Promise<FileHandle> {
    const filehandle = await fs.promises.open(filename, 'w+');
    return new FileHandle(filename, filehandle, filehandle.fd);
  }

  /**
   * Returns the default Nodejs [fs.promises.FileHandle](https://nodejs.org/api/fs.html#fs_class_filehandle) instance.
   */
  get fileHanle(): fs.promises.FileHandle {
    return this.filehandle;
  }

  /**
   * Returns the name of the created/opened file.
   */
  get name(): string {
    return this.filename;
  }

  /**
   * See [fs.promises.FileHandle.appendFile()](https://nodejs.org/api/fs.html#fs_filehandle_appendfile_data_options)
   */
  appendFile(
    data: string | Uint8Array,
    options?: (fs.BaseEncodingOptions & { mode?: fs.Mode; flag?: fs.OpenMode }) | BufferEncoding | null,
  ): Promise<void> {
    return this.filehandle.appendFile(data, options);
  }

  /**
   * See [fs.promises.FileHandle.chmod()](https://nodejs.org/api/fs.html#fs_filehandle_chmod_mode)
   */
  chmod(mode: string | number): Promise<void> {
    return this.filehandle.chmod(mode);
  }

  /**
   * See [fs.promises.FileHandle.chown()](https://nodejs.org/api/fs.html#fs_filehandle_chown_uid_gid)
   */
  chown(uid: number, gid: number): Promise<void> {
    return this.filehandle.chown(uid, gid);
  }

  /**
   * See [fs.promises.FileHandle.close()](https://nodejs.org/api/fs.html#fs_filehandle_close)
   */
  close(): Promise<void> {
    return this.filehandle.close();
  }

  /**
   * See [fs.promises.FileHandle.datasync()](https://nodejs.org/api/fs.html#fs_filehandle_datasync)
   */
  datasync(): Promise<void> {
    return this.filehandle.datasync();
  }

  /**
   * See [fs.promises.FileHandle.read()](https://nodejs.org/api/fs.html#fs_filehandle_read_buffer_offset_
   * length_position)
   */
  read<TBuffer extends Uint8Array>(
    buffer: TBuffer,
    offset?: number | null,
    length?: number | null,
    position?: number | null,
  ): Promise<{ bytesRead: number; buffer: TBuffer }> {
    return this.filehandle.read(buffer, offset, length, position);
  }

  /**
   * See [fs.promises.FileHandle.readFile()](https://nodejs.org/api/fs.html#fs_filehandle_readfile_options)
   */
  /* eslint-disable no-dupe-class-members */
  readFile(options?: { encoding?: null; flag?: fs.OpenMode } | null): Promise<Buffer>;
  readFile(options: { encoding: BufferEncoding; flag?: fs.OpenMode } | BufferEncoding): Promise<string>;
  readFile(
    options?: (fs.BaseEncodingOptions & { flag?: fs.OpenMode }) | BufferEncoding | null,
  ): Promise<string | Buffer> {
    return this.filehandle.readFile(options);
  }
  /* eslint-enable no-dupe-class-members */

  /**
   * See [fs.promises.FileHandle.readv()](https://nodejs.org/api/fs.html#fs_filehandle_readv_buffers_position)
   */
  readv(buffers: NodeJS.ArrayBufferView[], position?: number): Promise<fs.ReadVResult> {
    return this.filehandle.readv(buffers, position);
  }

  /**
   * See [fs.promises.FileHandle.stat()](https://nodejs.org/api/fs.html#fs_filehandle_stat_options)
   */
  stat(opts?: fs.StatOptions & { bigint?: false }): Promise<fs.Stats>;
  stat(opts: fs.StatOptions & { bigint: true }): Promise<fs.BigIntStats>;
  stat(opts?: fs.StatOptions): Promise<fs.Stats | fs.BigIntStats> {
    return this.filehandle.stat(opts);
  }

  /**
   * See [fs.promises.FileHandle.sync()](https://nodejs.org/api/fs.html#fs_filehandle_sync)
   */
  sync(): Promise<void> {
    return this.filehandle.sync();
  }

  /**
   * See [fs.promises.FileHandle.truncate()](https://nodejs.org/api/fs.html#fs_filehandle_sync)
   */
  truncate(len?: number): Promise<void> {
    return this.filehandle.truncate(len);
  }

  /**
   * See [fs.promises.FileHandle.utimes()](https://nodejs.org/api/fs.html#fs_filehandle_utimes_atime_mtime)
   */
  utimes(atime: string | number | Date, mtime: string | number | Date): Promise<void> {
    return this.filehandle.utimes(atime, mtime);
  }

  /**
   * See [fs.promises.FileHandle.write()](https://nodejs.org/api/fs.html#fs_filehandle_write_string_position_encoding)
   */
  // eslint-disable-next-line max-len
  // write<TBuffer extends Uint8Array>(buffer: TBuffer, offset?: number | null, length?: number | null, position?: number | null): Promise<{ bytesWritten: number, buffer: TBuffer }>;
  // eslint-disable-next-line max-len
  // write(data: any, position?: number | null, encoding?: string | null): Promise<{ bytesWritten: number, buffer: string }>;
  write(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    data: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    ...args: any
  ): Promise<{ bytesWritten: number; buffer: string }> {
    return this.filehandle.write(data, ...args);
  }

  /**
   * See [fs.promises.FileHandle.writeFile()](https://nodejs.org/api/fs.html#fs_filehandle_writefile_data_options)
   */
  writeFile(
    data: string | Uint8Array,
    options?: (fs.BaseEncodingOptions & { mode?: fs.Mode; flag?: fs.OpenMode }) | BufferEncoding | null,
  ): Promise<void> {
    return this.filehandle.writeFile(data, options);
  }

  /**
   * See [fs.promises.FileHandle.read()](https://nodejs.org/api/fs.html#fs_filehandle_writev_buffers_position)
   */
  writev(buffers: NodeJS.ArrayBufferView[], position?: number): Promise<fs.WriteVResult> {
    return this.writev(buffers, position);
  }
}

/**
 * Callback method can be used by `tempFile` when you don't want to return a Promise.
 *
 * @param err Error returned by `tempFile` call
 * @param file `FileHandle` returned by `tempFile` call
 */
export type TempFileValidationCallback = (err: Error | null, file?: FileHandle) => void;

/**
 * Options used by `tempFile` call, see description of the method.
 */
export interface TempFileOptions {
  /**
   * Path to the temporary location you wish to use.
   * If not mentioned, `[os.tmpdir()](https://nodejs.org/api/os.html#os_os_tmpdir)` will be used.
   */
  dir?: string;
  /**
   * Pattern used for generating the file name. If "*" is present in the given pattern, it will be replaced wotj the
   * unique token value; otherwise the unique token value will be added to the end of the pattern name.
   */
  pattern?: string;
}

/**
 * This is a rewrite of the GoLang [os.TempFile](https://golang.org/pkg/io/ioutil/#TempFile) method, with additional
 * functionality.
 *
 * tempFile creates a new temporary file in the directory dir, opens the file for reading and writing, and returns the
 * resulting `FileHandle`. The filename is generated by taking pattern and adding a random string to the end. If
 * pattern includes a "*", the random string replaces the last "*". If dir is the empty string, `tempFile` uses the
 * default directory for temporary files (see `os.tmpdir()`). Multiple programs calling `tempFile` simultaneously
 * will not choose the same file. The caller can use f.name to find the pathname of the file. It is the caller's
 * responsibility to remove the file when no longer needed.
 *
 * ```
 * // will create a temporary file using the OS temporary
 * // folder and a random token as filename
 * const fh = tempFile()
 *
 * // will create a temporary file using the OS temporary
 * // folder and a random token prefixed by 'tempjs_' as filename
 * const fh = tempFile({ patern: 'tempjs_' })
 *
 * // will create a temporary file using the OS temporary
 * // folder and a random token prefixed by 'tempjs_' and
 * // suffixed by '.txt' as filename
 * const fh = tempFile({ patern: 'tempjs_*.txt' })
 * ```
 *
 * @param {TempFileOptions} options Optional
 * @param {TempValidationCallback} callback Optional
 * @returns {Promise<TempFileInterface>|void} Returns Promise if callback is not defined, void if callback is defined.
 */
export const tempFile = (
  options?: TempFileOptions,
  callback?: TempFileValidationCallback,
): Promise<FileHandle> | void => {
  const localOptions = {
    dir: os.tmpdir(),
    pattern: '',
    ...(options || {}),
  };

  const name =
    localOptions.pattern.indexOf('*') >= 0
      ? localOptions.pattern.replace('*', shortid.generate())
      : localOptions.pattern + shortid.generate();

  const promise = FileHandle.create(path.join(localOptions.dir || __dirname, name));
  if (!callback) {
    return promise;
  }

  promise.then((fileHandler) => callback(null, fileHandler)).catch(callback);
};

type WriteOfSizeMethod = (fhos: FileHandle) => Promise<FileHandle>;

const generateWriteOfSize = (localOptions: {
  /**
   * Size of the created file defined as a string representing a number followe by the 'b', 'Kb', 'Mb', 'Gb', 'Tb',
   * 'Pb' sufixes.
   */
  size: string;
  dir: string;
  pattern: string;
}): WriteOfSizeMethod => {
  return async (fhos: FileHandle): Promise<FileHandle> => {
    let size = bytes(localOptions.size);

    const chunkSize = bytes('1Mb');

    while (size > chunkSize) {
      const written = await fhos.write(crs({ length: chunkSize /*, type: 'base64'*/ }), 'utf-8');
      if (written.bytesWritten !== chunkSize) {
        fhos.close();
        throw new Error(
          `error writing file: tried to write ${chunkSize} bytes, but only ${written.bytesWritten} were written`,
        );
      }
      size -= chunkSize;
    }

    if (size > 0) {
      const written = await fhos.write(crs({ length: size /*, type: 'base64'*/ }), 'utf-8');
      if (written.bytesWritten !== size) {
        fhos.close();
        throw new Error(
          `error writing file: tried to write ${size} bytes, but only ${written.bytesWritten} were written`,
        );
      }
    }
    return fhos;
  };
};

/**
 * Options used by `tempFileOfSize` call, see description of the method.
 */
export type TempFileOfSizeOptions = {
  /**
   * Size of the created file defined as a string representing a number followe by the 'b', 'Kb', 'Mb', 'Gb', 'Tb',
   * 'Pb' sufixes.
   */
  size: string;
} & TempFileOptions;

/**
 * tempFileOfSize behaves exactly like `tempFile`, however it will write random data in the file, of a mentioned size.
 * It is developer's responsibility to make sure size input is correct. See: https://www.npmjs.com/package/bytes for
 * behavior. File's write/read cursor will be at the end of file.
 *
 * ```javascript
 * // will create a temporary file of 50Mb
 * const fh = tempFileOfSize({ size: '50Mb' })
 * ```
 *
 * @param {TempFileOfSizeOptions} options Optional
 * @param {TempValidationCallback} callback Optional
 * @returns {Promise<TempFileInterface|void>} Returns Promise if callback is not defined, void if callback is defined.
 */
export const tempFileOfSize = (
  options: TempFileOfSizeOptions,
  callback?: TempFileValidationCallback,
): Promise<FileHandle> | void => {
  const localOptions = {
    dir: os.tmpdir(),
    pattern: '',
    ...options,
  };

  const writeOfSize = generateWriteOfSize(localOptions);

  if (!callback) {
    return (tempFile(options) as Promise<FileHandle>).then(writeOfSize);
  }

  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  tempFile(options, (err: Error | null, fhos?: FileHandle) => {
    if (err) {
      return callback(err);
    }
    writeOfSize(fhos!)
      .then((fh) => callback(null, fh))
      .catch(callback);
  });
  /* eslint-enable @typescript-eslint/no-non-null-assertion */
};

/**
 * Callback method can be used by `tempDir` when you don't want to return a Promise.
 *
 * @param err Error returned by `tempDir` call
 * @param name directory path returned by `tempDir` call
 */
export type TempDirValidationCallback = (err: Error | null, name?: string) => void;

/**
 * Options used by `tempDir` to create a temporary directory
 */
export type TempDirOptions = {
  /**
   * Let `tempDir` method know whether to use the NodeJs defined
   * [fs.promises.mkdtemp](https://nodejs.org/api/fs.html#fs_fs_mkdtemp_prefix_options_callback) method, or not.
   * Default false.
   */
  default?: boolean;
} & TempFileOptions;

const defaultTempDirOptions = {
  default: false,
  dir: os.tmpdir(),
  pattern: '',
};

/**
 * This is a rewrite of the GoLang [os.TempDir](https://golang.org/pkg/io/ioutil/#TempDir) method, with additional
 * functionality.
 *
 * `tempDir` creates a new temporary directory in the directory dir. The directory name is generated by taking
 * pattern and applying a random string to the end. If pattern includes a "*", the random string replaces the last "*".
 * `tempDir` returns the name of the new directory. If dir is the empty string, `tempDir` uses the default directory for
 * temporary files (see os.tmpdir()). Multiple programs calling `tempDir` simultaneously will not choose the same
 * directory. It is the caller's responsibility to remove the directory when no longer needed.
 *
 * If `options.default` is set to `true` in the `options` argument, `tempDir` will make use of NodeJs's
 * [fs.promises.mkdtemp](https://nodejs.org/api/fs.html#fs_fs_mkdtemp_prefix_options_callback) method, giving as
 * `prefix` the `options.pattern` value (which becomes mandatory).
 *
 * ```
 * // will create a temporary file using the OS temporary
 * // folder and a random token as filename
 * const fh = tempDir()
 *
 * // will create a temporary file using the OS temporary
 * // folder and a random token prefixed by 'tempjs_' as filename
 * const fh = tempDir({ patern: 'tempjs_' })
 *
 * // will create a temporary file using the OS temporary
 * // folder and a random token prefixed by 'tempjs_' and
 * // suffixed by '.txt' as filename
 * const fh = tempDir({ patern: 'tempjs_*.txt' })
 * ```
 *
 * @param {TempDirOptions} options optional
 * @param {TempDirValidationCallback} callback optional
 * @returns {Promise<string>|void} Returns Promise if callback is not defined, void if callback is defined.
 */
export const tempDir = (options?: TempDirOptions, callback?: TempDirValidationCallback): Promise<string> | void => {
  const localOptions = {
    ...defaultTempDirOptions,
    ...(options || {}),
  };

  let promise: Promise<string>;
  if (!localOptions.default) {
    const name =
      localOptions.pattern.indexOf('*') >= 0
        ? localOptions.pattern.replace('*', shortid.generate())
        : localOptions.pattern + shortid.generate();
    const dirPath = path.join(localOptions.dir, name);
    promise = fs.promises
      .mkdir(dirPath, {
        recursive: true,
      })
      .then(() => dirPath);
  } else {
    if (!localOptions.pattern) {
      const err = new Error('invalid `options.pattern` value: please add pattern value');
      if (!callback) {
        throw err;
      }
      return callback(err);
    }
    promise = fs.promises.mkdtemp(path.join(localOptions.dir, localOptions.pattern));
  }

  if (!callback) {
    return promise;
  }

  promise.then((dirName) => callback(null, dirName)).catch(callback);
};

/**
 * Callback method can be used by `tempDirWithFiles` when you don't want to return a Promise.
 *
 * @param err Error returned by `tempDir` call
 * @param data returning a touple of temporary folder name, list of all subfolders includind the main folder,
 *             a list of all created files
 */
export type TempDirWithFilesValidationCallback = (err: Error | null, data?: [string, string[], string[]]) => void;

/**
 * Options used by `tempDir` to create a temporary directory with files
 */
export type TempDirWithFilesOptions = {
  /**
   * Max depth of the folder tree. Default: 3
   */
  maxDepth?: number;
  /**
   * Max subfolders per each node. Default: 3
   */
  maxSubFolders?: number;
  /**
   * Max files per each node. Default: 3
   */
  maxFilesPerDir?: number;
  /**
   * Max size of the created files. Default: 10Mb
   */
  maxFileSize?: string;
  /**
   * Randomize all values: `maxDepth`, `maxSubFolders`, `maxFilesPerDir`, `maxFileSize`. Default: false
   */
  randomize?: boolean;
} & TempDirOptions;

const tempFilesForTempDirWithFiles = async (
  paths: string[],
  localOptions: TempDirWithFilesOptions & TempFileOptions,
  files: string[],
): Promise<void> => {
  for (const p of paths) {
    // on each new path, randomizing max number of files
    let maxFilesPerDir = localOptions.maxFilesPerDir as number;
    if (localOptions.randomize) {
      maxFilesPerDir = Math.floor(Math.random() * 100) % (localOptions.maxFilesPerDir as number);
    }
    while (maxFilesPerDir > 0) {
      // on each new path, randomizing size
      let size = bytes(localOptions.maxFileSize as string);
      if (localOptions.randomize) {
        size = Math.floor(Math.random() * Math.pow(10, `${size}`.length + 2)) % size;
      }
      // create file
      const file = await tempFileOfSize({
        dir: p,
        size: bytes(size),
      });
      if (file) {
        file.close();
        files.push(file.name);
      }
      maxFilesPerDir--;
    }
  }
};

const tempSubDirsForTempDirWithFiles = async (
  maxDepth: number,
  paths: string[],
  localOptions: TempDirWithFilesOptions & TempFileOptions,
): Promise<void> => {
  for (let depth = 1; depth <= maxDepth; depth++) {
    // obtain the set of folders with a specific depth
    const pathsOfDepth = paths.filter(
      (p) =>
        p
          .replace(localOptions.dir as string, '')
          .split(path.sep)
          .filter((token) => token.length > 0).length === depth,
    );
    // on each new path, randomizing max number of subfolders
    let maxSubFolders = localOptions.maxSubFolders;
    if (localOptions.randomize) {
      maxSubFolders = Math.floor(Math.random() * 100) % (localOptions.maxSubFolders as number);
    }
    let msf = maxSubFolders as number;
    while (msf > 0) {
      for (const pod of pathsOfDepth) {
        const newPath = await tempDir({
          dir: pod,
        });
        if (newPath) {
          paths.push(newPath);
        }
      }
      msf--;
    }
  }
};

/**
 * `tempDirWithFiles` creates a new temporary directory in the directory dir. New directory will recursively contain
 * other a max of `options.maxSubFolders` (can be randomized) directories to max depth of `options.maxDepth` (can
 * be randomized). Also, each folder will contain a maximum number of `options.maxFilesPerDir` (can be randomized),
 * each file having the max size of `options.maxFileSize` (can be randomized).
 * To randomize values, set `options.randomize` to true.
 *
 * For the main parent folder, function will also inherit the parameters of `tempDir`.
 *
 * Will return a touple of values where:
 * - 1st is the path of the parent folder
 * - 2nd is a list of all created folders, including parent folder
 * - 3rd is a list of all created files
 *
 * @param {TempDirOptions} options optional
 * @param {TempDirValidationCallback} callback optional
 * @returns {Promise<[string, string[], string[]]>|void} Returns Promise if callback is not defined, void if callback
 *                                                       is defined.
 */
/* eslint-disable no-async-promise-executor */
export const tempDirWithFiles = (
  options?: TempDirWithFilesOptions,
  callback?: TempDirWithFilesValidationCallback,
): Promise<[string, string[], string[]]> | void => {
  const localOptions = {
    ...defaultTempDirOptions,
    maxDepth: 3,
    maxSubFolders: 3,
    maxFilesPerDir: 3,
    maxFileSize: '10Mb',
    randomize: false,
    ...(options || {}),
  };

  const promise = new Promise<[string, string[], string[]]>(async (resolve) => {
    const tempDirPath = (await tempDir(localOptions)) as string;
    const paths: string[] = [tempDirPath];
    const files: string[] = [];

    // randomizing max depth
    let maxDepth = localOptions.maxDepth;
    if (localOptions.randomize) {
      maxDepth = Math.floor(Math.random() * 100) % localOptions.maxDepth;
    }

    await tempSubDirsForTempDirWithFiles(maxDepth, paths, localOptions);

    await tempFilesForTempDirWithFiles(paths, localOptions, files);

    resolve([paths[0], paths, files]);
  });

  if (!callback) {
    return promise;
  }

  promise.then((result) => callback(null, result)).catch(callback);
};
/* eslint-enable no-async-promise-executor */
