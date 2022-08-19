import { DateTime } from 'luxon';

export type CreateMethod<T> = (args?: Partial<T>) => T;

type RecordKey = string | number | symbol;

export const createRecordFromArray = <T>(
  list: T[],
  keySelector: (item: T) => RecordKey,
): Record<RecordKey, T> => list.reduce((acc, item) => ({
    ...acc,
    [keySelector(item)]: item,
  }), {});

export const releaseDateTime = DateTime.fromISO('2022-07-01T00:00:00-07:00');
