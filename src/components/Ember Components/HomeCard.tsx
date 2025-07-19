interface CardProps {
    title: string;
    subtitle: string;
    value: string;
}

export function HomeCard({ title, subtitle, value }: CardProps) {
    return (
        <div className='w-50 rounded-2xl p-3 mt-8 h-32 border-[#D9D9D9] border shadow-xs flex flex-col justify-between'>
            <p className='font-medium'>{title}</p>
            <div>
                <p className='font-medium text-[#7F7F7F]'>{subtitle}</p>
                <p className='text-2xl font-semibold '>{value}</p>
            </div>
        </div>
    );
}
