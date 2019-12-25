export enum ExceptionType {
  RouteNotFoundException = "RouteNotFoundException",
  DataBaseErrorException = "DataBaseErrorException",
  UserNotFoundException = "UserNotFoundException",
  UnauthorizedException = "UnauthorizedException",
  ValidateException = "ValidateException",
  AccessRestrictedException = "AccessRestrictedException",
  ServerErrorException = "ServerErrorException",
}

export class NoAuthError implements Error {
  name = ExceptionType.UnauthorizedException;
  type = ExceptionType.UnauthorizedException;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export function getExceptionText(e: ExceptionType | string): string {
  switch (e) {
    case ExceptionType.RouteNotFoundException:
      return "Пользователь не найден";
    case ExceptionType.DataBaseErrorException:
      return "Проблемы с соеденением";
    case ExceptionType.UserNotFoundException:
      return "Необходимо авторизироваться";
    case ExceptionType.UnauthorizedException:
      return "Ошибка в заполнении полей";
    case ExceptionType.ValidateException:
      return "Почта уже занята";
    case ExceptionType.AccessRestrictedException:
      return "Код введен с ошибкой";
    case ExceptionType.ServerErrorException:
      return "Дата слишком мала";
    default:
      return "Ошибка сервера";
  }
}
