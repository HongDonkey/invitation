"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.kakao) return;

    window.kakao.maps.load(() => {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(37.50359, 127.02041), // 좌표 수정
        level: 3,
        draggable: true,
        scrollwheel: true,
        disableDoubleClickZoom: false,
        keyboardShortcuts: false,
      };

      const map = new window.kakao.maps.Map(container, options);
      map.setDraggable(true);
      map.setZoomable(true);

      const markerPosition = new window.kakao.maps.LatLng(37.50359, 127.02041);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      window.kakao.maps.event.addListener(map, 'click', function(mouseEvent: { latLng: { getLat: () => any; getLng: () => any; }; }) {
        const lat = mouseEvent.latLng.getLat();
        const lng = mouseEvent.latLng.getLng();

        const url = `https://map.kakao.com/link/map/${markerPosition.getLat()},${markerPosition.getLng()}`;

        window.open(url, '_blank');
        });

      marker.setMap(map);
    });
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-64 rounded-xl"
      style={{ touchAction: "none" }}
    />
  );
}