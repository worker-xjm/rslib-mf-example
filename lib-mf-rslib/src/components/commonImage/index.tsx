import React, { ReactElement, useState } from 'react'
import { Image } from 'antd'
import './index.less'

interface propsFace {
    fileId: string
    children?: ReactElement | never[],
    hidePriview?: boolean
}

const ImageContainer: React.FC<propsFace> = (props) => {
    const [visibleImg, setVisibleImg] = useState<boolean>(false)

    const getPicUrl = (fileId: string | number) => {
        const url = new URL(import.meta.env.PUBLIC_SERVER_VIRTUAL_PATH + '/file/get', window.location.host)
        url.searchParams.set('fileId', fileId.toString())
        return url.toString()
    }
    return (
        <>
            {props.hidePriview && <div className='cannot-preview-cover'></div>}
            <Image
                src={getPicUrl(props.fileId)}
                preview={{
                    visible: visibleImg,
                    onVisibleChange: (value) => {
                        setVisibleImg(value)
                    },
                    mask: '',
                    src: getPicUrl(props.fileId)
                }} />
        </>

    )
};
export default ImageContainer