import React from "react";
import Post from "../Post";

const MainPage: React.FC<{posts: Post[]}> = function({ posts }) {
    return  (
    <html>
        <head>
            <meta charSet="utf-8"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no"></meta>
            <link rel="stylesheet" href="./assets/default.css"/>
        </head>
        <body>
            <header className="site-header">
                <div className="wrapper">
                    <nav className="site-nav">
                        <div className="trigger">
                            <a className="page-link" href="./">blog</a>
                            <a className="page-link" href="./about.html">about</a>
                        </div>
                    </nav>
                </div>
            </header>
            <div className="page-content">
                <div className="wrapper">
                    <div className="header-bar">
                        <h1>tech blog</h1>
                        <h2>bel/developers</h2>
                        <br/>
                        <hr/>
                        <br/>
                    </div>
                    <ul className="post-list">
                        {posts.map((post,index) => {
                            const postUrl = "./" + post.getPath().join("/") + "/";
                            return <li key={index}>
                                <h2>
                                    <a className="post-title" href={postUrl}>{post.getTitle()}</a>
                                </h2>
                                <p className="post-meta">
                                    {post.getTimestring()}
                                    <a href={`/authors/${post.getAuthor().getId()}.html`}>
                                        {"  " + post.getAuthor().getName()}
                                    </a>
                                </p>
                                <p></p>
                                <p> 
                                    {post.getDigest()}
                                    <a href={postUrl}>More...</a>
                                </p>
                                <br/>
                                <hr/>
                            </li>;
                        })}
                    </ul>
                </div>
            </div>
            <footer></footer>
        </body>
    </html>
    );
}

export default MainPage;