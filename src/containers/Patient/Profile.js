import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Avatar, Descriptions, Button, Input, notification } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import './Profile.scss'; // Custom CSS
import { UpdateUser } from "../../services/userService";
// Giả sử đây là API của bạn

const Profile = ({ isVisible, onCancel, data, onSave }) => {
  const avatarUrl = data.image && data.image.data
    ? `data:image/jpeg;base64,${Buffer.from(data.image.data).toString('base64')}`
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPUPPObe8bkov6CluwLDx5FNgla0wkgvJxAgPhrGxg_ZcXu36M1nBLZDnHfRyltQNjZVw4VROMhokT0D4mTrQ57g";

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(data); // Để lưu trữ dữ liệu chỉnh sửa

  const handleEdit = () => {
    setIsEditing(true); // Bật chế độ chỉnh sửa
  };

  const handleCancel = () => {
    setEditedData(data); // Quay lại dữ liệu ban đầu
    setIsEditing(false); // Tắt chế độ chỉnh sửa
  };

  const handleSave = async () => {
    try {
      const response = await UpdateUser(editedData); // Gọi API cập nhật dữ liệu người dùng

      if (response.errCode === 0) {
        notification.success({
          message: 'Cập nhật thành công',
          description: 'Thông tin người dùng đã được cập nhật.',
        });
        setEditedData(editedData); // Lưu lại dữ liệu mới làm dữ liệu gốc
        setIsEditing(false); // Thoát khỏi chế độ chỉnh sửa
      } else if (response.errCode === 2) {
        notification.error({
          message: 'Thiếu ID',
          description: 'Vui lòng cung cấp ID người dùng để thực hiện cập nhật.',
        });
      } else if (response.errCode === 1) {
        notification.error({
          message: 'Người dùng không tồn tại',
          description: 'Không tìm thấy người dùng trong hệ thống.',
        });
      } else {
        notification.error({
          message: 'Lỗi không xác định',
          description: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng. Vui lòng thử lại!',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Cập nhật thất bại',
        description: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng. Vui lòng thử lại!',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isVisible) {
      setEditedData(data);
    }
  }, [isVisible, data]);

  return (
    <Modal
      title="User Profile"
      visible={isVisible}
      onCancel={onCancel}
      footer={null}
      className="profile-modal"
    >
      <Row justify="center" align="middle" className="profile-container">
        <Col xs={24} sm={6} className="avatar-section">
          <Avatar
            size={150}
            src={avatarUrl}
            alt="avatar"
            icon={<UserOutlined />}
          />
        </Col>

        <Col xs={24} sm={18}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Họ">
              {isEditing ? (
                <Input
                  name="lastName"
                  value={editedData.lastName}
                  onChange={handleChange}
                  autoFocus
                />
              ) : (
                editedData.lastName
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Tên">
              {isEditing ? (
                <Input
                  name="firstName"
                  value={editedData.firstName}
                  onChange={handleChange}
                  autoFocus
                />
              ) : (
                editedData.firstName
              )}
            </Descriptions.Item>

            <Descriptions.Item label={<MailOutlined />}>
              {editedData.email} {/* Không cho phép thay đổi email */}
            </Descriptions.Item>

            <Descriptions.Item label={<PhoneOutlined />}>
              {isEditing ? (
                <Input
                  name="phonenumber"
                  value={editedData.phonenumber}
                  onChange={handleChange}
                  autoFocus
                />
              ) : (
                editedData.phonenumber
              )}
            </Descriptions.Item>

            <Descriptions.Item label={<HomeOutlined />}>
              {isEditing ? (
                <Input
                  name="address"
                  value={editedData.address}
                  onChange={handleChange}
                  autoFocus
                />
              ) : (
                editedData.address
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Role">
              {editedData.roleId === 'R1' ? "Admin" : editedData.roleId === 'R2' ? "Doctor" : editedData.roleId === 'R3' ? "Patient" : "Unknown"}
            </Descriptions.Item>

            <Descriptions.Item label="Giới tính">
              {editedData.gender === 'M' ? 'Nam' : editedData.gender === 'F' ? 'Nữ' : 'Other'}
            </Descriptions.Item>
          </Descriptions>

          {/* Chỉnh sửa chế độ */}
          {isEditing && (
            <Row justify="end" style={{ marginTop: 20 }}>
              <Button onClick={handleCancel} style={{ marginRight: 10 }}>
                Cancel
              </Button>
              <Button type="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </Row>
          )}

          {/* Nút chỉnh sửa ban đầu */}
          {!isEditing && (
            <Row justify="end" style={{ marginTop: 20 }}>
              <Button type="primary" onClick={handleEdit}>
                Edit
              </Button>
            </Row>
          )}
        </Col>
      </Row>
    </Modal>
  );
};

export default Profile;
