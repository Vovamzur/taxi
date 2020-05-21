import { KafkaClient } from 'kafka-node';

import * as kafkaConfig from './../config/kafkaConfig';

export default new KafkaClient(kafkaConfig);
