import React, { FC } from 'react';
import styles from './item.less';
import { connect, ItemModelState, ConnectProps } from 'umi';

interface PageProps extends ConnectProps {
  item: ItemModelState;
}

const Item: FC<PageProps> = (props) => {
  console.log(props.item);
  return (
    <div>
      <h1 className={styles.title}>Page item</h1>
      <h2>This is {props.item.name}</h2>
    </div>
  );
}
// 使用connect连接页面和models
export default connect(({ item }: { item: ItemModelState }) => ({ item }))(Item);
