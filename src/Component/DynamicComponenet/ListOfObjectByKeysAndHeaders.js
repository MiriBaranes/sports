import Header from "./Header";
import PrintTableData from "./PrintTableData";

function ListOfObjectByKeysAndHeaders({list, header, tableKey, tableHeaders}) {
    return (
        <div >
            <Header header={header}/>
            <PrintTableData data={list} keys={tableKey}
                            headers={tableHeaders}
            type={false}/>
        </div>
    )
}
export default ListOfObjectByKeysAndHeaders;