import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import axios from "./api/axios";

// Mock axios to prevent real API calls
vi.mock("./api/axios", () => ({
  default: {
    get: vi.fn((url) => {
      // Return appropriate data based on the API endpoint
      if (url.includes("/api/polling/poll")) {
        return Promise.resolve({ data: [] }); // Empty polls array
      }
      if (url.includes("/api/user")) {
        return Promise.resolve({ data: {} }); // Empty user object
      }
      return Promise.resolve({ data: {} });
    }),
    post: vi.fn(() => Promise.resolve({ data: {} })),
  },
}));

const renderApp = () => {
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render without crashing", () => {
    const { container } = renderApp();
    expect(container).toBeTruthy();
  });

  it("should render navbar with PollApp text", () => {
    renderApp();
    expect(screen.getByText("PollApp")).toBeInTheDocument();
  });
});
