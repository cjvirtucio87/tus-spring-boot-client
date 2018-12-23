import * as React from 'react';
import { PartInProgressProps } from '../../data/part-in-progress-props';

const PartInProgress = (partInProgress: PartInProgressProps) => { 
  const { part, progress, speed } = partInProgress;

  return <tr className='PartInProgress'>
    <td>{ `${part.fileName}_${part.partNumber}` }</td>
    <td>{ progress ? progress : 0 }%</td>
    <td>{ speed ? speed : 0 } bytes/sec</td>
  </tr>
};

export default PartInProgress;