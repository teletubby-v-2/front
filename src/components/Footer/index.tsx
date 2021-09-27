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
            href="https://popcat.click/"
          >
            <TwitterOutlined className="align-text-top" />
            {'  '}Twitter
          </a>
          <br />
          <a
            className="text-white mb-1"
            href="https://www.facebook.com/groups/toptvfangroup/"
            target="_blank"
            rel="noreferrer"
          >
            <FacebookFilled className="align-text-top" />
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
            Privacy
          </a>
        </div>
        <div>
          <p className="font-bold mb-2">ช่วยเหลือ</p>
          <a className="text-white mb-1">ติดต่อเรา</a>
          <br />
          <a className="text-white mb-1">คำถามที่พบบ่อย</a>
        </div>
      </div>
    </div>
  )
}
