import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUs = () => {
  return (
    <Container fluid style={{ backgroundColor: '#12131c', color: '#fff', paddingTop: '40px', paddingBottom: '40px' }}>
      {/* About Us Title */}
      <Row className="text-center mb-5">
        <Col>
          <h1 style={{ color: '#4bc8ff', fontWeight: '700', fontSize: '3rem' }}>About Us</h1>
          <p style={{ color: '#fff', fontSize: '1.2rem' }}>Meet our team, learn about our vision and mission, and discover our core values</p>
        </Col>
      </Row>
      
      {/* Team Members Section */}
      <Row className="text-center mb-5">
        {/* Khushi's Image and Info */}
        <Col md={4}>
          <div
            style={{
              borderRadius: '50%',
              overflow: 'hidden',
              width: '250px',
              height: '250px',
              margin: '0 auto',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
            }}
          >
            <img
              src="/assets/khushi.jpeg"
              alt="Khushi Ingale"
              style={{ width: '100%', height: '130%', objectFit: 'cover' }}
            />
          </div>
          <h5 className="mt-3" style={{ color: '#fff' }}>Khushi Ingale</h5>
          <p style={{ color: '#fff' }}>Backend Developer</p>
        </Col>

        {/* Dhanashri's Image and Info */}
        <Col md={4}>
          <div
            style={{
              borderRadius: '50%',
              overflow: 'hidden',
              width: '250px',
              height: '250px',
              margin: '0 auto',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
            }}
          >
            <img
              src="/assets/dhanashri.jpeg"
              alt="Dhanashri"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <h5 className="mt-3" style={{ color: '#fff' }}>Dhanashri</h5>
          <p style={{ color: '#fff' }}>Master in Database</p>
        </Col>

        {/* Bhakti's Image and Info */}
        <Col md={4}>
          <div
            style={{
              borderRadius: '50%',
              overflow: 'hidden',
              width: '250px',
              height: '250px',
              margin: '0 auto',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
            }}
          >
            <img
              src="/assets/bhakti.jpeg"
              alt="Bhakti"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <h5 className="mt-3" style={{ color: '#fff' }}>Bhakti</h5>
          <p style={{ color: '#fff' }}>Frontend Developer</p>
        </Col>
      </Row>

      {/* About LearnSetu, Vision, and Mission Cards in Same Line */}
      <Row className="text-center mb-5">
        {/* About LearnSetu Card */}
        <Col lg={4} md={6} sm={12} className="mb-4">
          <Card style={{ backgroundColor: '#1e1f2b', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', height: '100%' }}>
            <Card.Body>
              <Card.Title style={{ color: '#4bc8ff', fontSize: '1.8rem', fontWeight: '600' }}>About LearnSetu</Card.Title>
              <Card.Text style={{ fontSize: '16px', color: '#fff', lineHeight: '1.6' }}>
                LearnSetu is an innovative online learning platform that connects students, educators, and professionals to empower learning. Our platform focuses on providing high-quality courses, tutorials, and resources to help learners achieve their personal and professional goals. We strive to bridge the gap between education and technology, making learning accessible and engaging for everyone.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Vision Card */}
        <Col lg={4} md={6} sm={12} className="mb-4">
          <Card style={{ backgroundColor: '#1e1f2b', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', height: '100%' }}>
            <Card.Body>
              <Card.Title style={{ color: '#4bc8ff' }}>Our Vision</Card.Title>
              <Card.Text style={{ fontSize: '16px', color: '#fff', lineHeight: '1.6' }}>
                At LearnSetu, our vision is to empower learners worldwide by providing high-quality, accessible, and engaging learning experiences. We aim to bridge the gap between education and technology, ensuring every individual can achieve their personal and professional goals.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Mission Card */}
        <Col lg={4} md={6} sm={12} className="mb-4">
          <Card style={{ backgroundColor: '#1e1f2b', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', height: '100%' }}>
            <Card.Body>
              <Card.Title style={{ color: '#4bc8ff' }}>Our Mission</Card.Title>
              <Card.Text style={{ fontSize: '16px', color: '#fff', lineHeight: '1.6' }}>
                Our mission at LearnSetu is to revolutionize the learning process by providing an interactive platform that offers personalized learning paths. We are committed to building a diverse, inclusive, and dynamic educational ecosystem that prepares individuals for future challenges and opportunities.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Core Values and Additional Cards */}
      <Row className="text-center">
        {/* Core Values Card */}
        <Col lg={4} md={6} sm={12} className="mb-4">
          <Card style={{ backgroundColor: '#1e1f2b', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', height: '100%' }}>
            <Card.Body>
              <Card.Title style={{ color: '#4bc8ff' }}>Core Values</Card.Title>
              <Card.Text style={{ fontSize: '16px', color: '#fff', lineHeight: '1.6' }}>
                Our core values define our approach to education. We focus on:
                <ul style={{ textAlign: 'left', fontSize: '16px', paddingLeft: '20px', color: '#fff' }}>
                  <li><strong>Innovation:</strong> Constantly improving and adapting to the needs of learners.</li>
                  <li><strong>Inclusivity:</strong> Making learning accessible to everyone, everywhere.</li>
                  <li><strong>Collaboration:</strong> Building a community of learners and educators.</li>
                  <li><strong>Integrity:</strong> Providing trustworthy, accurate, and transparent content.</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Our Approach Card */}
        <Col lg={4} md={6} sm={12} className="mb-4">
          <Card style={{ backgroundColor: '#1e1f2b', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', height: '100%' }}>
            <Card.Body>
              <Card.Title style={{ color: '#4bc8ff' }}>Our Approach</Card.Title>
              <Card.Text style={{ fontSize: '16px', color: '#fff', lineHeight: '1.6' }}>
                We take a learner-first approach, designing intuitive and flexible courses that meet the needs of students at every level. Our approach includes a mix of interactive lessons, quizzes, practical assignments, and peer collaboration to make learning engaging and impactful.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* What We Offer Card */}
        <Col lg={4} md={6} sm={12} className="mb-4">
          <Card style={{ backgroundColor: '#1e1f2b', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', height: '100%' }}>
            <Card.Body>
              <Card.Title style={{ color: '#4bc8ff' }}>What We Offer</Card.Title>
              <Card.Text style={{ fontSize: '16px', color: '#fff', lineHeight: '1.6' }}>
                LearnSetu offers a wide range of learning resources, including online courses, video tutorials, webinars, and interactive workshops. Our platform is designed to cater to the needs of students, professionals, and institutions aiming to stay ahead in the digital age.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;