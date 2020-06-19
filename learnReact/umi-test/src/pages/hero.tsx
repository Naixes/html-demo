import React, { FC } from 'react';
import styles from './hero.less';
import { connect, HeroModelState, ConnectProps } from 'umi';

interface PageProps extends ConnectProps {
  hero: HeroModelState;
}

// FC:函数组件
const Hero: FC<PageProps> = (props) => {
  // props.命名空间
  console.log(props.hero);
  return (
    <div>
      <h1 className={styles.title}>Page hero</h1>
      <h2>This is {props.hero.name}</h2>
    </div>
  );
}
// 使用connect连接页面和models
export default connect(({ hero }: { hero: HeroModelState }) => ({ hero }))(Hero);
