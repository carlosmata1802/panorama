import React from 'react';
import Link from 'next/link';
import Header from './../Header';


const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className="py-4 container">
                <div className="content">
                    <div className="row">
                        <div className="col-md-2">
                            <Link href="/"><a className="d-block"><i className="fas fa-list mr-2" aria-hidden="true"></i>Posts</a></Link>
                            <Link href="/users"><a className="d-block"><i className="fas fa-list mr-2" aria-hidden="true"></i>Users</a></Link>
                        </div>
                        <div className="col-md-10">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
            <style jsx-global="true">{`
                body {
                    background-color: #eaeaea; 
                }
                .blue {
                    color: #004896 !important;
                }
                .check {
                    width: 5%;
                    text-align: center; 
                }
                
                .field {
                    display: flex;
                    flex-flow: column-reverse;
                    margin-bottom: 1em;
                  }

                  label {
                      font-size: 13px;
                  }
    
                  label, input {
                    transition: all 0.2s;
                    touch-action: manipulation;
                  }
                  
                  input {
                    border: 0;
                    border-bottom: 1px solid #ccc;
                    font-family: inherit;
                    -webkit-appearance: none;
                    border-radius: 0;
                    padding: 0;
                    cursor: text;
                  }
                  
                  input:focus {
                    outline: 0;
                    border-bottom: 1px solid #666;
                  }
                  
                  input:placeholder-shown + label {
                    cursor: text;
                    max-width: 66.66%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    transform-origin: left bottom;
                    transform: translate(0, 2.125rem) scale(1.5);
                  }
                  ::-webkit-input-placeholder {
                    opacity: 0;
                    transition: inherit;
                  }

                  input:focus::-webkit-input-placeholder {
                    opacity: 1;
                  }

                  input:not(:placeholder-shown) + label,
                  input:focus + label {
                    transform: translate(0, 0) scale(1);
                    cursor: pointer;
                  }
                  .checked {
                    cursor: pointer;
                    width: 20px;
                    height: 20px;
                    border-radius: 4px;
                    border: 2px solid #a2a2a2;
                    margin: 2px auto;
                  
                }
                .col-md-10  {
                    padding: 0; 
                }
                .col-md-10 > div {
                    background-color: #fff; 
                    padding: 15px; 
                    border: 1px solid #eaeaea; 
                    border-radius: 10px; 
                    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)
                }
                  .col-md-10 .w-100 .row + .row{
                    padding: 10px 0;
                    border-bottom: 1px solid #eaeaea; 
                 }
                 .col-md-10 .w-100 .row + row p{
                    margin: 0;
                 }
                  .col-md-10 .w-100 .row + .row:hover {
                      padding: 10px 0;
                    background-color: #eaeaea;
                  }

                @media screen and (max-width: 767px) {
                    .col-md-10 {
                        margin: 15px;
                        overflow: scroll; 
                    }
                    .col-md-10 > div {
                        width: 850px !important; 
                    }
                }  
            `}</style>
        </>
    );
}

export default Layout
