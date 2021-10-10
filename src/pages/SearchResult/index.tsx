import { BackTop, Button, Empty, List, Skeleton } from 'antd'
import React, { useEffect, useState, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SearchOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { options } from '../../utils/optionsUtil'
import InfiniteScroll from 'react-infinite-scroll-component'
import ScrollToTop from '../../components/ScrollToTop'

function useQuery() {
  return new URLSearchParams(useLocation().search).get('search') || ''
}
export const SearchResult: React.FC = () => {
  const search = useQuery()
  const [data, setData] = useState(
    options.filter(option => option.value.includes(search)).splice(0, 20),
  )

  useEffect(() => {
    setData(options.filter(option => option.value.includes(search)).splice(0, 20))
  }, [search])

  const memoData = useMemo(() => options.filter(option => option.value.includes(search)), [search])

  return (
    <div className="py-10 px-5">
      <ScrollToTop />
      <h1>
        <SearchOutlined className="mr-2" />
        ผลการค้นหาวิชา {`"${search}"`}
      </h1>
      <InfiniteScroll
        dataLength={data.length}
        loader={
          <div className="grid grid-cols-2">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <Skeleton active paragraph={{ rows: 1 }} key={index} />
              ))}
          </div>
        }
        next={() => {
          if (memoData.length <= data.length + 20) return setData(memoData)
          setData(data => [...data, ...memoData.slice(data.length, data.length + 20)])
        }}
        hasMore={!(memoData.length === data.length)}
      >
        <List
          locale={{ emptyText: <Empty description="ไม่พบผลการค้นหา" /> }}
          dataSource={data}
          grid={{ column: 2 }}
          renderItem={({ info, value }) => (
            <Link to={`/viewAll/${value}`} className="w-full">
              <List.Item
                key={info.id}
                className="hover:bg-gray-100 "
                style={{ padding: 12, marginBottom: 0 }}
              >
                <div className="flex ">
                  <List.Item.Meta
                    title={info.id}
                    description={
                      <div>
                        <p>{info.subjectNameTh}</p>
                        {info.subjectNameEn && <p>{info.subjectNameEn}</p>}
                      </div>
                    }
                  />

                  <Button shape="circle">
                    <SearchOutlined />
                  </Button>
                </div>
              </List.Item>
            </Link>
          )}
        />
      </InfiniteScroll>
      <BackTop className="right-10">
        <Button type="primary" icon={<ArrowUpOutlined />} className="w-10 h-10" />
      </BackTop>
    </div>
  )
}
