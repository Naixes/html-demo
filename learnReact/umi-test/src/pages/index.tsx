import React from 'react';
import styles from './index.less';

import {Link} from "umi";

export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <ul>
        <li>
          <Link to={`/users`}>用户</Link>
        </li>
        <li>
          <Link to={`/goods`}>商品</Link>
        </li>
        <li>
          <Link to={`/about`}>关于</Link>
        </li>
      </ul>
    </div>
  );
}
