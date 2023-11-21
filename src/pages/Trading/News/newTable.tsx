import { Table } from "antd";
// General Style
import { ReactSVG } from "react-svg";
import { Trash } from "../../../assets";
import moment from "moment";

const NewTable = ({ mobileResponsive, data,DeleteEvents}: any) => {

  const columns = [
    
  
    {
      key: "8",
      title: "Image",
      render: (_: any, object: any) => <img width="40px" height="40px" src="/tabLogo.png" /> || "-",
      width: "10%",
    },
    {
      key: "8",
      title: "New Date",
      render: (_: any, object: any) => moment(object?.date).format("YYYY-MM-DD") || "-",
      width: "10%",
    },
  
    {
      key: "2",
      title: "New Description",
      render: (_: any, object: any) => object?.description || "-",
      width: "30%",
    },
    {
      key: "6",
      title: "Action",
      render: (_: any, object: any) => (
        <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>

          <ReactSVG onClick={() => DeleteEvents(object)} style={{ cursor: "pointer" }} width={20} src={Trash} />
        </div>
      ),
      width: "10%",
    },
  ];

  return (
    <div className="MainTable">
      <Table
        className="Table"
        scroll={mobileResponsive ? { x: 1300, y: 660 } : {}}
        onChange={(e) => console.log(e)}
        columns={columns}
        dataSource={data}
        size="small"
      />
    </div>
  );
};


export default NewTable;
