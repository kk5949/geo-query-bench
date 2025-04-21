import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Point} from "geojson";

@Entity({name: 'stores'})
export class Store {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    address: string;

    @Column('decimal', { precision: 10, scale: 8 })
    latitude: number;

    @Column('decimal', { precision: 11, scale: 8 })
    longitude: number;

    // PostGIS 사용 시 추가
    @Column({
        type: 'geography',
        spatialFeatureType: 'Point',
        srid: 4326,
        nullable: true,
    })
    location: Point;

    @CreateDateColumn()
    createdAt: Date;
}
