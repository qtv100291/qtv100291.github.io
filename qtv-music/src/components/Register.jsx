import React, { Component } from 'react';
import Form from './common/form';
import './Register.scss';
import { Link } from 'react-router-dom';
import LoginIcon from './navbar/logIn';


class Register extends Form {
    state = { 
        data :{},
        errors : {} ,
        disabled : true
    }

    inputCheck = {
        emailRegister: "emailCheck",
        phoneRegister : "phoneCheck",
        passwordRegister : "passwordCheck",
        passwordRegisterRetype : "checkRetype"
    }

    render() { 
        return ( 
        <main className="register-section">
            <section className="register-container">
                <h2>ĐĂNG KÝ</h2>
                <form onSubmit={this.handleSubmit} className="register-form">
                    {this.renderInputType2("emailRegister","Email Đăng Ký")}
                    {this.renderInputType2("nameRegister","Họ Tên")}
                    {this.renderInputType2("phoneRegister","Số Điện Thoại")}
                    {this.renderInputType2("passwordRegister","Mật Khẩu Chứa Ít Nhất 6 Kí Tự","password")}
                    {this.renderInputType2("passwordRegisterRetype","Nhập Lại Mật Khẩu","password")}
                    <p>Khi bạn Khi bạn nhấn ĐĂNG KÝ, bạn đã đồng ý với những <span><Link to="/dieu-khoan">Điều Khoản</Link></span> và <span><Link to="/chinh-sach">Chính Sách</Link></span>  của QTV Guitar Shop.</p>
                    <button type="submit" disabled={this.state.disabled}>Đăng Ký</button>
                </form>
                <p>Bạn đã có tài khoản? <span><Link to="/dang-nhap">Đăng nhập</Link></span></p>
            </section>
        </main>
        )
    }
}

export default Register;