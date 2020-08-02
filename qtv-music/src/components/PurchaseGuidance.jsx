import React, { useEffect } from 'react';
import './PurchaseGuidance.scss';
import BreadCrumb from './common/breadCrumb';


const PurchaseGuidance = () => {
    useEffect(() => {
        document.title = "Điều Khoản Dịch Vụ";
        window.scrollTo(0,0)
    })
    return ( 
        <main className="purchase-guidance">
            <BreadCrumb titleParent="Hướng Dẫn Mua Hàng"/>
            <section className="content-section">
                <div className="article-part">
                    <h2 className="article-title">HƯỚNG DẪN MUA HÀNG</h2>
                    <div className="item-policy">
                        <p className="content-text" >Để mua sắm trên website QTV Music, quý khách có thể mua hàng bằng cách chọn một trong những cách mua hàng sau:</p>
                        <h3 className="head-title-policy">1. MUA HÀNG QUA ĐIỆN THOẠI</h3>
                        <p className="content-text">Gọi điện thoại đến Tổng đài <a href="tel:19001570" style={{color:'black'}}>19001570</a> từ 8g - 20g (cả CN và Ngày lễ) để đặt hàng. Với đội ngũ nhân viên chuyên nghiệp, giàu kinh nghiệm, chúng tôi luôn sẵn sàng phục vụ, tư vấn và hỗ trợ quý khách mua được sản phẩm ưng ý</p>
                    </div>
                    <div className="item-policy">
                        <h3 className="head-title-policy">2. MUA HÀNG QUA WEBSITE</h3>
                        <p className="content-text">Bước 1: Truy cập website và đến trang sản phẩm cần mua để mua hàng</p>
                        <p className="content-text">Bước 2: Chọn số lượng sản phẩm cần mua và click và nút Thêm Vào Giỏ Hàng, kiểm tra lại các mặt hàng có trong giỏ hàng bằng cách trỏ chuột vào biểu tượng ở góc phía trên bên phải màn hình</p>
                        <p className="content-text">Bước 3: Click vào nút Thanh Toán trên giỏ hàng, các bạn có thay đổi số lượng, chủng loại hàng hóa trong giỏ hàng</p>
                        <p className="content-text">Bước 4: Điền thông tin cá nhân vào các mục tương ứng và chọn phương thức thanh toán phù hợp với bạn</p>
                        <p className="content-text">Bước 5: Kiểm tra kĩ đơn hàng và thông tin cá nhân của bạn và bấm Đặt Hàng</p>
                        <p className="content-text">Sau khi nhận được yêu cầu của bạn, chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất để xác nhận yêu cầu cũng như địa chỉ của bạn.</p>
                        <p className="content-text" style={{color :'red'}}>Lưu ý:</p>
                        <p className="content-text">- Chúng tôi chỉ chấp nhận những đơn đặt hàng khi cung cấp đủ thông tin chính xác về địa chỉ, số điện thoại. Sau khi bạn đặt hàng, chúng tôi sẽ liên lạc lại để kiểm tra thông tin và thỏa thuận thêm những điều có liên quan.</p>
                        <p className="content-text">- Một số trường hợp nhạy cảm: giá trị đơn hàng quá lớn và thời gian giao hàng vào buổi tối địa chỉ giao hàng trong ngõ hoặc có thể dẫn đến nguy hiểm. Chúng tôi sẽ chủ động liên lạc với quý khách để thống nhất lại thời gian giao hàng cụ thể.</p>
                        <p className="content-text">- Trong trường hợp giao hàng chậm trễ mà không báo trước, quý khách có thể không nhận hàng và chúng tôi sẽ hoàn trả toàn bộ số tiền mà quý khách trả trước (nếu có) trong vòng 7 ngày.</p>
                        <p className="content-text">- Công ty cam kết tất cả hàng hóa gởi đến quý khách đều là hàng chính hãng mới 100%. Những rủi ro phát sinh trong quá trình vận chuyển (va đập, ẩm ướt, tai nạn...) có thể ảnh hưởng đến hàng hóa, vì thế xin Quý Khách vui lòng kiểm tra hàng hóa thật kỹ trước khi ký nhận. QTV Guitar Shop sẽ không chịu trách nhiệm với những sai lệch hình thức của hàng hoá sau khi Quý khách đã ký nhận hàng.</p>
                    </div>
                </div>
            </section>
        </main>
     );
}
 
export default PurchaseGuidance;