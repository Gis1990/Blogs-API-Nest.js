import { InputModelForCreatingNewUser } from "../../users/dto/users.dto";
import { NewUserClassResponseModel } from "../../users/entities/users.entity";
import { AuthService } from "../auth.service";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

export class CreateUserWithoutConfirmationEmailCommand {
    constructor(public readonly dto: InputModelForCreatingNewUser) {}
}

@CommandHandler(CreateUserWithoutConfirmationEmailCommand)
export class CreateUserWithoutConfirmationEmailUseCase
    implements ICommandHandler<CreateUserWithoutConfirmationEmailCommand>
{
    constructor(private authService: AuthService) {}

    async execute(command: CreateUserWithoutConfirmationEmailCommand): Promise<NewUserClassResponseModel> {
        return await this.authService.createUser(command.dto, true);
    }
}
