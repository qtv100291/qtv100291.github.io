import React, { Component } from 'react';
import './BlogArticle.scss';
import addfunc from '../ultis/additionalFunction';
import calendar from '../assets/blog/calendar-1.png';
import pen from '../assets/blog/pen-1.png';
import BreadCrumb from './common/breadCrumb';
import additionalFunctionDom from '../ultis/additionalFunctionDom';
import { getArticle } from '../services/articleService';
import articlePreprocessor from '../ultis/articlePreprocessor';

class BlogArticle extends Component {
    state = { 
        article: {}
     }
    async componentDidMount() {
        const articleId = addfunc.getAlbumId(this.props.location.pathname);
        const { data : article } = await getArticle(articleId);
        this.setState({ article })
        window.scrollTo(0, 0);
    }
    render() { 
        return ( 
            <main className="blog-detail">
                <BreadCrumb titleParent="Blog" title={this.state.article.title}/>
                <section className="section-article-content">
                    {Object.keys(this.state.article).length !== 0 && articlePreprocessor(this.state.article)}
                </section>
            </main>
         );
    }
}
 
export default BlogArticle;