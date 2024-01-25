import { TopIdoLaunchPadDetail } from '@/usecases/ieo-ido';
import { LaunchPadInfomationType } from '../types';
import LaunchPadInfomation from './LaunchPadInfomation';

type PropsType = {
  params: {
    slug: string[];
    category: string;
  };
};

const DetailPage = async ({ params }: PropsType) => {
  try {
    //@ts-ignore
    const data: LaunchPadInfomationType = await TopIdoLaunchPadDetail(
      
      { key: params.slug[0],time: '24h' }
    );

    return <LaunchPadInfomation category={params.category} data={data} />;
  } catch (error) {
    return <h1>Internal Server Error</h1>;
  }
};

export default DetailPage;
