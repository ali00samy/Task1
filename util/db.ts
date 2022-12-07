import { Sequelize } from 'sequelize';
import config from 'config';

const sequelize : Sequelize = new Sequelize('task_ts', 'root', config.get('db_pass') , {dialect: 'mysql'});

export default sequelize;