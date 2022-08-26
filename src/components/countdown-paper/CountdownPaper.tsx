import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { releaseDateTime } from '../../utils';
import NeonPaper from '../neon-paper/NeonPaper';

const getTimeUnitString = (time: number, unit: string): string => `${time >= 0 ? time : 0} ${unit}${time !== 1 ? 's' : ''}`;

const CountdownPaper: React.FC = () => {
  const [time, setTime] = useState(releaseDateTime.diffNow(['days', 'hours', 'minutes', 'seconds']));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(releaseDateTime.diffNow(['days', 'hours', 'minutes', 'seconds']));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <NeonPaper
      borderVariant={'secondary'}
      sx={{
        width: '100%',
        p: 1,
        textAlign: 'center',
      }}
    >
      {time.seconds > 0 ? (
        <React.Fragment>
          <Typography variant={'h5'}>Countdown!</Typography>
          <Typography variant={'body2'}>
            {`${time.days ? getTimeUnitString(time.days, 'Day') : ''} ${(time.days && !time.hours) || (!time.days && time.hours) ? getTimeUnitString(time.hours, 'Hour') : ''} ${getTimeUnitString(time.minutes, 'Minute')} ${getTimeUnitString(Math.floor(time.seconds), 'Second')}`}
          </Typography>
        </React.Fragment>
      ) : <Typography variant={'h5'}>{'Time\'s Up!'}</Typography>}

    </NeonPaper>
  );
};

export default CountdownPaper;
