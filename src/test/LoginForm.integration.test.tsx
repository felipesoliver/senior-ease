import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const mockPush = vi.fn();
const mockReplace = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, replace: mockReplace }),
}));

const mockError = vi.fn();
const mockSuccess = vi.fn();
vi.mock("sonner", () => ({
  toast: { error: mockError, success: mockSuccess },
}));

describe("LoginForm integration", () => {
  beforeEach(async () => {
    const React = await import("react");
    globalThis.React = React.default ?? React;

    vi.useFakeTimers();
    mockPush.mockClear();
    mockReplace.mockClear();
    mockError.mockClear();
    mockSuccess.mockClear();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows an error when fields are empty", async () => {
    const { default: LoginForm } = await import("@/components/LoginForm");
    render(<LoginForm />);
    const submit = screen.getByRole("button", { name: /login/i });
    fireEvent.click(submit);

    expect(mockError).toHaveBeenCalledWith("Preencha todos os campos.");
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("submits and redirects on success", async () => {
    const { default: LoginForm } = await import("@/components/LoginForm");
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText(/exemplo@exemplo.com/i);
    const passwordInput = screen.getByPlaceholderText(/Insira sua senha/i);

    fireEvent.change(emailInput, { target: { value: "a@b.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    const submit = screen.getByRole("button", { name: /login/i });
    fireEvent.click(submit);

    vi.advanceTimersByTime(1500);

    expect(mockSuccess).toHaveBeenCalledWith("Bem-vindo de volta!");
    expect(localStorage.getItem("senior-ease-logged-in")).toEqual("true");
    expect(localStorage.getItem("senior-ease-current-user")).toEqual("a@b.com");
    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });

  it("redirects back to dashboard when already logged in", async () => {
    localStorage.setItem("senior-ease-logged-in", "true");
    const { default: LoginForm } = await import("@/components/LoginForm");
    render(<LoginForm />);

    expect(mockReplace).toHaveBeenCalledWith("/dashboard");
  });
});
