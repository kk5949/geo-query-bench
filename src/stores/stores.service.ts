import {Injectable} from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Store} from "./entities/store.entity";
import {Repository} from "typeorm";
import {StoreSearchDto} from "./dto/store-search.dto";

@Injectable()
export class StoresService {
  constructor(
      @InjectRepository(Store)
        private readonly storeRepository: Repository<Store>,
  ) {
  }

  async searchStoreNearby(storeSearchDto:StoreSearchDto){
    const {latitude, longitude, radius, limit } = storeSearchDto;

    const stores = await this.storeRepository
        .createQueryBuilder('store')
        .select([
          'store.id',
          'store.name',
          'store.address',
          'store.latitude',
          'store.longitude',
          `ST_Distance(
          store.location,
          ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography) as distance`,
        ])
        .where(
            `ST_DWithin(
          store.location,
          ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography,
          :radius * 1000
        )`,
        )
        .setParameters({
          latitude,
          longitude,
          radius,
        })
        .orderBy('distance', 'ASC')
        .limit(limit)
        .getRawMany();

    return stores;
  }
}
