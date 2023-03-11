import CategoryMapper from './mappers/CategoryMapper';
import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://192.168.50.102:3001');
  }

  async listCategories(orderBy = 'asc') {
    const categories = await this.httpClient.get(`/categories?orderBy=${orderBy}`);
    return categories.map(CategoryMapper.toDomain);
  }
}

export default new CategoriesService();
