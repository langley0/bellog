import React from "react";
import Post from "../Post";
import HeadStyle from "./HeaderStyle";

const Header: React.FC<{}> = function() {
    const headerStyle = {
        backgroundImage: "url(./assets/default_blog_cover.jpg)",
        backgroundSize: "cover",
        width: "100%",
        height: "200px",
        display: "table",
        color: "white",
    }
    return (
        <div style={headerStyle}>
            <div style={{display: "table-cell", textAlign: "center", backgroundColor: "rgba(12, 12, 48, 0.3)",}}>
                <h1>BEL 기술 블로그</h1>
                <p>
                    Beyond Game ~ BEL 기술 블로그입니다
                </p>
            </div>
        </div>
    );
}

const Content: React.FC<{pages: Post[]}> = function({ pages }) {

    const listStyle = {
        listStyle: "none",
    }

    const listItemStyle: React.CSSProperties = {
        margin: "0 40px",
        padding: "50px 0 50px 40px",
        borderBottom: "1px solid #e6e6e6",
        position: "relative"
    }

    const linkStyle = {
        textDecoration: "none",
        color: "#1e1e1e",
    };

    const authorStyle: React.CSSProperties = {
        position: "absolute",
        top: 63,
        right: 0,
        width: 140,
    };

    const authorImageStyle: React.CSSProperties = {
        display: "block",
        width: 60,
        height: 60,
        margin: "0 auto",
        borderRadius: "100%",
        backgroundSize: "cover",
    }

    const authorNameStyle: React.CSSProperties = {
        margin: "12px 0 0 0",
        fontSize: 14,
        color: "#1e1e1e",
        textAlign: "center",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
    }

    const postStyle: React.CSSProperties = {
        marginTop: 22,
        marginRight: 160,
        overflow: "hidden"
    }

    const contentStyle: React.CSSProperties = {
        maxWidth: 940,
        marginLeft: "auto",
        marginRight: "auto",
        paddingRight: 5,
        paddingLeft: 5,
        backgroundColor: "#fff"
    }

    return (
        <div style={contentStyle}>
            <ul style={listStyle}>
            {pages.map((post, index) => <li key={index} style={listItemStyle}>
                <a style={linkStyle} href={"./" + post.getTargets().join("/") + "/" + post.getName() + ".html"}>
                    <h3>{post.getTitle()}</h3>
                    <p style={postStyle}>{post.getDigest()}</p>
                </a>
                <div style={authorStyle}>
                    <a href={`/authors/${post.getAuthor().getId()}.html`} style={linkStyle}>
                        <div style={{backgroundImage: "url(./assets/authors/test-author.jpg)", ...authorImageStyle}}>
                        </div>
                        <p style={authorNameStyle}>{post.getAuthor().getName()}</p>
                    </a>
                </div>
            </li>)}
            </ul>
        </div>
    );
}



const MainPage: React.FC<{pages: any[]}> = function({ pages }) {
    return  (
    <html>
        <head>
            <meta charSet="utf-8"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no"></meta>
            <HeadStyle />
            <link rel="stylesheet" href="./assets/markdown.css"/>
        </head>
        <body>
            <div style={{backgroundColor: "#f4f4f4", minHeight: "100%", overflow: "hidden"}}>
                <Header />
                <Content pages={pages}/>
            </div>
        </body>
    </html>
    );
}

export default MainPage;