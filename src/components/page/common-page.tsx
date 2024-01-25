import { Breadcrumb } from 'antd';
import { PageProps } from './props';

export default function CommonPage(props: PageProps) {
  const { breadcrumbs, children, classnames } = props;
  return (
    <div className='container'>
      <div className='pt-4'>
        <Breadcrumb items={breadcrumbs} />
      </div>
      <div className={classnames}>{children}</div>
    </div>
  );
}
