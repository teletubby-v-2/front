import { Lecture } from '../interface/lecture.interface'

export const dummyLectures: Lecture[] = [
  {
    lectureId: 'nahee',
    userId: 'sadsadas',
    imageUrl: ['https://api.chulabook.com/images/pid-20494.jpg'],
    subjectId: '01001231',
    sumRating: 0,
    reviewCount: 0,
    viewCount: 100,
    lectureTitle: 'This is thai lecture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi laudantium iste, ut exercitationem obcaecati amet, accusamus dolores repudiandae quidem alias sed. Cum sunt corrupti dolore debitis sapiente voluptates veniam consequuntur.',
    isMid: true,
    isFinal: false,
    tags: ['ไทยๆ', 'kyyyy', 'nahee'],
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
          },
        ],
      },
    ],
    comment: [],
    review: [],
  },
]
