export type Position = {
  longitude: number;
  latitude: number;
};

export type UpdateCoordinates = {
  userId: string;
  position: Position;
};

export type Coordinate = Position & {
  id?: string;
  isDriver: boolean;
  userId: string;
  isActive: boolean;
  socketId: string;
};
