import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router'
import { SVG_URL } from '../../constants'
import ScrollToTop from '../../components/ScrollToTop'

export const AboutUS: React.FC = () => {
  const history = useHistory()
  return (
    <div className="paper">
      <ScrollToTop />
      <ArrowLeftOutlined
        onClick={() => history.goBack()}
        className="mr-3 ant-page-header-back-button absolute top-8 left-6"
      />
      <h1 className="font-bold text-center">About us</h1>
      <h2>เราคือใคร?</h2>
      <p className="ml-5">
        KU share คือ แพลตฟอร์มที่สามารถให้ผู้คนเข้ามาแลกเปลี่ยนความ คิดเห็นในการเรียนและ
        มาแชร์เอกสารสรุปของวิชาต่าง ๆ ของตนเองโดยไม่มีค่าใช้จ่ายใด ๆ ทั้งสิ้น
      </p>
      <br />
      <h2>KU share คืออะไร?</h2>
      <p className="ml-5">
        KU share คือ แพลตฟอร์มที่สามารถให้ผู้คนเข้ามาแลกเปลี่ยนความ คิดเห็นในการเรียนและ
        มาแชร์เอกสารสรุปของวิชาต่าง ๆ ของตนเองโดยไม่มีค่าใช้จ่ายใด ๆ ทั้งสิ้น
      </p>
      <br />
      <h2>เหตุผลว่าทำไมคุณควรจะใช้บริการของเรา</h2>
      <div className="text-center space-y-5">
        <p className="font-bold">เนื้อหาที่มีคุณภาพ</p>
        <img src={SVG_URL.GOOD_QUALITY} alt="" width="240px" height="240px" />
        <p className="font-bold">
          ผู้ใช้งานส่วนใหญ่มีการใช้อีเมล @ku.th
          ซึ่งถือว่าเป็นการการันตีได้ว่าผู้ใช้งานมีตัวตนอยู่จริง
        </p>
        <img src={SVG_URL.MONITOR} alt="" width="240px" height="240px" />
        <p className="font-bold">มีความง่ายในการใช้งานระบบ</p>
        <img src={SVG_URL.EASY_TO_USE} alt="" width="240px" height="240px" />
        <p className="font-bold">มี user interface ที่มีความสวยงาม</p>
        <img src={SVG_URL.USER_INTERFACE} alt="" width="240px" height="240px" />
        <p className="font-bold">ไม่ต้องเสียค่าใช้จ่ายใดๆทั้งสิ้นในการใช้งาน</p>
        <img src={SVG_URL.MONEY} alt="" width="240px" height="240px" />
      </div>
    </div>
  )
}
