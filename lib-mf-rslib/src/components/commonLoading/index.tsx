import React,{useImperativeHandle,useState} from 'react'
import './index.less'
import { Loading3QuartersOutlined } from '@ant-design/icons'
interface propFace {
    loadingText?:string
    cRef?:any
}
const KYLoading: React.FC<propFace> = (props) => {
    const [visible,setVisible] = useState<boolean>(false)
    const [title,setTitlet] = useState<string>('')
    //暴露出当前组件的方法以便父组件调用
    useImperativeHandle(props.cRef, () => ({
		toggleLoading
    }))

    const toggleLoading = (value:boolean,msg?:string) => {
        //显示和隐藏loading
        setVisible(value)
        setTitlet(msg ? msg : '')
    }
    if(visible || !props.cRef) {
        return (
            <div className="ky-loading">
                <div className="loading-inner cover-style">
                    <Loading3QuartersOutlined spin />
                    <span>{title || props.loadingText}</span>
                </div>
            </div>
        )
    }else {
        return null
    }
    
}
export default KYLoading
