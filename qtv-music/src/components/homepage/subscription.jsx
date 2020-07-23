import React from 'react';
import Form from '../common/form';
import './subscription.scss';

class Subscription extends Form{
    state = { 
        data :{},
        errors : {} 
    }
    render() { 
        const {data , error} = this.state
        return ( 
            <section className='subscription-part'>
                <h3>Đăng Ký Nhận Bản Tin</h3>
                <h5>Để cập nhật những thông tin mới nhất từ QTV Music</h5>
                <form onSubmit={this.handleSubmit} className="email-subscription-form d-flex">
                    {this.renderInputType1("email-subscription", "Nhập Email Của Bạn...", "500px")}
                    <input type="submit" value="Đăng Ký"/>
                </form>
            </section>
         );
    }
}
 
export default Subscription ;

