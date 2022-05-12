export interface ConsumeFromQueue {
  consume(queue: string, callback: ConsumeFromQueueCallback): Promise<any>;
}

export type QueueMessage = {
  type: string;
  content?: any;
};

export type ConsumeFromQueueCallback = (
  message: QueueMessage,
  callback: (err: Error) => Promise<void>,
) => void;
