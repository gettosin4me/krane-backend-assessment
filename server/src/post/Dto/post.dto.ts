import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  public title: string;

  @IsString({ message: 'Text body must be a string' })
  @IsNotEmpty({ message: 'Text body cannot be empty' })
  public text_body: string;
}
