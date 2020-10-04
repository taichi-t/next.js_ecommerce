import { DateTime } from 'luxon';

export default function formatDateFromNow(IOS) {
  const daysfromIOS = DateTime.fromISO(IOS).get('day');
  const diffDays = DateTime.local().minus({ days: daysfromIOS }).toRelative();
  return diffDays;
}
