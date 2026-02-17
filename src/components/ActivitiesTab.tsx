"use client";

import { RotateCw, SearchIcon, ChevronsUpDown } from "lucide-react";
import { Fragment, useState } from "react";
import { ActivitiesTabProps, ActivitiesMainType, ActivitiesTabType } from "@/features/application/types/sanity";
import Pagination from "@/components/ui/pagination";
import Modal from "@/components/ui/modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PAGE_SIZE = 10; // Number of rows per page

export default function ActivitiesTab({ keywords, activities }: ActivitiesTabProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState<keyof ActivitiesMainType | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);
    const [selectedActivity, setSelectedActivity] = useState<ActivitiesMainType | null>(null);

    const standardActivities = activities.standard ?? [];
    const premiumActivities = activities.premium ?? [];
    const customActivities = activities.custom ?? [];

    /** --------------- GET ACTIVITIES BY TAB --------------- */
    const getActivitiesByTab = (tab: string): ActivitiesMainType[] => {
        let activitiesByTab: ActivitiesMainType[] = [];

        switch (tab.toLowerCase()) {
            case "standard":
                activitiesByTab = standardActivities;
                break;
            case "premium":
                activitiesByTab = premiumActivities;
                break;
            case "custom":
                activitiesByTab = customActivities;
                break;
            default:
                return [];
        }

        // Return only activities where active === true
        return activitiesByTab.filter(activity => activity.active === true);
    };


    /** --------------- SEARCH --------------- */
    const getFilteredActivities = (tab: string) => {
        const allActivities = getActivitiesByTab(tab);
        if (!searchTerm) return allActivities;

        const search = searchTerm.toLowerCase();
        return allActivities.filter((activity) =>
            activity.activityName.toLowerCase().includes(search) ||
            activity.code.toLowerCase().includes(search) ||
            activity.activityGroup.toLowerCase().includes(search) ||
            activity.description.toLowerCase().includes(search)
        );
    };

    /** --------------- SORTING --------------- */
    const sortActivities = (tab: string) => {
        const filtered = [...getFilteredActivities(tab)];

        if (!sortField || !sortDirection) return filtered;

        return filtered.sort((a, b) => {
            const rawA = a[sortField];
            const rawB = b[sortField];

            const valA = typeof rawA === "string" ? rawA.toLowerCase() : String(rawA);
            const valB = typeof rawB === "string" ? rawB.toLowerCase() : String(rawB);

            if (valA < valB) return sortDirection === "asc" ? -1 : 1;
            if (valA > valB) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    };

    const handleSort = (field: keyof ActivitiesMainType) => {
        if (sortField !== field) {
            setSortField(field);
            setSortDirection("asc");
        } else {
            if (sortDirection === "asc") setSortDirection("desc");
            else if (sortDirection === "desc") {
                setSortField(null);
                setSortDirection(null);
            } else {
                setSortDirection("asc");
            }
        }
        setCurrentPage(1);
    };

    /** --------------- PAGINATION --------------- */
    const paginatedActivities = (tab: string) => {
        const sorted = sortActivities(tab);
        const start = (currentPage - 1) * PAGE_SIZE;
        return sorted.slice(start, start + PAGE_SIZE);
    };

    const totalPages = (tab: string) => {
        const sorted = sortActivities(tab);
        return Math.ceil(sorted.length / PAGE_SIZE) || 1;
    };

    const handleReset = () => {
        setSearchTerm("");
        setCurrentPage(1);
        setSortField(null);
        setSortDirection(null);
    };

    /** --------------- SORT ICON COMPONENT --------------- */
    const SortIcon = ({ field }: { field: keyof ActivitiesMainType }) => {
        if (sortField !== field) return <span className="opacity-40"><ChevronsUpDown size={18} /></span>;
        if (sortDirection === "asc") return <ChevronsUpDown size={18} />;
        if (sortDirection === "desc") return <ChevronsUpDown size={18} />;
        return <span className="opacity-40"><ChevronsUpDown size={18} /></span>;
    };

    return (
        <Fragment>
            <Tabs defaultValue="standard" className="w-full">
                <TabsList className="flex w-full h-full">
                    {
                        keywords.map((tab: ActivitiesTabType) => (
                            <TabsTrigger
                                key={tab?.header}
                                value={tab.header ? tab.header.toLowerCase() : ""}
                                className="flex-1 h-20.5 max-md:h-full data-[state=active]:border-b-0! border-b! group-data-[state=active]:justify-start border-[rgba(255,255,255,0.18)]! flex flex-col text-left whitespace-normal py-5 px-4! max-md:px-4 max-md:py-4 group"
                            >
                                <span className="uppercase font-sans font-semibold max-md:leading-[100%] max-md:text-sm! group-data-[state=active]:max-md:mt-0 max-md:mt-auto">{tab.header}</span>
                                <div className="hidden sm:block">
                                    <p className="hidden group-data-[state=active]:block text-xs! leading-[normal] font-sans mt-0 font-normal text-lightgray text-center">
                                        {tab.content}
                                    </p>
                                </div>
                            </TabsTrigger>
                        ))
                    }
                </TabsList>

                {
                    keywords.map((tab) => (
                        <TabsContent
                            key={`tab-content-${tab._id}`}
                            value={tab.header ? tab.header.toLowerCase() : ""}
                            className="w-full"
                        >
                            <div className="border flex-col items-center pt-7 pb-5 border-[rgba(255,255,255,0.18)] border-t-0 border-b-0 w-full flex justify-center">
                                <div className="w-full flex justify-center gap-10 max-md:gap-0">
                                    <div className="w-[49.65vw] max-md:w-full max-md:px-4 relative">
                                        <Input
                                            type="text"
                                            placeholder="Search Activity"
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            className="focus:border-teal-500 rounded-10! h-12.5 bg-[rgba(255,255,255,0.09)] pr-12 text-white text-sm!"
                                        />
                                        <SearchIcon className="text-neutral-400 size-5 absolute right-4 max-md:right-8 top-6 -translate-y-1/2 pointer-events-none" />
                                    </div>

                                    <div className="w-fit flex justify-center">
                                        <Button
                                            type="button"
                                            variant="link"
                                            className="cursor-pointer no-underline font-medium text-[#5FC2D5]!"
                                            onClick={handleReset}
                                        >
                                            Reset <RotateCw className="w-[30%]! h-[40%]!" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="w-full mt-3">
                                    {
                                        tab.price && (
                                            <p className="text-center text-[12px]! font-sans font-normal pb-2">
                                                <span className="text-[#FFFFFF87]">{tab.header} Activity starting at </span>
                                                <span className="text-white">{tab.price}.</span>
                                            </p>
                                        )
                                    }

                                </div>
                            </div>

                            <div className="w-full -mt-2">
                                <div className="overflow-x-auto rounded-[10px] border border-[rgba(255,255,255,0.18)] ">
                                    <Table>
                                        <TableHeader className="bg-[#5FC2D54D] text-sm hover:bg-[#5FC2D54D]">
                                            <TableRow>
                                                <TableHead
                                                    onClick={() => handleSort("code")}
                                                    className="cursor-pointer px-4 py-4 text-white border-b border-r font-sans border-[#FFFFFF33] font-semibold w-[10%]">
                                                    <span className="flex items-center gap-2 text-base">
                                                        Code <SortIcon field="code" />
                                                    </span>
                                                </TableHead>
                                                <TableHead
                                                    onClick={() => handleSort("activityName")}
                                                    className="cursor-pointer px-4 py-4 text-white border-b border-r font-sans border-[#FFFFFF33] font-semibold w-[30%]">
                                                    <span className="flex items-center gap-2 text-base">
                                                        Activity Name <SortIcon field="activityName" />
                                                    </span>
                                                </TableHead>
                                                <TableHead
                                                    onClick={() => handleSort("activityGroup")}
                                                    className="cursor-pointer px-4 py-4 text-white border-b border-r font-sans border-[#FFFFFF33] font-semibold w-[30%]">
                                                    <span className="flex items-center gap-2 text-base">
                                                        Activity Group  <SortIcon field="activityGroup" />
                                                    </span>
                                                </TableHead>
                                                <TableHead
                                                    onClick={() => handleSort("description")}
                                                    className="cursor-pointer px-4 py-4 text-white border-b border-r font-sans border-[#FFFFFF33] font-semibold w-[30%]">
                                                    <span className="flex items-center gap-2 text-base">
                                                        Description <SortIcon field="description" />
                                                    </span>
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody className="text-white">
                                            {
                                                paginatedActivities(tab.header ? tab.header.toLowerCase() : "").length > 0 ? (
                                                    paginatedActivities(tab.header ? tab.header.toLowerCase() : "").map((activity, index, array) => (
                                                        <TableRow key={activity._id}>
                                                            <TableCell className={`${index === array.length - 1 ? "border-b-0 rounded-l-[10px]" : ""} text-sm! max-md:text-[13px]! text-lightgray leading-[normal] font-normal`}>{activity.code}</TableCell>
                                                            <TableCell className={`${index === array.length - 1 ? "border-b-0" : ""} text-sm! max-md:text-[13px]! text-lightgray leading-[normal] font-normal`}>{activity.activityName}</TableCell>
                                                            <TableCell className={`${index === array.length - 1 ? "border-b-0" : ""} text-sm! max-md:text-[13px]! text-lightgray leading-[normal] font-normal`}>{activity.activityGroup}</TableCell>
                                                            <TableCell className={`${index === array.length - 1 ? "border-b-0" : ""} text-sm! max-md:text-[13px]! text-lightgray leading-[normal] font-normal`}>
                                                                <p className="line-clamp-2 desc overflow-hidden text-ellipsis leading-[normal] font-normal text-sm! font-sans text-lightgray">
                                                                    {activity.description}
                                                                </p>
                                                                <Button
                                                                    variant={'link'}
                                                                    type="button"                                                                    
                                                                    onClick={() => setSelectedActivity(activity)}
                                                                    className="cursor-pointer p-0! h-auto! show-more-btn text-xs! mt-2 font-sans font-medium text-primary hover:text-primary/70">
                                                                    Show More
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={4} className="text-center py-4">
                                                            No results.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages(tab.header ? tab.header.toLowerCase() : "")}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </TabsContent>
                    ))}
            </Tabs>

            {
                selectedActivity && (
                    <Modal onClose={() => setSelectedActivity(null)}>
                        <div className="w-full p-10">
                            <h2 className="text-white text-lg! font-sans font-semibold mb-4">{selectedActivity.activityName}</h2>

                            <div className="space-y-3 text-sm text-white overflow-y-auto pr-4 max-h-[55vh] overflow-x-hidden custom-scroll">
                                <div className="flex justify-between border-b border-white/20 pb-2">
                                    <span className="font-medium text-gray-300 w-full lg:w-1/4 text-sm!">Code</span>
                                    <span className="w-full lg:w-3/4 text-sm!">{selectedActivity.code}</span>
                                </div>

                                <div className="flex justify-between max-lg:flex-col border-b border-white/20 pb-2">
                                    <span className="font-medium text-gray-300 w-full lg:w-1/4 text-sm!">Activity Name</span>
                                    <span className="w-full lg:w-3/4 text-sm!">{selectedActivity.activityName}</span>
                                </div>

                                <div className="flex justify-between  max-lg:flex-col border-b border-white/20 pb-2">
                                    <span className="font-medium text-gray-300 w-full lg:w-1/4 text-sm!">Activity Group</span>
                                    <span className="w-full lg:w-3/4 text-sm!">{selectedActivity.activityGroup}</span>
                                </div>

                                <div className="pt-2 flex  max-lg:flex-col">
                                    <span className="block font-medium text-gray-300 mb-1 w-full lg:w-1/4">Description</span>
                                    <p className="text-sm! text-white leading-normal w-full lg:w-3/4 font-mono">{selectedActivity.description}</p>
                                </div>
                            </div>
                        </div>
                    </Modal>
                )
            }
        </Fragment>
    );
}
