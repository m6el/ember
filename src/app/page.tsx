import { Bell } from 'lucide-react';

export default async function Page() {
    return (
       <>
        <div className="flex">
            {/* <div className="w-72 bg-gray-100 h-screen">

            </div> */}
            <div className="p-6 w-full h-full">
               {/* navbar */}
                <div className="flex">
                    {/* <input className="p-3 text-sm w-1/2 rounded-lg bg-[#F6F6F6]" type="text" placeholder="Search lessons, quizzes or Ember AI"/> */}
                    <div className="ml-auto flex items-center gap-4">
                        <Bell />
                        <div className='w-8 h-8 bg-black rounded-full' ></div>
                    </div>
                </div>

                <div className="w-full  flex flex-col items-center justify-center">
                    <div className='w-1/2 items-center space-y-6 justify-center flex flex-col'>
                        <h1 className="font-['ppEditorialLight'] text-4xl mt-16 text-[#232323] self-start">What are you planning today?</h1>
                        <textarea placeholder='I need a presentation for an English lesson about how Lady Macbeth is presented throughout Macbeth' className='w-full h-24 text-sm bg-white border shadow-xs border-gray-300 rounded-xl p-3 '></textarea>
                    </div>
                </div>

            </div>
        </div>
       </>
    );
}
