import { ReactElement, useState } from "react";
import DisplayPopUp from "./DisplayPopUp";

// item  interfact
type listItem = {
    index: number;
    id: number;
    address: string;
    city: string;
    postcode: string;
}
function DisplayItem(props: listItem) :ReactElement {

    /**
     * creates and opens the modal
     */
    const [openModal, setOpenModal] = useState(false);
    const editItem = () => {
        setOpenModal(true);
    }
    return (
        <li key={props.index+props.id} className="border-b relative inline-block border-primary-color w-full pb-5 mt-10 last-of-type:border-none">
            <div className="display__items__image float-left max-w-sm w-1/6 max-lg:w-2/4 max-sm:w-full">
                <img src="https://picsum.photos/300/200" alt="" width="100%" height="100%"/>
            </div>
            <div className="display__items__info float-left w-4/6 box-border p-5 max-lg:w-2/4 max-sm:w-full max-sm:p-0 max-sm:pt-2">
                <p>{props.address}</p>
                <p>{props.city}</p>
                <p>{props.postcode}</p>
                <input type="hidden" name="property_id" value={props.id} />
            </div>
            <div className="display__items__edit float-left w-1/6 max-lg:w-full">
                <button className="float-right m-2 w-20 h-8 bg-primary-color text-white rounded-md hover:bg-cta-color mt-10"  onClick={editItem}>Edit</button>
            </div>
            { openModal && (
                <DisplayPopUp id={props.id} address={props.address} city={props.city} postcode={props.postcode} setOpenModal={setOpenModal}/>
            )}
        </li>
    );
}
export default DisplayItem;