import React from 'react'
import ReactDOM from 'react-dom'
import './style/theme.less'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ConfigProvider } from 'antd'
import thTH from 'antd/lib/locale/th_TH'
import moment from 'moment'
import 'moment/locale/th'
import { BrowserRouter } from 'react-router-dom'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import 'react-lazy-load-image-component/src/effects/blur.css'

moment.locale('th')

ReactDOM.render(
  // <React.StrictMode>
  <ConfigProvider
    locale={thTH}
    form={{
      validateMessages: {
        required: 'กรุณากรอก${label}',
        types: {
          email: 'ไม่ใช่รูปแบบของอีเมลที่ถูกต้อง',
        },
      },
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>,
  // </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
