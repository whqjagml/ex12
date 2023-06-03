import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Col, Form, FormControl, Table, Button } from 'react-bootstrap'
import MapPage from './MapPage'
import moment from 'moment';
import { app } from '../firebase/firebaseInit'
import { getDatabase, ref, set, onValue } from 'firebase/database'

const LocalPage = ({ history }) => {
    const db = getDatabase(app);
    const uid = sessionStorage.getItem('uid');

    const [addresses, setAddresses] = useState([])
    const [query, setQuery] = useState('인하대학교')
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [isEnd, setIsEnd] = useState(true)
    const [total, setTotal] = useState(0)

    const getdata = async () => {
        setLoading(true)

        const url = "https://dapi.kakao.com/v2/local/search/keyword.JSON";
        const config = {
            headers: { "Authorization": 'KakaoAK 1fa6db5bd1bcbdca2856a6c7625dba28' },
            params: { "query": query, "size": 5, "page": page }
        }

        const result = await axios.get(url, config)
        console.log(result.data.documents)

        setAddresses(result.data.documents)
        setTotal(result.data.meta.pageable_count)
        setIsEnd(result.data.meta.is_end)
        setLoading(false)
    }

    const onSubmit = e => {
        e.preventDefault()
        setPage(1)
        getdata()
    }

    useEffect(() => {
        getdata()
    }, [page])

    const onFavorite = async (address) => {
        if (uid) {
            if (window.confirm(address.place_name + '을(를) 즐겨찾기로 등록하시겠습니까?')) {
                const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                await set(ref(db, `favorite/${uid}/${address.id}`), { ...address, date: date });

                alert('즐겨찾기가 등록되었습니다.')
            }
        } else {
            sessionStorage.setItem('target', '/local')
            history.push('/login');
        }
    }

    if (loading) return <h1 className='text-center my-5'>로딩중......</h1>
    return (
        <Row>
            <Col>
                <h1 className='text-center my-5'>지역 검색</h1>

                <Row>
                    <Col md={5} xs={6}>
                        <Form onSubmit={onSubmit}>
                            <FormControl placeholder='검색어' value={query} onChange={e => setQuery(e.target.value)} />
                        </Form>

                        <Col>검색 수: {total} 건</Col>
                    </Col>
                </Row>

                <Row>
                    <Table className='my-5' striped bordered hover>
                        <thead className='text-center my-5'>
                            <tr>
                                <td>장소명</td>
                                <td>주소</td>
                                <td>전화번호</td>
                                <td>버튼</td>
                                <td>즐겨찾기</td>
                            </tr>
                        </thead>

                        <tbody>
                            {addresses.map(address => (
                                <tr key={address.id} className='text-center' >
                                    <td>{address.place_name}</td>
                                    <td>{address.address_name}</td>
                                    <td>{address.phone}</td>
                                    <td><MapPage address={address} /></td>
                                    <td><Button onClick={() => onFavorite(address)} className='btn-sm'>즐겨찾기</Button></td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>


                    <Col className='text-center my-3'>
                        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>이전</Button>
                        <span className='mx-3'>{page}</span>
                        <Button onClick={() => setPage(page + 1)} disabled={isEnd}>다음</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default LocalPage
