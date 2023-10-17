import { YMaps, Map, Polyline, Clusterer, ZoomControl } from 'react-yandex-maps'

function YandexMap({zoom, route, latitude, longitude, children, userPosition}) {

    const mapState = { center: [latitude, longitude], zoom: zoom}

    return (
        <YMaps>
            <Map
                state={mapState}
                theme={'custom#dark'}
                width={"100%"}
                height={"100%"}
            >
                <ZoomControl options={{ size: "small", position: {top: 190, right: 10}}} />
                {userPosition}
                
                <Clusterer
                options={{
                    preset: "islands#invertedVioletClusterIcons",
                    groupByCoordinates: false,
                    clusterIconColor: 'rgb(13, 105, 242)'
                }}
                >
                    {children}
                </Clusterer>

                { route ?
                    <Polyline geometry={route} options={{ strokeColor: 'rgb(85, 153, 255)', strokeWidth: 4 }} />
                    : ''
                }

            </Map>
        </YMaps>
    );
}

export default YandexMap;