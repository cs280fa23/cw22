import { Injectable } from "@nestjs/common";
import { ILike, Repository } from "typeorm";
import { Comment } from "./comment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCommentDTO } from "./comment-create.dto";
import { PostsService } from "src/posts/posts.service";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly postsService: PostsService,
  ) {}

  // Returns all comments that match the given criteria.
  async findAll(
    limit: number,
    offset: number,
    postId?: string,
    userId?: number,
    search?: string,
    withUserData?: boolean,
    withPostData?: boolean,
  ): Promise<Comment[]> {
    const content = search ? ILike(`%${search}%`) : undefined;
    const relations = [];

    if (withUserData) {
      relations.push("user");
    }

    if (withPostData) {
      relations.push("post");
    }

    const comments = await this.commentRepository.find({
      take: limit,
      skip: offset,
      where: [
        {
          postId,
          userId,
          content,
        },
      ],
      order: {
        timestamp: "DESC",
      },
      relations,
    });

    return comments;
  }

  // Creates a new instance of the Comment entity and saves it to the database.
  // Returns the newly created comment.
  async create(
    createCommentDto: CreateCommentDTO,
    postId: string,
    userId: number,
  ): Promise<Comment> {
    const comment = this.commentRepository.create({
      ...createCommentDto,
      postId, // Associate the comment with a post
      userId, // Associate the comment with a user
    });

    // Increment the comment counter in the associated post
    await this.postsService.incrementCommentCounter(comment.postId);

    return this.commentRepository.save(comment);
  }
}
