import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import StarWarsProvider from "../context/StarWarsProvider";
import mock from "./helpers/mock";

describe("Pagina Table", () => {
  test("se na tela contem inputs e um botão", async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    const btnFilter = screen.getByRole("button", { name: /Filtrar/i });
    expect(btnFilter).toBeInTheDocument();

    const inputName = screen.getByTestId("name-filter");
    expect(inputName).toBeInTheDocument();

    const inputNumber = screen.getByTestId("value-filter");
    expect(inputNumber).toBeInTheDocument();

    const filterColumn = screen.findByTestId(/'column-filter'/i);
    waitFor(() => expect(filterColumn).toBeInTheDocument());
    waitFor(() => expect(filterColumn).toHaveLength(4));

    const filterComparison = screen.findByTestId(/'comparison-filter'/i);
    waitFor(() => expect(filterComparison).toBeInTheDocument());
    waitFor(() => expect(filterComparison).toHaveLength(2));

    userEvent.click(btnFilter);
    userEvent.type(inputName, "Tatooine");
    userEvent.type(inputNumber, 500);
  });

  test('se os filtros "population", "menor que" e "number" funcionam', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mock,
    }));

    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );

    const filter = screen.getAllByRole("combobox");
    const inputNumber = screen.getByTestId("value-filter");
    const btnFilter = screen.getByRole("button", { name: /Filtrar/i });

    userEvent.selectOptions(filter[0], ["population"]);
    userEvent.selectOptions(filter[1], ["menor que"]);
    userEvent.type(inputNumber, "200000");
    userEvent.click(btnFilter);

    const planet = await screen.findByText("Tatooine");

    waitFor(() => expect(planet).toBeInTheDocument());
  });

  test("se o filtro 'igual a' funciona", async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mock,
    }));

    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );

    const filter = screen.getAllByRole("combobox");
    const inputNumber = screen.getByTestId("value-filter");
    const btnFilter = screen.getByRole("button", { name: /Filtrar/i });

    userEvent.selectOptions(filter[0], ["population"]);
    userEvent.selectOptions(filter[1], ["igual a"]);
    userEvent.type(inputNumber, "200000");
    userEvent.click(btnFilter);

    const planet = await screen.findByText("Tatooine");

    waitFor(() => expect(planet).toBeInTheDocument());
  });
});
