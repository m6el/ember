import { Bell } from 'lucide-react';
import { HomeCard } from "@/components/Ember Components/HomeCard";

async function getActivities() {
    // In a real app, you'd fetch this from an API.
    return [
        {
            time: "9:41 AM",
            student: "John Doe",
            misStatus: 1,
            summary: "Student on holiday",
            status: "Confirmed",
            type: "Absence Request",
        },
        {
            time: "9:35 AM",
            student: "Jane Smith",
            misStatus: 2,
            summary: "No answer",
            status: "Pending",
            type: "Phone Call",
        },
        {
            time: "May 20, 8:12 AM",
            student: "Sam Wilson",
            misStatus: 4,
            summary: "Wrong number",
            status: "Failed",
            type: "Phone Call",
        },
        {
            time: "May 20, 8:05 AM",
            student: "Bucky Barnes",
            misStatus: 1,
            summary: "Feeling unwell",
            status: "Confirmed",
            type: "Absence Request",
        },
    ];
}

export default async function Page() {
    const activities = await getActivities();

    const statusBadge = (status: string) => {
        let badgeClasses = "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium capitalize";
        switch (status) {
            case 'Confirmed':
                badgeClasses += " bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
                break;
            case 'Pending':
                badgeClasses += " bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
                break;
            case 'Failed':
                badgeClasses += " bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
                break;
            default:
                badgeClasses += " bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
        }
        return <span className={badgeClasses}>{status}</span>;
    };

    return (
       <>
        <div className="flex">
            <div className="w-72 bg-gray-100 h-screen">

            </div>
            <div className="p-6 w-full h-full">
               {/* navbar */}
                <div className="flex">
                    <input className="p-3 text-sm w-1/2 rounded-lg bg-[#F6F6F6]" type="text" placeholder="Search students, report or Ember AI"/>
                    <div className="ml-auto flex items-center gap-4">
                        <Bell />
                        <div className='w-8 h-8 bg-black rounded-full' ></div>
                    </div>
                </div>

                <div className='flex items-center'>
                    <h1 className="font-['ppEditorial'] text-4xl mt-16 text-[#232323] ">Home</h1>
                    <button type="button" className='cursor-pointer px-4 py-1.5 border border-1.5 border-[#4C55CF] text-white font-semibold bg-[#5964F4] rounded-xl ml-auto'>Initiate Call</button>
                </div> 

                <h1 className="text-lg text-[#232323] pt-2 ">Ember has made currently made 12 phone calls today and received  14 absence requests from parents.</h1>


                <div className='flex space-x-4'>
                    <HomeCard title="📈 Statistics" subtitle="Calls Today" value="12" />
                    <HomeCard title="📈 Statistics" subtitle="Confirmed Absences" value="8" />
                    <HomeCard title="❗️Follow Ups" subtitle="Pending Absences" value="4 "/>
                    <HomeCard title="📊 Performance" subtitle="Absences since last month" value="-12" />
                </div>

                <div className="mt-8 border-t border-slate-100 dark:border-slate-800">
                    <p className='mt-4 text-lg font-medium'>Recent Activity</p>
                    <div className="mt-4">
                        <table className="min-w-full">
                            <thead className="border-b border-gray-200 dark:border-gray-700">
                                <tr>
                                    <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-500">Time</th>
                                    <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-500">Student</th>
                                    <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-500">MIS Status</th>
                                    <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-500">Summary</th>
                                    <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-500">Status</th>
                                    <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-500">Type</th>                                    
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {activities.map((activity, index) => (
                                    <tr key={index}>
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{activity.time}</td>
                                        <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">{activity.student}</td>
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                                            <select defaultValue={activity.misStatus} className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-gray-900 dark:text-white">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                            </select>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{activity.summary}</td>
                                        <td className="whitespace-nowrap px-4 py-4 text-sm">
                                            {statusBadge(activity.status)}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{activity.type}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
           </div>
        </div>
       </>
    );
}
