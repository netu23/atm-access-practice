import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

async function enableMocking(): Promise<void> {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  if (isStackBlitzPreview()) {
    const { installFetchMock } = await import("./mocks/fetchFallback");
    installFetchMock();
    return;
  }

  const { worker } = await import("./mocks/browser");
  await worker
    .start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
    })
    .catch((reason: unknown) => {
      console.warn("MSW worker failed to start. Using fetch mocks.", reason);
      return import("./mocks/fetchFallback").then(({ installFetchMock }) => {
        installFetchMock();
      });
    });
}

function isStackBlitzPreview(): boolean {
  return window.location.hostname.endsWith(".webcontainer.io");
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element was not found");
}

const root = createRoot(rootElement);

enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
