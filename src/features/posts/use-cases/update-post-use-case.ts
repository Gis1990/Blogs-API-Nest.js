import { PostsRepository } from "../posts.repository";
import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { HttpException } from "@nestjs/common";
import { CurrentUserModel } from "../../auth/dto/auth.dto";
import { GetBlogByIdCommand } from "../../blogs/use-cases/queries/get-blog-by-id-query";

export class UpdatePostCommand {
    constructor(
        public postId: string,
        public title: string,
        public shortDescription: string,
        public content: string,
        public blogId: string,
        public user: CurrentUserModel,
    ) {}
}

@CommandHandler(UpdatePostCommand)
export class UpdatePostUseCase implements ICommandHandler<UpdatePostCommand> {
    constructor(private postsRepository: PostsRepository, private queryBus: QueryBus) {}

    async execute(command: UpdatePostCommand): Promise<boolean> {
        const blog = await this.queryBus.execute(new GetBlogByIdCommand(command.blogId));
        if (blog.blogOwnerInfo.userId !== command.user.id) throw new HttpException("Access denied", 403);
        return this.postsRepository.updatePost(
            command.postId,
            command.title,
            command.shortDescription,
            command.content,
            command.blogId,
        );
    }
}
