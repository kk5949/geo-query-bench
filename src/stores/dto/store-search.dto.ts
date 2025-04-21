// nearby-stores.dto.ts
import { IsNumber, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class StoreSearchDto {
    @IsNumber()
    @Type(() => Number)
    @Min(-90)
    @Max(90)
    latitude: number;

    @IsNumber()
    @Type(() => Number)
    @Min(-180)
    @Max(180)
    longitude: number;

    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @IsOptional()
    radius: number = 5; // 기본값 5km

    @IsNumber()
    @Type(() => Number)
    @Min(1)
    @IsOptional()
    limit: number = 50; // 기본값 50개
}