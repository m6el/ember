'use client';
import { Bell } from 'lucide-react';
import { ComboboxDemo } from '@/components/Ember Components/Combobox';
import { YearCombobox } from '@/components/Ember Components/YearCombobox';
import { ArrowUp } from 'lucide-react';
import { useState, CSSProperties } from 'react';
import { Skeleton } from '@/components/ui/skeleton';


export default function Responses() {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false); // Simulate loading state
    const textareaStyle: CSSProperties = {
        position: 'fixed',
        left: '50%',
        bottom: '2rem',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '672px',
        background: 'white',
        borderRadius: '1rem',
        boxShadow: '0 -4px 12px rgba(0,0,0,0.08)',
        zIndex: 50,
        padding: '1rem',
    };

    return (
       <>
        <div className="flex">
            {/* <div className="w-72 bg-gray-100 h-screen">

            </div> */}
            <div className="p-8 w-full h-full">
                {/* navbar */}
                 <div className="flex">
                     {/* <input className="p-3 text-sm w-1/2 rounded-lg bg-[#F6F6F6]" type="text" placeholder="Search lessons, quizzes or Ember AI"/> */}
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
                            <div className="flex flex-col space-y-4 mt-24 w-3xl mx-auto">
                                <p>Creating a personalised presentation</p>
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-6 w-1/2" />
                                <Skeleton className="h-6 w-full" />
                            </div>


                <div className="flex flex-col items-center justify-center h-[70vh] w-full">
                    <div className="w-full max-w-2xl flex flex-col space-y-6 items-stretch">
                        
                        {/* Textarea stays visible and moves to bottom when step === 3 */}
                        <div
                            className={`p-3 text-base border shadow-xs border-gray-300 flex flex-col`}
                            style={textareaStyle}
                        >
                            <textarea
                                value={prompt}
                                onChange={e => setPrompt(e.target.value)}
                                placeholder={'I need a presentation for an English lesson about how Lady Macbeth is presented throughout Macbeth'}
                                className={`w-full text-base pr-12 resize-none mb-4 focus:outline-none bg-white`}
                                rows={2}
                            />
                            <div className="flex justify-end items-center gap-4">
                                <button
                                    className='w-8 cursor-pointer h-8 flex items-center justify-center bg-[#FFA639] rounded-lg disabled:opacity-50'
                                    disabled={!prompt.trim()}
                                >
                                    <ArrowUp color='white' className='h-5 w-5'/>
                                </button>
                            </div>
                        </div>
                        {/* Comboboxes disappear when step === 1 or higher */}
                    </div>
                </div>
            </div>
        </div>
       </>
    );
}