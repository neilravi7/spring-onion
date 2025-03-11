import { useState, useEffect } from "react";
import { isOpenNow } from "../../helpers/utils";


export default function BusinessHours({ openTime, closeTime }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(isOpenNow(openTime, closeTime));
        const interval = setInterval(() => {
            setIsOpen(isOpenNow(openTime, closeTime));
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [openTime, closeTime]);

    return (
        <div className="flex items-center mb-2">
            <span className={`${isOpen ? "bg-green-100 text-green-800":"bg-red-100 text-red-800"} text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center`}>
                <span className={`${isOpen ? "bg-green-500":"bg-red-500"} w-2 h-2 rounded-full mr-1`}></span>
                {isOpen ? "Open Now" : "Closed Now"}
            </span>
            <span className="ml-2 text-sm text-gray-500">Closes at {closeTime}</span>
        </div>
    );
}

