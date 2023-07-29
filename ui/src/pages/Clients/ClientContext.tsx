import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

interface IContext {
  actions?: {
    addClient: (values: IClient) => void;
    setOpenModal: (value: boolean) => void;
    setSearch: (value: string) => void;
  },
  state?: {
    dataList?: IClient[];
    openModal: boolean;
    search?: string;
  }
}

export const Context = createContext<IContext>({});

interface ClientContextProps {
  children: React.ReactNode;
}

const ClientContext = ({ children }: ClientContextProps) => {

  const [dataList, setDataList] = useState<IClient[]>([
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
  ]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const addClient = async (values: IClient) => {
    try {
      const list = dataList;
      list.push(values)
      setDataList(list);
      toast.success('Client successfully added.')
    } catch (error: any) {
      toast.error('An error has occured.');
    }
  }

  return (
    <Context.Provider value={{
      actions: {
        addClient,
        setOpenModal,
        setSearch
      },
      state: {
        dataList,
        openModal,
        search
      }
    }}>
      {children}
    </Context.Provider>
  )
}


export const useClientContextValue = () => useContext(Context);
export default ClientContext;
