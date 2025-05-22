import React from 'react';
// @ts-ignore
// import MFWebpack from 'mf_webpack/provider'
// @ts-ignore
// import MFWebpack from 'mf_webpack'
// @ts-ignore
const MFWebpackLazy = React.lazy(() => import('mf_webpack'))
const App: React.FC = () => {

    return (
        <div>
            <div>host app</div>
            {/* can't work , well be rewrite DOM */}
            {/* <MFWebpack /> */}
            {/* worked, must use like this */}
            <React.Suspense fallback={<div>Loading...</div>}>
                <MFWebpackLazy />
            </React.Suspense>
        </div>
    );
};

export default App; 