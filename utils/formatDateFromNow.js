const relativeTime = require('dayjs/plugin/relativeTime');
const dayjs = require('dayjs');
dayjs.extend(relativeTime);

export default function formatDateFromNow(IOS) {
  const diffDays = dayjs(IOS).fromNow();
  return diffDays;
}
