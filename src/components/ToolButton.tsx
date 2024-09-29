import { FaPenAlt, FaEraser } from "react-icons/fa";
import { TbPointerFilled } from "react-icons/tb";

interface ToolButtonProps {
    lineColor: string;
    toolName: string;
    currentTool: string;
    onClick: () => void;
}

export const ToolButton: React.FC<ToolButtonProps> = ({ lineColor, toolName, currentTool, onClick }) => {
    const isActive = toolName === currentTool;

    // Function to return the correct icon based on the toolName, with a larger size
    const renderIcon = (toolName: string) => {
        const iconSize = 20;  // Set the size of the icons (you can adjust this)
        switch (toolName) {
            case 'pen':
                return <FaPenAlt size={iconSize} />;
            case 'eraser':
                return <FaEraser size={iconSize} />;
            case 'pointer':
                return <TbPointerFilled size={iconSize} />;
            default:
                return null;
        }
        
    };


    return (
        <button
            style={{
                backgroundColor: isActive && toolName==="pen" ? `${lineColor}` : 'white' && isActive && toolName !=='pen' ? '#262626' : "white",
                width: '55px',
                height: '55px',
                border: 'none',
                color: isActive && toolName ==="pen" ? "white" : 'black' && isActive && toolName !== "pen" ? "white" : "#262626",
                marginBottom: '10px', 
                margin: '15px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px', // Adjust padding for better layout
                borderRadius: '50%', // Optional: for rounded corners
               
            }}
            title={toolName}
            onClick={onClick}
        >
            {renderIcon(toolName)}
        </button>
    );
};
