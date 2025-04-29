import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProjectTypeDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    _id: string;
}
