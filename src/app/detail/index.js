import PageLayout from "../../components/page-layout";
import {useCallback, useEffect} from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import './style.css'
import {numberFormat} from "../../utils";
import {useParams} from "react-router-dom";
const Detail = () => {
  const store = useStore();
  const { itemId } = useParams();
  // const callbacks = {
  //   // Добавление в корзину
  //   addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  // }
  const addToBasket = (itemId) => store.actions.basket.addToBasket(itemId)



  useEffect(() => {
    store.actions.details.load(itemId)
      .then((json) => {
        console.log('json',json)

      })
      .catch((error) => {
        console.log(error)
      });
  }, [itemId]);
  const select = useSelector(state => ({
    data: state.details.data,
  }));
  // let itemId = select.data._id
  let description = select.data.description
  let category = select.data.category
  let nameCategory
  if (category) {
    nameCategory = category.title
  }
  let price = select.data.price
  let year = select.data.edition
  let madeIn = select.data.madeIn
  let country
  let countryCode
  if (madeIn) {
    country = madeIn.title
    countryCode  = madeIn.code
  }
  let productTitle = select.data.title
  return (
    <PageLayout productTitle={productTitle}>
      <div className='details'>
        <p className='description'>{description}</p>
        <p className='country'>Страна производитель: <span>{country} ({countryCode}</span>)</p>
        <p className='category'>Категория: <span>{nameCategory}</span></p>
        <p className='year'>Год выпуска: <span>{year}</span></p>
        <p className='price'>Цена: {numberFormat(price)} ₽</p>
        <button onClick={()=>addToBasket(itemId)}>Добавить</button>
      </div>
    </PageLayout>
  );
};

export default Detail;