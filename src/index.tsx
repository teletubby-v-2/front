// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
// // import './index.css';
// import { Upload, Modal } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';

// // function getBase64(file: RcFile) {
// //   return new Promise((resolve, reject) => {
// //     const reader = new FileReader();
// //     reader.readAsDataURL(file);
// //     reader.onload = () => resolve(reader.result);
// //     reader.onerror = error => reject(error);
// //   });
// // }

// class PicturesWall extends React.Component {
//   state = {
//     previewVisible: false,
//     previewImage: '',
//     previewTitle: '',
//     fileList: [
//       {
//         uid: '-1',
//         name: 'image.png',
//         status: 'done',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//       },
//       {
//         uid: '-2',
//         name: 'image.png',
//         status: 'done',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//       },
//       {
//         uid: '-3',
//         name: 'image.png',
//         status: 'done',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//       },
//       {
//         uid: '-4',
//         name: 'image.png',
//         status: 'done',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//       },
//       {
//         uid: '-xxx',
//         percent: 50,
//         name: 'image.png',
//         status: 'uploading',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//       },
//       {
//         uid: '-5',
//         name: 'image.png',
//         status: 'error',
//       },
//     ] as unknown as UploadFile<any>[],
//   };

//   handleCancel = () => this.setState({ previewVisible: false });

//   handlePreview = async (file: UploadFile<any>)=> {
//     this.setState({
//       previewImage: file.url || file.preview,
//       previewVisible: true,
//       previewTitle: file.name || file.url?.substring(file.url.lastIndexOf('/') + 1),
//     });
//   };

//   handleChange = ({ fileList }: UploadChangeParam<UploadFile<any>>) => this.setState({ fileList });

//   render() {
//     const { previewVisible, previewImage, fileList, previewTitle } = this.state;
//     const uploadButton = (
//       <div>
//         <PlusOutlined />
//         <div style={{ marginTop: 8 }}>Upload</div>
//       </div>
//     );
//     return (
//       <>
//         <Upload
//           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//           listType="picture-card"
//           fileList={[{
//             uid: '-1',
//             name: 'image.png',
//             status: 'done',
//             url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//           }] as unknown as UploadFile<any>[]}
//           onPreview={this.handlePreview}
//           onChange={this.handleChange}
//         >
//           {fileList.length >= 8 ? null : uploadButton}
//         </Upload>
//         <Modal
//           visible={previewVisible}
//           title={previewTitle}
//           footer={null}
//           onCancel={this.handleCancel}
//         >
//           <img alt="example" style={{ width: '100%' }} src={previewImage} />
//         </Modal>
//       </>
//     );
//   }
// }

// ReactDOM.render(<PicturesWall />, document.getElementById('root'));
import React from 'react'
import ReactDOM from 'react-dom'
import './style/theme.less'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import { ConfigProvider } from 'antd'
import thTH from 'antd/lib/locale/th_TH'
import moment from 'moment'
import 'moment/locale/th'

moment.locale('th')

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={thTH}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
