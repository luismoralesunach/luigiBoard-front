import { Link } from "react-router-dom"
import { BoardPreview } from "../components/BoardPreview"

interface BoardInfo{
    id: string
    title: string
    dateCreated: string
}
export const Home = ()=>{

const boards: BoardInfo[] = [
    {
        id: '1',
        title: "Untitled 1",
        dateCreated: "Sep 28, 2024"
    },
    {
        id: '2',
        title: "Untitled 2",
        dateCreated : "Sep 28, 2024"
    }
]
    
    return(
        <div>
            <div style={{display: 'flex'}}>
                <h1>LuigiBoard</h1>
                <input style={{margin: '10px', width: '70%'}} placeholder="Search"/>
            </div>
            <hr style={{width: '100%'}}/>
            <p>Recent boards</p>
            <div style={{display: 'flex', gap:'20px'}}>
                {boards.map((board)=>(
                    <Link to={`/${board.id}`}>
                    <BoardPreview title={board.title} dateCreated={board.dateCreated}/>
                    </Link>
                ))}
            </div>
        </div>
    )
}