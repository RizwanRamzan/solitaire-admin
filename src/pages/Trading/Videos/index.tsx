import { Col, Form, Input, Row, Spin, message } from "antd";
import TopBar from "../../../Component/Layout/topBar";
import { useState,useEffect } from "react";
import { getRequest, putRequest } from "../../../service/apiCall";

const Sports = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({});




  const [form] = Form.useForm();

  const GetAllTrading = async () => {
    setLoading(true);

    const onSuccess = (res: any) => {
      setLoading(false);
      setData(res?.data);
    };

    const onError = () => {
      setLoading(false);
    };

    await getRequest("", "video/get-video", true, onSuccess, onError);
  };

  useEffect(() => {
    GetAllTrading();
  }, []);



  const formHandler = async (e: any) => {

    console.log(e,"e?.viode3")
    setLoading(true);

    const onSuccess = (res: any) => {
      message.success(res?.message);
      setLoading(false);
    };
    const onError = (err: any) => {
      message.error(err?.message);
      setLoading(false);
    };

    const formData = {
      url1: e?.video1,
      url2: e?.video2,
      url3: e?.video3,
    };

    await putRequest(formData, `video/update/${data?._id}`, true, onSuccess, onError);

  };


  
  useEffect(()=>{
    form.setFieldsValue({
      video1:data?.url1,
      video2:data?.url2,
      video3:data?.url3,
    })
  },[data])



  return (
    <Spin spinning={loading}>
      <TopBar title="Video"  />
      <Form
        form={form}
        onFinish={formHandler}
        layout="vertical"
        style={{ marginTop: "20px", paddingBottom: "30px" }}
        encType="multipart/form-data"
      >
        <Row gutter={10}>
          <Col span={18}>
            <Form.Item name="video1" label="Video Url One" rules={[{ required: true }]}>
              <Input
                placeholder="Enter the video url one"
                className="ant-input-affix-wrapper"
              />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item name="video2" label="Video Url Two" rules={[{ required: true }]}>
              <Input
                placeholder="Enter the video url two"
                className="ant-input-affix-wrapper"
              />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item name="video3" label="Video Url Three" rules={[{ required: true }]}>
              <Input
                placeholder="Enter the video url three"
                className="ant-input-affix-wrapper"
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
