import React, {  useEffect } from 'react';
import './PurchaseGuidance.scss';
import BreadCrumb from './common/breadCrumb';


const ServicePolicy = () => {
    useEffect(() => {
        document.title = "Điều Khoản Dịch Vụ";
        window.scrollTo(0,0)
    })
    return ( 
        <main className="purchase-guidance">
            <BreadCrumb titleParent="Điều Khoản Dịch Vụ"/>
            <section className="content-section">
                <div className="article-part">
                    <h2 className="article-title">ĐIỀU KHOẢN DỊCH VỤ</h2>
                    <div className="item-policy">
                        <h3 className="head-title-policy">1. QUY ĐỊNH CHUNG</h3>
                        <p className="content-text">Điều khoản Sử dụng quy định các điều khoản ràng buộc bạn khi sử dụng các Dịch vụ. Thuật ngữ “Bạn” và/hoặc “Người sử dụng” sau đây được gọi chung để chỉ tới những người sử dụng các Dịch vụ. Vui lòng nghiên cứu kỹ và lưu lại một bản Điều khoản Sử dụng này.</p>
                        <p className="content-text">Bằng việc ghé thăm website của QTV Music và sử dụng các Dịch vụ, Bạn đồng ý bị ràng buộc với Điều khoản Sử dụng này, Chính sách Quảng cáo và Chính sách Bảo mật của chúng tôi.</p>
                        <p className="content-text">Chúng tôi thực hiện Điều khoản Sử dụng này, Chính sách Quảng cáo và Chính sách bảo mật theo quy định của pháp luật hiện hành và không nội dung nào trong các tài liệu trên cản trở quyền của chúng tôi tuân thủ các quy định hoặc yêu cầu của chính phủ, tòa án, cơ quan thi hành án liên quan đến việc Bạn sử dụng các Dịch vụ hoặc thông tin do chúng tôi nhận được hoặc thu được từ việc sử dụng các Dịch vụ của Bạn.</p>
                    </div>
                    <div className="item-policy">
                        <h3 className="head-title-policy">2. TỪ CHỐI BẢO ĐẢM</h3>
                        <p className="content-text">Chúng tôi không chịu trách nhiệm đối với bất kỳ sự mất mát dữ liệu, tổn thất lợi ích nào hoặc các vấn đề khác liên quan đến việc truy cập website của QTV Music và sử dụng các Dịch vụ, bao gồm nhưng không giới hạn đến tất cả các thông tin, dữ liệu, văn bản, phần mềm, âm nhạc, âm thanh, hình ảnh, đồ họa, video, thông điệp hoặc các nguyên liệu khác (“Nội dung”) mà Bạn có thể lưu giữ, đưa lên, hoặc truyền tải thông qua Dịch vụ. Bạn đồng ý sử dụng các Dịch vụ với tất cả sự rủi ro.</p>
                    </div>
                    <div className="item-policy">
                        <h3 className="head-title-policy">3. THAY ĐỔI ĐIỀU KHOẢN SỬ DỤNG</h3>
                        <p className="content-text">Chúng tôi giữ quyền thay đổi và/hoặc sửa đổi mà không cần báo trước bất kỳ điều khoản nào trong Điều khoản Sử dụng này tùy từng thời điểm. Những sự thay đổi và/hoặc sửa đổi như vậy sẽ có hiệu lực ngay khi đăng lên website của QTV Music. Nếu Bạn tiếp tục truy cập của QTV Music hoặc sử dụng các Dịch vụ sau khi các thay đổi và/hoặc sửa đổi được đăng lên, Bạn đã chấp nhận và đồng ý với các thay đổi và/hoặc sửa đổi đó.</p>
                    </div>
                    <div className="item-policy">
                        <h3 className="head-title-policy">4. QUY ĐỊNH SỬ DỤNG DỊCH VỤ</h3>
                        <p className="content-text">Khi sử dụng Dịch vụ của chúng tôi, bên cạnh việc phải ký hợp đồng dịch vụ theo mẫu do chúng tôi ban hành, Bạn còn bị ràng buộc phải chấp thuận và tuân thủ các điều kiện quy định dưới đây :</p>
                        <p className="content-text"> – Thanh toán phí dịch vụ theo thỏa thuận.</p>
                        <p className="content-text"> – Tuân thủ quy định của pháp luật.</p>
                        <p className="content-text"> – Các tranh chấp xảy ra nếu có do hai bên thỏa thuận giải quyết trên cơ sở hợp tác và thỏa thuận.</p>
                    </div>
                    <div className="item-policy">
                        <h3 className="head-title-policy">5. QUY ĐỊNH VỀ ĐĂNG KÝ, SỬ DỤNG TÀI KHOẢN VÀ THANH TOÁN PHÍ DỊCH VỤ</h3>
                        <p className="content-text">Chúng tôi cung cấp các Dịch vụ cho Bạn hoàn toàn thông qua hệ thống trực tuyến của Website của QTV Music từ khi Bạn bắt đầu đăng ký tài khoản, lựa chọn dịch vụ cũng như tiến hành thanh toán phí dịch vụ mà Bạn sử dụng Dịch vụ của Chúng tôi.</p>
                        <p className="content-text">Bạn xác nhận và đồng ý rằng Bạn đã nghiên cứu kỹ càng và sẽ tuân thủ đầy đủ các quy định về đăng ký tài khoản, phương thức tính phí và thanh toán chi phí được đăng trên Website của QTV Music của chúng tôi (“Quy định về Đăng ký và Sử dụng Dịch vụ”). Bằng việc Bạn xác nhận hoàn thành thủ tục đăng ký tài khoản trên website của QTV Music, Bạn đã chấp nhận bị ràng buộc thực hiện đối với các Quy định về Đăng ký và Sử dụng Dịch vụ như vậy khi Bạn sử dụng các Dịch vụ.</p>
                        <p className="content-text">Chúng tôi luôn thay đổi và/hoặc sửa đổi nội dung Điều khoản Sử dụng này cũng như các Quy định về Đăng ký và Sử dụng Dịch vụ với mục đích hoàn thiện tốt nhất nội dung các quy định và đáp ứng tối đa sự tiện dụng và hiệu quả khi Bạn sử dụng các Dịch vụ cũng như đảm bảo nâng cao lợi ích của Chúng tôi khi cung cấp các Dịch vụ.</p>
                        <p className="content-text">Chúng tôi giữ quyền nhưng không có nghĩa vụ thông báo tới Bạn đối với bất kỳ sự thay đổi và/hoặc sửa đổi các Quy định về Đăng ký và Sử dụng Dịch vụ. Những sự thay đổi và/hoặc sửa đổi như vậy sẽ có hiệu lực ngay khi đăng lên Website của QTV Music. Nếu Bạn tiếp tục sử dụng các Dịch vụ sau khi các thay đổi và/hoặc sửa đổi được đăng lên, Bạn đã chấp nhận và đồng ý với các thay đổi và/hoặc sửa đổi đó. Chúng tôi khuyến nghị Bạn thường xuyên kiểm tra trên Website của QTV Music và liên hệ với nhân viên hỗ trợ của Chúng tôi để có được bản cập nhật các Quy định về Đăng ký và Sử dụng Dịch vụ mới nhất.</p>
                    </div>
                    <div className="item-policy">
                        <h3 className="head-title-policy">6. GIỚI HẠN TRÁCH NHIỆM</h3>
                        <p className="content-text">Bạn xác nhận và đồng ý rằng chúng tôi chỉ sẵn sàng cung cấp các Dịch vụ nếu Bạn đồng ý giới hạn trách nhiệm của chúng tôi đối với Bạn và các bên thứ ba. Bạn đồng ý rằng Bạn chịu trách nhiệm bồi thường duy nhất và toàn bộ đối với bất kỳ khiếu nại, khiếu kiện nào tới chúng tôi liên quan đến bất kỳ sự vi phạm quy định sử dụng nào do việc Bạn sử dụng các Dịch vụ hoặc ngừng sử dụng Dịch vụ của chúng tôi.</p>
                        <p className="content-text">Bạn đồng ý tự chịu trách nhiệm với các nội dung và thông tin cung cấp cho chúng tôi</p>
                        <p className="content-text">Bạn đồng ý bảo vệ, bồi thường và giữ cho chúng tôi và các công ty liên kết của chúng tôi và mỗi nhân viên, giám đốc, người lao động, đại lý, đại diện, người cung cấp thông tin và bên cấp phép của chúng tôi không bị tổn hại bởi bất kỳ khiếu nại, khiếu kiện, chi phí, tổn thất, thiệt hại, phán quyết của tòa án và phí tổn nào, bao gồm nhưng không giới hạn phí luật sư, phí bồi thường thiệt hại, chi phí tố tụng, lãi chậm trả liên quan đến hoặc phát sinh từ bất kỳ khiếu nại, mâu thuẫn, tranh chấp, thủ tục tố tụng pháp lý tại Tòa án hoặc các tổ chức Trọng tài, tổ chức Hòa giải, các quyết định của cơ quan Nhà nước có thẩm quyền … liên quan đến hoặc phát sinh từ các sản phẩm và dịch vụ. Chúng tôi giữ quyền, bằng chi phí của mình, đảm nhận hoàn toàn việc bảo vệ và kiểm soát (nhưng không có trách nhiệm) đối với bất kỳ vấn đề nào phát sinh như vậy tùy thuộc vào sự bồi thường của Bạn.</p>
                    </div>
                    <div className="item-policy">
                        <h3 className="head-title-policy">7. BẢO VỆ BẢN QUYỀN VÀ QUYỀN SỞ HỮU TRÍ TUỆ KHÁC VỚI CÁC SẢN PHẨM VÀ DỊCH VỤ CỦA CHÚNG TÔI</h3>
                        <p className="content-text">Các Dịch vụ, và tất cả các phần mềm cần thiết, nguyên liệu cấu thành của Dịch vụ và khai thác, triển khai Dịch vụ, và bao gồm cả các quyền sở hữu trí tuệ đối với các Dịch vụ và sản phẩm của chúng tôi, và tất cả các phần mềm cần thiết, nguyên liệu cấu thành của Dịch vụ (“Sở hữu Trí tuệ”), được bảo vệ bởi bản quyền, quyền về thương hiệu, nhãn dịch vụ, hoặc quyền tài sản khác do chúng tôi sở hữu hoặc được sở hữu bởi bên thứ ba nào mà đã cấp quyền sở hữu trí tuệ cho chúng tôi. Bạn không được quyền sử dụng bất kỳ tên thương mại, nhãn hiệu của hàng hóa và dịch vụ, biểu tượng, tên miền và các hình thức nhận diện hàng hóa, dịch vụ đặc trưng nào khác của chúng tôi vào mục đích thương mại trừ khi Bạn được sự chấp thuận bằng văn bản của chúng tôi, hoặc việc sử dụng của Bạn gây ảnh hưởng, cản trở, tác động xấu tới việc hoạt động bình thường của các sản phẩm và dịch vụ, uy tín của chúng tôi.</p>
                        <p className="content-text">Chúng tôi tôn trọng quyền sở hữu trí tuệ của người khác và yêu cầu Người sử dụng các Dịch vụ cũng như vậy. Bạn không được tải lên, gắn vào, đăng lên, truyền đi hoặc bằng cách khác tạo sẵn bất kỳ nguyên liệu cấu thành nào gây ảnh hưởng đến bất kỳ quyền sở hữu trí tuệ về bản quyền, thương hiệu, bí mật thương mại hoặc quyền tài sản khác của bất kỳ tổ chức hoặc cá nhân nào. Chúng tôi có quyền chấm dứt đường truy cập vào các Dịch vụ hoặc bất kỳ dịch vụ nào khác do chúng tôi cung cấp đối với người bị nghi ngờ xâm phạm.</p>
                    </div>
                    <div className="item-policy">
                        <h3 className="head-title-policy">8. CHÍNH SÁCH BẢO MẬT VÀ THU THẬP THÔNG TIN CÁ NHÂN</h3>
                        <p className="content-text">QTV Music thu thập thông tin cá nhân của khách hàng với mục đích phục vụ cho việc chăm sóc sau khi mua hàng và trao đổi thông tin khi cần thiết. QTV Music thu thập thông tin thông qua giao dịch mua hàng, tham gia chương trình khuyến mại, góp ý khách hàng, đăng kí tài khoản website...</p>
                        <p className="content-text">QTV Music thu thập và sử dụng thông tin cá nhân của khách hàng với mục đích phù hợp và hoàn toàn tuân thủ nội dung của “Chính sách bảo mật” này. Khi cần thiết, chúng tôi có thể sử dụng những thông tin này để liên hệ trực tiếp với khách hàng dưới các hình thức như: gửi thư ngỏ, đơn đặt hàng, thư cảm ơn, chăm sóc khách hàng, thông tin về kỹ thuật và bảo mật…</p>
                        <p className="content-text">Dữ liệu cá nhân của khách hàng sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự khách hàng đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân thành viên sẽ được bảo mật trên máy chủ của QTV Music.</p>
                        <p className="content-text">Trong trường hợp thông tin cá nhân của khách hàng được sử dụng sai mục đích hoặc vi phạm đã thông báo khách hàng có thể gửi khiếu nại của mình đến QTV Music qua các hình thức để được giải quyết.</p>
                        <p className="content-text">Khách hàng nên cung cấp thông tin đầy đủ (tên, địa chỉ, số điện thoại, email) khi tham gia mua hàng của QTV Music để chúng tôi có thể liên hệ nhanh lại với bạn trong trường hợp xảy ra lỗi.</p>
                        <p className="content-text">Trong trường hợp giao dịch nhận hàng tại nhà của người mua, thì người mua chỉ nên thanh toán sau khi đã kiểm tra hàng hoá chi tiết và hài lòng với sản phẩm.</p>
                        <p className="content-text">Khi thanh toán trực tuyến bằng thẻ ATM nội địa, Visa, Master người mua nên tự mình thực hiện và không được để lộ thông tin thẻ. QTV Music không lưu trữ thông tin thẻ của người mua sau khi thanh toán, mà thông qua hệ thống của ngân hàng liên kết. Nên tuyệt đối bảo mật thông tin thẻ cho khách hàng..</p>
                    </div>
                </div>
            </section>
        </main>
     );
}
 
export default ServicePolicy;