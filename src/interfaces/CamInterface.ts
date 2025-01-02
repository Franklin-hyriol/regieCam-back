import { Optional } from "sequelize";

export interface CamAttributes {
    id: number;
    name: string;
    status: "red" | "orange" | "green" | "blue";
    used: boolean;
}

export interface CamCreationAttribute extends Optional<CamAttributes, 'id'> { }