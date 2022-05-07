import { ConnectToBroker } from './connect-to-broker';
import { ConsumeFromQueue } from './consume-from-queue';
import { PublishInQueue } from './publish-in-queue';

export type Broker = ConnectToBroker & PublishInQueue & ConsumeFromQueue;
