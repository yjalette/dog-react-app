import React, { useContext } from 'react';
import { MsgContext } from '../../contexts/MsgContext';

const Alert = ({ content, theme}) => {
    const context = useContext(MsgContext);

    const handleClose = () => {
        context.setMsg({
                type: {...context.msg.type},
                alert: { theme: false }      
        })
    }
    return (
        <>
            <div className="overlay">
                <div className="popup">
                    <span className="close" onClick={handleClose}>&times;</span>
                    <div className={theme === "success" ? "content success" : "content error"}>
                        {content}
                    </div>
                    <hr />
                </div>
            </div>
        </>
    )
}

export default Alert
