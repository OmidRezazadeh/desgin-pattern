
import { Injectable } from "@nestjs/common";
import { UsersService } from "../users.service.js";
import { EditUserCommand } from "./edit-user-command.js";


@Injectable()
export class EditUserHandler{
    constructor(
        private readonly userService:UsersService
    ){}

    async execute(command:EditUserCommand){
        return this.userService.edit(command.userId,command.user)
    }
}