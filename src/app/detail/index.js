import PageLayout from "../../components/page-layout";
import {useEffect} from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import '../../components/detail-product/style.css'
import {useParams} from "react-router-dom";
import DetailProduct from '../../components/detail-product'
const Detail = () => {
  const store = useStore();
  const { itemId } = useParams();
  const addToBasket = (itemId) => store.actions.basket.addToBasket(itemId)

  useEffect(() => {
    const getDetails = async ()=>{
      await store.actions.details.load(itemId)
    }
    getDetails()
  // }, []);
  }, [itemId, store.actions.details]);
  const select = useSelector(state => ({
    data: state.details.data,
  }));
  return (
    <PageLayout>
      <DetailProduct data={select.data} addToBasket={addToBasket}/>
    </PageLayout>
  );
};

export default Detail;