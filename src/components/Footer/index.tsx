import React from 'react'
import { FacebookFilled, TwitterOutlined } from '@ant-design/icons'

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
          <a className="text-white mb-1">เกี่ยวกับเรา</a>
          <br />
          <a
            className="text-white mb-1"
            href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nonburee.go.th%2F%3Fcat%3D217&psig=AOvVaw2uy8Qs_EH2vyfpYT628ZNE&ust=1630325096852000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLCo8LOY1vICFQAAAAAdAAAAABAb"
            target="_blank"
            rel="noreferrer"
          >
            ความปลอดภัย
          </a>
        </div>
        <div>
          <p className="font-semibold mb-2">Help</p>
          <a className="text-white mb-1">ติดต่อเรา</a>
          <br />
          <a className="text-white mb-1">คำถามที่พบบ่อย</a>
        </div>
      </div>
    </div>
  )
}
