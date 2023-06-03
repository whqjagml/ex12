import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { app } from '../firebase/firebaseInit'
import { getDatabase, ref, remove, onValue } from 'firebase/database'

const CartPage = () => {
    const db = getDatabase(app);
    const uid = sessionStorage.getItem('uid');

    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)

    const getBook = () => {
        setLoading(true);
        onValue(ref(db, `book/${uid}`), (snapshot) => {
            let rows = [];
            snapshot.forEach(row => {
                rows.push({ key: row.key, ...row.val() })
            });

            setBooks(rows);
            setLoading(false);
        });
    }

    const deleteBook = async (id) => {
        if (window.confirm('정말 데이터를 삭제하시겠습니까?'))
            await remove(ref(db, `book/${uid}/${id}`));
    }


    useEffect(() => {
        getBook()
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
                            <td>제목</td>
                            <td>출판사</td>
                            <td>가격</td>
                            <td>상태</td>
                            <td>삭제</td>
                        </tr>
                    </thead>

                    <tbody>
                        {books.map(book => (
                            <tr key={book.isbn} className='text-center align-middle'>
                                <td>{book.title}</td>
                                <td>{book.publisher}</td>
                                <td><s>{book.price} 원</s> <br /> {book.sale_price} 원</td>
                                <td>{book.status}</td>
                                <td><Button className='btn-sm' variant='danger' onClick={() => deleteBook(book.isbn)}>장바구니 삭제</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </Row>
    )
}

export default CartPage