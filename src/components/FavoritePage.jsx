import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import MapPage from './MapPage'
import { app } from '../firebase/firebaseInit'
import { getDatabase, ref, remove, onValue } from 'firebase/database'

const FavoritePage = () => {
    const db = getDatabase(app);
    const uid = sessionStorage.getItem('uid');

    const [addresses, setAddresses] = useState([])
    const [loading, setLoading] = useState(false)

    const getFavorite = () => {
        setLoading(true);
        onValue(ref(db, `favorite/${uid}`), (snapshot) => {
            let rows = [];
            snapshot.forEach(row => {
                rows.push({ key: row.key, ...row.val() })
            });
            
            setAddresses(rows);
            setLoading(false);
        });
    }

    const deleteFavorite = async (id) => {
        if (window.confirm('정말 데이터를 삭제하시겠습니까?'))
            await remove(ref(db, `favorite/${uid}/${id}`));
    }


    useEffect(() => {
        getFavorite()
    }, [])

    if (loading) return <h1 className='text-center my-5'>로딩중......</h1>
    return (
        <Row className='justify-content-center my-5'>
            <Col md={5}>
                <h1 className='text-center'>즐겨찾기</h1>
            </Col>

            <Row>
                <Table className='my-5' striped bordered hover>
                    <thead className='text-center my-5'>
                        <tr>
                            <td>장소명</td>
                            <td>주소</td>
                            <td>전화번호</td>
                            <td>등록일</td>
                            <td>버튼</td>
                            <td>삭제</td>
                        </tr>
                    </thead>

                    <tbody >
                        {addresses.map(address => (
                            <tr key={address.id} className='text-center align-middle'>
                                <td>{address.place_name}</td>
                                <td>{address.address_name}</td>
                                <td>{address.phone}</td>
                                <td>{address.date}</td>
                                <td><MapPage address={address} /></td>
                                <td><Button className='btn-sm' variant='danger' onClick={() => deleteFavorite(address.key)}>즐겨찾기 삭제</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </Row>
    )
}

export default FavoritePage