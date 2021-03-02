import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateTweetDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(150)
  readonly message: string;
}
