import React from "react";
import { Link } from "react-router-dom";

export default function NewFeatureIndex() {
    return (
        <>
            {/* Breadcrumb */}
            <nav className="text-sm font-medium" aria-label="Breadcrumb">
                <ol className="flex">
                    <li className="flex items-center">
                        <Link to="/" className="text-gray-400 hover:text-gray-500">
                            Home
                        </Link>
                        <svg
                            className="flex-shrink-0 w-3 h-3 mx-2 fill-current text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 11H3a1 1 0 110-2h7.586L7.293 6.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </li>
                    <li className="flex items-center">
                        <Link to="/member/information" className="text-gray-400 hover:text-gray-500">
                            Informasi
                        </Link>
                        <svg
                            className="flex-shrink-0 w-3 h-3 mx-2 fill-current text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 11H3a1 1 0 110-2h7.586L7.293 6.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </li>
                    <li className="flex items-center">
                        <span className="text-gray-500">New Feature</span>
                    </li>
                </ol>
            </nav>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-between pb-5 space-y-6 border-0 md:space-y-0 md:flex-row">
                <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
                    New Feature
                </h3>
            </div>
            <div className="rounded-md shadow-sm">
                <p>Ini adalah halaman fitur baru Anda. Tambahkan konten di sini.</p>
            </div>
        </>
    );
}



