import { FaHighlighter } from 'react-icons/fa';

interface ToolOptionsProps {
    onColorChange: (color: string) => void; // Define the prop type for the color change function
}

interface InfoColorOptions {
    hex: string;
    title: string;
}

export const ToolOptions: React.FC<ToolOptionsProps> = ({ onColorChange }) => {

    //red, green, blue, yellow, purple, cyan, black
    const colorOptions: InfoColorOptions[] = [
        {
            hex: '#df4b26',
            title: "Red"
        },
        {
            hex: '#26df4b',
            title: "Green"
        },
        {
            hex: '#2644df',
            title: "Blue"
        },
        {
            hex: "#f4df26",
            title: "Yellow"
        },
        {
            hex: "#df26f4",
            title: "Purple",
        },
        {
            hex: "#26f4df",
            title: "Cyan"
        },
        {
            hex: "#000000",
            title: "Black"
        }
    ]
    // const colorOptions = ["#df4b26", "#26df4b", "#2644df", "#f4df26", "#df26f4", "#26f4df", "#000000"];

    return (
        <div style={{backgroundColor: 'white', display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
            <div>
                <FaHighlighter />
            </div>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap', // Allow the buttons to wrap to the next line
                maxWidth: '200px', // Set a max width to control the wrapping
            }}>
                {colorOptions.map((color) => (
                    <button
                        title={color.title}
                        key={color.title}
                        style={{
                            backgroundColor:`${color.hex}`,
                            height: '40px',
                            width: '40px',
                            borderRadius: '50%',
                            border: 'none',
                            margin: "5px"
                        }}
                        onClick={() => onColorChange(`${color.hex}`)} // Pass the color back on click
                    />
                ))}
            </div>
        </div>
    );
};
