import React from 'react'
import { useState } from 'react'
import { Col, Row, Card, Form, InputGroup, Button } from 'react-bootstrap'
import { app } from '../firebase/firebaseInit'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'

const LoginPage = ({ history }) => {
    const auth = getAuth(app);
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

    const onLogin = () => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(success => {
                sessionStorage.setItem('email', email)
                sessionStorage.setItem('uid', success.user.uid)

                setLoading(false);
                sessionStorage.getItem('target') ? history.push(sessionStorage.getItem('target')) : history.push('/')
            })
            .catch(error => {
                alert("로그인에러:" + error.message);
                setLoading(false);
            });
    }

    if (loading) return <h1 className='text-center my-5'>로그인 중......</h1>
    return (
        <Row className='justify-content-center my-5'>
            <Col md={5}>
                <h1 className='text-center'>로그인</h1>
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
                        <Button onClick={onLogin} className='w-100'>로그인</Button>

                        <div className='text-center mt-3'>
                            <Link to="/join">회원가입</Link>
                        </div>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default LoginPage