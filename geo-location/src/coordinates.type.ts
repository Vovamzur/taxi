export type Position = {
  longitude: number;
  latitude: number;
};

export type UpdateCoordinates = {
  userId: string;
  position: Position;
};

