
import { UpdateUserDto } from "../dto/edit-user.dto.js";

export class EditUserCommand{
    constructor(public readonly userId: number,
        public readonly user:UpdateUserDto
    ){}
}