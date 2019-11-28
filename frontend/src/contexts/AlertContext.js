import React, { useState, createContext, useContext, useEffect } from 'react';
export const AlertContext = createContext()

export function AlertProvider({ children }) {
    const [alerts, setAlerts] = useState([{
        type: 'success',
        msg: ''
    }])

    const activeAlertIds = alerts.join(',')
    useEffect(() => {
        if (activeAlertIds.length > 0) {
            const timer = setTimeout(() => setAlerts((alerts) => alerts.slice(0, alerts.length - 1)), 10000)
            return () => clearTimeout(timer)
        }
    }, [activeAlertIds])

    const addAlert = (alert) => setAlerts((alerts) => [alert, ...alerts])

    const value = { addAlert }

    return (
        <AlertContext.Provider value={value}>
              {children}
            {alerts.map((alert) => <SnackBar key={alert.msg} type={alert.type} msg={alert.msg}/>)}
        </AlertContext.Provider>
    )
}

function SnackBar(props) {
    return <div style={{color: props.type ==='success' ? 'green' : 'red'}} className={props.type ==='success' ? 'success' : 'error'}>{props.msg}</div>
}

export const useSnackBars = () => useContext(AlertContext).addAlert;