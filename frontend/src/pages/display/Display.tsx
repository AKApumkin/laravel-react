import { useEffect, useReducer, useState } from "react";
import DisplayItem from "./DisplayItem";
import LoadingSpinner from "./../../components/loading/LoadingSpinner";

interface Property {
    id: number;
    address: string;
    city: string;
    postcode: string;
}

function Display() {

    interface FormState {
        agent: string;
        city: string;
        modal: string;
        selectedAddress: string;
        selectedCity: string;
        selectedPostcode: string;
    }
    
    /**
     * manages all the sates for the display section
     */
    const [formState, SetformState] = useReducer(
        (state: FormState, newState: Partial<FormState>) => ({ ...state, ...newState }),
        {
            agent: "",
            city: "",
            modal: "open",
            selectedAddress: "",
            selectedCity: "",
            selectedPostcode: "",
        }
    );
  
    const [properties, setProperties] = useState<Property[]>([]);
    const getAgentProperties = (agent: string) => {
        const url = "http://localhost/api/properties/"+agent;
        return fetch(url)
            .then((res) => res.json())
            .then((d) => setProperties(d));
    }

    useEffect(() => {
        const storedItem = JSON.parse(localStorage.getItem("agent_id") || "null");
        if (storedItem) {
            SetformState({...formState, agent: storedItem.agent})
            getAgentProperties(storedItem.agent);
        }
    }, []);

    return (
        <div className="display m-auto pt-5 max-w-7xl">
            <div className="display__inner max-xl:px-5">
                <h1 className="box-border pb-5 text-5xl">Properties</h1>
                <div className="display__items inline-block m-auto pt-10 w-full">
                    <ul className=" w-full box-border">
                        {properties.length > 0 ? (
                            properties.map((item: Property, index: number) => (
                                <DisplayItem
                                    key={item.id}
                                    index={index}
                                    id={item.id}
                                    address={item.address}
                                    city={item.city}
                                    postcode={item.postcode}
                                />
                            ))
                        ) : (
                            <LoadingSpinner />
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default Display;