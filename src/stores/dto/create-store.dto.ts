import {IsNumber, IsString, Max, Min} from "class-validator";
import {Type} from "class-transformer";

export class CreateStoreDto {

    @IsString()
    name: string;

    @IsString()
    address: string;

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
}
