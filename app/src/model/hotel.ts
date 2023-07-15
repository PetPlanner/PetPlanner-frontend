import Address from "./address";

export default interface Hotel {
  id: number;
  name: string;
  address: Address;
  hostId: number;
  avgGrade: number;
  capacity: number;
}
