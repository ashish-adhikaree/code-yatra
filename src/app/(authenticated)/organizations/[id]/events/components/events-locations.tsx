"use client";

import { useEffect, useRef, useState } from "react";
import type Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

const EventsLocation = ({
    radiusInKm,
    latitude,
    longitude,
}: {
    radiusInKm: number;
    latitude: number;
    longitude: number;
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [L, setLeafletInstance] = useState<typeof Leaflet | null>(null);

    // Import Leaflet client side
    useEffect(() => {
        let isUnmounted = false;

        (async () => {
            const instance = await import("leaflet");
            if (!isUnmounted) {
                setLeafletInstance(instance);
            }
        })();

        return () => {
            isUnmounted = true;
            setLeafletInstance(null);
        };
    }, []);

    // Initialize the map dom once Leaflet has successfully been imported
    useEffect(() => {
        let map: typeof L | null = null;

        if (ref.current && L) {
            map = L.map(ref.current, {
                center: [latitude, longitude],
                zoom: 13,
                zoomControl: false,
                layers: [L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png")],
                attributionControl: false,
            });

            const placeIcon = L.icon({
                iconUrl: "/map-pin.png",
                iconSize: [35, 48],
                iconAnchor: [17, 24],
                className: ``,
            });

            L.circle([latitude, longitude], {
                radius: radiusInKm * 1000,
                fillColor: "red",
                interactive: false,
                stroke: false,
                bubblingMouseEvents: false,
            }).addTo(map);

            L.marker([latitude, longitude], {
                icon: placeIcon,
            }).addTo(map);
        }

        return () => {
            if (map) {
                map.off();
                map.remove();
            }
        };
    }, [ref, L]);

    return (
        <div className="relative">
            <div className="h-[500px] rounded-md overflow-clip relative z-[10]" ref={ref}></div>
        </div>
    );
};

export default EventsLocation;
