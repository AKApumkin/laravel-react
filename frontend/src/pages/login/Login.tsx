import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./../../components/loading/LoadingSpinner";

function Login() {
    interface Agent {
        id: number;
        name: string;
    }
    // fetches data from api on page load
    const [agentData, setAgentData] = useState<Agent[]>([]);
    const url = "http://localhost/api/agents";
    const fetchInfo = () => {
        return fetch(url)
            .then((res) => res.json())
            .then((d) => setAgentData(d));
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    // On login, gets the selected agent and stores it in local storage, the routes to the main page
    const [formState, setFormState] = useState({ agent: "" });
    const navigate = useNavigate();
    const processLogin = () => {
        let getAgent = formState.agent;
        if (getAgent !== "") {
            localStorage.setItem("agent_id", JSON.stringify(formState));
            navigate("/home");
        }
    };
    return (
        <div className="login m-auto pt-5 w-80 flex-1 justify-center">
            <div className="login__inner">
                <div className="login__img pt-20">
                    <img src="https://assets-cdn.kammadata.com/logos/kamma-logo.svg" width="400" alt="Karma Logo"/>
                </div>
                {agentData.length > 0 ? (
                <div className="login__container inline-block w-full pt-24">
                    <div className="login__field w-full pb-8">
                        <label className="w-full block pb-2" htmlFor="agent"> Select Agent: </label>
                        <select className="w-full border border-primary-color rounded-md h-8"
                                name="agent"
                                id="agent"
                                defaultValue={'DEFAULT'}
                                onChange={(e) => setFormState({ ...formState, agent: e.target.value })}>
                            <option disabled value="DEFAULT">Select an agent</option>
                                {agentData.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <button type="submit" onClick={processLogin} className="w-full h-8 bg-primary-color text-white rounded-md hover:bg-cta-color mt-1">Login</button>
                </div>
                ) : (
                    <div className="pt-20">
                        <LoadingSpinner />
                    </div>
                )}
            </div>
        </div>
    );
}
export default Login;
