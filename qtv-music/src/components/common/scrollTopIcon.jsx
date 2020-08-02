import React, {Component} from 'react';
import scrollTopIcon from '../../assets/homepage-assets/up-arrow.svg';
import './scrollTopIcon.scss';

class ScrollTopIcon extends Component {
    state = {
        isDisplaying : false
    }

    componentDidMount() {
        window.onscroll = () =>{
            if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
                this.setState({ isDisplaying : true })
            }
            else {
                this.setState ( { isDisplaying : false });
                setTimeout(() => document.documentElement.classList.remove('on-top'),200)
            }
        }
    }

    handleScrollToTop = () => {
        document.documentElement.classList.add('on-top');
        setTimeout(() => window.scrollTo(0,0),100);
    }

    render() { 
        return ( 
        <div className={this.state.isDisplaying ? "scroll-top-icon" : "scroll-top-icon on-top"}
            onClick={this.handleScrollToTop}>
            <div className="scroll-top-icon-container d-flex justify-content-center align-items-center">
                <img src={scrollTopIcon} alt="icon"/>
            </div>
        </div> 
    );
    }
}

export default ScrollTopIcon;