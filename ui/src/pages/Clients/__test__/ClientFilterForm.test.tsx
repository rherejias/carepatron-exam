import { render, screen, fireEvent, act } from '@testing-library/react';
import ClientFilterForm from '../ClientFilterForm';
import { Context } from "../ClientContext";

const mockedOnModalOpen = jest.fn();

const actions = {
  addClient: () => { },
  setOpenModal: mockedOnModalOpen,
  setSearch: () => { }
}
const state = {
  dataList: [],
  openModal: false,
  search: ''
}

describe("Search Input", () => {
  it('should render search input box', () => {
    render(
      <Context.Provider value={{ actions, state }}>
        <ClientFilterForm />
      </Context.Provider>
    );
    const SearchInputElement = screen.getByPlaceholderText(/Search clients.../i);
    expect(SearchInputElement).toBeInTheDocument();
  });

  it('should be able to type in input', () => {
    render(
      <Context.Provider value={{ actions, state }}>
        <ClientFilterForm />
      </Context.Provider>
    );
    const SearchInputElement = screen.getByPlaceholderText<HTMLInputElement>(/Search clients.../i);
    fireEvent.change(SearchInputElement, { target: { value: 'test search' } });
    expect(SearchInputElement.value).toBe('test search')
  });
})

describe("Create client button", () => {
  it('should render Create new client button', () => {
    render(
      <Context.Provider value={{ actions, state }}>
        <ClientFilterForm />
      </Context.Provider>);
    const ButtonElement = screen.getByRole('button');
    expect(ButtonElement).toBeInTheDocument();
  });

  it('should open create client modal', async () => {
    render(
      <Context.Provider value={{ actions, state }}>
        <ClientFilterForm />
      </Context.Provider>);
    const ButtonElement = screen.getByRole('button');
    const fireButtonClickEvent = () => fireEvent.click(ButtonElement, { button: 0 });

    await act(() => {
      fireButtonClickEvent();
    })

    expect(mockedOnModalOpen).toBeCalledTimes(1);
  });
})

