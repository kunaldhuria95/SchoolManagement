import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import PaginationComponent from "@/components/Pagination";

const fetchSchools = async (search = "", page = 1, limit = 5) => {
    const res = await fetch(`/api/schools?name=${encodeURIComponent(search)}&page=${page}&limit=${limit}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Failed to fetch schools");
    return data;
};

export default function ShowSchools() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const initialSearch = searchParams.get("search") || "";
    const initialPage = parseInt(searchParams.get("page") || "1", 10);

    const [query, setQuery] = useState(initialSearch);
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [page, setPage] = useState(initialPage);

    useEffect(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.set("search", searchTerm);
        if (page) params.set("page", page.toString());
        router.replace(`?${params.toString()}`);
    }, [searchTerm, page, router]);



    const { data, isLoading } = useQuery({
        queryKey: ["schools", searchTerm, page],
        queryFn: () => fetchSchools(searchTerm, page),
        keepPreviousData: true,
    });

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        setSearchTerm(query);
    };



    return (
        <div className="max-w-7xl mx-auto p-4">
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <Input
                    placeholder="Search by school name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-grow"
                />
                <Button type="submit">Search</Button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4">
                {Array.isArray(data?.data) && data.data.length > 0 ? (
                    data.data.map((school) => (
                        <Card
                            key={school.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                        >
                            {/* School Image */}
                            <div className="relative h-65 w-full">
                                <Image
                                    src={school.image}
                                    alt={school.name}
                                    fill
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Card Content */}
                            <CardContent className="p-4">
                                <CardHeader className="p-0 mb-2">
                                    <CardTitle className="text-2xl font-bold text-gray-800">
                                        {school.name}
                                    </CardTitle>
                                </CardHeader>

                                <p className="text-gray-600 text-base mb-1 flex items-center">
                                    {school.address}
                                </p>

                                <p className="text-gray-500 text-sm flex items-center">
                                    {school.city}
                                </p>


                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="min-h-[calc(100vh-80px)] col-span-full">
                        {/* Your page content */}
                        <div className="text-center ">
                            {isLoading ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4">
                                {Array(8).fill(0).map((_, i) => (
                                    <Card
                                        key={i}
                                        className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
                                    >
                                        {/* Skeleton for image */}
                                        <div className="h-64 w-full bg-gray-300" />

                                        {/* Skeleton for card content */}
                                        <CardContent className="p-4 space-y-2">
                                            <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                                            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                                            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div> : "No schools found"}
                        </div>
                    </div>)}
            </div>

            {Array.isArray(data?.data) && data.data.length > 0 && <PaginationComponent page={page} setPage={setPage} totalPages={data?.pagination?.totalPages} />}
        </div>
    );
}
