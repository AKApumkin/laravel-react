import { useEffect, useReducer, useState } from "react";
import DisplayItem from "./DisplayItem";
import LoadingSpinner from "./../../components/loading/LoadingSpinner";

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
    const [loadingData, setLoadingData] = useState<boolean>(false);

    /**
     * gets the paginated agent properties from the api
     * @param agentID agent id
     * @param getNextPage optional boolean to trigger if next page is called
     * @returns 
     */
    const getAgentProperties = (agentID: string, getNextPage?:boolean) => {
        if (getNextPage && (pagination.currentPage < pagination.lastPage)) {
            setLoadingData(true);
            let newPagination = pagination.currentPage += 1;
            agentID = agentID + "?page=" + newPagination;
            setPagination({ ...pagination, currentPage: newPagination });
        }
        const url = "http://localhost/api/properties/" + agentID;

        return fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setProperties([...properties, ...data.data]);
                setPagination({...pagination, lastPage: data.last_page});
                setLoadingData(false);
            });
    }

    /*
    * gets the agent id from local storage and calls the getAgentProperties function    
    */
    const [agentID, setAgentID] = useState<string>("");
    useEffect(() => {
        const storedItem = JSON.parse(localStorage.getItem("agent_id") || "null");
        if (storedItem) {
            getAgentProperties(storedItem.agent);
            setAgentID(storedItem.agent);
        }
    }, [agentID]);

    return (
        <div className="display m-auto pt-5 max-w-7xl">
            <div className="display__inner max-xl:px-5">
                <h1 className="box-border pb-5 text-5xl">Properties</h1>
                { properties.length > 0 ? (
                    <div className="display__items m-auto pt-10 w-full pb-12 box-border">
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
                ) : (
                    <LoadingSpinner />
                )}
            </div>
        </div>
    );
}
export default Display;