export type Coordinates = {
  lat: number;
  lng: number;
};

export async function getApproximateLocation(): Promise<Coordinates> {
  if (typeof navigator === "undefined" || !navigator.geolocation) {
    throw new Error("Geolocation is not supported in this environment");
  }

  return new Promise<Coordinates>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error(error.message || "Unable to fetch current location"));
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 120000,
      },
    );
  });
}
