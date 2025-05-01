import { useTranslation } from 'react-i18next';
import { Button, Dropdown, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons'; 

const LanguageSwitcher = () => {
    const { i18n } = useTranslation(); 


    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng); 
    };

    const languageOptions = [
        { key: 'ko', label: '한국어' },
        { key: 'en', label: 'English' },
    ];

    // currentLanguageLabel 변경
    const currentLanguageLabel = languageOptions.find(lang => lang.key === i18n.language)?.label || 'Language';


    const menu = (
        <Menu
            onClick={({ key }) => changeLanguage(key)}
            selectedKeys={[i18n.language]} 
            items={languageOptions}
        />
    );

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <Button>
                {currentLanguageLabel} <DownOutlined />
            </Button>
        </Dropdown>
    );
};

export default LanguageSwitcher;