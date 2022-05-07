export interface ConsumeFromQueue {
  consume(queue: string, callback: ConsumeFromQueueCallback): Promise<any>;
}

export type ConsumeFromQueueCallback = (message: string) => void;
