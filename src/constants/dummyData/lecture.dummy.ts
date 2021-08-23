import { Lecture } from '../interface/lecture.interface'

export const dummyLectures: Lecture[] = [
  {
    lectureId: '01204341',
    userId: '12345678',
    imageUrl: ['https://api.chulabook.com/images/pid-20494.jpg'],
    subjectId: 'พาสาไทย',
    sumRating: 0,
    reviewCount: 0,
    viewCount: 100,
    lectureTitle: 'This is thai lecture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laudantium iste, ut exercitationem obcaecati amet, accusamus dolores repudiandae quidem alias sed. Cum sunt corrupti dolore debitis sapiente voluptates veniam consequuntur.',
    isMid: true,
    isFinal: false,
    tags: ['ไทยๆ'],
    qa: [
      {
        qaId: '1',
        lectureId: '01204341',
        userId: '62xxxxxxxx',
        question: 'สำหรับคนถาม',
        answer: [
          {
            id: '01204341',
            lectureId: '01204341',
            userId: '62xxxxxxxx',
            message: 'lorem',
            canReply: false,
            reply: [],
          },
        ],
      },
    ],
    comment: [],
    review: [],
  },
]
