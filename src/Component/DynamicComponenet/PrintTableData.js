import "../../Style/pageCss.css"

function PrintTableData({headers, data, handelClick, keys, type}) {
    const getColor = (row)=>{
        let color= undefined;
        if (type){
            if (row===0){
                color="#61dafb";
            }
            else if (row>= data.length-3){
                color="#FF0000";
            }
        }
        return color;
    }
    return (
        <table className={"table"}>
            <thead>
            <tr>
                {headers.map((key, index) => {
                    return <th key={index}>{key}</th>
                })}
            </tr>
            </thead>
            <tbody>
            {data.map((dataItem, index) => {
                    return (
                            <tr style={{backgroundColor: getColor(index)}} onClick={ ()  => type && handelClick(dataItem)} key={index}>
                                {keys.map((headerKey, key) => {
                                    return (
                                        <td key={key}>{dataItem[headerKey]}</td>)
                                })}
                            </tr>
                    )
                }
            )}
            </tbody>
        </table>
    )
}

export default PrintTableData;