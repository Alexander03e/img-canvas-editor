import '@scss/index.scss';
import { Layout } from 'antd';
import { Sidebar } from '@Components/SideBar';
import { Content } from 'antd/es/layout/layout';
import { UploadImage } from '@Features/image';
import { ImageCanvas } from '@Features/image';
import { Toolbar } from '@Features/image/toolbar';

const App = () => {
    return (
        <Layout style={{ height: '100vh' }}>
            <Sidebar>
                <Sidebar.Content>
                    <UploadImage />
                </Sidebar.Content>
                <Sidebar.Footer>
                    <Toolbar />
                </Sidebar.Footer>
            </Sidebar>

            <Layout>
                <Content style={{ position: 'relative', padding: 20 }}>
                    <ImageCanvas />
                </Content>
            </Layout>
        </Layout>
    );
};

export { App };
