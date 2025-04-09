import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch()
export class MongooseExcetionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseMessage = (type, message) => {
      response.status(status).json({
        statusCode: status,
        path: request.url,
        errorType: type,
        errorMessage: message,
      });
    };

    if (exception['response']) {
      const { message } = exception['response'];
      const finalMessage = message instanceof Array ? message[0] : message;
      responseMessage(exception.name, finalMessage);
    } else {
      responseMessage(exception.name, exception.message);
    }
  }
}
