import * as React from 'react';
import PartInProgress from '../PartInProgress';
import { UploadProgressProps } from '../../data/upload-progress-props';
import { ProgressDataCollection } from '../../data/progress-data-collection';
import { FileProgress } from '../../data/file-progress';

const onMap = (progressDataCollection: ProgressDataCollection = {})=> (part: FileProgress) => {
  const partProgress = progressDataCollection[part.partNumber];
  const defaultProgress = { progress: part.loaded ? part.loaded : 0, speed: 0 };
  const { progress, speed } = partProgress ? partProgress : defaultProgress;

  return (
    <PartInProgress 
    key={ part.partNumber }
    part={ part }
    progress={ progress }
    speed={ speed }
    />
  );
}

const UploadProgress = (uploadProgressProps: UploadProgressProps) => {
  const { parts, progressDataCollection } = uploadProgressProps;
  const partNodes = parts ? parts.map(onMap(progressDataCollection)) : [];

  return (
    <table className='UploadProgress table'>
      <thead>
        <tr>
          <th>Filename</th>
          <th>Progress</th>
          <th>Speed</th>
        </tr>
      </thead>
      <tbody>
        { partNodes }
      </tbody>
    </table>
  )
};

export default UploadProgress;