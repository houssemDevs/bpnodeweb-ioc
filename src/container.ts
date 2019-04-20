import { Container } from 'inversify';

/* #region  injectable types */
import { HelloWorldService } from '@/services/service';
import { IOC_TYPES } from './constants';
/* #endregion */

const container = new Container();

container.bind(IOC_TYPES.helloWorld).to(HelloWorldService);

export default container;
