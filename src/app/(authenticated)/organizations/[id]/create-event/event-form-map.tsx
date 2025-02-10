"use client";

import { useEffect, useRef, useState } from "react";
import type Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

const EventFormMap = ({ radiusInKm }: { radiusInKm: number }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [L, setLeafletInstance] = useState<typeof Leaflet | null>(null);
    const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number }>({
        latitude: 27.69943435605934,
        longitude: 85.32410167406923,
    });
    const [fullAddressText, setFullAddressText] = useState<string | null>(null);
    const [locationPin, setLocationPin] = useState<any>();
    const [eventCircle, setEventCircle] = useState<any>();

    useEffect(() => {
        const storedFullAddressText = localStorage.getItem("fullAddressText");
        if (storedFullAddressText) setFullAddressText(storedFullAddressText);
        if (!storedFullAddressText) {
            getLocation();
        }
    }, []);

    const getAddress = async (location: { lat: number; long: number }) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.long}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch city name");
            }
            const data = await response.json();

            const address = data.display_name;
            setFullAddressText(address);
            localStorage.setItem("fullAddressText", address);
        } catch (error) {
            console.error("Error fetching city name:", error);
        }
    };

    const getLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const location = {
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                    };
                    setCoordinates({
                        latitude: location.lat,
                        longitude: location.long,
                    });
                    await getAddress(location);
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

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
                center: [coordinates.latitude, coordinates.longitude],

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

            map.on("move", function () {
                const center = map.getCenter();
                marker.setLatLng([center.lat, center.lng]);
                circle.setLatLng([center.lat, center.lng]);
            });

            map.on("moveend", function () {
                const center = map.getCenter();
                setCoordinates({
                    latitude: center.lat,
                    longitude: center.lng,
                });
                getAddress({
                    lat: center.lat,
                    long: center.lng,
                });
            });

            const circle = L.circle([coordinates.latitude, coordinates.longitude], {
                radius: radiusInKm * 1000,
                fillColor: "green",
                interactive: false,
                stroke: false,
                bubblingMouseEvents: false,
            }).addTo(map);

            setEventCircle(circle);

            const marker = L.marker([coordinates.latitude, coordinates.longitude], {
                icon: placeIcon,
            }).addTo(map);

            setLocationPin(marker);
        }

        return () => {
            if (map) {
                map.off();
                map.remove();
            }
        };
    }, [ref, L]);

    useEffect(() => {
        if (eventCircle && radiusInKm) {
            eventCircle.setRadius(radiusInKm * 1000);
        }
    }, [radiusInKm]);

    return (
        <div className="relative">
            {fullAddressText ? (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[200] shadow-sm bg-white text-black px-4 py-2 rounded-md text-xs sm:text-sm max-w-[min(80%,400px)] truncate">
                    {fullAddressText}
                </div>
            ) : null}
            <input type="hidden" name="latitude" value={coordinates.latitude} />
            <input type="hidden" name="longitude" value={coordinates.longitude} />
            <input type="hidden" name="location" value={fullAddressText || undefined} />
            <div className="h-[500px] rounded-md overflow-clip relative z-[10]" ref={ref}></div>
        </div>
    );
};

export default EventFormMap;
