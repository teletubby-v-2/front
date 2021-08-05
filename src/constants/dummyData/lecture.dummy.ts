import { logRoles } from '@testing-library/react'
import { Lecture } from '../interface/lecture.interface'

export const dummyLectures: Lecture[] = [
  {
    lectureId: '01204341',
    userId: '12345678',
    imagesUrl: ['https://api.chulabook.com/images/pid-20494.jpg'],
    subjectId: 'พาสาไทย',
    likeCount: 100,
    viewCount: 100,
    lectureTitle: 'This is thai lecture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laudantium iste, ut exercitationem obcaecati amet, accusamus dolores repudiandae quidem alias sed. Cum sunt corrupti dolore debitis sapiente voluptates veniam consequuntur.',
    keyword: ['thai', 'ไทย', 'มก'],
    commentCount: 0,
    reviewCount: 0,
    qaCount: 0,
    isMid: true,
    isFinal: false,
    tags: ['ไทยๆ'],
    qa: [
      {
        id: '1',
        lectureId: '01204341',
        userId: '62xxxxxxxx',
        displayName: 'นาย สมศักดิ์',
        question: 'สำหรับคนถาม',
        answer: [
          {
            id: '01204341',
            lectureId: '01204341',
            userId: '62xxxxxxxx',
            displayName: 'นาย สรวิช',
            imageUrl: '1234',
            message: 'lorem',
          },
        ],
        status: 1,
      },
    ],
    comment: [],
    review: [],
  },
  {
    lectureId: '2',
    userId: '12345678',
    imagesUrl: ['https://api.chulabook.com/images/pid-20494.jpg'],
    subjectId: 'พาสาไทย',
    likeCount: 100,
    viewCount: 100,
    lectureTitle: 'This is thai lecture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laudantium iste, ut exercitationem obcaecati amet, accusamus dolores repudiandae quidem alias sed. Cum sunt corrupti dolore debitis sapiente voluptates veniam consequuntur.',
    keyword: ['thai', 'ไทย', 'มก'],
    commentCount: 0,
    reviewCount: 0,
    qaCount: 0,
    isMid: true,
    isFinal: false,
    tags: ['ไทยๆ'],
    qa: [],
    comment: [],
    review: [],
  },
  {
    lectureId: '3',
    userId: '12345678',
    imagesUrl: ['https://api.chulabook.com/images/pid-20494.jpg'],
    subjectId: 'พาสาไทย',
    likeCount: 100,
    viewCount: 100,
    lectureTitle: 'This is thai lecture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laudantium iste, ut exercitationem obcaecati amet, accusamus dolores repudiandae quidem alias sed. Cum sunt corrupti dolore debitis sapiente voluptates veniam consequuntur.',
    keyword: ['thai', 'ไทย', 'มก'],
    commentCount: 0,
    reviewCount: 0,
    qaCount: 0,
    isMid: true,
    isFinal: false,
    tags: ['ไทยๆ'],
    qa: [],
    comment: [],
    review: [],
  },
  {
    lectureId: '4',
    userId: '12345678',
    imagesUrl: ['https://api.chulabook.com/images/pid-20494.jpg'],
    subjectId: 'พาสาไทย',
    likeCount: 100,
    viewCount: 100,
    lectureTitle: 'This is thai lecture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laudantium iste, ut exercitationem obcaecati amet, accusamus dolores repudiandae quidem alias sed. Cum sunt corrupti dolore debitis sapiente voluptates veniam consequuntur.',
    keyword: ['thai', 'ไทย', 'มก'],
    commentCount: 0,
    reviewCount: 0,
    qaCount: 0,
    isMid: true,
    isFinal: false,
    tags: ['ไทยๆ'],
    qa: [],
    comment: [],
    review: [],
  },
  {
    lectureId: '5',
    userId: '12345678',
    imagesUrl: ['https://api.chulabook.com/images/pid-20494.jpg'],
    subjectId: 'พาสาไทย',
    likeCount: 100,
    viewCount: 100,
    lectureTitle: 'This is thai lecture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laudantium iste, ut exercitationem obcaecati amet, accusamus dolores repudiandae quidem alias sed. Cum sunt corrupti dolore debitis sapiente voluptates veniam consequuntur.',
    keyword: ['thai', 'ไทย', 'มก'],
    commentCount: 0,
    reviewCount: 0,
    qaCount: 0,
    isMid: true,
    isFinal: false,
    tags: ['ไทยๆ'],
    qa: [],
    comment: [],
    review: [],
  },
  {
    lectureId: '6',
    userId: '12345678',
    imagesUrl: ['https://api.chulabook.com/images/pid-20494.jpg'],
    subjectId: 'พาสาไทย',
    likeCount: 100,
    viewCount: 100,
    lectureTitle: 'This is thai lecture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laudantium iste, ut exercitationem obcaecati amet, accusamus dolores repudiandae quidem alias sed. Cum sunt corrupti dolore debitis sapiente voluptates veniam consequuntur.',
    keyword: ['thai', 'ไทย', 'มก'],
    commentCount: 0,
    reviewCount: 0,
    qaCount: 0,
    isMid: true,
    isFinal: false,
    tags: ['ไทยๆ'],
    qa: [],
    comment: [],
    review: [],
  },

  {
    lectureId: '7',
    userId: '12345678',
    imagesUrl: ['https://api.chulabook.com/images/pid-20494.jpg'],
    subjectId: 'พาสาไทย',
    likeCount: 100,
    viewCount: 100,
    lectureTitle: 'This is thai lecture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laudantium iste, ut exercitationem obcaecati amet, accusamus dolores repudiandae quidem alias sed. Cum sunt corrupti dolore debitis sapiente voluptates veniam consequuntur.',
    keyword: ['thai', 'ไทย', 'มก'],
    commentCount: 0,
    reviewCount: 0,
    qaCount: 0,
    isMid: true,
    isFinal: false,
    tags: ['ไทยๆ'],
    qa: [],
    comment: [],
    review: [],
  },
  {
    lectureId: '8',
    userId: '12345678',
    imagesUrl: ['https://api.chulabook.com/images/pid-20494.jpg'],
    subjectId: 'พาสาไทย',
    likeCount: 100,
    viewCount: 100,
    lectureTitle: 'This is thai lecture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laudantium iste, ut exercitationem obcaecati amet, accusamus dolores repudiandae quidem alias sed. Cum sunt corrupti dolore debitis sapiente voluptates veniam consequuntur.',
    keyword: ['thai', 'ไทย', 'มก'],
    commentCount: 0,
    reviewCount: 0,
    qaCount: 0,
    isMid: true,
    isFinal: false,
    tags: ['ไทยๆ'],
    qa: [],
    comment: [],
    review: [],
  },
  {
    lectureId: '9',
    userId: '12345678',
    imagesUrl: ['https://api.chulabook.com/images/pid-20494.jpg'],
    subjectId: 'พาสาไทย',
    likeCount: 100,
    viewCount: 100,
    lectureTitle: 'This is thai lecture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laudantium iste, ut exercitationem obcaecati amet, accusamus dolores repudiandae quidem alias sed. Cum sunt corrupti dolore debitis sapiente voluptates veniam consequuntur.',
    keyword: ['thai', 'ไทย', 'มก'],
    commentCount: 0,
    reviewCount: 0,
    qaCount: 0,
    isMid: true,
    isFinal: false,
    tags: ['ไทยๆ'],
    qa: [],
    comment: [],
    review: [],
  },
  {
    lectureId: '10',
    userId: '12345678',
    imagesUrl: ['https://api.chulabook.com/images/pid-20494.jpg'],
    subjectId: 'พาสาไทย',
    likeCount: 100,
    viewCount: 100,
    lectureTitle: 'This is thai lecture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laudantium iste, ut exercitationem obcaecati amet, accusamus dolores repudiandae quidem alias sed. Cum sunt corrupti dolore debitis sapiente voluptates veniam consequuntur.',
    keyword: ['thai', 'ไทย', 'มก'],
    commentCount: 0,
    reviewCount: 0,
    qaCount: 0,
    isMid: true,
    isFinal: false,
    tags: ['ไทยๆ'],
    qa: [],
    comment: [],
    review: [],
  },
  {
    lectureId: '11',
    userId: '12345678',
    imagesUrl: ['https://api.chulabook.com/images/pid-20494.jpg'],
    subjectId: 'พาสาไทย',
    likeCount: 100,
    viewCount: 100,
    lectureTitle: 'This is thai lecture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laudantium iste, ut exercitationem obcaecati amet, accusamus dolores repudiandae quidem alias sed. Cum sunt corrupti dolore debitis sapiente voluptates veniam consequuntur.',
    keyword: ['thai', 'ไทย', 'มก'],
    commentCount: 0,
    reviewCount: 0,
    qaCount: 0,
    isMid: true,
    isFinal: false,
    tags: ['ไทยๆ'],
    qa: [],
    comment: [],
    review: [],
  },
  {
    lectureId: '12',
    userId: '12345678',
    imagesUrl: ['https://api.chulabook.com/images/pid-20494.jpg'],
    subjectId: 'พาสาไทย',
    likeCount: 100,
    viewCount: 100,
    lectureTitle: 'This is thai lecture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laudantium iste, ut exercitationem obcaecati amet, accusamus dolores repudiandae quidem alias sed. Cum sunt corrupti dolore debitis sapiente voluptates veniam consequuntur.',
    keyword: ['thai', 'ไทย', 'มก'],
    commentCount: 0,
    reviewCount: 0,
    qaCount: 0,
    isMid: true,
    isFinal: false,
    tags: ['ไทยๆ'],
    qa: [],
    comment: [],
    review: [],
  },
  {
    lectureId: '13',
    userId: '12345678',
    imagesUrl: ['https://api.chulabook.com/images/pid-20494.jpg'],
    subjectId: 'พาสาไทย',
    likeCount: 100,
    viewCount: 100,
    lectureTitle: 'This is thai lecture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laudantium iste, ut exercitationem obcaecati amet, accusamus dolores repudiandae quidem alias sed. Cum sunt corrupti dolore debitis sapiente voluptates veniam consequuntur.',
    keyword: ['thai', 'ไทย', 'มก'],
    commentCount: 0,
    reviewCount: 0,
    qaCount: 0,
    isMid: true,
    isFinal: false,
    tags: ['ไทยๆ'],
    qa: [],
    comment: [],
    review: [],
  },
  {
    lectureId: '14',
    userId: '12345678',
    imagesUrl: ['https://api.chulabook.com/images/pid-20494.jpg'],
    subjectId: 'พาสาไทย',
    likeCount: 100,
    viewCount: 100,
    lectureTitle: 'This is thai lecture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laudantium iste, ut exercitationem obcaecati amet, accusamus dolores repudiandae quidem alias sed. Cum sunt corrupti dolore debitis sapiente voluptates veniam consequuntur.',
    keyword: ['thai', 'ไทย', 'มก'],
    commentCount: 0,
    reviewCount: 0,
    qaCount: 0,
    isMid: true,
    isFinal: false,
    tags: ['ไทยๆ'],
    qa: [],
    comment: [],
    review: [],
  },
  {
    lectureId: '15',
    userId: '12345678',
    imagesUrl: ['https://api.chulabook.com/images/pid-20494.jpg'],
    subjectId: 'พาสาไทย',
    likeCount: 100,
    viewCount: 100,
    lectureTitle: 'This is thai lecture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laudantium iste, ut exercitationem obcaecati amet, accusamus dolores repudiandae quidem alias sed. Cum sunt corrupti dolore debitis sapiente voluptates veniam consequuntur.',
    keyword: ['thai', 'ไทย', 'มก'],
    commentCount: 0,
    reviewCount: 0,
    qaCount: 0,
    isMid: true,
    isFinal: false,
    tags: ['ไทยๆ'],
    qa: [],
    comment: [],
    review: [],
  },
]
