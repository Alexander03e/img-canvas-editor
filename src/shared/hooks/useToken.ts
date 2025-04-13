import { theme } from 'antd';

export const useToken = () => {
    const { useToken: useAntToken } = theme;

    const { token } = useAntToken();

    return token;
};
