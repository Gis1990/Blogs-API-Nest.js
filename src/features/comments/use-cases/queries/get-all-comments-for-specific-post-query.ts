import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CommentDBClassPagination } from "../../entities/comments.entity";
import { CommentsQueryRepository } from "../../comments.query.repository";
import { ModelForGettingAllComments } from "../../dto/comments.dto";

export class GetAllCommentsForSpecificPostCommand {
    constructor(public dto: ModelForGettingAllComments, public postId: string, public userId: string | undefined) {}
}

@QueryHandler(GetAllCommentsForSpecificPostCommand)
export class GetAllCommentsForSpecificPostQuery implements IQueryHandler<GetAllCommentsForSpecificPostCommand> {
    constructor(private commentsQueryRepository: CommentsQueryRepository) {}

    async execute(query: GetAllCommentsForSpecificPostCommand): Promise<CommentDBClassPagination> {
        return await this.commentsQueryRepository.getAllCommentsForSpecificPost(query.dto, query.postId, query.userId);
    }
}
