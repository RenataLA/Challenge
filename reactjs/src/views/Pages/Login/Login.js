import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, 
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Label
} from 'reactstrap';
import { thisExpression } from '@babel/types';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  invalidCredentials = () =>{
    return "Campo Obrigatorio";
  }
  
  linkTo= () => {
    this.props.history.push('/dashboard');
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    if(this.state.username == "admin" && this.state.password == "admin"){
      alert("Auth");
      {this.linkTo()};
    }
    else{
      alert(this.state.username + "+" +this.state.password)
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit} className="was-validated">
                      <h1>Login</h1>
                      <p className="text-muted">Entre com sua conta.</p>
                      <FormGroup>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input  
                            className="form-control-warning"
                            id="username"
                            type="text"
                            placeholder="Usuário" 
                            value = {this.state.username}
                            onChange={this.handleChange}
                            required
                          />
                          <FormFeedback className="help-block">{this.invalidCredentials()}</FormFeedback>
                        </InputGroup>
                      </FormGroup>
                    
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          id="password"
                          type="password"  
                          placeholder="Senha" 
                          onChange={this.handleChange}
                          required
                          />
                        <FormFeedback className="help-block">{this.invalidCredentials()}</FormFeedback>

                      </InputGroup>
                      <Row>
                        <Col xs="6">
                            <Button color="primary" className="px-4" type="submit">Entrar</Button>
                            {this.renderRedirect}
                        </Col>
                          <Button color="link" className="px-0">Esqueci minha senha</Button>
                        </Row>
                    </Form>
                  </CardBody>
                  
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Registrar</h2>
                      <p>Não tem uma conta ?</p>
                      <p>Crie uma conta agora!</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Criar</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
