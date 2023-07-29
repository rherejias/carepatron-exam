import { render, screen } from '@testing-library/react';
import { VirtuosoMockContext } from 'react-virtuoso'
import ClientTable from '../ClientTable';
import { Context } from "../ClientContext";

const dataList = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smitherin',
    email: 'john@gmail.com',
    phoneNumber: '+6192099102',
  },
  {
    id: '2',
    firstName: 'James',
    lastName: 'Smith',
    email: 'james@gmail.com',
    phoneNumber: '+6167429486',
  },
  {
    id: '3',
    firstName: 'David',
    lastName: 'Adams',
    email: 'david@gmail.com',
    phoneNumber: '+6127584917',
  },
  {
    id: '4',
    firstName: 'Paul',
    lastName: 'Roberts',
    email: 'paul@gmail.com',
    phoneNumber: '+6113859703',
  },
  {
    id: '5',
    firstName: 'Kathleen',
    lastName: 'Johnson',
    email: 'kathleen@gmail.com',
    phoneNumber: '+6194573925',
  }
]

const actions = {
  addClient: () => { },
  setOpenModal: () => { },
  setSearch: () => { }
}
const state = {
  dataList: dataList,
  openModal: false,
  search: ''
}

it('should render correct amount of clients in the table', () => {
  render(
    <Context.Provider value={{ actions, state }}>
      <VirtuosoMockContext.Provider value={{ viewportHeight: 325, itemHeight: 100 }}>
        <ClientTable />
      </VirtuosoMockContext.Provider>
    </Context.Provider>
  );
  const RowElement = screen.getAllByRole('row');
  //+ 1 for the rows for column
  expect(RowElement.length).toBe(6);
});

