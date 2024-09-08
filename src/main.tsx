import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ToDoList from "./containers/ToDoList";
import GlobalStyle from "./GlobalStyle";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <ToDoList />
    </QueryClientProvider>
  </StrictMode>
);
