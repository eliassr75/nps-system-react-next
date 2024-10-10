import { useEffect, useState } from "react";
import { getLocalStorageData } from "../app_lib/JsonStorage";
import { useUser } from "../context/UserContext";

export default function UserData() {
    
    const { user } = useUser();
    const [userObj, setUserData] = useState(null);

    useEffect(() => {
        if (user) {
            setUserData(user);
        }
    }, [user]);
    
    return userObj
}
