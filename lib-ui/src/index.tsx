/**
 * 
 * @param {Array} description //描述文字
 * @param {ReactNode} imgSlot //自定图片节点
 * @param {string} imgWidth //图片宽度
 * @returns 
 */

import { FC, ReactNode } from 'react'


import empty1 from './assets/empty_1.png?raw'
// import empty1 from './assets/images/empty_1.png?url'
// import empty1 from '@coreland/assets/images/empty_1.png'
// const empty1 = new URL('@coreland/assets/images/empty_1.png', import.meta.url).href
import empty2 from './assets/empty_2.png?raw'
// import empty2 from './assets/empty_2.png?url'
// const empty2 = new URL('@coreland/assets/images/empty_2.png', import.meta.url).href
import empty3 from './assets/empty_3.png?raw'
// import empty3 from './assets/empty_3.png?url'
// const empty3 = new URL('@coreland/assets/images/empty_3.png', import.meta.url).href
import empty4 from './assets/empty_4.png?raw'
// import empty4 from './assets/empty_4.png?url'
// const empty4 = new URL('@coreland/assets/images/empty_4.png', import.meta.url).href
import empty5 from './assets/empty.png?raw'
// import empty5 from './assets/empty.png?url'
// const empty5 = new URL('@coreland/assets/images/empty.png', import.meta.url).href

// import empty6 from '@/assets/images/empty_6.png?url'
interface propFace {
    description?: String
    imgSlot?: ReactNode
    imgWidth?: string
    isCenter?: boolean
    txtTop?: number
    status?: number
    fontSize?: number
}
const emptyType = [
    {
        title: '暂无内容',
        image: empty1
    },
    {
        title: '服务器异常，请稍后再试',
        image: empty1
    },
    {
        title: '系统繁忙，请稍后再试',
        image: empty1
    },
    {
        title: '网络连接异常',
        image: empty2
    },
    {
        title: '暂无权限',
        image: empty3
    },
    {
        title: '请在桌面端｜移动端打开链接',
        image: empty4
    },
    {
        title: '当前内容不存在',
        image: empty4
    },
    {
        title: '找不到与你搜索相匹配的结果',
        image: empty5
    },
]
const KYEmpty: FC<propFace> = (props) => {
    let { description, imgSlot, imgWidth = '200', txtTop = 8, status = 0, fontSize } = props

    return (
        <div className={`ky-empty ${props.isCenter ? 'empty-center' : ''}`}>
            <div className="empty-img" style={{ width: imgWidth + 'px' }}>
                {!imgSlot && <img src={emptyType[status].image} alt="" />}
                {imgSlot}
            </div>
            <div className="description" style={{ marginTop: `${txtTop}px`, fontSize: `${fontSize || txtTop === -8 ? '12' : ''}px` }}>{description || emptyType[status].title}</div>
        </div>
    )
}

export default KYEmpty
