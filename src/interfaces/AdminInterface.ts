import { Optional } from "sequelize";

export interface AdminAttributes {
    id: number;
    free: boolean;
}

export interface AdminCreationAttributes extends Optional<AdminAttributes, 'id'> { }