// file: birdlen_official_page/src/pages/admin/tours/TourList.jsx
import React, { useMemo } from 'react';
import { Card, Table, Button, ConfigProvider, Tooltip, Image, Tag, Dropdown, Modal, message } from 'antd';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import tourService from '../../../services/tourService';
import { PlusOutlined, EditOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { format } from 'date-fns';

// Configuration for Ant Design dark theme to match the de-fleur admin style
const tableTheme = {
    components: {
        Table: {
            colorBgContainer: '#141414',
            headerBg: '#1f1f1f',
            headerColor: '#e5e7eb',
            colorText: '#e5e7eb',
            rowHoverBg: '#262626',
            borderColor: '#303030',
        },
        Button: {
            colorPrimary: '#3b82f6',
            colorPrimaryHover: '#2563eb',
        },
        Card: {
            colorBgContainer: '#1a1b24',
            colorBorderSecondary: '#303030',
            colorTextHeading: '#e5e7eb',
        },
        Dropdown: {
            colorBgElevated: '#1f1f1f',
            controlItemBgHover: '#2c333a',
            colorText: '#e5e7eb',
        },
        Modal: {
            colorBgElevated: '#1f1f1f',
            colorTextHeading: '#e5e7eb',
            colorText: '#e5e7eb',
        }
    }
};

export default function TourList() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Fetch tours data using react-query
    const { data: toursResponse, isLoading } = useQuery({
        queryKey: ['tours'],
        queryFn: () => tourService.getTours(),
    });
    
    // Extract items from paginated response
    const tours = toursResponse?.data?.data?.items || [];
    
    // Handler for deleting a tour
    const handleDelete = (tourId) => {
        Modal.confirm({
            title: 'Delete Tour',
            content: 'Are you sure you want to delete this tour? This action cannot be undone.',
            okText: 'Delete',
            okType: 'danger',
            onOk: async () => {
                try {
                    await tourService.deleteTour(tourId);
                    message.success('Tour deleted successfully');
                    // Invalidate the query to refetch the tour list
                    queryClient.invalidateQueries({ queryKey: ['tours'] });
                } catch (error) {
                    message.error('Failed to delete tour');
                }
            },
        });
    };

    // Define table columns
    const columns = useMemo(() => [
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail_url',
            key: 'thumbnail_url',
            render: (url, record) => (
                <Image 
                    width={60} 
                    height={60}
                    src={url || "/images/logo.png"} // Fallback image
                    alt={record.name}
                    style={{ objectFit: 'cover', borderRadius: '4px' }}
                />
            ),
        },
        {
            title: 'Tour Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `$${price}`,
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            render: (days) => `${days} days`,
            sorter: (a, b) => a.duration - b.duration,
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date',
            render: (date) => format(new Date(date), 'dd MMM yyyy'),
            sorter: (a, b) => new Date(a.start_date) - new Date(b.start_date),
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'center',
            render: (_, record) => (
                <Dropdown
                    menu={{
                        items: [
                            { key: 'edit', icon: <EditOutlined />, label: 'Edit', onClick: () => navigate(`/admin/tours/edit/${record.id}`) },
                            { key: 'delete', icon: <DeleteOutlined />, label: 'Delete', danger: true, onClick: () => handleDelete(record.id) },
                        ],
                    }}
                    trigger={['click']}
                >
                    <Button type="text" icon={<EllipsisOutlined style={{ fontSize: '20px' }} />} />
                </Dropdown>
            ),
        },
    ], [navigate, handleDelete]);

    return (
        <ConfigProvider theme={tableTheme}>
            <Card
                title={<span className="text-lg font-semibold text-white">Manage Tours</span>}
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => navigate('/admin/tours/create')}
                    >
                        Create Tour
                    </Button>
                }
                bordered={false}
            >
                <Table
                    columns={columns}
                    dataSource={tours.map(tour => ({ ...tour, key: tour.id }))}
                    loading={isLoading}
                    pagination={{ pageSize: 10, total: tours.length }}
                />
            </Card>
        </ConfigProvider>
    );
}