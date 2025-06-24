// file: birdlen_official_page/src/pages/admin/tours/EditTour.jsx
import React, { useEffect } from 'react';
import { Card, Form, Input, InputNumber, Button, DatePicker, message, ConfigProvider, Upload } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import tourService from '../../../services/tourService';
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const tailFormItemLayout = {
  wrapperCol: { offset: 6, span: 14 },
};

const formTheme = {
    components: {
        Card: { colorBgContainer: '#1a1b24', colorBorderSecondary: '#303030', colorTextHeading: '#e5e7eb' },
        Form: { labelColor: '#9ca3af' },
        Input: { colorBgContainer: '#141414', colorBorder: '#303030', colorText: '#e5e7eb' },
        InputNumber: { colorBgContainer: '#141414', colorBorder: '#303030', colorText: '#e5e7eb' },
        DatePicker: { colorBgContainer: '#141414', colorBorder: '#303030', colorText: '#e5e7eb' },
        Button: { colorPrimary: '#3b82f6', colorPrimaryHover: '#2563eb' },
        Upload: { colorText: '#9ca3af' }
    }
};

export default function EditTour() {
  const { tourId } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: tourData, isLoading: isTourLoading } = useQuery({
    queryKey: ['tour', tourId],
    queryFn: () => tourService.getTour(tourId),
    enabled: !!tourId,
  });

  const tour = tourData?.data?.data;

  useEffect(() => {
    if (tour) {
        form.setFieldsValue({
            ...tour,
            dateRange: [dayjs(tour.start_date), dayjs(tour.end_date)],
        });
    }
  }, [tour, form]);

  const updateTourMutation = useMutation({
    mutationFn: (values) => tourService.updateTour(tourId, values),
    onSuccess: () => {
      message.success('Tour updated successfully!');
      queryClient.invalidateQueries(['tours']);
      queryClient.invalidateQueries(['tour', tourId]);
      navigate('/admin/tours');
    },
    onError: () => {
      message.error('Failed to update tour.');
    }
  });

  const onFinish = (values) => {
    const updatedData = {
        ...values,
        start_date: values.dateRange[0].toISOString(),
        end_date: values.dateRange[1].toISOString(),
    };
    delete updatedData.dateRange;
    updateTourMutation.mutate(updatedData);
  };
  
  const handleUpload = async (file, type) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        if (type === 'thumbnail') {
            await tourService.addTourThumbnail(tourId, formData);
        } else {
            await tourService.addTourImages(tourId, formData);
        }
        message.success(`${type === 'thumbnail' ? 'Thumbnail' : 'Image'} uploaded successfully`);
        queryClient.invalidateQueries(['tour', tourId]);
    } catch {
        message.error('Upload failed');
    }
    return false; // Prevent antd default upload
  };

  if (isTourLoading) return <div>Loading...</div>;

  return (
    <ConfigProvider theme={formTheme}>
        <Card
            title={
                <div className="flex items-center gap-3">
                    <Button
                        icon={<ArrowLeftOutlined />}
                        type="text"
                        onClick={() => navigate('/admin/tours')}
                    />
                    <span className="text-lg font-semibold text-white">Edit Tour: {tour?.name}</span>
                </div>
            }
            className="bg-[#1a1b24] border-gray-100/10"
        >
            <Form {...formItemLayout} form={form} name="edit_tour" onFinish={onFinish} scrollToFirstError>
                {/* Form fields are same as CreateTour, pre-filled with data */}
                <Form.Item name="tour_name" label="Tour Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="tour_description" label="Description" rules={[{ required: true }]}>
                    <Input.TextArea rows={4} />
                </Form.Item>
                 <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price!' }]}>
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="tour_capacity" label="Capacity" rules={[{ required: true, message: 'Please input the capacity!' }]}>
                    <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="duration_days" label="Duration (Days)" rules={[{ required: true, message: 'Please input the duration!' }]}>
                    <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="dateRange" label="Date Range" rules={[{ required: true, message: 'Please select the date range!' }]}>
                    <DatePicker.RangePicker style={{ width: '100%' }} />
                </Form.Item>
                
                {/* Image Uploads */}
                <Form.Item label="Thumbnail">
                    <Upload beforeUpload={(file) => handleUpload(file, 'thumbnail')} showUploadList={false}>
                        <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Additional Images">
                    <Upload beforeUpload={(file) => handleUpload(file, 'images')} showUploadList={true} multiple>
                        <Button icon={<UploadOutlined />}>Upload Images</Button>
                    </Upload>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={updateTourMutation.isLoading}>
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </ConfigProvider>
  );
}