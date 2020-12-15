import { IsOptional, IsString, IsInt, Min } from "class-validator";
import { Transform } from "class-transformer";

export class SearchRequest {
    @IsOptional()
    @IsString()
    search:string;
    @IsOptional()
    @Transform(value => parseInt(value))
    @IsInt()
    @Min(1)
    page: number;
    @IsOptional()
    @Transform(value => parseInt(value))
    @IsInt()
    limit: number;
}