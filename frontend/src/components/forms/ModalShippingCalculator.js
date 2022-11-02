import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { CalculatorContext } from '../../contexts/CalculatorContext';
import Result from '../Result';

function ModalShippingCalculator({ show, handleClose }) {
    const [data, setData] = useState({
        length: 0,
        width: 0,
        height: 0,
        weight: 0,
    });
    const { result, setResult } = useContext(CalculatorContext);

    const close = () => {
        setInterval(() => {
            handleClose();
        }, 5000);
    }

    const getBestFit = async () => {
        const url = new URL(`http://localhost:3001/api/v1/products/find-best-fit`);
        url.search = new URLSearchParams(data).toString();
        const response = await fetch(url);
        const json = await response.json();
        setResult(json);
        close();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shipping Calculator</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Length</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="48"
                                autoFocus
                                required
                                onChange={(e) => setData({ ...data, length: e.target.value })}
                                value={data.length}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Width</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="14"
                                required
                                onChange={(e) => setData({ ...data, width: e.target.value })}
                                value={data.width}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Height</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="12"
                                required
                                onChange={(e) => setData({ ...data, height: e.target.value })}
                                value={data.height}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Weight</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="42"
                                required
                                onChange={(e) => setData({ ...data, weight: e.target.value })}
                                value={data.weight}
                            />
                        </Form.Group>
                    </Form>
                    {result && <Result />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={getBestFit}>
                        Calculate
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalShippingCalculator;