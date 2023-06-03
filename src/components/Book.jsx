import React, { useState } from 'react';
import { Card, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { app } from '../firebase/firebaseInit';
import { getDatabase, ref, set, onValue } from 'firebase/database'

const Book = withRouter(({ book, history }) => {
    const db = getDatabase(app);
    const uid = sessionStorage.getItem('uid');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onCart = async (book) => {
        if (uid) {
            if (window.confirm(book.title + '을(를) 장바구니에 추가하시겠습니까?')) {
                const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                await set(ref(db, `book/${uid}/${book.isbn}`), { ...book, date: date });

                alert('장바구니에 추가되었습니다.')
                handleClose()
            }
        } else {
            sessionStorage.setItem('target', '/book')
            history.push('/login');
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                상세 보기
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>{book.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body className='book'>
                            <Image src={book.thumbnail ? book.thumbnail : 'http://via.placeholder.com/170x150'} />
                            <div className='ellipsis'>가격 : {book.price} 원</div>
                            <div className='ellipsis'>저자 : {book.authors}</div>
                            <div className='ellipsis'>출판사 : {book.publisher}</div>
                            <hr />
                            <div>{book.contents}</div>
                            <hr />
                            <div className='ellipsis'>{book.status}</div>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => onCart(book)}>
                        장바구니
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
})

export default Book