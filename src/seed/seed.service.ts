// seed.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Store} from "../stores/entities/store.entity";

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(Store)
        private storeRepository: Repository<Store>,
    ) {}

    async seed() {
        // 서울 중심부 좌표
        const seoulCenter = { latitude: 37.5665, longitude: 126.9780 };

        const stores = [];
        for (let i = 0; i < 1000; i++) {
            // 서울 중심부 주변에 랜덤 위치 생성 (대략 20km 반경 내)
            const randomLat = seoulCenter.latitude + (Math.random() - 0.5) * 0.3;
            const randomLng = seoulCenter.longitude + (Math.random() - 0.5) * 0.3;

            const store = this.storeRepository.create({
                name: `가게 ${i + 1}`,
                address: `서울시 테스트구 테스트동 ${i + 1}`,
                latitude: randomLat,
                longitude: randomLng,
            });

            // PostGIS용 location 필드 설정
            if (store.latitude && store.longitude) {
                // @ts-ignore: location 필드 타입 무시
                store.location = {
                    type: 'Point',
                    coordinates: [store.longitude, store.latitude],
                };
            }

            stores.push(store);
        }

        await this.storeRepository.save(stores);
        console.log(`${stores.length}개의 가게 데이터가 생성되었습니다.`);
    }
}