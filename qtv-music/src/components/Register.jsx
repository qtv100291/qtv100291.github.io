import React, { Component } from 'react';
import Form from './common/form';
import './Register.scss';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import registerNewUser from '../services/registerService';
import LoginIcon from './navbar/logIn';


class Register extends Form {
    state = { 
        data :{},
        errors : {} ,
        serverError: "",
        disabled : true
    }

    inputCheck = {
        emailRegister: "emailCheck",
        phoneRegister : "phoneCheck",
        passwordRegister : "passwordCheck",
        passwordRegisterRetype : "checkRetype"
    }

    doSubmit = async () => {
        try {
            const { data : user } = this.state
            await registerNewUser(user);
            toast.info('Đăng Ký Thành Công', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            this.props.history.replace('/dang-nhap');
        }
        catch(ex){
            if (ex.response && ex.response.status === 400) {
                const serverError = "Email này đã được sử dụng"; 
                this.setState({ serverError })
            }
        }
    }

    handleToggle = (e) =>{
        e.preventDefault();
        this.props.history.replace('/dang-nhap')
    }

    render() { 
        return ( 
        <main className="register-section">
            <section className="register-container">
                <h2>ĐĂNG KÝ</h2>
                {this.state.serverError && <div className="valid-feedback">{this.state.serverError}</div>}
                <form onSubmit={this.handleSubmit} className="register-form">
                    {this.renderInputType2("emailRegister","Email Đăng Ký")}
                    {this.renderInputType2("nameRegister","Họ Tên")}
                    {this.renderInputType2("phoneRegister","Số Điện Thoại","text","true")}
                    {this.renderInputType2("passwordRegister","Mật Khẩu Chứa Ít Nhất 6 Kí Tự","password")}
                    {this.renderInputType2("passwordRegisterRetype","Nhập Lại Mật Khẩu","password")}
                    <p>Khi bạn Khi bạn nhấn ĐĂNG KÝ, bạn đã đồng ý với những <span><Link to="/dieu-khoan">Điều Khoản</Link></span> và <span><Link to="/chinh-sach">Chính Sách</Link></span>  của QTV Guitar Shop.</p>
                    <button type="submit" disabled={this.state.disabled}>Đăng Ký</button>
                </form>
                <p>Bạn đã có tài khoản? <span><Link to="/dang-nhap" onClick={this.handleToggle}>Đăng nhập</Link></span></p>
            </section>
        </main>
        )
    }
}

export default Register;