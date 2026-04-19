import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider, GameProvider, ThemeProvider } from "./context";

test("renders nav", () => {
  render(
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <GameProvider>
            <App />
          </GameProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
  expect(screen.getByText("Home")).toBeInTheDocument();
});
