import { EntityRepository, Repository } from 'typeorm';

import { Driver } from './../entities/Driver';

@EntityRepository(Driver)
class DriverRepository extends Repository<Driver> {

};

export default DriverRepository;
