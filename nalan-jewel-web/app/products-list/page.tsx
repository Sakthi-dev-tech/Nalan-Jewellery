"use client";
import { useSearchParams } from "next/navigation";

export default function ProductsList() {
    const searchParams = useSearchParams();
    const category = searchParams.entries()

    return (
        <div>
            {
                Array.from(category).map(([key, value], index) => {
                    return (
                        <div key={index}>
                            <span>{key}</span>
                            <span className="mx-4">{value}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}