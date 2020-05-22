import React from "react";

const Blog: React.FC<{title: string}> = function({title, children}) {

    return  (
        <html>
            <head>
                <meta charSet="utf-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no"></meta>
                <link rel="stylesheet" href="../../../../assets/default.css"/>
                <link rel="stylesheet" href="../../../../assets/markdown.css"/>
            </head>
            <body>
                <header className="site-header">
                    <div className="wrapper">
                        <nav className="site-nav">
                            <div className="trigger">
                                <a className="page-link" href="../../../../">blog</a>
                                <a className="page-link" href="../../../../about.html">about</a>
                            </div>
                        </nav>
                    </div>
                </header>
                <div className="page-content">
                    <div className="wrapper">
                        <div className="post">
                            <header className="post-header">
                                <h1 className="post-title">{title}</h1>
                                <p></p>
                            </header>
                            <div className="articlebox">
                                <div className="markdown-body">{children}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer></footer>
            </body>
        </html>
        );
}
export default Blog;
