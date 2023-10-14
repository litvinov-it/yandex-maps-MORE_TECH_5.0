import { useState, useEffect } from 'react';

const usePosition = () => {
    const [position, setPosition] = useState({"latitude": 0, "longitude": 0});
    const [error, setError] = useState(null);

    const onChange = (position) => {
        const { latitude, longitude} = position.coords
        // Здесь мы могли бы сохранить весь объект position, но для
        // ясности давайте явно перечислим, какие свойства нас интересуют.
        setPosition({latitude, longitude});
      };
    
    const onError = (error) => {
        setError(error.message);
    };

    useEffect(() => {
        const geo = navigator.geolocation;

        if (!geo) {
            setError('Геолокация не поддерживается браузером');
            return;
        }

        // Подписываемся на изменение геопозиции браузера.
        let watcher = geo.watchPosition(onChange, onError);

        // В случае, если компонент будет удаляться с экрана
        // производим отписку от слежки, чтобы не засорять память.
        return () => geo.clearWatch(watcher);
    }, []);

    return { ...position, error };
}

export default usePosition;