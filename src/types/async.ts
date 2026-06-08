export type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: ApiError };

export type ApiError =
  | { code: "NETWORK_ERROR"; message: string }
  | { code: "UNAUTHORIZED"; message: string }
  | { code: "NOT_FOUND"; message: string }
  | { code: "LIMIT_EXCEEDED"; message: string }
  | { code: "CARD_BLOCKED"; message: string }
  | { code: "COMPLIANCE_HOLD"; message: string }
  | { code: "SERVER_ERROR"; message: string };
