import { HttpException, HttpStatus } from '@nestjs/common';

export class ThrowErrorResponse extends HttpException {
  constructor(message: string, httpStatus: HttpStatus) {
    super(message, httpStatus);
  }
}
