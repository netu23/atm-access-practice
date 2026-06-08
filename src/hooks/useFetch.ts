import { useEffect, useState } from "react";
import { AsyncState } from "../types/async";

export function useFetch<T>(url: string): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: "idle" });

  useEffect(() => {
    let isActive = true;

    setState({ status: "loading" });

    fetch(url)
      .then((response) => {
        // TODO: useFetch currently ignores response.ok
        // Check response.ok here and map HTTP status codes to ApiError codes:
        // 401 -> UNAUTHORIZED, 404 -> NOT_FOUND, 500+ -> SERVER_ERROR
        // Hint: do NOT use try-catch -- check response.ok instead
        return response.json() as Promise<T>;
      })
      .then((data) => {
        if (isActive) {
          setState({ status: "success", data });
        }
      })
      .catch((_reason: unknown) => {
        // Intentionally incomplete for the exercise: network failures should
        // become AsyncState error values instead of disappearing here.
      });

    return () => {
      isActive = false;
    };
  }, [url]);

  // AsyncState is a discriminated union, so callers cannot represent
  // impossible combinations like loading and error at the same time.
  return state;
}
