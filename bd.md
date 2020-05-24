user:
  - ID: UUID unique (pk),
  - role: ('driver' | 'client' | 'admin')
  - email: string unique,
  - password: string
  - fio?: string,
  - sex?: 'male' | 'female',
  - age?: int,
  - avatar?

car:
  - ID: UUID unique,
  - brand: string,
  - number: string,
  - year?: number,
  - color?: string, 

driver:
  - ID: UUID unique (pk),
  - userID: UUID (fk->user.ID),
  - carID: UUID (fk->car.ID), 
  - numberOfTrips: int default 0
  - mark?: float (0.0...5.0),

order:
  - ID: UUID unique (pk),
  - clientID: UUID (fk->client.ID),
  - driverID: UUID (fk->order_status.ID),
  - statusID: ('pending' | 'submited' | 'started' | 'finished' | 'canceled')
  - from: UUID (fk->coordinates.ID),
  - to: UUID (fk->coordinates.ID),
  - date: Date,
  - price: float,

coordinates:
 - ID: UUID unique (pk),
 - userID: UUID (fk),
 - longitude: float not null,
 - latitude: float not null

geo-location


1.client -(order request)-> booking -> save to db -(order)-> kafka ->
websocket listen kafka .on('order', ) ->
fetch closest drivers in some dispason (user_id) ->
send to drivers notification (from coordinates, to coordinates)

2. driver -> (submit oder) -> booking -> update order -> get info about driver from service ->
-> (info about driver) -> kafka
websocket listen kafka .on('update order', ) ->
send to client ->

login - auth service + role===driver ? join driver +
establish socket connection to geo-location service +
establish socket connection to websocket service : null;

when driver login: random coordinates in some dispason +
moving: setInterval(() => send coordinates to geo-location service, 5000);

driver page:
 - requests to profile service in order to update info
 - .on('new-order', () => display coondinates of user)
 - submit: send to booking service request: 2*

client page:
 - select from, to + send to booking service (create order + (1*)) 
 - when driver submit + display driver coordinates + 
 setInterval(() => refresh coordinates of driver in user's direction, 1000) +
 enable button `cancle order` during 20 seconds

cancel:
 - send to booking service -> update status ->
send driverID of this order to kafka ->
websocket.on('cancel-order', (driverID) => send notification to appropriate driver)

sendCoordinates variable (change when oder was submited and finished or canceled)

user, driver:
  - setInterval(() => refresh coordinates of driver in order.to direction, 1000) for 30 seconds
  - send to booking service refresh order status



login

register ar user
register as driver

common page -> role==='DRiver' ? car page : main page
car page -> main page with menu


finish login and registration
implement main page (search bar, map and burger menu)
implement profile editing
implement location moving
