import React, { Component } from 'react';
import Form from './common/form';
import './LogIn.scss';
import { Link } from 'react-router-dom';
import LoginIcon from './navbar/logIn';


class LogIn extends Form {
    state = { 
        data :{},
        errors : {} ,
        disabled: true
    }

    inputCheck = {
        emailLogIn: "emailCheck"
    }

    render() { 
        return ( 
        <main className="log-in-section">
            <section className="log-in-container">
                <h2>ĐĂNG NHẬP</h2>
                <form onSubmit={this.handleSubmit} className="log-in-form">
                    {this.renderInputType2("emailLogIn","Email Đăng Nhập")}
                    {this.renderInputType2("passwordLogIn","Mật Khẩu Đăng Nhập","password")}
                    <button type="submit" disabled={this.state.disabled} >Đăng Nhập</button>
                </form>
                <p>Bạn chưa có tài khoản? <span><Link to="/dang-ky">Đăng Ký</Link></span></p>
            </section>
        </main>
        )
        
    }
}
 
export default LogIn;