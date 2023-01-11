import React, {useState, useEffect} from "react";

import logIn from "../services/accountManagement";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../slices/userSlice";
import {setUser} from "../slices/userSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const {user} = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    const handleSubmit = () => {
        logIn({email, password})
            .then((res) => {
                console.log("RESPONSE OK ", res.data);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                dispatch(setUser(res.data.user));
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                alert("Erreur de connexion");
            });
    };

    return (
        <div className="flex flex-col items-center mt-52">
            <div>
                <h1 className="flex justify-center mb-8 font-bold text-8xl">Connexion</h1>
                <p className="my-5 text-lg">
                    Pour vous connecter à l'intranet, entrez votre identifiant et mot de
                    passe
                </p>
            </div>

            <form
                className="flex flex-col p-2 mt-5 bg-slate-300 rounded-lg"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                <div className="flex items-end flex-col ">
                    <div className="my-2">
                        <label className="text-black" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="p-2 ml-2 w-4/5 rounded"
                            type="text"
                            name="email"
                            placeholder="owen.lopez@example.com"
                            id="email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex my-2">
                        <label className="text-black" htmlFor="password">
                            Mot de passe
                        </label>
                        <input
                            className="p-2 ml-2 w-2/3 rounded"
                            type="text"
                            name="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="flex justify-center py-3">
                    <button
                        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300
                            w-1/2 h-12 font-bold bg-gradient-to-b from-red-400 via-red-500 to-pink-500 rounded-lg "
                        type="submit">
                        Connexion
                    </button>
                </div>
            </form>
        </div>
    );
};
export default Login;
