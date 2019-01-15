import { FilePart } from '../data/file-part';
import { ProgressData } from '../data/progress-data';
import { FileMetadata } from '../data/file-metadata';

export const mockFileMetadata = (args: any = {}) =>
    new FileMetadata(
        'mockFile',
        'pdf',
        '.pdf'
    );

export const mockFilePart = (args: any = {}) =>
    new FilePart(
        new Blob(),
        'mockfile',
        'pdf',
        0,
        0,
        args.partSize,
        args.uploadOffset,
        args.uploadLength,
        args.fileSize,
    );

export const mockProgressData = (args: any = {}) =>
    new ProgressData(
        0,
        0,
        0
    );