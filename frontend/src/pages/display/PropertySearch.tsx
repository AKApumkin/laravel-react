import { useEffect, useRef, useState } from "react";
import { usePapaParse } from "react-papaparse";

interface City{
    getPropertiesByCity: (cityName:string) => void;
    fetchCustomSearch: (properties: {}) => void;
}

export default function PropertySearch(props: City) {

    interface City{
        city: string;
    }

    const [selectedCity, setSelectedCity] = useState({ city: "" });
    const [cityData, setCityData] = useState<City[]>([]);
    const agentID = JSON.parse(localStorage.getItem("agent_id") || "null").agent;

    /**
     * gets all the cities that an agent has properties in and displays them in a dropdown
     * @returns JSON
     */
    const fetchCities = async () : Promise<void> => {
        const url = "http://localhost/api/property-city/"+agentID;
        const res = await fetch(url);
        const data = await res.json();
        return setCityData(data.data);
    };

    useEffect(() => {
        fetchCities();
    }, []);

    /**
     * sends the search paramaters to the parent component for processing
     */
    const searchPropertiesByCity = () :void => {
        props.getPropertiesByCity(selectedCity.city);
    }

    /**
     * handles the file input from the user
     */
    const [fileInput, setFileInput] = useState<File | null>(null);
    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileInput(e.target.files[0]);
        }
    };

    /**
     * processes a csv file into JSON with keypair attributes based off the 1st row then sends the search 
     * paramaters to the API the API processes all the properties and returns the results split 
     * into the search paramaters
     */
    const { readString } = usePapaParse();
    const handleCSVString = (CSVFile: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target && event.target.result) {
                const csvString = event.target.result.toString();
                readString(csvString, {
                    header: true,
                    quoteChar: '"',
                    complete: (results: any) => {
                        const combinedArray = {
                            search: results.data , 
                            agent_id: agentID
                        };
                        props.fetchCustomSearch(combinedArray);
                    },
                });
            }
        }
        reader.readAsText(CSVFile);
    }

    const sendFileInput = () => {
        if (fileInput) {
            handleCSVString(fileInput);
        }
    };
    
    return (
        <div className="display__search border-b w-full border-primary-color inline-block pb-2">
            <div className="display__search__left float-left w-2/4 max-sm:w-full">
                <label htmlFor="city" className="w-full mb-1 inline-block text-xs">Search by City</label>
                <select className="w-auto border border-primary-color rounded-md h-8 px-2 float-left w-auto box-border mt-1 mr-5 max-xsm:w-full"
                        name="city"
                        id="city"
                        defaultValue={'DEFAULT'}
                        onChange={(e) => setSelectedCity({ ...selectedCity, city: e.target.value })}>
                    <option disabled value="DEFAULT">Search a City</option>
                        {cityData.map((item, index) => (
                            <option key={index} value={item.city}>
                                {item.city}
                            </option>
                        ))}
                </select>
                <button onClick={searchPropertiesByCity} className="display__search__feild float-left px-5 h-8 w-auto bg-primary-color text-white rounded-md hover:bg-cta-color mt-1 max-sm:float-right max-xsm:w-full">Search</button>
            </div>
            <div className="display__search__right float-left w-2/4 max-sm:w-full">
                <label htmlFor="file" className="w-full mb-1 inline-block text-xs">Search by CSV</label>
                 <input id="file" type="file" onChange={handleFileInput} className="float-left w-auto mr-5"/>
                 <button onClick={sendFileInput} className="btn btn-primary float-left px-5 h-8 w-auto bg-primary-color text-white rounded-md hover:bg-cta-color mt-1 max-sm:float-right max-xsm:w-full">Upload</button>
            </div>
        </div>
    );
}