import Sider from 'antd/es/layout/Sider';
import { useAppStore } from '@App';
import { Button, Flex } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { PropsWithChildren } from 'react';
import { useToken } from '@Shared/hooks';

const Sidebar = ({ children }: PropsWithChildren) => {
    const collapsed = useAppStore(state => state.siderCollapsed);
    const token = useToken();
    const setCollapsed = useAppStore(state => state.setSiderCollapsed);
    const handleCollapse = (value: boolean) => {
        setCollapsed(value);
    };

    const TriggerIcon = collapsed ? <ArrowRightOutlined /> : <ArrowLeftOutlined />;

    return (
        <Sider
            style={{
                background: token.colorBgContainer,
                paddingInline: collapsed ? 0 : 20,
                paddingBlock: 20,
            }}
            zeroWidthTriggerStyle={{
                overflow: 'hidden',
                position: 'fixed',
                width: 32,
                height: 32,
                borderRadius: '50%',
                bottom: 20,
                left: !collapsed ? 340 : 20,
                top: 'auto',
            }}
            breakpoint='md'
            width={320}
            collapsed={collapsed}
            trigger={<Button icon={TriggerIcon} />}
            collapsedWidth='0'
            onBreakpoint={broken => {
                if (broken) setCollapsed(true);
            }}
            onCollapse={handleCollapse}
        >
            <Flex style={{ height: '100%' }} vertical>
                {children}
            </Flex>
        </Sider>
    );
};

Sidebar.Content = ({ children }: PropsWithChildren) => {
    return (
        <Flex vertical flex={'1 0 auto'}>
            {children}
        </Flex>
    );
};

Sidebar.Footer = ({ children }: PropsWithChildren) => {
    return <Flex vertical>{children}</Flex>;
};

export { Sidebar };
