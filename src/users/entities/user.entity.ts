import {Column, CreateDateColumn, PrimaryGeneratedColumn} from "typeorm";

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @CreateDateColumn()
    createdAt: Date;
}
