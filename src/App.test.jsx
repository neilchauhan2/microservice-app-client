import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

const renderApp = () => {
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

describe("App Component", () => {
  it("should render without crashing", () => {
    const { container } = renderApp();
    expect(container).toBeTruthy();
  });

  it("should render navbar", () => {
    renderApp();
    expect(screen.getByText("PollApp")).toBeInTheDocument();
  });
});
