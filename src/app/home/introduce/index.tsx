import { Image } from 'antd';
import './index.scss';

export default function Introduce() {
  return (
    <div className='introduce mx-auto max-w-2xl px-4 py-3'>
      <h2 className='introduce__title font-extrabold text-2xl text-center mb-10 font-jeb'>
        Activity, Contribute And Earn
      </h2>
      <div className='introduce__wrapper'>
        <div className='grid xl:grid-cols-2 md:grid-cols-2 sm:gird-cols-1 gap-x-16 xl:gap-x-32 gap-y-12 xl:gap-y-4'>
          <div className='introduce-item flex gap-8 md:gap-10'>
            <div className='introduce-item__image'>
              <Image src='/introduce/review-earn.png' alt='Reviews And Earn' />
            </div>
            <div className='introduce-item__content grow'>
              <div className='introduce-item__content__title font-extrabold text-xl leading-normal mb-4 font-jeb'>
                Reviews And Earn
              </div>
              <div className='introduce-item__content__des text-sm leading-normal font-medium font-jm'>
                Write a review, give your opinion about the Crypto you bought.
              </div>
            </div>
          </div>
          <div className='introduce-item flex gap-8 md:gap-10'>
            <div className='introduce-item__image'>
              <Image
                src='/introduce/edit-update-earn.png'
                alt='Edit, Update And Earn'
              />
            </div>
            <div className='introduce-item__content grow'>
              <div className='introduce-item__content__title font-extrabold text-xl leading-normal mb-4 font-jeb'>
                Edit, Update And Earn
              </div>
              <div className='introduce-item__content__des text-sm leading-normal font-medium font-jm'>
                Recommend corrections or updates to any project information that
                you consider inaccurate or incomplete.
              </div>
            </div>
          </div>
          <div className='introduce-item flex gap-8 md:gap-10'>
            <div className='introduce-item__image'>
              <Image
                src='/introduce/interaction-earn.png'
                alt='Interactions And Earn'
              />
            </div>
            <div className='introduce-item__content grow'>
              <div className='introduce-item__content__title font-extrabold text-xl leading-normal mb-4 font-jeb'>
                Interactions And Earn
              </div>
              <div className='introduce-item__content__des text-sm leading-normal font-medium font-jm'>
                Comment, share, like, express your feelings with content and
                information on BlockUltra.
              </div>
            </div>
          </div>
          <div className='introduce-item flex gap-8 md:gap-10'>
            <div className='introduce-item__image'>
              <Image
                src='/introduce/make-influence-earn.png'
                alt='Make Influence And Earn'
              />
            </div>
            <div className='introduce-item__content grow'>
              <div className='introduce-item__content__title font-extrabold text-xl leading-normal mb-4 font-jeb'>
                Make Influence And Earn
              </div>
              <div className='introduce-item__content__des text-sm leading-normal font-medium font-jm'>
                At BlockUltra, anyone can become a KOL, as long as you have
                research articles, quality reviews, receive a lot of positive
                feedback from the community, you will receive a commensurate
                reward.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
