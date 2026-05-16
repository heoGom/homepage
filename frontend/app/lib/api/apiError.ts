export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function getUserMessage(
  error: unknown,
  fallback = "요청을 처리하지 못했어요. 잠시 후 다시 시도해주세요.",
) {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

export function showError(error: unknown, fallback?: string) {
  alert(getUserMessage(error, fallback));
}
