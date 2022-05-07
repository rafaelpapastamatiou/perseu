import schedule from 'node-schedule';

import { makePublishRequest } from '@main/factories/useCases/publish-request.factory';

const publishRequest = makePublishRequest('twelvedata');

const rule = new schedule.RecurrenceRule();
rule.hour = 0;

const syncExchangesJobs = schedule.scheduleJob(rule, async () => {
  await publishRequest.execute('sync-exchanges');
});

const syncAssetsJobs = schedule.scheduleJob(rule, async () => {
  await publishRequest.execute('sync-assets');
});

console.log('TwelveData schedules registered.');
