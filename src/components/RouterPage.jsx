import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import HomePage from './HomePage';
import BookPage from './BookPage';
import LocalPage from './LocalPage';
import LoginPage from './LoginPage';
import JoinPage from './JoinPage';
import MyPage from './MyPage';
import FavoritePage from './FavoritePage';
import CartPage from './CartPage';

const RouterPage = ({ history }) => {

    const onLogOut = () => {
        sessionStorage.clear()
        history.push('/')
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/books">LOGO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link to="/">Home</Link>
                            <Link to="/book">도서검색</Link>
                            <Link to="/local">지역검색</Link>

                            {sessionStorage.getItem('email') &&
                                <>
                                    <Link to="/favorite">즐겨찾기</Link>
                                    <Link to="/cart">장바구니</Link>
                                </>
                            }
                        </Nav>
                        <div className='d-flex'>
                            {sessionStorage.getItem('email') ?
                                <>
                                    <Link to="/mypage" className='me-2 pt-1'>{sessionStorage.getItem('email')}</Link>
                                    <Link to="/logout" onClick={onLogOut}>로그아웃</Link>
                                </>
                                : <Link to="/login">로그인</Link>
                            }
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Switch>
                <Route path="/" component={HomePage} exact={true} />
                <Route path="/book" component={BookPage} />
                <Route path="/local" component={LocalPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/join" component={JoinPage} />
                <Route path="/mypage" component={MyPage} />
                <Route path="/favorite" component={FavoritePage} />
                <Route path="/cart" component={CartPage} />
            </Switch>
        </>
    )
}

export default withRouter(RouterPage)