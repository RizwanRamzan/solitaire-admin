import { Col, Form, Input, Row, Spin, message } from "antd";
const { TextArea } = Input;
import TopBar from "../../../Component/Layout/topBar";
import { useState } from "react";
import { ImgUpload } from "../../../assets";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

type contectData = {
  image: any;
};

type MyObject = {
  bid: String,
  share: String,
  oldamount: String
  // userId: String
}

const Sports = () => {
  const token = useSelector((state: any) => state.authReducer.Admintoken);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [dataBody, setDataBody] = useState({
    title: "",
    resolution: "",
    endDate: "", // Add endDate and endTime fields to dataBody
    endTime: ""
  });
  const [img, setImg] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [bid, setBid] = useState<MyObject[]>([])

  const [team1, setTeam1] = useState<contectData>({
    image: null,
  });

  const [form] = Form.useForm();

  const handleTeam1 = (event: any) => {
    const file = event.target.files[0];
    setImg(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setTeam1({ image: reader.result });
    };
  };

  const formHandler = async (value: any) => {
    if (team1?.image) {
      setLoading(true);

      let formData = new FormData();
      Object.entries(dataBody).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("category", value.category);
      formData.append(`bids`, JSON.stringify(bid));
      if (img) {
        formData.append("image", img);
      }
      fetch(`${baseUrl}/api/v1/admin/trading/politics`, {
        method: "post",
        headers: {
          "x-sh-auth": token,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setDataBody({
            title: "",
            resolution: "",
            endDate: "",
            endTime: ""
          });
          setLoading(false);
          if (data?.success) {
            form.resetFields();
            message.success(data?.message);
            setTeam1({ image: null });
            navigate("/admin/dashboard");
          }
        });
    } else {
      message.warning("please upload image");
    }
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setDataBody({ ...dataBody, [name]: value });
  };

  const onChangePrice = (e: any) => {
    const { name, value } = e.target;
    var newArr = [...bid, {
      bid: name,
      share: "1",
      oldamount: value
    }]
    setBid(newArr)
  };

  // const handleChange = (value: string) => {
  //   setDataBody({ ...dataBody, category: value });
  //   console.log(dataBody)
  // };

  return (
    <Spin spinning={loading}>
      <TopBar title="Video" breadcrumb={true} consdition={true} />
      <Form
        form={form}
        onFinish={formHandler}
        layout="vertical"
        style={{ marginTop: "20px", paddingBottom: "30px" }}
        encType="multipart/form-data"
      >
        <Row gutter={10}>
          <Col span={18}>
            <Form.Item name="video" label="Video Url" rules={[{ required: true }]}>
              <Input
                placeholder="Enter the video url"
                name="title"
                id="title"
                className="ant-input-affix-wrapper"
                value={dataBody.title}
                onChange={onChange}
              />
            </Form.Item>
          </Col>

          
        </Row>
        <Row gutter={10}>
          <Col style={{float:"right"}} span={18}>
            <button style={{ width: "100px" }}>Submit</button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default Sports;
