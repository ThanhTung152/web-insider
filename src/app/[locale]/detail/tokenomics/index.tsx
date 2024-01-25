import { FetchCoinTokenomics } from '@/usecases/coin-info';
import TokenomicsInfo from './info/TokenomicsInfo';
import TokenAllocation from './token';

export default async  function Tokenomics(props:any) {

  async function fetchTokenomics() {
    const tokenomics = FetchCoinTokenomics({ coin_key: 'solana' });
    return tokenomics;
  }
  const tokenomics = await fetchTokenomics();
  
   console.log('====================================');
   console.log('Tokenomic', tokenomics);
  console.log('====================================');
  
  return (
    <div className='tokenomics fade-top'>
      <TokenomicsInfo tokenInfo={props.tokenInfo} data={tokenomics} />
      <div className='box-shadow-common p-6 bg-white rounded-lg'>
        <TokenAllocation tokenInfo={props.tokenInfo}  data={tokenomics} />
      </div>
    </div>
  );
}
