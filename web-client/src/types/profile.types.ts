export type Car = {
  id?: string,
  brand: string,
  number: string,
  year: number,
};

export type Driver = {
  id: string,
  numberOfTrips: number,
  mark: number,
  car: Car | null,
};
