import { useReducer } from "react";

interface protertiesPopUpList {
    id: number;
    address: string;
    city: string;
    postcode: string;
    setOpenModal: (value: boolean) => void;
}

export default function DisplayPopUp(props: protertiesPopUpList) {

    interface FormState {
        id: number;
        address: string;
        city: string;
        postcode: string;
    }

    const [formState, SetformState] = useReducer(
        (state: FormState, newState: Partial<FormState>) => ({ ...state, ...newState }),
        {
            id: props.id,
            address: props.address,
            city: props.city,
            postcode: props.postcode,
        }
    );

    /**
     * updates the property information
     */
    const updateProperty = async () => {
        const url = "http://localhost/api/property";
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formState),
        })
        .then((res) => res.json())
        props.setOpenModal(false);
    };
    return (
        <div className=" modalbackgroundmodal fixed w-full h-full top-0 left-0 z-50 bg-black bg-opacity-10">
            <dialog id="modal" className="modal fixed bg-white w-11/12 h-5/6 top-14 z-50 border" open>
                <button id="closeModal" className="float-right h-8 bg-cta-color px-2 text-white m-3 rounded-md hover:bg-primary-color hover:text-white" onClick={() => props.setOpenModal(false)}>Close</button>
                <div className="modal__contents w-80 m-auto pt-24 box-border max-sm:w-full max-sm:p-10">
                    <div className="modal__fields mb-5">
                        <label htmlFor={"address"+props.id} className="mb-2 w-full text-xs">Address:</label>
                        <input id={"address"+props.id} className="w-full border indent-1" name="address" type="text" defaultValue={props.address} onChange={e => SetformState({...formState, address: e.target.value})}/>
                    </div>
                    <div className="modal__fields mb-5">
                        <label htmlFor={"city"+props.id} className="mb-2 w-full text-xs">City:</label>
                        <input id={"city"+props.id} className="w-full border indent-1" name="city" type="text" defaultValue={props.city} onChange={e => SetformState({...formState, city: e.target.value})}/>
                    </div>
                    <div className="modal__fields mb-5">
                        <label htmlFor={"postcode"+props.id} className="mb-2 w-full text-xs">Postcode:</label>
                        <input id={"postcode"+props.id} className="w-full border indent-1" name="postcode" type="text" defaultValue={props.postcode} onChange={e => SetformState({...formState, postcode: e.target.value})}/>
                    </div>
                    <button onClick={updateProperty} className="w-full h-8 bg-primary-color text-white rounded-md hover:bg-cta-color mt-1">Update</button>
                </div>
            </dialog>
        </div>
    );
}