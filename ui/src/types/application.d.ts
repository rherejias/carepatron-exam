interface IClient {
  id: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phoneNumber: string;
}

interface IApplicationState {
  clients: IClient[];
}
