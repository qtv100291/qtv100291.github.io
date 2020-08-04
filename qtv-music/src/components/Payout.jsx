import React from 'react';
import Form from '../components/common/form';
import './Payout.scss';
import payoutService from '../services/payoutService';

class Payout extends Form {
    provinceInit = {
        idProvince:"00",
        name:"Chọn Tỉnh/Thành Phố ..."
    }

    districtInit = {
            idProvince:"00",
            idDistrict:"000",
            name:"Chọn Quận/Huyện"
    }

    communeInit = {
            idDistrict: "000",
            idCoummune: "00000",
            name: "Chọn Phường/Xã"
    }
    state = { 
        data : {},
        errors: {},
        serverError: {},
        disabled: true,
        province: [{...this.provinceInit}],
        district: [{...this.districtInit}],
        commune : [{...this.communeInit}],
        provinceValue: "00",
        districtValue : "000",
        communeValue : "00000"

    }

    async componentDidMount() {
        let data = {...this.state.data};
        data["paymentMethod"] = "cash";
        const provinceList = await payoutService.getProvince();
        const province =[{...this.provinceInit},...provinceList];
        this.setState({ data, province })
    }

    hanldeDistrict = async idProvince => {
        if (idProvince === "00"){
            this.setState( { district: [{...this.districtInit}], commune: [{...this.communeInit}]} )
        }
        else {
            const districtList  = await payoutService.getDistrict(idProvince);
            const district = [{...this.districtInit}, ...districtList];
            this.setState({ district })
        }
    }

    hanldeCommune = async idDistrict => {
        if (idDistrict === "000"){
            this.setState( { commune: [{...this.communeInit}]} )
        }
        else {
            const communeList  = await payoutService.getCommune(idDistrict);
            const commune = [{...this.communeInit},...communeList];
            this.setState({ commune })
        }
    }

    render() { 
        const { province, district, commune} = this.state ;
        const { paymentMethod } = this.state.data;   
        const cardType = [{
            
        }]
        return (  
            <main className="payout-main">
                <h2 className="payout-title">Thanh Toán</h2>
                <div className="payout-container">
                    <section className="payout-user-info" className="payout-form">
                        <form onSubmit={this.handleSubmit}>
                            <div className="">
                                <h3>Thông Tin Người Nhận</h3>
                                {this.renderInputType3("receiverName","Tên người nhận", "Nhập họ tên người nhận")}
                                {this.renderInputType3("receiverPhone","Điện thoại", "Số điện thoại gồm 10 chữ số","true")}
                                {this.renderSelect("receiverProvince","Tỉnh/Thành Phố",province, "idProvince")}
                                {this.renderSelect("receiverDistrict","Quận/Huyện",district, "idDistrict")}
                                {this.renderSelect("receiverCommune","Phường/Xã",commune, "idCommune")}
                                {this.renderTextArea("receiverNote","Ghi Chú", "Bạn cần chúng tôi chú ý điều gì",5)}
                                <p className="empty-warning"><span className="obligation-mark">*</span> Bạn không được để trống mục này</p>
                            </div>
                            <div className="payment-method">
                                <h3>Thông Tin Thanh Toán</h3>
                                {this.renderRadioInput("paymentMethod","cash-method","Thanh toán bằng tiền mặt khi nhận hàng","cash","true")}  
                                {this.renderRadioInput("paymentMethod","card-method","Thanh toán bằng thẻ thanh toán quốc tế","card")}  
                                    <div className={paymentMethod === "card" ? "card-method-content displaying" : "card-method-content"}>
                                    {this.renderSelect("receiverProvince","Tỉnh/Thành Phố",cardType, "idProvince")}
                                    </div>
                            </div>
                        </form>
                    </section>
                    <section className="payout-shopping-cart">

                    </section>
                </div>
            </main>
          );
    }
}
 
export default Payout;