
import useSwr from 'swr';

export default <T>(url: string): { data?: T, loading: boolean, error: any } => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json())
    const { data, error } = useSwr<T>(url, fetcher)
    return {
        data: data,
        loading: !data,
        error
    };
};