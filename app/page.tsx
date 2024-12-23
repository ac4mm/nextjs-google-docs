"use client"

import React, {Suspense} from "react";

import {useRouter} from "next/navigation";
import Image from 'next/image';
import {robotoMono} from '@gds/app/ui/fonts';
import {useGlobalContext} from "@gds/app/context/store";
import Loading from "@gds/app/loading";

import docsIcon from '../public/Google_Docs_2020_Logo.svg';

export default function Home() {
    const router = useRouter();
    const {username, setUsername}= useGlobalContext();

    async function onSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();

        router.push('/document');
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <Suspense fallback={<Loading/>}>
                    {/*Logo and Text*/}
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <Image
                            src={docsIcon}
                            className="mx-auto h-16 w-auto"
                            alt="Google Docs"
                        />
                        <h2
                            className={`${robotoMono.className} regular mt-6 mb-6 text-center text-3xl font-semibold leading-9 tracking-tight text-white-900`}>
                            Google Docs
                        </h2>
                    </div>

                    {/*Form*/}
                    <div className="mt-10 mb-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action="#" className="space-y-6" onSubmit={onSubmit}>
                            <div>
                                <label htmlFor="username"
                                       className="block text-sm font-medium leading-6 text-white-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="username"
                                        required
                                        autoComplete="username"
                                        className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onInput={(e) => setUsername((e.target as HTMLInputElement)?.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Join
                                </button>
                            </div>
                        </form>
                    </div>
                </Suspense>
            </div>
        </>
    )
}
