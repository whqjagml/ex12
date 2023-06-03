import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Row, Col, Button, Form, FormControl, Card, Image } from 'react-bootstrap'
import Book from './Book';

const BookPage = () => {
    const [books, setBooks] = useState([])
    const [query, setQuery] = useState("안드로이드")
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [isEnd, setIsEnd] = useState(false)
    const [total, setTotal] = useState(0)

    const getdata = async () => {
        const url = "https://dapi.kakao.com/v3/search/book?target=title";
        const config = {
            headers: { "Authorization": 'KakaoAK 1fa6db5bd1bcbdca2856a6c7625dba28' },
            params: { "query": query, "size": 8, "page": page }
        }

        const json = await axios.get(url, config);
        console.log(json)

        setBooks(json.data.documents)
        setTotal(json.data.meta.pageable_count)
        setIsEnd(json.data.meta.is_end)
        setLoading(false)
    }

    const onSearch = e => {
        e.preventDefault()
        setPage(1)
        getdata()
    }

    useEffect(() => {
        setLoading(true)
        getdata()
    }, [page])

    if (loading) return <h1 className='text-center my-5'>로딩중......</h1>
    else
        return (
            <Row>
                <h1 className='text-center my-5'>도서검색</h1>

                <Row>
                    <Col md={3}>
                        <Form onSubmit={onSearch}>
                            <Form.Control value={query} onChange={e => setQuery(e.target.value)} placeholder='검색어'></Form.Control>
                        </Form>

                        <Col>검색 수: {total} 건</Col>
                    </Col>
                </Row>
                <Row>
                    {books.map(book =>
                        <Col key={book.isbn} md={3} xs={6} className='my-3'>
                            <Card>
                                <Card.Body>
                                    <Image src={book.thumbnail ? book.thumbnail : 'http://via.placeholder.com/170x150'} />
                                    <div className='ellipsis'>{book.title}</div>
                                    <div className='ellipsis'>{book.price} 원</div>
                                    <Book book={book} />
                                </Card.Body>
                            </Card>
                        </Col>
                    )}

                    <Col className='text-center my-3'>
                        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>이전</Button>
                        <span className='mx-3'>{page}</span>
                        <Button onClick={() => setPage(page + 1)} disabled={isEnd}>다음</Button>
                    </Col>
                </Row>
            </Row >
        )
}

export default BookPage
