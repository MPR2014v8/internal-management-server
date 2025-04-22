import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProjectStatusDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    _id: string;
}
