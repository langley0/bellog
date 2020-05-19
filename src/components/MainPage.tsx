import React from "react";

const Header: React.FC<{}> = function() {
    const headerStyle = {
        backgroundImage: "url(/assets/default_blog_cover.jpg)",
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

const Content: React.FC<{pages: any[]}> = function({ pages }) {

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

    return (
        <div>
            <ul style={listStyle}>
            {pages.map((page, index) => <li key={index} style={listItemStyle}>
                <a style={linkStyle} href={`/${page.time.getFullYear()}-${page.time.getMonth().toString().padStart(2, "0")}-${page.time.getDate().toString().padStart(2, "0")}/${page.title}.html`}>
                    <h3>{page.title}</h3>
                    <p>{page.digest}</p>
                </a>
                <div style={authorStyle}>
                    <a href="/authors/test" style={linkStyle}>
                        <div style={{backgroundImage: "url(/assets/authors/test-author.jpg)", ...authorImageStyle}}>
                        </div>
                        <p style={authorNameStyle}>{page.author}</p>
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
        </head>
        <body>
            <Header />
            <Content pages={pages}/>
        </body>
    </html>
    );
    
}

export default MainPage;