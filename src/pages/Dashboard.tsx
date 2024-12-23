import { useNavigate } from "react-router-dom";

export default function Dashboard() {

    const navigate = useNavigate()

    return(
        <p onClick={() => navigate('/')}>dashboard</p>
    )

}