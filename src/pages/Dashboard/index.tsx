import { useMediaQuery } from "react-responsive";
import TopBar from "../../Component/Layout/topBar";
import DashboardTable from "./dasboardTable";
import { Col, Form, Input, Modal, Row, message } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./dashboard.scss";
import { ImgUpload } from "../../assets";
import { deleteRequest, getRequest, postRequest, postRequestFormData } from "../../service/apiCall";

type contectData = {
  image: any;
  file: any;
};

const Dashboard = () => {
  const mobileResponsive = useMediaQuery({
    query: "(max-width: 800px)",
  });

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = useSelector((state: any) => state.authReducer.Admintoken);

  const [formState, setFormState] = useState<contectData>({
    image: null,
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [endModal, setEndModal] = useState<any>({});
  const [deletEvent, setDelete] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Open, setOpen] = useState(false);
  const [user, setUser] = useState<any>({});
  const [img, setImg] = useState<File | null>(null);
  const [team1, setTeam1] = useState<any>({
    image: null,
  });

  // post create

  const handleTeam1 = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setTeam1({ image: reader.result });
      setImg(file);
      setFormState({ image: reader.result, file: file });
    };
  };



  const GetAllTrading = async () => {
    setLoading(true);

    const onSuccess = (res: any) => {
      setLoading(false);
      setData(res?.data);
    };

    const onError = () => {
      setLoading(false);
    };

    await getRequest("", "slide/get-all", true, onSuccess, onError);
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

    await deleteRequest("", `slide/delete/${object?._id}`, true, onSuccess, onError);
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
      handleOk()
    };
    const onError = (err: any) => {
      message.error(err?.message);
      setLoading(false);
    };

    const formData = {
      name: e?.silde,
      description: e?.dec,
      image: formState?.file,
    };

    await postRequestFormData(formData, "slide/add", true, onSuccess, onError);
    GetAllTrading()
  } else {
    message.warning("please upload image");
  }
  };

  return (
    <>
      <TopBar title="Home" button="Add Banners" OpenModal={OpenModal} />
      <Row>
        <Col span={24}>
          <h2 className="all-trading"> All Slider </h2>
        </Col>
      </Row>
      <DashboardTable
        EndEvent={EndEvent}
        DeleteEvents={DeleteEvents}
        OpenModal={OpenModal}
        mobileResponsive={mobileResponsive}
        data={data}
        setUser={setUser}
      />

      <Modal
        title="Add Slider"
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
          <Form
            form={form}
            onFinish={formHandler}
            layout="vertical"
            style={{ width: "100%" }}
          >
            <Col span={24}>
              <Form.Item
                name="silde"
                label="Slide Name"
                rules={[{ required: true }]}
              >
                <Input
                  className="ant-input-affix-wrapper"
                  placeholder="Enter slide name"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="dec"
                label="Slide Description"
                rules={[{ required: true }]}
              >
                <Input
                  className="ant-input-affix-wrapper"
                  placeholder="Enter slide description"
                />
              </Form.Item>
            </Col>
            <Col
              style={{ display: "flex", justifyContent: "center" }}
              span={24}
            >
              <button style={{ width: "100px" }}>Submit</button>
            </Col>
          </Form>
        </Row>
      </Modal>
    </>
  );
};

export default Dashboard;
