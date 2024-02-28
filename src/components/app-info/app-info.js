import './app-info.css'

// Компоненти з ВЕЛИКОЇ БУВКИ, елементи з маленької 
const AppInfo = ({employeersNum, employeersIncrease}) => {
    return (
        <div className="app-info">
            <h1>Облік працівників в компанії N</h1>
            <h2>Загальне число працівників: {employeersNum}</h2>
            <h2>Премію отримають: {employeersIncrease}</h2>
        </div>
    )
}


export default AppInfo;