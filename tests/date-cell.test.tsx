import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DateCell from "../app/components/DateCell";

describe("DateCell", () => {
  it("renderiza a data formatada em pt-BR", async () => {
    const iso = "2025-10-02T03:17:48.000Z";

    render(<DateCell iso={iso} />);

    await waitFor(() => {
      expect(screen.getByText(/02\/10\/2025/)).toBeInTheDocument();
    });

    // valida que o span contém a hora como substring
    await waitFor(() => {
      expect(screen.getByText(/02\/10\/2025/)).toHaveTextContent("02/10/2025");
      expect(screen.getByText(/02\/10\/2025/).textContent).toMatch(/17:48/);
    });
  });

  it("atualiza a data quando a prop iso muda", async () => {
    const { rerender } = render(<DateCell iso="2025-10-02T03:17:48.000Z" />);

    await waitFor(() => {
      expect(screen.getByText(/02\/10\/2025/)).toBeInTheDocument();
    });

    rerender(<DateCell iso="2025-12-25T10:30:00.000Z" />);

    await waitFor(() => {
      expect(screen.getByText(/25\/12\/2025/)).toBeInTheDocument();
    });
  });
});
