import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

declare global {
  interface Window {
    kakao: any;
  }
}

type Marker = {
  spotId: string;
  addressName: string;
  roadAddressName: string;
  phone: string;
  position: { lat: number; lng: number };
  placeName: string;
};

type MapContainerProps = {
  searchPlace?: string;
  setSelectedPlace: (value?: Marker) => void;
};

export const MapContainer = ({
  searchPlace,
  setSelectedPlace,
}: MapContainerProps) => {
  const [info, setInfo] = useState<Marker>();
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [map, setMap] = useState<kakao.maps.Map>();

  useEffect(() => {
    setSelectedPlace(info);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  useEffect(() => {
    if (!map) return;

    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(
      searchPlace,
      (data: string | any[], status: any, _pagination: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const bounds = new window.kakao.maps.LatLngBounds();
          const markers = [];

          for (let i = 0; i < data.length; i++) {
            // @ts-ignore
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              spotId: data[i].id,
              placeName: data[i].place_name,
              phone: data[i].phone,
              addressName: data[i].address_name,
              roadAddressName: data[i].road_address_name,
            });
            // @ts-ignore
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
          }
          setMarkers(markers);
          map.setBounds(bounds);
        }
      }
    );
  }, [searchPlace, map]);

  return (
    <Map
      center={{
        lat: 37.566826,
        lng: 126.9786567,
      }}
      style={{
        width: "100%",
        height: "180px",
        borderRadius: "0.5rem  0.5rem 0 0",
      }}
      level={3}
      onCreate={setMap}
    >
      {markers.map((marker) => (
        <MapMarker
          key={`marker-${marker.placeName}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => setInfo(marker)}
        >
          {info && info.placeName === marker.placeName && (
            <div style={{ color: "#000" }}>{marker.placeName}</div>
          )}
        </MapMarker>
      ))}
    </Map>
  );
};
