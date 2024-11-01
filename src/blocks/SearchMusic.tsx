import { useEffect, useState } from "react";
import { useToken } from "../contexts/SpotifyToken";
import { Image, Input } from "@nextui-org/react";

const SearchMusic = () => {
    const { SPFtoken } = useToken();
    const [songs, setSongs] = useState<any[]>([]);
    const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
    const [value, setValue] = useState<string>("casino143");
    const [error, setError] = useState<string>("");

    async function searchSong(query: string) {
        setError(""); // Сбрасываем ошибку перед новым запросом
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=5&offset=0`, {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + SPFtoken,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error("Ошибка при получении данных");
            }

            const data = await response.json();
            setSongs(data.tracks.items);
        } catch (error) {
            console.error("Error fetching songs:", error);
            setError("Не удалось получить данные. Попробуйте еще раз."); // Установка сообщения об ошибке
        }
    }

    useEffect(() => {
        const trimmedValue = value.trim();
        if (trimmedValue) {
            searchSong(trimmedValue);
        }
    }, [value]);

    const playPreview = (url: string) => {
        // Останавливаем предыдущее воспроизведение
        if (currentAudio) {
            currentAudio.pause();
        }

        const audio = new Audio(url);
        setCurrentAudio(audio);

        audio.volume = 0; // Начинаем с громкости 0
        audio.play();

        // Плавное увеличение громкости при загрузке аудио
        audio.addEventListener('canplaythrough', () => {
            let fadeInInterval = setInterval(() => {
                if (audio.volume < 1) {
                    audio.volume = Math.min(audio.volume + 0.1, 1); // Увеличиваем громкость
                } else {
                    clearInterval(fadeInInterval); // Останавливаем интервал, когда громкость достигает 1
                }
            }, 200); // Увеличиваем громкость каждые 100 мс
        });
    };

    return (
        <div className="flex flex-col pt-[100px] gap-[10px] items-center p-[20px]">
            <Input
                label="ЙОз нах название песни"
                placeholder="Enter song name"
                value={value}
                onValueChange={setValue}
            />
            {error && <p className="text-red-500">{error}</p>} {/* Отображение ошибки */}
            {songs.length > 0 &&
                songs.map((item: any, key: number) => (
                    <div
                        className="p-[10px] bg-blue-700 rounded-lg w-full cursor-pointer transition-all active:bg-blue-950"
                        onClick={() => playPreview(item.preview_url)}
                        key={key}
                    >
                        <div className="w-full flex gap-[10px] items-center overflow-hidden">
                            <div className="max-w-[40px] min-w-[40px] rounded-md min-h-[40px] max-h-[40px] overflow-hidden">
                                <Image loading="lazy" src={item.album.images[1].url} className="w-full h-full" />
                            </div>
                            <div>
                                <p className="overflow-hidden whitespace-nowrap text-ellipsis">{item.name}</p>
                                <p className="overflow-hidden whitespace-nowrap text-ellipsis text-[12px] opacity-75">{item.artists[0].name}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default SearchMusic;
