import { Col, DatePicker, Form, Input, Modal, Row, Spin, message } from "antd";
import TopBar from "../../../Component/Layout/topBar";
import { useEffect, useState } from "react";
import { ImgUpload } from "../../../assets";
import { useSelector } from "react-redux";
import NewTable from "./newTable";
import { useMediaQuery } from "react-responsive";
import "./sports.scss"
import { deleteRequest, getRequest, postRequestFormData } from "../../../service/apiCall";



const Sports = () => {
  const mobileResponsive = useMediaQuery({
    query: "(max-width: 800px)",
  });

  const token = useSelector((state: any) => state.authReducer.Admintoken);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [endModal, setEndModal] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Open, setOpen] = useState(false);
  const [user, setUser] = useState<any>({});
  const [img, setImg] = useState<File | null>(null);
  const [team1, setTeam1] = useState<any>({
    image: null,
  });



  const GetAllTrading = async () => {
    setLoading(true);

    const onSuccess = (res: any) => {
      setLoading(false);
      setData(res?.data?.reverse());
    };

    const onError = () => {
      setLoading(false);
    };

    await getRequest("", "news/get-all", true, onSuccess, onError);
  };

  useEffect(() => {
    GetAllTrading();
  }, []);

  const EndEvent = (object: any) => {
    setEndModal(object);
  };

  const DeleteEvents = async (object:any) => {
    setLoading(true);
    const onSuccess = (res: any) => {
      setLoading(false);
      message.success(res?.message)
    };

    const onError = () => {
      setLoading(false);
    };

    await deleteRequest("", `news/delete/${object?._id}`, true, onSuccess, onError);
    GetAllTrading();
  };


  const [form] = Form.useForm();

  const OpenModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
    setIsModalOpen(false);
    form.resetFields();
    setTeam1({ image: null });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setOpen(false);
    form.resetFields();
    setTeam1({ image: null });
  };

  const formHandler = async (e: any) => {
    if (team1?.image) {

    setLoading(true);

    const onSuccess = (res: any) => {
      console.log(res, "sakjcnsakncjndsckjds");
      message.success(res?.message);
      setLoading(false);
      form.resetFields();
      handleOk()
    };
    const onError = (err: any) => {
      message.error(err?.message);
      setLoading(false);
    };

    const formData = {
      date: e?.date,
      description: e?.desc,
      image: img,
      url:e?.link
    };

    await postRequestFormData(formData, "news/add", true, onSuccess, onError);
    GetAllTrading()
  } else {
    message.warning("please upload image");
  }
  };


  const handleTeam1 = (event: any) => {
    const file = event.target.files[0];
    setImg(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setTeam1({ image: reader.result });
    };
  };

  return (
    <Spin spinning={loading}>
      <TopBar title="News" button="Add News" OpenModal={OpenModal}/>
      <Row>
        <Col span={24}>
          <h2 className="all-trading"> All News </h2>
        </Col>
      </Row>
      <NewTable
        EndEvent={EndEvent}
        DeleteEvents={DeleteEvents}
        OpenModal={OpenModal}
        mobileResponsive={mobileResponsive}
        data={data}
        setUser={setUser}
      />

      <Modal
        title="Add News"
        footer={false}
        open={Open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row>
        <Col span={24}>
            <div className="form-left">
              {team1.image ? (
                <>
                  <label
                    className="image-upload-button"
                    htmlFor="image-upload1"
                    onClick={handleTeam1}
                  >
                    <img src={team1.image} alt="uploaded" />
                  </label>
                </>
              ) : (
                <>
                  <label
                    className="image-upload-button"
                    htmlFor="image-upload1"
                  >
                    <img src={ImgUpload} />
                  </label>
                </>
              )}
              <input
                style={{ display: "none" }}
                id="image-upload1"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleTeam1}
              />
            </div>
          </Col>
          <Form form={form} onFinish={formHandler} layout='vertical' style={{width:"100%"}}>
            <Col span={24}>
            <Form.Item name='desc' label="Description" rules={[{required:true}]}>
              <Input className="ant-input-affix-wrapper" placeholder="Enter news description"/>
            </Form.Item>
            </Col>
            <Col span={24}>
            <Form.Item name='date' label="New Date" rules={[{required:true}]}>
              <DatePicker picker='date' className="ant-input-affix-wrapper" placeholder="Enter new date"/>
            </Form.Item>
            </Col>
            <Col span={24}>
            <Form.Item name='link' label="New Url" rules={[{required:true}]}>
              <Input className="ant-input-affix-wrapper" placeholder="Enter new url"/>
            </Form.Item>
            </Col>
            <Col style={{display:"flex",justifyContent:"center"}} span={24}>
              <button style={{width:"100px"}} >Submit</button>
            </Col>
          </Form>
        </Row>
      </Modal>
    </Spin>
  );
};

export default Sports;
