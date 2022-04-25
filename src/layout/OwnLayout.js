import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function OwnLayout(props) {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            style={{ background: "#185266" }}
            key="1"
            icon={<UserOutlined style={{ color: "#fff" }} />}
          >
            <Link to="/" style={{ color: "#fff" }}>
              Users
            </Link>
          </Menu.Item>
        </Menu>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            style={{ background: "#185266" }}
            key="1"
            icon={<UserOutlined style={{ color: "#fff" }} />}
          >
            <Link to="/orders" style={{ color: "#fff" }}>
              Orders
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default OwnLayout;
