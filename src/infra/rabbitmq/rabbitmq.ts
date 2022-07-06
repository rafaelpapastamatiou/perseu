import { Connection, Channel, connect } from 'amqplib';

import { Broker } from '@application/providers/broker/broker';
import { PublishInQueueParams } from '@application/providers/broker/publish-in-queue';
import {
  ConsumeFromQueueCallback,
  QueueMessage,
} from '@application/providers/broker/consume-from-queue';

let rabbitMqConnection: Connection;
let rabbitMqChannel: Channel;

export class RabbitMQ implements Broker {
  private connection = rabbitMqConnection;
  private channel = rabbitMqChannel;

  constructor() {
    this.testConnection();
  }

  async connect(): Promise<boolean> {
    return true;
  }

  testConnection() {
    if (!this.connection || !this.channel)
      throw new Error('RabbitMQ connection failed.');
  }

  async publish({ queue, message }: PublishInQueueParams): Promise<boolean> {
    await this.channel.assertQueue(queue, { durable: true });

    return this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async consume(
    queue: string,
    callback: ConsumeFromQueueCallback,
  ): Promise<any> {
    await this.channel.assertQueue(queue, {
      durable: true,
    });

    return this.channel.consume(queue, async (msg) => {
      const msgJson = JSON.parse(msg.content.toString()) as QueueMessage;

      if (!msgJson || !msgJson.type) {
        console.log('Message rejected: invalid format.');
        this.channel.reject(msg);
      }

      return callback(msgJson, async (err) => {
        if (err) {
          console.log('Error processing message: ', err);
          this.channel.nack(msg, false, false);
          console.log('Message nacked.');
          return;
        }

        this.channel.ack(msg);
        console.log('Message acked: ', msgJson.type);
      });
    });
  }
}

export async function setupRabbitMQ() {
  const url = process.env.RABBITMQ_URL;

  if (!url) {
    throw new Error('RABBITMQ_URL not found.');
  }

  rabbitMqConnection = await connect(url);

  rabbitMqChannel = await rabbitMqConnection.createChannel();

  console.log('Connected to RabbitMQ');
}
