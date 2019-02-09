import Axios from 'axios';
import { FilePart } from '../data/file-part';
import { FileMetadata } from '../data/file-metadata';
import { ProgressData } from '../data/progress-data';

export const mockInstance = (args: any = {}) => Axios.create(args);

export const mockFileMetadata = (args: any = {}) =>
    new FileMetadata(
        'mockFile',
        'pdf',
        '.pdf'
    );

export const mockFilePart = (args: any = {}) =>
    new FilePart(
        new Blob([''], { type: 'text/html' }),
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