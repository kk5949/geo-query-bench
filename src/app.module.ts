import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {StoresModule} from './stores/stores.module';
import {UsersModule} from './users/users.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule, TypeOrmModuleAsyncOptions} from "@nestjs/typeorm";
import * as process from 'process';
import {SeedModule} from "./seed/seed.module";


@Module({
    imports: [
        StoresModule,
        UsersModule,
        SeedModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],  // 클래스 자체를 배열에 넣음 (올바른 방식)
            useFactory: (configService: ConfigService) => ({
                type: configService.get('DB_TYPE'),
                host: configService.get('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: configService.get('NODE_ENV') === 'development',
            } as TypeOrmModuleAsyncOptions),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
