import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Podium() {
    return (
        <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-6 text-white">
            <div className="relative flex justify-center items-end space-x-12">
                {/* 2nd Place */}
                <div className="flex flex-col items-center">
                    <Avatar className="w-20 h-20 border-4 border-gray-400 shadow-lg">
                        <AvatarImage src="/user.jpg" alt="User" />
                        <AvatarFallback>U2</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-600 text-white text-2xl font-bold w-28 h-44 flex items-center justify-center rounded-lg shadow-2xl relative">
                        2
                        <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-10 h-4 bg-gray-500 rounded-t-md"></div>
                    </div>
                    <div className="mt-2 bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-lg shadow-md">2195 points</div>
                </div>

                {/* 1st Place */}
                <div className="flex flex-col items-center relative">
                    <Avatar className="w-24 h-24 border-4 border-yellow-400 shadow-xl">
                        <AvatarImage src="/user.jpg" alt="User" />
                        <AvatarFallback>U1</AvatarFallback>
                    </Avatar>
                    <div className="absolute top-[-10px] right-0 bg-yellow-400 text-white p-2 rounded-full text-4xl shadow-md">👑</div>
                    <div className="bg-yellow-500 text-white text-4xl font-bold w-32 h-56 flex items-center justify-center rounded-lg shadow-2xl relative border-2 border-yellow-300">
                        1
                        <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-12 h-5 bg-yellow-600 rounded-t-md"></div>
                    </div>
                    <div className="mt-2 bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-lg shadow-md">1324 points</div>
                </div>

                {/* 3rd Place */}
                <div className="flex flex-col items-center">
                    <Avatar className="w-24 h-24 border-4 border-orange-500 shadow-lg">
                        <AvatarImage src="/user.jpg" alt="User" />
                        <AvatarFallback>U3</AvatarFallback>
                    </Avatar>
                    <div className="bg-orange-500 text-white text-2xl font-bold w-24 h-36 flex items-center justify-center rounded-lg shadow-2xl relative">
                        3
                        <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-10 h-4 bg-orange-600 rounded-t-md"></div>
                    </div>
                    <div className="mt-2 bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-lg shadow-md">1242 points</div>
                </div>
            </div>
        </div>
    );
}
