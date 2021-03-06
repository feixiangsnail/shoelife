import React from 'react'
import { browserHistory } from 'react-router'

const goBack = (e) => {
  e.preventDefault()
  return browserHistory.goBack()
}

export const NotFound = () => (
  <div className="page-error page-error-404 layout-full">
        <div className="page animsition vertical-align text-center" data-animsition-in="fade-in" data-animsition-out="fade-out">
          <div className="page-content vertical-align-middle">
            <header>
              <h1 className="animation-slide-top">404</h1>
              <p>页面没有找到!</p>
            </header>
            <p className="error-advise">请检查页面访问地址！</p>
            <a className="btn btn-primary btn-round" href="#"  onClick={goBack}>GO BACK</a>
            <footer className="page-copyright">
              <p>WEBSITE BY WANG</p>
              <p>© 2016. All RIGHT RESERVED.</p>
            </footer>
          </div>
        </div>
      </div>

)

export default NotFound
