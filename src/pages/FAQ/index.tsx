import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Collapse } from 'antd'
import { useHistory } from 'react-router-dom'
import ScrollToTop from '../../components/ScrollToTop'

export const FAQ: React.FC = () => {
  const { Panel } = Collapse
  const history = useHistory()
  return (
    <div className="space-y-7 paper">
      <ScrollToTop />
      <div className="flex justify-between">
        <ArrowLeftOutlined
          onClick={() => history.goBack()}
          className="mr-3 mt-3 ant-page-header-back-button w-10"
        />
        <div className="text-3xl font-black ">คำถามที่พบบ่อย FAQ</div>
        <div className="w-10" />
      </div>

      <Collapse defaultActiveKey={['1', '2', '3', '4']} expandIconPosition="right">
        <Panel
          header="เราสามารถดาวน์โหลดเอกสารสรุปมาในเครื่องของตนเองได้ไหม?"
          key="1"
          className="font-bold bg-gray-50"
        >
          <p className="font-normal">
            ไม่ได้ คุณไม่สามารถดาวน์โหลดเอกสารสรุปออกมาจากเว็บไซต์ได้
            คุณจำเป็นจะต้องอ่านเอกสารบนหน้าเว็บเท่านั้น
          </p>
        </Panel>
        <Panel
          header="ในการสมัครจำเป็นต้องใช้อีเมล @ku.th เท่านั้นหรือเปล่า?"
          key="2"
          className="font-bold bg-gray-50"
        >
          <p className="font-normal">ไม่จำเป็น คุณสามารถใช้อีเมลใดก็ได้ในการสมัคร</p>
        </Panel>
        <Panel
          header="ในการใช้บริการ KU share จะมีค่าใช้จ่ายหรือไม่?"
          key="3"
          className="font-bold bg-gray-50"
        >
          <p className="font-normal">
            ไม่มี คุณสามารถเข้าถึงเอกสารสรุปได้โดยไม่มีค่าใช้จ่าย แต่ถ้าคุณต้องการสนับสนุนผู้โพสต์
            สามารถสนับสนุนได้โดยตรงตามช่องทางที่ผู้โพสต์กำหนดไว้
          </p>
        </Panel>
        <Panel
          header="ถ้าพบปัญหาจะติดต่อรายงานปัญหาได้อย่างไร?"
          key="4"
          className="font-bold bg-gray-50"
        >
          <p className="font-normal">
            คุณสามารถติดต่อผู้จัดทำได้ผ่านการกรอกข้อมูลใน Google Form ผ่านลิงก์ต่อไปนี้{' '}
            <a href="https://forms.gle/DpMVAvsRm1BH3aLM7">https://forms.gle/DpMVAvsRm1BH3aLM7</a>
          </p>
        </Panel>
      </Collapse>
    </div>
  )
}
