export default function Page() {
    return (
        <div className="flex min-h-screen bg-[#f6f9fc]">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r flex flex-col">
                <div className="p-6 font-bold text-2xl tracking-tight text-[#32325d] border-b">Ember</div>
                <nav className="flex-1 p-4">
                    <ul className="space-y-1">
                        <li>
                            <a href="#" className="block px-4 py-2 rounded font-medium text-[#32325d] hover:bg-[#f6f9fc] transition">
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 rounded font-medium text-[#32325d] hover:bg-[#f6f9fc] transition">
                                Courses
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 rounded font-medium text-[#32325d] hover:bg-[#f6f9fc] transition">
                                Assignments
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 rounded font-medium text-[#32325d] hover:bg-[#f6f9fc] transition">
                                Students
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 rounded font-medium text-[#32325d] hover:bg-[#f6f9fc] transition">
                                Settings
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="p-4 border-t text-xs text-gray-400">© 2024 Edu Inc.</div>
            </aside>
            {/* Main Content */}
            <main className="flex-1 p-10">
                <h1 className="text-3xl font-semibold text-[#32325d] mb-8">Welcome, Teacher!</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="text-xs uppercase text-gray-500 mb-2 tracking-wide">Courses</div>
                        <div className="text-4xl font-bold text-[#32325d]">8</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="text-xs uppercase text-gray-500 mb-2 tracking-wide">Students</div>
                        <div className="text-4xl font-bold text-[#32325d]">120</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="text-xs uppercase text-gray-500 mb-2 tracking-wide">Assignments</div>
                        <div className="text-4xl font-bold text-[#32325d]">24</div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-lg font-semibold text-[#32325d] mb-4">Recent Activity</h2>
                    <ul className="divide-y">
                        <li className="py-3 text-gray-700">Student John Doe submitted Assignment 3.</li>
                        <li className="py-3 text-gray-700">New course "Physics 101" added.</li>
                        <li className="py-3 text-gray-700">Assignment 2 graded.</li>
                    </ul>
                </div>
            </main>
        </div>
    );
}
