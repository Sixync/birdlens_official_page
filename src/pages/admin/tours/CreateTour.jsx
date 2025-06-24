/* eslint-disable no-unused-vars */
// file: birdlen_official_page/src/pages/admin/tours/CreateTour.jsx
import React, { useState } from 'react';
import { Card, Form, Input, InputNumber, Button, DatePicker, message, ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import tourService from '../../../services/tourService';
import { ArrowLeftOutlined } from '@ant-design/icons';

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
        Button: { colorPrimary: '#3b82f6', colorPrimaryHover: '#2563eb' }
    }
};

export default function CreateTour() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const createTourMutation = useMutation({
    mutationFn: tourService.createTour,
    onSuccess: (data) => {
        message.success('Tour created successfully! You can now upload images.');
        // Navigate to edit page to upload images
        const newTourId = data?.data?.data?.id;
        if (newTourId) {
          navigate(`/admin/tours/edit/${newTourId}`);
        } else {
          navigate('/admin/tours');
        }
        queryClient.invalidateQueries(['tours']);
    },
    onError: () => {
        message.error('Failed to create tour.');
    }
  });

  const onFinish = (values) => {
    const tourData = {
        ...values,
        start_date: values.dateRange[0].toISOString(),
        end_date: values.dateRange[1].toISOString(),
    };
    delete tourData.dateRange;
    // Set default values for now as we don't have UI to select them
    tourData.event_id = 1; 
    tourData.location_id = 1;
    createTourMutation.mutate(tourData);
  };

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
                    <span className="text-lg font-semibold text-white">Create New Tour</span>
                </div>
            }
            className="bg-[#1a1b24] border-gray-100/10"
        >
            <Form {...formItemLayout} form={form} name="create_tour" onFinish={onFinish} scrollToFirstError>
                <Form.Item name="tour_name" label="Tour Name" rules={[{ required: true, message: 'Please input the tour name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="tour_description" label="Description" rules={[{ required: true, message: 'Please input the description!' }]}>
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
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={createTourMutation.isLoading}>
                        Create Tour
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </ConfigProvider>
  );
}