import React from "react";

const About: React.FC<{}> = function({}) {
    return (
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
                        <div className="post">
                            <header className="post-header">
                                <h1 className="post-title">about</h1>
                            </header>
                            <div className="post-content">
                                <br/>
                                <hr/>
                                <p><br/></p>
                                <p>Blockchain Entertainment Lab Developers Techblog.</p>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
                <footer></footer>
            </body>
        </html>
    );
}

export default About;