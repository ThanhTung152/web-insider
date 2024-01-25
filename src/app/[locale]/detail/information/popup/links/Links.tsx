import { getIconLink } from '@/app/[locale]/ieo-ido/[category]/config';
import { IconDiscord, IconTelegram, IconTwitter , IconFile, IconMedium, IconGithub} from '@/assets/icons';
import IconWeb from '@/assets/icons/IconWeb';
import {IconFacebook} from '@/assets/icons/IconFacebook';
import { Popover, Select } from 'antd';
import Image from 'next/image';

export function getLogo(type: string) 
      {
   switch (type) {
     case 'twitter':
       return <IconTwitter />;
     case 'web':
       return <IconWeb />;
     case 'telegram':
       return <IconTelegram />;
     case 'discord':
       return <IconDiscord />;
     case 'gitbook':
       return <IconFile />;
      case 'medium':
       return <IconMedium />;
       case 'github':
       return <IconGithub />;
         case 'facebook':
       return <IconFacebook />;
     
    
     default: null;
   }
 }

const Links = (props: any) => {
  const validLink = []
  
  const links = props.links;
  console.log('====================================');
  console.log("links", links);
  console.log('====================================');
  if (!links) return;
  if (links?.length <= 0) return;
  let newLinks=[]
  for (let i in links) {
    if (getLogo(links[i].type)) {
      newLinks.push(links[i])
    }
  }
  
  let backerExtend = [];
  for (let i = 0; i < newLinks.length; i++) {
    if (i > 2) {
      backerExtend.push(newLinks[i]);
    }
  }
 
  return (
    <div>
      {newLinks[0] && (
        <div>
          <p className='text-grey-500 text-sm'>Links</p>
          <div className='flex gap-4 xl:gap-5 py-[6px]'>
            {newLinks[0] && getIconLink(newLinks[0].type)}
            {newLinks[1] && getIconLink(newLinks[1].type)}
            {newLinks[2] && getIconLink(newLinks[2].type)}
            <Popover content={<DialogLinks links={backerExtend} />}>
              <span className='flex items-center justify-center w-7 h-7 rounded-full bg-grey-300 text-xs font-semibold text-grey-700 text-center cursor-pointer'>
                +{newLinks.length - 3}
              </span>
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
};
export function DialogLinks(props: any) {
  const links = props.links;
  
  return (
    <div className='flex flex-wrap gap-5 w-full md:max-w-[220px]'>
      {...Array.from(Array(links?.length).keys()).map((item: any) => {
        return getIconLink(links[item].type);
      })}
    </div>
  );
}

export default Links;
