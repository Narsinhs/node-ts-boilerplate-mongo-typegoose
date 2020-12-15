import { IsString, Min, Max } from "class-validator"

export class MessageResponse {
    data: any
    description: string
    message: string
    status: number
    success: boolean
}