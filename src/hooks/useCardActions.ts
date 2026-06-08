import { useCallback, useState } from "react";
import { AsyncState } from "../types/async";
import {
  mapStatusToApiError,
  mapUnknownToNetworkError,
} from "../utils/apiError";

interface UnfreezeResponse {
  success: boolean;
}

export function useCardActions(cardId: string) {
  const [unfreezeState, setUnfreezeState] = useState<
    AsyncState<UnfreezeResponse>
  >({ status: "idle" });

  const unfreezeCard = useCallback((): Promise<void> => {
    setUnfreezeState({ status: "loading" });

    return fetch(`/api/card/${cardId}/unfreeze`, {
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(mapStatusToApiError(response.status));
        }

        return response.json() as Promise<UnfreezeResponse>;
      })
      .then((data) => {
        setUnfreezeState({ status: "success", data });
      })
      .catch((reason: unknown) => {
        setUnfreezeState({ status: "error", error: mapUnknownToNetworkError(reason) });
      });
  }, [cardId]);

  return {
    unfreezeCard,
    unfreezeState,
  };
}
