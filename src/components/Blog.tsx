import React from "react";

const Navbar: React.FC<{}> = function() {
    const linkStyle: React.CSSProperties = {
        color: "#505050",
        textDecoration: "none",
    }

    const navStyle: React.CSSProperties = {
        display: "table",
        marginTop: 40,
    }
    return (
        <div style={navStyle}>
            <h5 style={{display: "table-cell"}}>
                <a id="link-back" href="../" style={linkStyle}>돌아가기</a>
            </h5>
        </div>
    )
}

const Cover: React.FC<{title: string}> = function({title}) {
    const coverStyle: React.CSSProperties = {
        backgroundImage: "url(../assets/default_post_cover.jpg)",
        display:"table",
        height: 150,
        width: "100%",
        backgroundSize: "cover",
    }

    const coverAfter: React.CSSProperties = {
        display: "table-cell",
        position: "relative",
        verticalAlign: "middle",
        textAlign: "center",
        backgroundColor: "rgba(12,12,48, 0.3)",
        color: "white",
    }

    return (
    <div style={coverStyle}>
        <div style={coverAfter}>
            <h1>{title}</h1>
        </div>
    </div>);
}

const Blog: React.FC<{}> = function({children}) {
    const wrapperStyle: React.CSSProperties = {
        maxWidth: 940,
        marginLeft: "auto",
        marginRight: "auto",
    }

    return  (
        <html>
            <head>
                <meta charSet="utf-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no"></meta>
            </head>
            <body>
                <div style={wrapperStyle}>
                    <Navbar />
                    <Cover title={"This is Title"}/>
                    <div>{children}</div>
                </div>
            </body>
        </html>
        );
}
export default Blog;
