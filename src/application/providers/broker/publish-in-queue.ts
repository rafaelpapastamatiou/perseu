export interface PublishInQueue {
  publish(params: PublishInQueueParams): Promise<boolean>;
}

export type PublishInQueueParams = {
  queue: string;
  message: string;
};
