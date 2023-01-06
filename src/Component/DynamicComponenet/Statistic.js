function Statistic({headers, object}) {
    return (
        <table className={"table"}>
            <thead>
            <tr style={{backgroundColor: "#282c34"}}>
                {headers.map((key, index) => {
                    return <th key={index}>{key +"📉"}</th>
                })}
            </tr>
            </thead>
            <tbody>
            <tr>
                {Object.values(object).map((value, key) => {
                    return (
                        <td key={key}>{value}</td>)
                })}
            </tr>
            </tbody>
        </table>
    )
}

export default Statistic;