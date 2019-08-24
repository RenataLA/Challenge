import React, { Component, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Popup from "reactjs-popup";
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Row,
} from 'reactstrap';
class RegisterJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <strong>
              Nova Vaga
            </strong>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="12" md="6">
                <Card>
                  <CardHeader>
                    <strong>
                      <i className="cui-user-follow"></i>&nbsp;
                        Informações da Vaga
                    </strong>
                </CardHeader>
                <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                <FormGroup row>
                <Col md="3">
                <Label htmlFor="nome">Descrição da vaga</Label>
                </Col>
                <Col xs="12" md="9">
                <Input type="text" id="nome" name="nome" />
                </Col>
                </FormGroup>
                <FormGroup row>
                <Col md="3">
                <Label htmlFor="text-input">Departamento</Label>
                </Col>
                <Col xs="12" md="9">
                <Input type="text" id="sobrenome" name="sobrenome" />
                </Col>
                </FormGroup>
                </Form>
                </CardBody>
                </Card>
      </Col>
      <Col xs="12" md="6">
      <Card>
      <CardHeader>
      <strong><i className="cui-location-pin"></i>&nbsp;Endereço</strong>
      </CardHeader>
      <CardBody>
      <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
      <FormGroup row>
      <Col md="2">
      <Label htmlFor="text-input">CEP</Label>
      </Col>
      <Col xs="12" md="4">
      <InputGroup>
      <Input 
      type="text" 
      id="cep" 
      name="cep" 
      placeholder="CEP" 
      />
      <InputGroupAddon addonType="append">
      <Button type="button" color="success" onClick={this.validateCEP}>Validar</Button>
      </InputGroupAddon>
      <FormFeedback invalid="">Insira um CEP válido</FormFeedback>
      </InputGroup>
      </Col>
      <Col md="2">
      <Label htmlFor="text-input">Número</Label>
      </Col>
      <Col xs="12" md="4">
      <Input type="text" id="endereco_numero" name="endereco_numero"/>
      </Col>
      </FormGroup>
      <FormGroup row>
      <Col md="2">
      <Label htmlFor="text-input">Complemento</Label>
      </Col>
      <Col xs="12" md="10">
      <Input type="text" id="complemento" name="complemento" value={this.state.complemento} onChange={this.handleChange}/>
      </Col>
      </FormGroup>
      <FormGroup row>
      <Col md="2">
      <Label htmlFor="text-input">Logradouro</Label>
      </Col>
      <Col xs="12" md="10">
      <Input type="text" id="logradouro" name="logradouro" value={this.state.logradouro} readOnly/>
      </Col>
      </FormGroup>
      <FormGroup row>
      <Col md="2">
      <Label htmlFor="text-input">Bairro</Label>
      </Col>
      <Col xs="12" md="10">
      <Input type="text" id="bairro" name="bairro" value={this.state.bairro} readOnly/>
      </Col>
      </FormGroup>
      <FormGroup row>
      <Col md="2">
      <Label htmlFor="text-input">Cidade</Label>
      </Col>
      <Col xs="12" md="10">
      <Input type="text" id="localidade" name="localidade" value={this.state.localidade} readOnly/>
      </Col>
      </FormGroup>
      <FormGroup row>
      <Col md="2">
      <Label htmlFor="text-input">UF</Label>
      </Col>
      <Col xs="12" md="10">
      <Input type="text" id="uf" name="text-input" value={this.state.uf} readOnly/>
      </Col>
      </FormGroup>
      </Form>
      </CardBody>
      </Card>
      <Card>
      <CardHeader>
      <strong><i className="cui-location-pin"></i>&nbsp;Redes Sociais</strong>
      </CardHeader>
      <CardBody>
      <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
      <FormGroup row>
      <Col md="2">
      <Label htmlFor="text-input">Twitter</Label>
      </Col>
      <Col xs="12" md="10">
      <Input type="text" id="twitter" name="twitter" value={this.state.twitter} onChange={this.handleChange}/>
      </Col>
      </FormGroup>
      <FormGroup row>
      <Col md="2">
      <Label htmlFor="text-input">Linkedin</Label>
      </Col>
      <Col xs="12" md="10">
      <Input type="text" id="linkedin" name="linkedin" value={this.state.linkedin}/>
      </Col>
      </FormGroup>
      <FormGroup row>
      <Col md="2">
      <Label htmlFor="text-input">Facebook</Label>
      </Col>
      <Col xs="12" md="10">
      <Input type="text" id="facebook" name="facebook" value={this.state.facebook}/>
      </Col>
      </FormGroup>
      </Form>
      </CardBody>
      </Card>
      </Col>
      </Row>
      </CardBody>
      <CardFooter>
      <Button type="submit" size="sm" color="success" onClick={this.registerUser}><i className="fa fa-dot-circle-o"></i> Enviar</Button>
      &nbsp;
      <Button type="reset" id="reset" size="sm" color="danger" onClick={this.clearFields}><i className="fa fa-ban" ></i> Limpar</Button>
      &nbsp;
      </CardFooter> 
      </Card>
      </div>
      );
    }
  }
  export default RegisterJob;
  