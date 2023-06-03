import React from 'react'
import { useState } from 'react'
import { Col, Row, Card, Form, InputGroup, Button } from 'react-bootstrap'
import { app } from '../firebase/firebaseInit'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'
import {
    doc,
    getDocs,
    getFirestore,
    query,
    setDoc,
} from 'firebase/firestore'

const JoinPage = ({ history }) => {
    const auth = getAuth(app);
    const db = getFirestore(app)

    const [form, setForm] = useState({
        email: '0914wjdals@naver.com',
        password: '123456'
    })
    const { email, password } = form
    const [loading, setLoading] = useState(false)

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onJoin = () => {
        if (!window.confirm('정말로 회원가입 하시겠습니까?')) return

        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then(async success => {
                const uid = success.user.uid;
                await setDoc(doc(db, 'user', uid), {
                    email: email,
                    name: '음정민',
                    address: '경기도 고양시 일산동구 장항동',
                    phone: '010-8457-8802',
                    photo: ''
                });
                setLoading(false);
                history.push('/login');
            })
            .catch(error => {
                alert('에러:' + error.message);
                setLoading(false);
            });
    }

    if (loading) return <h1 className='text-center my-5'>회원등록 중......</h1>
    return (
        <Row className='justify-content-center my-5'>
            <Col md={5}>
                <h1 className='text-center'>회원등록</h1>
                <Card className='p-3'>
                    <Form>
                        <InputGroup className='my-2'>
                            <InputGroup.Text>이 메 일</InputGroup.Text>
                            <Form.Control name='email' value={email} onChange={onChange} />
                        </InputGroup>
                        <InputGroup className='my-2'>
                            <InputGroup.Text>비밀번호</InputGroup.Text>
                            <Form.Control name='password' value={password} onChange={onChange} type='password' />
                        </InputGroup>
                        <Button onClick={onJoin} className='w-100'>회원등록</Button>

                        <div className='text-center mt-3'>
                            <Link to="/login">로그인</Link>
                        </div>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default JoinPage