import React, { useState } from "react";
import { Modal, Input, Form, Button, notification } from "antd";
import { LockOutlined, LockFilled } from '@ant-design/icons';
import './ChangePasswordModal.scss'; // Thêm style tùy chỉnh nếu cần
import { changePassword } from "../../services/userService";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const ChangePassword = ({ isVisible, onCancel, onChangePassword, data }) => {
    const [form] = Form.useForm(); // Để quản lý form trong Ant Design
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    // Hàm để xử lý việc thay đổi mật khẩu
    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await changePassword(values); // Gọi API đổi mật khẩu

            // Kiểm tra errCode từ response
            if (response.errCode === 1) {
                notification.error({
                    message: 'Lỗi',
                    description: 'Mật khẩu hiện tại không đúng!',
                });
                setLoading(false); // Tắt trạng thái loading
                return;
            }

            notification.success({
                message: 'Thành công',
                description: 'Mật khẩu đã được thay đổi thành công!',
            });

            form.resetFields(); // Reset form sau khi thành công
            onCancel(); // Đóng modal sau khi thành công

            // Bắt đầu đếm ngược 10 giây trước khi đăng xuất
            let countdown = 10; // Đếm ngược từ 10 giây

            const intervalId = setInterval(() => {
                notification.destroy(); // Xóa thông báo cũ

                notification.info({
                    message: 'Đăng xuất',
                    description: `Bạn sẽ được đăng xuất sau ${countdown} giây.`,
                    duration: 1, // Thời lượng mỗi thông báo là 1 giây
                });

                countdown -= 1;

                if (countdown === 0) {
                    clearInterval(intervalId); // Dừng đếm ngược khi hết giờ
                    dispatch(actions.processLogout()); // Thực hiện hành động đăng xuất
                    history.push('/login');
                }
            }, 1000); // Cập nhật thông báo mỗi giây

        } catch (error) {
            notification.error({
                message: 'Lỗi',
                description: 'Đã xảy ra lỗi trong quá trình thay đổi mật khẩu. Vui lòng thử lại!',
            });
        } finally {
            setLoading(false); // Tắt trạng thái loading
        }
    };

    return (
        <Modal
            title="Đổi Mật Khẩu"
            visible={isVisible}
            onCancel={onCancel}
            footer={null}
            width={500}
            className="change-password-modal"
        >
            <Form
                form={form}
                onFinish={(values) => {
                    const { oldPassword, newPassword } = values;
                    const submitValues = {
                        id: data.id, // Thêm id từ data
                        oldPassword: oldPassword,
                        newPassword: newPassword,
                    };
                    handleSubmit(submitValues); // Gọi hàm xử lý submit với các giá trị đã điều chỉnh
                }}
                layout="vertical"
                initialValues={{ id: data.id, newPassword: "", confirmPassword: "" }}
            >
                <Form.Item
                    label="Mật khẩu hiện tại"
                    name="oldPassword"
                    rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại!" }]}
                >
                    <Input.Password
                        placeholder="Nhập mật khẩu hiện tại"
                        prefix={<LockOutlined />}
                    />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu mới"
                    name="newPassword"
                    rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                        { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự" },
                        {
                            pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: "Mật khẩu phải chứa ít nhất 1 ký tự viết hoa, 1 ký tự số và 1 ký tự đặc biệt!",
                        }
                    ]}
                >
                    <Input.Password
                        placeholder="Nhập mật khẩu mới"
                        prefix={<LockFilled />}
                    />
                </Form.Item>

                <Form.Item
                    label="Xác nhận mật khẩu mới"
                    name="confirmPassword"
                    dependencies={['newPassword']}
                    rules={[
                        { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        placeholder="Xác nhận mật khẩu mới"
                        prefix={<LockOutlined />}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                        disabled={loading}
                    >
                        Đổi Mật Khẩu
                    </Button>
                </Form.Item>
            </Form>

        </Modal>
    );
};

export default ChangePassword;
