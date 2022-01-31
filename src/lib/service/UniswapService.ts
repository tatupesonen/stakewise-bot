import { AxiosInstance } from 'axios';
import { Container, DITypes } from '../container/container';

export class UniswapService {
  apiBase: AxiosInstance;
  public constructor(private readonly container: Container) {
    this.apiBase = container.getByKey<AxiosInstance>(DITypes.uniswapAPI);
  }
}
