import { EntityRepository, Repository } from 'typeorm';

import { Car } from './../entities/Car';

@EntityRepository(Car)
class CarRepository extends Repository<Car> {

};

export default CarRepository;
