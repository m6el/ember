'use client';
import { Bell } from 'lucide-react';
import { ComboboxDemo } from '@/components/Ember Components/Combobox';
import { YearCombobox } from '@/components/Ember Components/YearCombobox';
import { ArrowUp } from 'lucide-react';
import { useState, useRef, useEffect, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';


export default function Page() {
    const router = useRouter();
    const [submitted, setSubmitted] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [step, setStep] = useState(0); // 0: all visible, 1: header animating, 2: comboboxes disappear, 3: textarea moves down
    const [textareaStyle, setTextareaStyle] = useState<CSSProperties>({});
    const headerRef = useRef(null);
    const textareaRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async () => {
        if (prompt.trim()) {
            setSubmitted(true);
            setStep(1); // header animates up
            try {
                const res = await fetch('http://localhost:8888/c', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt })
                });
                const data = await res.json();
                console.log(data)
                if (data && data.id) {
                    router.push(`/responses/${data.id}`);
                } else {
                    // fallback error
                    setSubmitted(false);
                    setStep(0);
                }
            } catch (err) {
                setSubmitted(false);
                setStep(0);
            }
        }
    };

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (step === 1) {
            timeoutId = setTimeout(() => setStep(2), 900);
        } else if (step === 2) {
            timeoutId = setTimeout(() => {
                if (textareaRef.current) {
                    const rect = textareaRef.current.getBoundingClientRect();
                    setTextareaStyle({
                        position: 'fixed',
                        top: `${rect.top}px`,
                        left: `${rect.left}px`,
                        width: `${rect.width}px`,
                        height: `${rect.height}px`,
                        margin: 0,
                        zIndex: 50,
                        transition: 'none',
                    });
                }
                setStep(3);
            }, 100); // reduced delay for faster textarea animation
        }
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [step]);

    useEffect(() => {
        if (step === 3 && textareaRef.current) {
            const rect = textareaRef.current.getBoundingClientRect();
            setTextareaStyle({
                position: 'fixed',
                top: `${rect.top}px`,
                left: `${rect.left}px`,
                width: `${rect.width}px`,
                height: `${rect.height}px`,
                margin: 0,
                zIndex: 50,
                transition: 'top 1s cubic-bezier(0.4, 0, 0.2, 1)', // smooth slide down
                boxShadow: '0 -4px 12px rgba(0,0,0,0.08)', // match final shadow
            });
            const frameId = requestAnimationFrame(() => {
                setTextareaStyle(prev => ({
                    ...prev,
                    top: 'calc(100vh - 2rem - ' + rect.height + 'px)', // slide to bottom with 2rem margin
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    maxWidth: '672px',
                    background: 'white',
                    borderRadius: '1rem',
                    boxShadow: '0 -4px 12px rgba(0,0,0,0.08)',
                }));
            });

            const navigationTimeout = setTimeout(() => {
            }, 500); // Corresponds to the animation duration

            return () => {
                cancelAnimationFrame(frameId);
                clearTimeout(navigationTimeout);
            };
        }
    }, [step, router]);

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

                <div className="flex flex-col items-center justify-center h-[70vh] w-full">
                    <div className="w-full max-w-2xl flex flex-col space-y-6 items-stretch">
                        <h1
                            ref={headerRef}
                            className={`font-['ppEditorialLight'] text-4xl text-[#232323] text-left transition-all duration-1000 ease-in-out ${step >= 1 ? 'translate-y-[-120px] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
                        >
                            What are you planning{' '}
                            <span
                                className="bg-gradient-to-r from-[#FF981A] to-[#FFCD8F] bg-clip-text text-transparent"
                            >
                                today?
                            </span>
                        </h1>
                        {/* Textarea stays visible and moves to bottom when step === 3 */}
                        <div
                            ref={textareaRef}
                            className={`p-3 text-base border shadow-xs border-gray-300 rounded-2xl resize-none flex flex-col ${step < 3 ? 'w-full' : ''}`}
                            style={step >= 3 ? textareaStyle : {}}
                        >
                            <textarea
                                value={prompt}
                                onChange={e => setPrompt(e.target.value)}
                                placeholder={step === 3 ? 'Refine..' : 'I need a presentation for an English lesson about how Lady Macbeth is presented throughout Macbeth'}
                                className={`w-full text-base pr-12 resize-none mb-4 focus:outline-none ${step >= 3 ? 'bg-white' : 'bg-transparent'}`}
                                rows={2}
                            />
                            <div className="flex justify-end items-center gap-4">
                                {/* Change button to use async handleSubmit */}
                                <button
                                    className='w-8 cursor-pointer h-8 flex items-center justify-center bg-[#FFA639] rounded-lg disabled:opacity-50'
                                    disabled={!prompt.trim()}
                                    onClick={handleSubmit}
                                >
                                    <ArrowUp color='white' className='h-5 w-5'/>
                                </button>
                            </div>
                        </div>
                        {/* Comboboxes disappear when step === 1 or higher */}
                        <div className={`flex space-x-8 transition-all duration-1000 ease-in-out ${step >= 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-medium">Select a preset</label>
                                <ComboboxDemo />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-medium">Select a target year group</label>
                                <YearCombobox />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </>
    );
}