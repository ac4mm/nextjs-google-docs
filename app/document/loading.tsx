import Skeleton from "react-loading-skeleton";
import React from "react";

export default function Loading(){
    const SkeletonLogo = () => (
        <div className="flex items-center space-x-2 flex-grow">
            <Skeleton className="px-2 py-1" height={52} width={52}/>

            <Skeleton height={28} width={260}/>
        </div>
    )
    const SkeletonMenu = () => (
        <div
            className="flex-grow flex items-center justify-start space-x-1 text-sm text-gray-600 pl-14">
            <Skeleton height={28} width={410}/>
        </div>
    )
    const SkeletonUser = () => (
        <>
            <Skeleton circle height={40} width={40}/>
            <Skeleton className="w-24 h-10 rounded-full" height={40} width={96}/>
        </>

    )

    const SkeletonHeader = () => (
        <header className="flex items-center p-2 border-b border-gray-200 bg-gray-50">
            {/*Logo and Menu area*/}
            <div className="flex flex-col space-y-1 flex-grow">
                {/*Logo*/}
                <SkeletonLogo/>

                {/*Menu*/}
                <SkeletonMenu/>
            </div>

            {/*User*/}
            <div className="flex items-center space-x-2 justify-end	mx-4">
                <SkeletonUser/>
            </div>
        </header>
    )

    const SkeletonContent = () => (
        <div className="p-6 bg-gray-100">
            <div className="p-4">
                {/*Toolbar*/}
                <div className="flex space-x-2 mb-4">
                    <Skeleton height={32} width={45}/>
                    <Skeleton height={32} width={45}/>
                    <Skeleton height={32} width={45}/>
                    <Skeleton height={32} width={45}/>
                    <Skeleton height={32} width={45}/>
                    <Skeleton height={32} width={45}/>
                </div>

                {/*    Editor Content*/}
                <Skeleton className="border p-4 w-9/12 h-96 mx-36 rounded bg-white" height={384} width={1151}/>
            </div>
        </div>
    )

    return (
        <>
            <SkeletonHeader/>

            <SkeletonContent />
        </>
    )
}
