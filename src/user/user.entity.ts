import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@ObjectType()
@Entity('user')
export class User {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field({ nullable: false })
    @Column({ nullable: false })
    name: string

    @Field({ nullable: false })
    @Column({ nullable: false })
    email: string

    @Field({ nullable: false })
    @Column({ nullable: false })
    password: string

    @Field({ nullable: true })
    @CreateDateColumn({ type: 'timestamp', nullable: true })
    createdAt: Date

    @Field({ nullable: true })
    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt: Date

    @Field({ nullable: true })
    @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
    deletedAt?: Date

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async checkPassword(checkPassword: string): Promise<boolean> {
        return await bcrypt.compare(checkPassword, this.password);
    }
}

