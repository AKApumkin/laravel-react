import { useEffect, useReducer, useState } from "react";
import DisplayItem from "./DisplayItem";
import LoadingSpinner from "./../../components/loading/LoadingSpinner";
import PropertySearch from "./PropertySearch";

interface Property {
    id: number;
    address: string;
    city: string;
    postcode: string;
}
interface Pagination {
    currentPage: number;
    lastPage: number;
}

function Display() {

    const [properties, setProperties] = useState<Property[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, lastPage: 2 });
    const [agentID, setAgentID] = useState<string>("");
    const [loadingData, setLoadingData] = useState<boolean>(false);
     /*
    * gets the agent id from local storage and calls the getAgentProperties function    
    */
    useEffect(() => {
        const storedItem = JSON.parse(localStorage.getItem("agent_id") || "null");
        if (storedItem) {
            getAgentProperties(storedItem.agent);
            setAgentID(storedItem.agent);
        }
    }, [agentID]);


    /**
     * gets the paginated agent properties from the api
     * @param agentID agent id
     * @param getNextPage optional boolean to trigger if next page is called
     * @returns JSON
     */
    const getAgentProperties = async (agentID: string, getNextPage?:boolean) : Promise<void> => {

        if (getNextPage && (pagination.currentPage < pagination.lastPage)) {
            const newPagination = pagination.currentPage += 1;
            agentID = agentID + "?page=" + newPagination;
            setLoadingData(true);
            setPagination({ ...pagination, currentPage: newPagination });
        }

        const url = "http://localhost/api/properties/" + agentID;
        const res = await fetch(url);
        const data = await res.json();
        setProperties([...properties, ...data.data]);
        setPagination({ ...pagination, lastPage: data.last_page });
        setLoadingData(false);
    }

    /**
     * returns specific properties by city that an agent has
     * @param cityName city name
     * @returns JSON
     * 
     */
    const getPropertiesByCity = async (cityName: string): Promise<void> => {
        const url = "http://localhost/api/property-city/" + cityName + "/" + agentID;
        setLoadingData(true);
        setProperties([]);
        const res = await fetch(url);
        const data = await res.json();
        setProperties([...data.data]);
        setPagination({ ...pagination, lastPage: data.last_page });
        setLoadingData(false);
    }

    /**
     * sends the search paramaters to the API the API processes all the properties and returns the results split
     * into the search paramaters and passes to the parent componenet
     * @param results JSON object that has been deconstructed from a CSV incuding the search paramaters and agent id
     * @returns JSON
     */
    const fetchCustomSearch = async (results: any) => {
        const url = "http://localhost/api/property-search/";
        setLoadingData(true);
        setProperties([]);
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(results),
        })
        .then((res) => res.json())
        .then((data) => { 
            setProperties([...properties, ...data.additional]);
            setProperties([...properties, ...data.mandatory]);
            setProperties([...properties, ...data.selective]);
            setPagination({ ...pagination, lastPage: 1 });
            console.log(data);
            setLoadingData(false);
        });
    }

    return (
        <div className="display m-auto pt-5 max-w-7xl">
            <div className="display__inner max-xl:px-5">
                <h1 className="box-border pb-5 text-5xl">Properties</h1>
                { properties.length > 0 ? (
                <div className="display__content">
                <PropertySearch getPropertiesByCity={getPropertiesByCity} fetchCustomSearch={fetchCustomSearch}/>
                    <div className="display__items m-auto pt-5 w-full pb-12 box-border">
                        <ul className=" w-full box-border">
                            { properties.map((item: Property, index: number) => (
                                <DisplayItem
                                    key={item.id}
                                    index={index}
                                    id={item.id}
                                    address={item.address}
                                    city={item.city}
                                    postcode={item.postcode}
                                />
                            ))}
                        </ul>
                        <div className="w-80 mx-auto">
                            { loadingData && (
                                <LoadingSpinner />
                            )}
                            {(pagination.currentPage < pagination.lastPage) && (!loadingData) &&  (
                                <button onClick={() => {getAgentProperties(agentID, true)}} 
                                className="mx-auto h-8 bg-cta-color px-2 text-white w-full max-w-sm max-w:50 rounded-md hover:bg-primary-color hover:text-white">Load More</button>
                            )}
                        </div>
                    </div>
                </div>
                ) : (
                    <LoadingSpinner />
                )}
            </div>
        </div>
    );
}
export default Display;