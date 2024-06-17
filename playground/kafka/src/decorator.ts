import 'reflect-metadata';

// KafkaEvent 데코레이터 정의
function KafkaEvent(options: {
    topic: string;
}) {
    return function (constructor: Function) {
        Reflect.defineMetadata('kafka:topic', options.topic, constructor);
    };
}

// Kafka 이벤트 핸들러 클래스 정의 및 데코레이터 사용
@KafkaEvent({ topic: 'partitioned.ben.domain_event' })
class MyKafkaHandler {
    handle(event: any) {
        console.log('Handling event:', event);
    }
}

// 메타데이터 읽기 및 이벤트 처리
function handleKafkaEvent(instance: any) {
    const constructor = instance.constructor;
    const topic = Reflect.getMetadata('kafka:topic', constructor);

    if (topic) {
        console.log(`Handling Kafka event for topic: ${topic}`);
        // Kafka 이벤트 핸들링 로직 추가
    } else {
        console.log('No Kafka topic metadata found.');
    }
}

// 사용 예
const handler = new MyKafkaHandler();
handleKafkaEvent(handler);
