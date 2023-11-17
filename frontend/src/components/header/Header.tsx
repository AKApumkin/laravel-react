import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {

/**
*import the agent ID from the parent page
*  */ 
const [agent, setAgent] = useState('');

useEffect(() => {
    const storedItem = JSON.parse(localStorage.getItem('agent_id') || 'null');
    if (storedItem) {
        setAgent(storedItem.agent);
    }
}, []);

return (
    <div className="header h-14 bg-primary-color">
        <div className="header__inner max-w-7xl m-auto max-xl:px-5">
            <div className="header__logo float-left m-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 578.32 103.54" className="h-10 w-20 fill-white">
                <title>Kamma</title> 
                <polygon points="76.92 0 54.73 0 17.75 46.45 17.75 0 0 0 0 103.54 17.75 103.54 17.75 56.8 58.43 103.54 81.95 103.54 36.39 50.88 76.92 0"></polygon> 
                <polygon points="269.69 52.07 235.97 0 219.55 0 219.55 103.54 237.3 103.54 237.3 34.02 269.69 83.28 302.09 34.02 302.09 103.54 319.84 103.54 319.84 0 303.42 0 269.69 52.07"></polygon> 
                <polygon points="404.26 52.07 370.53 0 354.12 0 354.12 103.54 371.87 103.54 371.87 34.02 404.26 83.28 436.65 34.02 436.65 103.54 454.4 103.54 454.4 0 437.99 0 404.26 52.07"></polygon> 
                <path d="M137.76,0,97.53,103.54h8.29a14,14,0,0,0,13.07-9l27.9-72.24,27.89,72.24a14,14,0,0,0,13.08,9H196L155.81,0Z"></path> 
                <path d="M538.09,0H520L479.81,103.54h8.29a14,14,0,0,0,13.07-9l27.9-72.24L557,94.58a14,14,0,0,0,13.08,9h8.28Z"></path> 
            </svg>
            </div>
            <div className="header__right float-right m-1">
                <div className="header__user m-2 mr-2 float-left w-8 h-8 text-center p-0.5 box-border bg-cta-color rounded-full">{agent}</div>
                <Link to='/'>
                    <button className="header__logout m-2 w-20 h-8 bg-white color-primary-color float-left rounded-md hover:bg-cta-color hover:text-white">Logout</button>
                </Link>
            </div>
        </div>
        
    </div>
);
}
export default Header;