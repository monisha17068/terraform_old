import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import '../styles/styles.css';

const Footer = props => {

    return(
        <footer className='foot'>
            <Container  style={{justifyContent: 'center', alignItems: 'center'}}>
                <Row>
                    <Col className='text-center' style={{justifyContent: 'center', alignItems: 'center'}}>
                        Copyright &copy; - All Rights Reserved | Terms and Services | Privacy
                    </Col>

                </Row>
            </Container>
        </footer>
        
    );

};
export default Footer;