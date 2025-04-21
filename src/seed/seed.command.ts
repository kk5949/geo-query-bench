import { NestFactory } from '@nestjs/core';
import { SeedService } from './seed.service';
import {AppModule} from "../app.module";

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const seedService = app.get(SeedService);

    try {
        console.log('시드 데이터 삽입 시작...');
        await seedService.seed();
        console.log('시드 데이터 삽입 완료!');
    } catch (error) {
        console.error('시드 데이터 삽입 중 오류 발생:', error);
    } finally {
        await app.close();
    }
}

bootstrap();