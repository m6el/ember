'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Bell, CheckCircle2 } from 'lucide-react';
import io from 'socket.io-client';

// Socket.io client will be initialized inside the component

// A simple loading spinner component
const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500"></div>
);

// Define the response record structure
interface ResponseRecord {
    userPrompt: string;
    emberResponse: string;
    generatingPowerpointStatus: string;
    generatingWorksheetStatus: string;
}

export default function Responses() {
    const params = useParams();
    const id = typeof params === 'object' && params?.id ? String(params.id) : '';
    const [loading, setLoading] = useState(true);
    const [typedText, setTypedText] = useState("");
    const [aiText, setAiText] = useState("");
    const [userPrompt, setUserPrompt] = useState("");
    const [generatingPowerpointStatus, setGeneratingPowerpointStatus] = useState("");
    const [generatingWorksheetStatus, setGeneratingWorksheetStatus] = useState("");

    // Fetch chat by id from server and subscribe to real-time updates
    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setTypedText("");
        setAiText("");
        setUserPrompt("");
        setGeneratingPowerpointStatus("");
        setGeneratingWorksheetStatus("");

        let isMounted = true;
        
        // Initialize Socket.io client
        const socket = io('http://localhost:8888');

        // Initial data fetch via REST API
        const fetchInitialData = async () => {
            try {
                const response = await fetch(`http://localhost:8888/c/${id}`);
                if (!response.ok) throw new Error('Failed to fetch response data');
                
                const data: ResponseRecord = await response.json();
                if (!isMounted) return;

                setUserPrompt(data.userPrompt || "");
                setAiText(data.emberResponse || "");
                setGeneratingPowerpointStatus(data.generatingPowerpointStatus || "");
                setGeneratingWorksheetStatus(data.generatingWorksheetStatus || "");
                setLoading(false);
            } catch (err) {
                if (!isMounted) return;
                console.error("Failed to fetch initial data:", err);
                setAiText("Sorry, there was an error fetching the chat.");
                setLoading(false);
            }
        };

        // Set up socket connection and event handlers
        socket.connect();
        socket.emit('join_response', id);

        // Handle initial data from socket
        socket.on('response_data', (data: ResponseRecord) => {
            if (!isMounted) return;
            
            setUserPrompt(data.userPrompt || "");
            setAiText(data.emberResponse || "");
            setGeneratingPowerpointStatus(data.generatingPowerpointStatus || "");
            setGeneratingWorksheetStatus(data.generatingWorksheetStatus || "");
            setLoading(false);
        });

        // Handle real-time updates
        socket.on('response_update', (record: ResponseRecord) => {
            if (!isMounted) return;
            
            setAiText(currentAiText => {
                if (record.emberResponse && record.emberResponse !== currentAiText) {
                    setTypedText(""); // Reset typewriter for new response
                    return record.emberResponse;
                }
                return currentAiText;
            });
            setGeneratingPowerpointStatus(record.generatingPowerpointStatus || "");
            setGeneratingWorksheetStatus(record.generatingWorksheetStatus || "");
        });

        // Handle errors
        socket.on('error', (error: Error) => {
            if (!isMounted) return;
            console.error("Socket error:", error);
            setAiText("Sorry, there was an error with the real-time connection.");
        });

        // Fetch initial data in case socket is slow to connect
        fetchInitialData();

        return () => {
            isMounted = false;
            
            // Leave the response room before cleaning up
            if (id) {
                socket.emit('leave_response', id);
            }
            
            // Remove all event listeners
            socket.off('response_data');
            socket.off('response_update');
            socket.off('error');
            
            // Disconnect socket
            socket.disconnect();
        };
    }, [id]);

    // Typewriter effect for aiText
    useEffect(() => {
        if (!loading && aiText && typedText.length < aiText.length) {
            const typeTimer = setTimeout(() => {
                setTypedText(aiText.slice(0, typedText.length + 1));
            }, 18);
            return () => clearTimeout(typeTimer);
        }
    }, [loading, typedText, aiText]);

    const renderStatus = (status: string, type: string) => {
        if (status === 'loading') {
            return (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <LoadingSpinner />
                    <span>Generating {type}...</span>
                </div>
            );
        }
        if (status === 'completed') {
            return (
                <div className="flex items-center space-x-2 text-sm text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Generation complete for {type.toLowerCase()}</span>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <div className="flex">
                <div className="p-8 w-full h-full">
                    {/* navbar */}
                    <div className="flex">
                        <div className='flex space-x-8'>
                            <h2 className='cursor-pointer hover:underline'>Home</h2>
                            <h2 className='cursor-pointer hover:underline'>Quizzes</h2>
                            <h2 className='cursor-pointer hover:underline'>Lessons</h2>
                            <h2 className='cursor-pointer hover:underline'>Resources</h2>
                            <h2 className='cursor-pointer hover:underline'>Presets</h2>
                        </div>
                        <div className="ml-auto flex items-center gap-4">
                            <Bell />
                            <div className='w-8 h-8 bg-black rounded-full' ></div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col space-y-4 mt-24 w-1/2 mx-auto">
                            {/* Skeleton loading UI */}
                            <div className="h-6 w-full bg-gray-200 animate-pulse rounded" />
                            <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded" />
                            <div className="h-6 w-1/2 bg-gray-200 animate-pulse rounded" />
                            <div className="h-6 w-full bg-gray-200 animate-pulse rounded" />
                        </div>
                    ) : aiText ? (
                        <div className="flex flex-col space-y-4 mt-20 w-1/2 mx-auto">
                            <h1 className='text-2xl font-medium'>{userPrompt}</h1>
                            <div
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: typedText }}
                            />
                            <div className="flex flex-col items-start space-y-2 mt-6">
                                {renderStatus(generatingPowerpointStatus, 'PowerPoint')}
                                {renderStatus(generatingWorksheetStatus, 'Worksheet')}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-4 mt-20 w-1/2 mx-auto">
                            <p>No chat found.</p>
                        </div>
                    )}

                    {/* Search textarea fixed at bottom center */}
                    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50">
                        <div className="p-3 text-base border shadow-xs border-gray-300 rounded-2xl bg-white flex flex-col w-full">
                            <textarea
                                placeholder="Refine.."
                                className="w-full text-base pr-12 resize-none mb-4 focus:outline-none bg-white"
                                rows={2}
                                disabled
                            />
                            <div className="flex justify-end items-center gap-4">
                                <button
                                    className='w-8 cursor-not-allowed h-8 flex items-center justify-center bg-[#FFA639] rounded-lg opacity-50'
                                    disabled
                                >
                                    {/* ArrowUp icon can be added here if needed */}
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center h-[70vh] w-full">
                    </div>
                </div>
            </div>
        </>
    );
}