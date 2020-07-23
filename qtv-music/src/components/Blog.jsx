import React, { useEffect } from 'react';
import './Blog.scss';
import { Link } from 'react-router-dom';
import item1 from '../assets/blog/Chester-Bennington.jpg';
import item2 from '../assets/blog/finland.jpeg';
import item3 from '../assets/blog/hac-san-1.jpg';
import item4 from '../assets/blog/thrash-metal.jpg';
import calendar from '../assets/blog/calendar-1.png';
import pen from '../assets/blog/pen-1.png';
import BreadCrumb from './common/breadCrumb';

const Blog = () => {
    const title_1 = "Nhìn Lại Cuộc Đời Và Sự Nghiệp Của Chester Bennington";
    const title_2 = "Đô Thị Phần Lan Trong Cuộc Đua Giành Ngôi Vị Thủ Đô Metal";
    const title_3 = "Ban Nhạc Hạc San Ra Mắt Album Hồn Trăng Máu";
    const title_4 = "Những Điều Thú Vị Về Tứ Trụ Thrash Metal";

    useEffect(() => {
        document.title = "Blog";
        window.scrollTo(0, 0);
    })

    return ( 
        <main className="blog-section">
            <BreadCrumb titleParent="Blog"/>
            <section className="article-section">
                <div className="article-item d-flex justify-content-between flex-row-reverse">
                    <div className="article-item-photo">
                        <div className="article-item-photo-container">
                            <img src={item1} alt="chester-bennington"/>
                        </div>
                    </div>
                    <div className="article-description">
                        <h2 className="article-description-title">Nhìn Lại Cuộc Đời Và Sự Nghiệp Của Chester Bennington</h2>
                        <div className="article-description-info d-flex">
                            <div className="article-item-date d-flex justify-content-between align-items-center">
                                <img src={calendar} alt="lịch"/>
                                <p>20 Tháng 07, 2020</p>
                            </div>
                            <div className="article-item-author d-flex justify-content-between align-items-center">
                                <img src={pen} alt="tác giả"/>
                                <p>Admin</p>
                            </div>
                        </div>
                        <div className="article-description-summary">
                            <p>Ngày 20 tháng 07 năm 2017 , Chester Bennington chấm dứt cuộc đời của mình bằng cách treo cổ tự tử,  để lại sự nuối tiếc và đau buồn trong lòng các fan hâm mộ của ban nhạc LinKin Park. Hãy cùng QTV Music điểm lại những sự kiện tiêu biểu trong cuộc đời thành công nhưng cũng ẩn chứa rất nhiều góc khuất của giọng ca Nu metal này.</p>
                        </div>
                        <Link to={`/blog/${title_1.split(" ").join("-")}-1`}>
                        <div className="button-access-article d-flex justify-content-center align-items-center">Đọc Tiếp</div>
                        </Link>               
                    </div>
                </div>
                <div className="article-item d-flex justify-content-between">
                    <div className="article-item-photo">
                        <div className="article-item-photo-container">
                            <img src={item2} alt="Metal"/>
                        </div>
                    </div>
                    <div className="article-description">
                        <h2 className="article-description-title">Đô Thị Phần Lan Trong Cuộc Đua Giành Ngôi Vị Thủ Đô Metal</h2>
                        <div className="article-description-info d-flex">
                            <div className="article-item-date d-flex justify-content-between align-items-center">
                                <img src={calendar} alt="lịch"/>
                                <p>02 Tháng 07, 2020</p>
                            </div>
                            <div className="article-item-author d-flex justify-content-between align-items-center">
                                <img src={pen} alt="tác giả"/>
                                <p>Admin</p>
                            </div>
                        </div>
                        <div className="article-description-summary">
                            <p>Với số lượng ban nhạc chơi heavy metal trên đầu người nhiều hơn bất cứ nơi nào khác trên thế giới, Phần Lan đang nằm tại tâm điểm của cộng đồng metal trên khắp toàn cầu. Chúng ta cùng xem cách người ta xác định thành phố nào của Phần Lan đạt danh hiệu thủ đô Metal.</p>
                        </div>
                        <Link to={`/blog/${title_2.split(" ").join("-")}-2`}>
                        <div className="button-access-article d-flex justify-content-center align-items-center">Đọc Tiếp</div>
                        </Link>               
                    </div>
                </div>
                <div className="article-item d-flex justify-content-between flex-row-reverse">
                    <div className="article-item-photo">
                        <div className="article-item-photo-container">
                            <img src={item3} alt="Hac San"/>
                        </div>
                    </div>
                    <div className="article-description">
                        <h2 className="article-description-title">Ban Nhạc Hạc San ra mắt album “Hồn – Trăng – Máu”</h2>
                        <div className="article-description-info d-flex">
                            <div className="article-item-date d-flex justify-content-between align-items-center">
                                <img src={calendar} alt="lịch"/>
                                <p>25 Tháng 06, 2020</p>
                            </div>
                            <div className="article-item-author d-flex justify-content-between align-items-center">
                                <img src={pen} alt="tác giả"/>
                                <p>Admin</p>
                            </div>
                        </div>
                        <div className="article-description-summary">
                            <p>Sau 5 năm kể từ album đầu tay “Sét Đánh Ngang Trời”, Hạc San mới quay trở lại cùng album mới “Hồn - Trăng - Máu”, lấy cảm hứng từ cuộc đời thi sĩ nổi tiếng Hàn Mặc Tử, là người khởi đầu cho dòng thơ lãng mạn của Việt Nam những năm đầu thế kỉ 20.</p>
                        </div>
                        <Link to={`/blog/${title_3.split(" ").join("-")}-3`}>
                        <div className="button-access-article d-flex justify-content-center align-items-center">Đọc Tiếp</div>
                        </Link>               
                    </div>
                </div>
                <div className="article-item d-flex justify-content-between">
                    <div className="article-item-photo">
                        <div className="article-item-photo-container">
                            <img src={item4} alt="Thrash Metal"/>
                        </div>
                    </div>
                    <div className="article-description">
                        <h2 className="article-description-title">Những Điều Thú Vị Về “Tứ Trụ Thrash Metal”</h2>
                        <div className="article-description-info d-flex">
                            <div className="article-item-date d-flex justify-content-between align-items-center">
                                <img src={calendar} alt="lịch"/>
                                <p>08 Tháng 06, 2020</p>
                            </div>
                            <div className="article-item-author d-flex justify-content-between align-items-center">
                                <img src={pen} alt="tác giả"/>
                                <p>Admin</p>
                            </div>
                        </div>
                        <div className="article-description-summary">
                            <p>Chắc hẳn mọi người đã quá quen thuộc với 4 “ông tướng” trong làng Thrash Metal: Metallica, Slayer, Megadeth và Anthrax, họ là những band đi đầu trong dòng nhạc Thrash và đã khẳng định được vị thế của mình từ những năm 80 cho đến tận ngày hôm nay.</p>
                        </div>
                        <Link to={`/blog/${title_4.split(" ").join("-")}-4`}>
                        <div className="button-access-article d-flex justify-content-center align-items-center">Đọc Tiếp</div>
                        </Link>               
                    </div>
                </div>
            </section>
        </main>
     );
}
 
export default Blog;