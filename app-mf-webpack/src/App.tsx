import React from 'react';
// @ts-ignore
// import MFWebpack from 'provider/app'
// @ts-ignore
// import MFWebpack from 'provider/app'
// @ts-ignore
// const MFWebpackLazy = React.lazy(() => import('provider'))
// @ts-ignore
// const MFViteLazy = React.lazy(() => import('provider'))

const MFWebpackLazy = React.lazy(() => import('provider/DymicPublicComponent')) // domain worked 
// import MFWebpack from 'provider/DymicPublicComponent' // workd
const App: React.FC = () => {

    return (
        <div>
            <div>host app</div>
            {/* can't work , well be rewrite DOM */}
            {/* <MFWebpack /> */}
            {/* worked, must use like this */}
            <React.Suspense fallback={<div>Loading...</div>}>
                <MFWebpackLazy componentName="KYEmpty" />
                {/* <MFViteLazy /> */}
            </React.Suspense>
            {/* <MFWebpack componentName="KYEmpty" /> */}
        </div>
    );
};

export default App; 