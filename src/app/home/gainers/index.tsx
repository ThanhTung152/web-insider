import { useEffect, useState } from 'react';
import './style.scss';
import { Space } from 'antd';
import { FetchGainers, FetchLosers } from '../../../usecases/home';
import GainersHeader from './gainers-header';
import TopData from './top-data';
import { caculatorAverage24h } from '@/helpers/functions';
import { ORDER } from '@/helpers/constants';

const Gainers = () => {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [filterCoin, setFilterCoin] = useState('all');
  const [filterTime, setTime] = useState('24h');
  const [orderGainer, setOrderGainer] = useState({
    columnKey: '',
    order: '',
  });

  const [orderLoser, setOrderLoser] = useState({
    columnKey: '',
    order: '',
  });

  function getGainers() {
    FetchGainers({
      time: filterTime,
      coin: filterCoin,
      sort_by: orderGainer.columnKey,
      sort_order: ORDER[orderGainer['order'] as keyof typeof ORDER],
    }).then((res: any) => {
      res.data.map((item: any) => {
        const average24 = caculatorAverage24h(item.price, item.histPrices);
        item.average24 = average24;
        return item;
      });
      setGainers(res.data);
    });
  }

  function getLosers() {
    FetchLosers({
      time: filterTime,
      coin: filterCoin,
      sort_by: orderLoser.columnKey,
      sort_order: ORDER[orderLoser['order'] as keyof typeof ORDER],
    }).then((res: any) => {
      res.data.map((item: any) => {
        const average24 = caculatorAverage24h(item.price, item.histPrices);
        item.average24 = average24;
        return item;
      });
      setLosers(res.data);
    });
  }

  useEffect(() => {
    getLosers();
  }, [filterTime, filterCoin, orderLoser]);

  useEffect(() => {
    getGainers();
  }, [filterTime, filterCoin, orderGainer]);

  return (
    <div className='gainer-tab hide-scroll'>
      <GainersHeader onFilterCoins={setFilterCoin} onFilterTime={setTime} />
      <div className='pt-6'>
        <div className='flex flex-col xl:flex-row xl:gap-20'>
          <TopData
            title='Top Gainers'
            data={gainers}
            onChangeOrder={setOrderGainer}
          />
          <TopData
            title='Top Losers'
            data={losers}
            onChangeOrder={setOrderLoser}
          />
        </div>
      </div>
    </div>
  );
};

export default Gainers;
