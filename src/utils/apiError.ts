import { ApiError } from "../types/async";

export function mapStatusToApiError(status: number): ApiError {
  if (status === 401) {
    return {
      code: "UNAUTHORIZED",
      message: "You need to sign in again before viewing card details.",
    };
  }

  if (status === 404) {
    return {
      code: "NOT_FOUND",
      message: "We could not find this card or ATM data.",
    };
  }

  if (status >= 500) {
    return {
      code: "SERVER_ERROR",
      message: "The card service is unavailable. Try again in a moment.",
    };
  }

  return {
    code: "NETWORK_ERROR",
    message: "The request could not be completed.",
  };
}

export function mapUnknownToNetworkError(reason: unknown): ApiError {
  if (isApiError(reason)) {
    return reason;
  }

  return {
    code: "NETWORK_ERROR",
    message: "Your connection dropped before the request completed.",
  };
}

function isApiError(value: unknown): value is ApiError {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return "code" in value && "message" in value;
}
