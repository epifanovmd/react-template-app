export enum ExceptionType {
  Connection = "ConnectionError",
  Unauthorized = "Unauthorized",
  ValidationException = "ValidationException",
  EmailInUse = "EmailAlreadyExistsException",
  InvalidCode = "InvalidCodeException",
  DateTooSmall = "DateTooSmallException",
  UserNotFoundException = "UserNotFoundException",
  ObjectNotFoundException = "ObjectNotFoundException",
  NotSubscribedException = "NotSubscribedException",
  SubscribedExpireException = "SubscribedExpireException",
  SubscribeFrozenException = "SubscribeFrozenException",
  UserHaveTrainingInThisTimeException = "UserHaveTrainingInThisTimeException",
  MaximumNumberOfVisitsException = "MaximumNumberOfVisitsException",
  NoFreeSeatsException = "NoFreeSeatsException",
  VisitWillBeCountedException = "VisitWillBeCountedException",
  NotBookedException = "NotBookedException",
  ObjectAlreadyExistsException = "ObjectAlreadyExistsException",
  BadConfirmCodeException = "BadConfirmCodeException",
}

export class NoAuthError implements Error {
  name = ExceptionType.Unauthorized;
  type = ExceptionType.Unauthorized;
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export function getExceptionText(e: ExceptionType | string): string {
  switch (e) {
    case ExceptionType.UserNotFoundException:
      return "Пользователь не найден";
    case ExceptionType.Connection:
      return "Проблемы с соеденением";
    case ExceptionType.Unauthorized:
      return "Необходимо авторизироваться";
    case ExceptionType.ValidationException:
      return "Ошибка в заполнении полей";
    case ExceptionType.EmailInUse:
      return "Почта уже занята";
    case ExceptionType.InvalidCode:
      return "Код введен с ошибкой";
    case ExceptionType.DateTooSmall:
      return "Дата слишком мала";
    case ExceptionType.ObjectNotFoundException:
      return "Ошибка сервера";
    case ExceptionType.NotSubscribedException:
      return "У пользователя нет подписки";
    case ExceptionType.SubscribedExpireException:
      return "Подписка пользователя истекла";
    case ExceptionType.SubscribeFrozenException:
      return "Подписка заморожена";
    case ExceptionType.UserHaveTrainingInThisTimeException:
      return "У пользователя уже есть тренеровка на это время";
    case ExceptionType.MaximumNumberOfVisitsException:
      return "Количество посещений достигло максимума";
    case ExceptionType.NoFreeSeatsException:
      return "Нет свободных мест";
    case ExceptionType.VisitWillBeCountedException:
      return "Посещение будет засчитанно";
    case ExceptionType.NotBookedException:
      return "Место не забронировано";
    case ExceptionType.ObjectAlreadyExistsException:
      return "Запись с такими данными уже существует";
    case ExceptionType.BadConfirmCodeException:
      return "Неверный код подтверждения брони";
    default:
      return "Ошибка сервера";
  }
}
