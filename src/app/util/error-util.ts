import { AppError } from './app-error';

import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class ErrorUtil {

  public static handleError(error: HttpErrorResponse) {

    let errorMessage = '';

    if (error.status === 0) {
      errorMessage =
        error instanceof AppError
          ? error.message
          : 'Um problema inesperado aconteceu! (lado cliente)';
    } else {
      errorMessage = ErrorUtil.getServerErrorMessage(error);
    }

    return throwError(new Error(errorMessage));
  }

  private static getServerErrorMessage(error: HttpErrorResponse) {
    switch (error.status) {
      case 404: {
        return `O recurso informado não foi encontrado!`;
      }
      case 403: {
        return `O acesso foi negado!`;
      }
      case 500: {
        return `Um erro inesperado aconteceu!`;
      }
      default: {
        return `Um erro inesperado aconteceu! Tente novamente mais tarde!`;
      }
    }
  }
}
