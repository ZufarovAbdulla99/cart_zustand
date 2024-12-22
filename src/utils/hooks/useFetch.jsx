import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export function useFetch(url) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = useCallback(async () => {
        setIsLoading(true)
        setError(null)

        try{
            const response = await axios.get(url)

            // if(!response.ok) throw new Error("Error fetching data")
            const data = response.data
            console.log(data, "*")
            setData(data)
        }catch(error){
            setError(error)
        }finally{
            setIsLoading(false)
        }
    }, [url]);

    useEffect(() => {
        fetchData()
    }, [url, fetchData])

    return { data, isLoading, error, refetch: fetchData};
}