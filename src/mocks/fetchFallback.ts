import { cardFixture, nearbyAtmsFixture } from "./fixtures";

type FetchInput = Parameters<typeof window.fetch>[0];
type FetchInit = Parameters<typeof window.fetch>[1];

let isInstalled = false;

export function installFetchMock(): void {
  if (isInstalled) {
    return;
  }

  const originalFetch = window.fetch.bind(window);

  window.fetch = (input: FetchInput, init?: FetchInit): Promise<Response> => {
    const url = getUrl(input);
    const method = getMethod(input, init);

    if (method === "GET" && url.pathname === "/api/card/card-001") {
      return delayedJson(cardFixture, 1000);
    }

    if (method === "POST" && url.pathname === "/api/card/card-001/unfreeze") {
      return delayedJson({ success: true }, 800);
    }

    if (method === "GET" && url.pathname === "/api/atm/nearby") {
      return delayedJson(nearbyAtmsFixture, 1000);
    }

    return originalFetch(input, init);
  };

  isInstalled = true;
}

function getUrl(input: FetchInput): URL {
  if (typeof input === "string") {
    return new URL(input, window.location.origin);
  }

  if (input instanceof URL) {
    return input;
  }

  return new URL(input.url, window.location.origin);
}

function getMethod(input: FetchInput, init?: FetchInit): string {
  if (init?.method) {
    return init.method.toUpperCase();
  }

  if (input instanceof Request) {
    return input.method.toUpperCase();
  }

  return "GET";
}

function delayedJson<T>(body: T, delayMs: number): Promise<Response> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(
        new Response(JSON.stringify(body), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        })
      );
    }, delayMs);
  });
}
