import ThumbnailPlaceholder from '../assets/thumbnailPlaceholder.svg'

interface BoardPreviewProps{
    title: string
    dateCreated: string
}

export const BoardPreview = ({title, dateCreated}: BoardPreviewProps): JSX.Element=>{

    return(
        <div style={{}}>
            <img src={ThumbnailPlaceholder} alt='board'/>
            <h3>{title}</h3>
            <h4>{dateCreated}</h4>
            
        </div>
    )
}