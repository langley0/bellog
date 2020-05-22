import React from "react";
import Post from "../Post";

const Header: React.FC<{name: string, email: string}> = function({ name, email }) {
    const headerStyle = {
        backgroundImage: "url(../assets/default_author_cover.jpg)",
        backgroundSize: "cover",
        width: "100%",
        height: "200px",
        display: "table",
        color: "white",
    }
    return (
        <div style={headerStyle}>
            <div style={{display: "table-cell", textAlign: "center", backgroundColor: "rgba(12, 12, 48, 0.3)",}}>
                <h1>{name}</h1>
                <p>{email}</p>
            </div>
        </div>
    );
}


const Content: React.FC<{posts: Post[]}> = function({ posts }) {

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

    return (
        <div>
            <ul style={listStyle}>
            {posts.map((page, index) => <li key={index} style={listItemStyle}>
                <a style={linkStyle} href={"./" + page.getPath().join("/") + "/"}>
                    <h3>{page.getTitle()}</h3>
                    <p style={postStyle}>{page.getDigest()}</p>
                </a>
                <div style={authorStyle}>
                    <a href="/authors/test" style={linkStyle}>
                        <div style={{backgroundImage: "url(./assets/authors/test-author.jpg)", ...authorImageStyle}}>
                        </div>
                        <p style={authorNameStyle}>{page.getAuthor().getName()}</p>
                    </a>
                </div>
            </li>)}
            </ul>
        </div>
    );
}


const Author: React.FC<{name: string, email: string, posts: Post[] }> = function({ name, email, posts}) {
    return <html>
        <head>
            <meta charSet="utf-8"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no"></meta>
        </head>
        <body>
            <Header name={name} email={email}/>
            <Content posts={posts}/>
        </body>
    </html>;
}

export default Author;