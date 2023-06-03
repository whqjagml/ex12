import React, { useEffect, useState } from 'react';
import { Card, Container, View } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Map, MapMarker } from 'react-kakao-maps-sdk'

const { kakao } = window

const MapPage = ({ address }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow} className='btn-sm'>
                지도 보기
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{address.place_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Map center={{ lat: address.y, lng: address.x }} style={{ width: "100%", height: "360px" }}>
                                <MapMarker position={{ lat: address.y, lng: address.x }}>
                                    <div style={{ color: "#000" }}>{address.address_name}</div>
                                </MapMarker>
                            </Map>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MapPage