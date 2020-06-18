import { Layout, Menu } from 'antd';
import {Link} from 'umi'

import styles from './index.less';

const { Header, Content, Footer } = Layout;

function BasicLayout(props) {
  const {
    location: {pathname},
    children
  } = props
  return (
    <Layout>
      <Header>
        <div className={styles.logo}>王者荣耀资料库 </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[pathname]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="/hero">
            <Link to="hero">{pathname}英雄</Link>
          </Menu.Item>
          <Menu.Item key="/item">
            <Link to="item">局内道具</Link>
            </Menu.Item>
          <Menu.Item key="/summoner">
            <Link to="summoner">召唤师技能</Link>
            </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Umi 入门教程 Created by Naixes</Footer>
    </Layout>
  );
}

export default BasicLayout;