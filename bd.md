user:
  - ID: UUID unique (pk),
  - role: ('driver' | 'client' | 'admin')
  - username: string unique,
  - password: string
  - fio?: string,
  - sex?: 'male' | 'female',
  - age?: int,

client:
  - ID: UUID unique,
  - userID: UUID unique (fk->user.ID),
  - avatar?
  ...

car:
  - ID: UUID unique,
  - brand: string,
  - number: string,
  - year?: Date,
  - color?: string, 

driver:
  - ID: UUID unique (pk),
  - userID: UUID (fk->user.ID),
  - carID: UUID (fk->car.ID), 
  - numberOfTrips: int autoincrement default 0
  - mark?: float (0.0...5.0),

order_status:
  - ID: UUID unique,
  - name: string unique ('pending' | 'submited' | 'started' | 'finished' | 'canceled')

order:
  - ID: UUID unique (pk),
  - clientID: UUID (fk->client.ID),
  - driverID: UUID (fk->order_status.ID),
  - statusID: UUID (fk->driver.ID)
  - from: string,
  - to: string,
  - date: Date,
  - price: float,
