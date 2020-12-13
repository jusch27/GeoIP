export interface Geoip2 {
    location: {
        latitude: number;
        longitude: number;
    }
    city: {
        names:{
            en: string
        }
    };
}