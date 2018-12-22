import moment, { unitOfTime } from 'moment';

export const computeProgress = (loaded: number, fileSize: number) => Math.floor((loaded / fileSize) * 100);

export const computeElapsedTime = (unit: unitOfTime.Base) => (startTime: Date) => moment().diff(startTime, unit) || 1;