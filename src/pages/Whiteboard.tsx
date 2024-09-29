import React, { useState, useRef } from "react";
import { Stage, Layer, Line, Rect, Circle } from "react-konva";
import { ToolButton } from '../components/ToolButton';
import { ToolOptions } from "../components/ToolOptions";

export const Whiteboard: React.FC = () => {
    const [tool, setTool] = useState<string>("pen");
    const [penMenuClick, setPenMenuClick] = useState<number>(0); // For tracking pen clicks
    const [ableToDrag, setAbleToDrag] = useState(true);
    const [lines, setLines] = useState<any[]>([]);
    const [shapes, setShapes] = useState<any[]>([
        { id: 'rect1', shape: 'rect', x: 50, y: 50, width: 50, height: 50, fill: 'red', },
        { id: 'circle1', shape: 'circle', x: 200, y: 200, radius: 50, fill: 'blue',  }
    ]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [lineColor, setLineColor] = useState<string>("#df4b26");
    const [showColorOptions, setShowColorOptions] = useState<boolean>(false);
    const isDrawing = useRef<boolean>(false);

    const handleMouseDown = (e: any) => {
        if (tool === "pointer") {
            const shape = e.target;
            if (shape && shape.name()) {
                const id = shape.id();
                setSelectedIds((prevSelected) => prevSelected.includes(id)
                    ? prevSelected.filter((selectedId) => selectedId !== id)
                    : [...prevSelected, id]
                );
            }
            return;
        }

        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        const newLine = { tool, points: [pos.x, pos.y], color: lineColor };
        setLines((prevLines) => [...prevLines, newLine]);
    };

    const handleMouseMove = (e: any) => {
        if (!isDrawing.current) return;
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        setLines((prevLines) => {
            const lastLineIndex = prevLines.length - 1;
            const lastLine = prevLines[lastLineIndex];
            if (!lastLine) return prevLines;

            const updatedLine = {
                ...lastLine,
                points: lastLine.points.concat([point.x, point.y]),
            };

            return [
                ...prevLines.slice(0, lastLineIndex),
                updatedLine,
            ];
        });
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    const handleDragEnd = (e: any, shapeId: string) => {
        // Prevent dragging if the tool is not pointer
        if (tool !== "pointer") return;

        const updatedShapes = shapes.map(shape => 
            shape.id === shapeId ? { ...shape, x: e.target.x(), y: e.target.y() } : shape
        );
        setShapes(updatedShapes);
    };

    const handleColorChange = (color: string) => {
        setLineColor(color);
        setShowColorOptions(false);
    };

    const tools = [
        { id: "pen", name: "Pen" },
        { id: "eraser", name: "Eraser" },
        { id: "pointer", name: "Pointer" },
        { id: "highlighter", name: "Highlighter"}
    ];

    const handleToolClick = (toolName: string) => {
        setTool(toolName);
        
        if(toolName === 'pointer') setAbleToDrag(true)
        if(toolName !== 'pointer') setAbleToDrag(false)
            console.log("Able to drag: " , ableToDrag)

        if (toolName === "pen") {
            // Increase the pen menu click count
            setPenMenuClick((prevClick) => {
                const newClickCount = prevClick === 2 ? 1 : prevClick + 1;
                if (newClickCount === 2) {
                    setShowColorOptions(true);  // Show color options on second click
                } else {
                    setShowColorOptions(false); // Hide color options on other clicks
                }
                return newClickCount;
            });
        } else {
            setPenMenuClick(0);  // Reset count when switching to a different tool
            setShowColorOptions(false);  // Hide color options for non-pen tools
        }
    };



    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            backgroundColor: '#ececec'
        }}>
            <div>
            <button onClick={()=>{
                setLines([])
                setShapes([])
            }}>Clear</button>

            </div>
            {/* Toolbar on the left */}
            <div style={{
                position: 'absolute',
                left: 0,
                display: 'flex',
                flexDirection: 'column',
                border: 'solid 1px #d0d0d0',
                borderRadius: '50px',
                margin: '20px',
                width: '80px',
                alignItems: 'center',
                backgroundColor: 'white'
            }}>
                {tools.map((toolItem) => (
                    <ToolButton
                        key={toolItem.id}
                        toolName={toolItem.id}
                        currentTool={tool}
                        lineColor={lineColor}
                        onClick={() => handleToolClick(toolItem.id)}
                    />
                ))}
            </div>

            {/* ToolOptions positioned next to ToolButton */}
            <div style={{
                position: 'absolute',
                left: '110px', // Aligns next to the toolbar
                top: '130px', // Aligns with the top of the toolbar
                display: showColorOptions ? 'flex' : 'none', // Show if color options are needed
                flexDirection: 'column',
                backgroundColor: 'white', // Background for visibility
                padding: '10px',
                borderRadius: '10px',
                zIndex: 10,
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)' // Optional shadow for aesthetics
            }}>
                {showColorOptions && (
                    <ToolOptions onColorChange={handleColorChange} />
                )}
            </div>

            {/* Canvas centered */}
            <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                <Stage
                    width={850}
                    height={500}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    style={{ border: 'solid 2px #d0d0d0', backgroundColor: 'white' }}
                >
                    <Layer>
                       
                        {lines.map((line, i) => (
                            <Line
                                key={i}
                                points={line.points}
                                stroke={line.color}
                                strokeWidth={5}
                                tension={0.5}
                                lineCap="round"
                                lineJoin="round"
                                globalCompositeOperation={line.tool === "eraser" ? "destination-out" : "source-over"}
                            />
                        ))}
                        {shapes.map((shape) => {
                            const isSelected = selectedIds.includes(shape.id);
                            return shape.shape === 'rect' ? (
                                <Rect
                                    key={shape.id}
                                    id={shape.id}
                                    x={shape.x}
                                    y={shape.y}
                                    width={shape.width}
                                    height={shape.height}
                                    fill={isSelected ? 'orange' : shape.fill}
                                    draggable={ableToDrag}
                                    onClick={(e) => handleMouseDown(e)}
                                    onDragEnd={(e) => handleDragEnd(e, shape.id)}
                                />
                            ) : (
                                <Circle
                                    key={shape.id}
                                    id={shape.id}
                                    x={shape.x}
                                    y={shape.y}
                                    radius={shape.radius}
                                    fill={isSelected ? 'orange' : shape.fill}
                                    draggable={ableToDrag}
                                    onClick={(e) => handleMouseDown(e)}
                                    onDragEnd={(e) => handleDragEnd(e, shape.id)}
                                />
                            );
                        })}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
};
