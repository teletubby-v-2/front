import React, { useEffect, useState } from 'react'
import { LectureContainer } from '../../components'
import { userInfoStore } from '../../store/user.store'
import { LectureDTO } from '../../constants/dto/lecture.dto'
import { firestore } from '../../config/firebase'
import { Collection } from '../../constants'

export const ViewAll: React.FC = () => {
  const { userInfo } = userInfoStore()
  const [viewAllLecture, setViewAllLecture] = useState<LectureDTO[]>([] as LectureDTO[])

  useEffect(() => {
    if (viewAllLecture.length === 0) {
      const subjectId = userInfo.userSubject
        .filter(subject => subject.isActive === true)
        .map(subject => subject.subjectId)
        .flatMap(x => x)
      if (subjectId && subjectId.length !== 0) {
        firestore
          .collection(Collection.Lectures)
          .where('subjectId', 'in', subjectId)
          .get()
          .then(doc => {
            doc.forEach(lecture => {
              setViewAllLecture(mySubject => [
                ...mySubject,
                { lectureId: lecture.id, ...lecture.data() } as LectureDTO,
              ])
            })
          })
      }
    }
  }, [userInfo.userSubject])

  return (
    <div className="mb-10 mx-2 space-y-7 md:mx-5 lg:mx-20 xl:mx-30 ">
      {userInfo.userId && userInfo.userId.length !== 0 && (
        <LectureContainer
          title="วิชาของฉัน"
          data={viewAllLecture}
          limit={false}
          extra={<a href="/myLecture">ดูทั้งหมด</a>}
        />
      )}
    </div>
  )
}
