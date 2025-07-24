import { Bell } from 'lucide-react';
import {ComboboxDemo} from '@/components/Ember Components/Combobox';
import { YearCombobox } from '@/components/Ember Components/YearCombobox';
import { ArrowUp } from 'lucide-react';


export default async function Page() {
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
                        <h1 className="font-['ppEditorialLight'] text-4xl text-[#232323] text-left">What are you planning today?</h1>
                        <div className='w-full p-4 text-base border shadow-xs border-gray-300 rounded-4xl resize-none flex flex-col'>
                            <textarea
                                placeholder='I need a presentation for an English lesson about how Lady Macbeth is presented throughout Macbeth'
                                className='w-full text-base pr-12 resize-none mb-4'
                                rows={2}
                            />
                            <div className="flex justify-end items-center gap-4">
                                <button className='w-10 cursor-pointer h-10 flex items-center justify-center bg-black rounded-4xl'>
                                    <ArrowUp color='white'/>
                                </button>
                            </div>
                        </div>
                                            <div className="flex space-x-8">
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
