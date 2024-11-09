import Skeleton from "react-loading-skeleton";
import React from "react";

export default function Loading(){
    const SkeletonLogoText = () => (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Skeleton className="ml-40 mx-auto h-16 w-auto" height={64} width={62}/>
            <Skeleton className="mt-6 mb-6" height={36} width={384}/>
        </div>
    );

    const SkeletonForm = () => (
        <div className="mt-10 mb-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
                <div>
                    <Skeleton height={24} width={80}/>
                    <Skeleton height={36} width={384}/>
                </div>

                <div>
                    <Skeleton height={36} width={384}/>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <SkeletonLogoText />

                <SkeletonForm />
            </div>
        </>
    );
}
