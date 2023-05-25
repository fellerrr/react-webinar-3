import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: []
    }
  }

  async load(limit, skip) {
    const url = `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`;
    const response = await fetch(url);
    const json = await response.json();
    this.setState({ ...this.getState(), list: json.result.items }, 'Загружены товары из АПИ');
    return json.result.count
  }
}
export default Catalog;
