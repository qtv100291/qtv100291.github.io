import ReactHtmlParser from 'react-html-parser'

export default function articlePreprocessor(article) { 
    let output = `<h2 class="title-article">${article.title}</h2>`
    let outputPart;
    for (let element of article.content ){
        const elementArray = element.split(" --- ");
        switch (elementArray[0]){
            case "date and author":
                outputPart = `<div class="article-description-info d-flex">
                                    <div class="article-item-date d-flex justify-content-between align-items-center">
                                        <img src="/Blog/calendar-1.png" alt="lịch"/>
                                        <p>${elementArray[1]}</p>
                                    </div>
                                    <div class="article-item-author d-flex justify-content-between align-items-center">
                                        <img src="/Blog/pen-1.png" alt="tác giả"/>
                                        <p>${elementArray[2]}</p>
                                    </div>
                              </div>`
                break;

            case "headerFig":
                outputPart = `<figure class ="article-header-photo">
                                    <img src=${elementArray[2]} alt =${elementArray[3]}/>
                                    <figcaption>${elementArray[4]}</figcaption>
                            </figure>`
                break;

            case "fig":
            outputPart = `<figure class ="article-photo">
                                <img src=${elementArray[2]} alt =${elementArray[3]}/>
                                <figcaption>${elementArray[4]}</figcaption>
                        </figure>`
                break;

            case "intro":
                outputPart = `<p class="article-header-intro">${elementArray[1]}</p>`;
                break;

            case "para":
                outputPart = `<p class="article-paragraph">${elementArray[1]}</p>`;
                break;

            case "paraTitle":
                outputPart = `<h3 class="article-title-part">${elementArray[1]}</h3>`;
                break;

            case "YTVid":
                outputPart = `<div class="youtube-video-part">
                                    <iframe src=${elementArray[2]} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                                    <p>${elementArray[3]}</p>
                                </div>`;
                break;    
            default :
                break;
            
        }
        output += outputPart;
    }

    return ReactHtmlParser(output);
}

