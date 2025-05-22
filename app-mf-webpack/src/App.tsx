import React from 'react';
// @ts-ignore
// import MFWebpack from 'provider/app'
// @ts-ignore
// import MFWebpack from 'provider/app'
// @ts-ignore
const MFWebpackLazy = React.lazy(() => import('provider/app'))

// const MFWebpackLazy = React.lazy(() => import('provider/DymicPublicComponent')) // can't work
// import MFWebpack from 'provider/DymicPublicComponent'
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
            {/* <MFWebpack componentName="KYCrumbs" /> */}
        </div>
    );
};

export default App; 