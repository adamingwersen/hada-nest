import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: "integrations",
          type: "direct",
        },
      ],
      uri: process.env.RABBITMQ_CLOUD_AMQP_URL,
    }),
  ],
  providers: [],
  exports: [],
})
export class AmqpIntegrationsSyncModule {}
