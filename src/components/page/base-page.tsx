import { Breadcrumb } from 'antd';
import clsx from 'clsx';
import { PageProps } from './props';

export default function BasePage(props: PageProps) {
  const {
    breadcrumbs,
    children,
    classnames,
    contentClassnames = 'px-3 py-8',
  } = props;
  return (
    <div className={clsx('mx-auto max-w-2xl px-4 py-3', classnames)}>
      <div className='px-4 md:px-0'>
        <Breadcrumb items={breadcrumbs} />
      </div>
      <div className={contentClassnames}>{children}</div>
    </div>
  );
}
