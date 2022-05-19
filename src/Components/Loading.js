import React from 'react';

const Loading = () => {
    return (
        <div className='fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-gray-100 z-50'>
            <div className='text-center'>
                <div style={{ borderTopColor: "transparent" }}
                    className="inline-block w-16 h-16 border-4 border-blue-400 border-double rounded-full animate-spin"></div>
            </div>
        </div>
    );
};

export default Loading;