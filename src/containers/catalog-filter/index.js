import {memo, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import {formatCategories} from "../../utils";

function CatalogFilter() {

  const store = useStore();

  let formattedCategory = []

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,

    categories: state.catalog.categories
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Фильтр товаров по категории
    onSortCategory: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  if (select.categories){
    const newArray = JSON.parse(JSON.stringify(select.categories));
    formattedCategory = formatCategories(newArray);
    console.log('c chertami',formattedCategory);
  }

  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), []),
    categories: useMemo(() => {
      if (formattedCategory) {
        return [
          { key: 'all', value: '', title: 'Все' },
          ...formattedCategory.map(category => ({
            key: category._id,
            value: category._id,
            title: category.title,
          })),
        ];
      }
      return [{ key: 'all', value: '', title: 'Все' }];
    }, [formattedCategory]),

  }





  const {t} = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select options={options.categories} value={select.category} onChange={callbacks.onSortCategory}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
