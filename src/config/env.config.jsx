const {
    VITE_API_URL: URL,
    VITE_API_URL_DOLAR: URL_DOLAR,
    VITE_API_URL_LOCAL: URL_LOCAL,
    VITE_API_URL_LOCAL_SIN_API: URL_LOCAL_SIN_API
} = import.meta.env;

export const env = {
    URL,
    URL_DOLAR,
    URL_LOCAL,
    URL_LOCAL_SIN_API
}