import React from 'react'
import { FacebookFilled, TwitterOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export const Footer: React.FC = () => {
  return (
    <div className="m-auto text-center text-white ">
      <p className="text-xl mb-4 font-bold">- KU Share -</p>
      <div className="flex justify-center space-x-14">
        <div>
          <p className="font-bold mb-2">Social</p>
          <a
            target="_blank"
            rel="noreferrer"
            className="text-white  mb-1"
            href="https://twitter.com/TbKushare"
          >
            <TwitterOutlined />
            {'  '}Twitter
          </a>
          <br />
          <a
            className="text-white mb-1"
            href="https://www.facebook.com/KU-Share-แบ่งปันชีทสรุป-มหาวิทยาลัยเกษตรศาสตร์-102240268914567"
            target="_blank"
            rel="noreferrer"
          >
            <FacebookFilled />
            {'  '}Facebook
          </a>
        </div>
        <div>
          <p className="font-bold mb-2">Resources</p>
          <Link className="text-white mb-1" to="/AboutUS">
            เกี่ยวกับเรา
          </Link>
          <br />
          <a
            className="text-white mb-1"
            href="https://www.termsfeed.com/live/f9921a77-cd54-41da-8f6d-14e98e05f604"
            target="_blank"
            rel="noreferrer"
          >
            ความปลอดภัย
          </a>
        </div>
        <div>
          <p className="font-semibold mb-2">Help</p>
          <a
            className="text-white mb-1"
            href="https://forms.gle/DpMVAvsRm1BH3aLM7"
            target="_blank"
            rel="noreferrer"
          >
            ติดต่อเรา
          </a>
          <br />
          <Link to="/faq" className="text-white mb-1">
            คำถามที่พบบ่อย
          </Link>
        </div>
      </div>
    </div>
  )
}
