import { useState } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ClientModal from '../ClientModal';
import { Context } from "../ClientContext";

const actions = {
  addClient: () => { },
  setOpenModal: () => false,
  setSearch: () => { }
}
const state = {
  dataList: [],
  openModal: true,
  search: ''
}

const mockedOnClose = jest.fn();

it('should render create client modal', () => {
  render(
    <Context.Provider value={{ actions, state }}>
      <ClientModal open={true} onClose={mockedOnClose} />
    </Context.Provider>
  );
  const ModalElement = screen.getByText('Create new client');
  expect(ModalElement).toBeInTheDocument();
});

it('should render stepper and inputs', () => {
  render(
    <Context.Provider value={{ actions, state }}>
      <ClientModal open={true} onClose={mockedOnClose} />
    </Context.Provider>
  );
  const StepperElement = screen.getByText('Personal details');
  const FirstNameElement = screen.getByLabelText('First Name');
  const LastNameElement = screen.getByLabelText('Last Name');

  expect(StepperElement).toBeInTheDocument();
  expect(FirstNameElement).toBeInTheDocument();
  expect(LastNameElement).toBeInTheDocument();
});

it('should close the modal when input fields are filled and submitted', async () => {
  render(
    <Context.Provider value={{ actions, state }}>
      <ClientModal open={true} onClose={mockedOnClose} />
    </Context.Provider>
  );

  const FirstNameElement = screen.getByLabelText('First Name');
  fireEvent.change(FirstNameElement, { target: { value: 'Reiner' } });
  const LastNameElement = screen.getByLabelText('Last Name');
  fireEvent.change(LastNameElement, { target: { value: 'Herejias' } });
  const ContinueButtonElement = screen.getByRole('button', { name: /Continue/i });
  const ContinueButtonFireEvent = () => fireEvent.click(ContinueButtonElement, { button: 0 });

  await act(() => {
    ContinueButtonFireEvent();
  })

  const EmailElement = screen.getByLabelText('Email');
  fireEvent.change(EmailElement, { target: { value: 'reiner@gmail.com' } });
  const phoneNumberElement = screen.getByLabelText('Phone Number');
  fireEvent.change(phoneNumberElement, { target: { value: '6185746239' } });
  const CreateClientButton = screen.getByRole('button', { name: /Create client/i });
  const CreateClientButtonFireEvent = () => fireEvent.click(CreateClientButton, { button: 0 });

  await act(() => {
    CreateClientButtonFireEvent();
  })

  expect(mockedOnClose).toBeCalledTimes(1);
});
