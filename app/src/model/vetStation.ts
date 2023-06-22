import Address from "./address";

export default interface VetStation {
  id: number;
  name: string;
  address: Address;
  hostId: number;
}
