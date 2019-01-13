import * as React from 'react';
import PartInProgress from '../PartInProgress';
import { UploadProgressProps } from '../../data/upload-progress-props';
import { ProgressDataCollection } from '../../data/progress-data-collection';
import { FilePart } from '../../data/file-part';

const onMap = (progressDataCollection: ProgressDataCollection = {})=> (part: FilePart) => {
  const partProgress = progressDataCollection[part.partNumber];
  var progress, speed;

  if (partProgress == null) {
    progress = 0;
    speed = 0;
  } else {
    progress = partProgress.progress;
    speed = partProgress.speed;
  }

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