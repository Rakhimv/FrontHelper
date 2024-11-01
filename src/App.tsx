import { useEffect } from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
// import { Button } from '@nextui-org/react';
// import MusicBlock from './blocks/Music';
import SearchMusic from './blocks/SearchMusic';
// import { Button } from '@nextui-org/react';

const tg = Telegram.WebApp;

function App() {
    // const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        tg.expand();
        tg.setHeaderColor('#000000');
        tg.setBackgroundColor('#000000');
        tg.setBottomBarColor('#000000');


        // Music.play().catch(error => {
        //     console.error("Ошибка при воспроизведении аудио:", error);
        // });
    }, []);

   
    // const handleOpen = () => {
    //     // const chatId = tg.initDataUnsafe.user?.photo_url || tg.initDataUnsafe.user?.id;
    //     // tg.openTelegramLink(`https://t.me/SocialBeatBot?start=${chatId}`);
    //     // tg.close()
    //     setShow(true)
    // };

    return (
        <Routes>
            <Route index element={
                <div className="App">
                    <SearchMusic />

                </div>
            } />
        </Routes >
    );
}

export default App;
