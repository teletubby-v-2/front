import React, { CSSProperties, memo, useState, ReactNode } from 'react'
import { arrayMove, SortableContainer, SortableElement, SortEnd } from 'react-sortable-hoc'
import { UploadFile } from 'antd/es/upload/interface'
import { UploadChangeParam } from 'antd/lib/upload'
import UploadList from 'antd/es/upload/UploadList'
import { Modal, Upload } from 'antd'
import { UploadProps } from 'antd/lib/upload'
import { myLocale } from '../CreateLectureForm/constants'
import styled from 'styled-components'

const UploadStyle = styled(Upload)`
  & .ant-upload {
    margin-top: 4px;
    margin-left: 4px;
    margin-bottom: 0px;
    margin-right: 0px;
  }
`

export type Props = {
  onChange: (params: { fileList: UploadFile[]; file?: UploadFile }) => void
  children?: ReactNode
} & UploadProps

type SortableParams = {
  props: Omit<Props, 'onChange'>
  onPreview: (file: UploadFile) => void
  onRemove: (file: UploadFile) => void | boolean
}

export type SortableItemParams = {
  item: UploadFile
} & SortableParams

export type SortableListParams = {
  onChange: (info: UploadChangeParam) => void
  items: UploadFile[]
} & SortableParams

const itemStyle: CSSProperties = {
  width: 104,
  height: 104,
  margin: 4,
  cursor: 'grab',
  zIndex: 2000,
}
const imagePreview = async (file: UploadFile, callback: (params: { image: string }) => void) => {
  const newFile = file
  callback({
    image: newFile.url || '',
  })
}

const SortableItem = SortableElement((params: SortableItemParams) => (
  <div style={itemStyle}>
    <UploadList
      locale={myLocale}
      showDownloadIcon={false}
      listType={params.props.listType}
      onPreview={params.onPreview}
      onRemove={params.onRemove}
      items={[params.item]}
    />
  </div>
))

const listStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
}
const SortableList = SortableContainer((params: SortableListParams) => {
  return (
    <div style={listStyle}>
      {params.items.map((item, index) => (
        <SortableItem
          key={`${item.uid}`}
          index={index}
          item={item}
          props={params.props}
          onPreview={params.onPreview}
          onRemove={params.onRemove}
        />
      ))}
      <UploadStyle {...params.props} showUploadList={false} onChange={params.onChange}>
        {params.props.children}
      </UploadStyle>
    </div>
  )
})

// eslint-disable-next-line react/display-name
const PicturesGrid: React.FC<Props> = memo(({ onChange: onFileChange, ...props }) => {
  const [previewImage, setPreviewImage] = useState('')
  const fileList = props.fileList || []
  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    onFileChange({ fileList: arrayMove(fileList, oldIndex, newIndex) })
  }

  const onChange = (param: UploadChangeParam) => {
    onFileChange(param)
  }

  const onRemove = (file: UploadFile) => {
    const newFileList = fileList.filter(item => item.uid !== file.uid)
    onFileChange({ fileList: newFileList })
  }

  const onPreview = async (file: UploadFile) => {
    await imagePreview(file, ({ image }) => {
      setPreviewImage(image)
    })
  }

  return (
    <>
      <SortableList
        distance={1}
        items={fileList}
        onSortEnd={onSortEnd}
        axis="xy"
        helperClass="SortableHelper"
        props={props}
        onChange={onChange}
        onRemove={onRemove}
        onPreview={onPreview}
      />
      <Modal
        visible={!!previewImage}
        footer={null}
        centered
        onCancel={() => setPreviewImage('')}
        bodyStyle={{ padding: 0 }}
      >
        <img style={{ width: '100%' }} alt="" src={previewImage} />
      </Modal>
    </>
  )
})

export { PicturesGrid }
