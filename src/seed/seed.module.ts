import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import {Store} from "../stores/entities/store.entity";
import {StoresModule} from "../stores/stores.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([Store]),
        StoresModule,
    ],
    providers: [SeedService],
    exports: [SeedService],
})
export class SeedModule {}