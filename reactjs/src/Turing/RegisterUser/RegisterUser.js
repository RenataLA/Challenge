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
class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.validateForm = this.validateForm.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.state = {
      nome:'',
      sobrenome:'',
      data_nascimento:'',
      cpf:'',
      email:'',
      telefone:'',
      celular:'',
      cep:'',
      endereco_numero:'',
      logradouro:'', 
      bairro: '',
      localidade:'',
      uf: '',
      complemento: '',
      cod_localidade: '',
      selectedFile: null,
      cod_candidato: '',
      twitter : '',
      popup: {
        open : false,
        message : ''
      },
      formMessage: {
        message : '',
        type : ''
      },
      invalid : {
        nome: false,
        sobrenome: false,
        data_nascimento: false,
        cpf: false,
        email: false,
        telefone: false,
        celular: false,
        cep: false,
        endereco_numero: false,
        logradouro: false, 
        bairro: false,
        localidade: false,
        uf: false,
        complemento: false,
        cod_localidade: false,
      },
      valid : {
        nome: false,
        sobrenome: false,
        data_nascimento: false,
        cpf: false,
        email: false,
        telefone: false,
        celular: false,
        cep: false,
        endereco_numero: false,
      },
    };


  }

  validateForm(id, value, isvalid){
    var invalid = {...this.state.invalid}
    var valid = {...this.state.valid}
    const invalidkeys = Object.keys(invalid);
    invalidkeys.forEach(e => {
      if(e == id){
        if(id == "cep"){
          if(isvalid){
            invalid[e] = false;
            valid[e] = true
            this.setState({
              formMessage : {
                message : '',
                type : ''
              }
            });
          }
          else{
            invalid[e] = true;
            valid[e] = false;
            this.setState({
              logradouro : '',
              bairro:'',
              localidade:'',
              uf:'', 
            });
          }
        }
        else if(id == "email"){
          if(value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            invalid[e] = false;
            valid[e] = true;
            this.setState({
              formMessage : {
                message : '',
                type : ''
              }
            });
          }
          else{
            invalid[e] = true;
            valid[e] = false;
           }
        }
        else{
          if(value){
            invalid[e] = false;
            valid[e] = true;
          }
          else{
            invalid[e] = true;
            valid[e] = false;
          }
        }
      }
    });
    this.setState({
      invalid : invalid,
      valid : valid
    });    
  }

sendfFile = () => {
  const data = new FormData() 
  data.append('file', this.state.selectedFile);
  console.log(this.state.selectedFile);
  //data.append('cod_candidato', this.state.cod_candidato);
  axios.post("api/personality/upload", data, { 
  })
  .then(res => {
      console.log(res.statusText)
      //this.openPopup("Usuário Cadastrado com Sucesso" + res);
      //this.clearFields();
  })
  .catch(err => {
    console.log("Erro");
      console.log(err);
  });
}

registerUser = () => {
    
  var valid = {...this.state.valid}
  const validvalues = Object.values(valid);
  var invalid = false;
  for (let i = 0; i < validvalues.length; i++) {
      if(!validvalues[i]){
          console.log("Invalido" + i);
          invalid = true;
          this.validateForm();
          break;
      }      
  }
  if(!invalid && this.state.selectedFile){
    axios.post("api/register/newcandidate", {
      "table" : "CANDIDATO",
      "values": {
          "nome" : this.state.nome,
          "sobrenome" : this.state.sobrenome,
          "data_nascimento" : this.state.data_nascimento,
          "cpf" : this.state.cpf,
          "email" : this.state.email,
          "telefone" : this.state.telefone,
          "celular" : this.state.celular,
          "endereco_numero" : this.state.endereco_numero,
          "cod_localidade" : this.state.cod_localidade
      }
  })
  .then(res => {
      fetch('api/search/candidate?table=CANDIDATO&cpf='+this.state.cpf)
      .then(res => res.json())
      .then(res => {
          this.setState({
              cod_candidato:res.recordset[0].cod_candidato,
          });
          const data = new FormData() 
          data.append('file', this.state.selectedFile);
          console.log(this.state.selectedFile);
          data.append('cod_candidato', this.state.cod_candidato);
          data.append('twitter', this.state.twitter);
          axios.post("api/personality/upload", data, { 
          })
          .then(res => {
              console.log(res.statusText)
              this.openPopup("Usuário Cadastrado com Sucesso" + res);
              this.clearFields();
          })
          .catch(err => {
              console.log(err);
          });
      })
      .catch(err => {
          this.openPopup("Erro ao recuperar código do candidato : " + err);
      });
      
  })
  .catch(err => {
      console.log(err)
  }); 
  }
}

  validateCEP = () => {
    if(this.state.cep.length < 8){
      this.validateForm("cep", this.state.cep, false);
    }else{
      fetch('api/register/getzipcode?table=LOCALIDADE&cep='+this.state.cep)
      .then(res => res.json())
      .then(res => {
        this.setState({
          cod_localidade: res.recordset[0].cod_localidade,
          bairro : res.recordset[0].bairro,
          localidade : res.recordset[0].localidade,
          logradouro : res.recordset[0].logradouro,
          uf : res.recordset[0].uf
        });
        this.validateForm("cep", this.state.cep, true);
      })
      .catch(err => {
        this.openPopup("Erro ao validar CEP :" + err);
    });
    }
  }

  clearFields = () => {
    var invalid = {...this.state.invalid}
    var valid = {...this.state.valid}
    const invalidkeys = Object.keys(invalid);
    invalidkeys.forEach(e => {
      invalid[e] = null
    });
    const validkeys = Object.keys(valid);
    validkeys.forEach(e => {
      valid[e] = null
    });
    this.setState({
      nome:'',
      sobrenome:'',
      data_nascimento:'',
      cpf:'',
      email:'',
      telefone:'',
      celular:'',
      cep:'',
      endereco_numero:'',
      logradouro:'', 
      bairro: '',
      localidade:'',
      uf: '',
      complemento: '',
      cod_localidade: '',
      invalid : invalid,
      valid : valid,
      selectedFile : null
    });
  }
  
  handleChange = event => {
    var value = '';
    if(event.target.id == "cep"){
      value = event.target.value.replace(/([^\d])/, '');
      
    } 
    else{
      value = event.target.value
    }      
    this.setState({
      [event.target.id]: value
    });
    this.validateCEP();
    this.validateForm(event.target.id, value);
  }

  handleChangeFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });

  }

  openPopup(message){
    this.setState({
      popup : {
        open : true,
        message : message
      }
    });
  }

  closePopup(){
    this.setState({
      popup: {
        open : false,
        message: ''
      }
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
        <CardHeader>
          <strong>Novo Candidato</strong>
        </CardHeader>
        <CardBody>
        <Row>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong><i className="cui-user-follow"></i>&nbsp;Informações Pessoais</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="nome">Nome</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input 
                          type="text" 
                          id="nome" 
                          name="nome" 
                          onChange={this.handleChange} 
                          value={this.state.nome} 
                          invalid={this.state.invalid.nome} 
                          valid={this.state.valid.nome} 
                          required
                          />
                          <FormFeedback invalid="">Insira o nome do candidato</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Sobrenome</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input 
                          type="text" 
                          id="sobrenome" 
                          name="sobrenome" 
                          onChange={this.handleChange} 
                          value={this.state.sobrenome} 
                          invalid={this.state.invalid.sobrenome} 
                          valid={this.state.valid.sobrenome} 
                          required
                        />
                        <FormFeedback invalid="">Insira o Sobrenome do candidato</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input 
                      type="email" 
                      id="email" 
                      name="email" 
                      autoComplete="email" 
                      onChange={this.handleChange} 
                      value={this.state.email} 
                      invalid={this.state.invalid.email} 
                      valid={this.state.valid.email}
                      required
                      />
                      <FormFeedback invalid="">Insira um e-mail válido</FormFeedback>
                    </Col>
                     </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">CPF</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input 
                          type="text"  
                          id="cpf" 
                          name="cpf" 
                          onChange={this.handleChange} 
                          value={this.state.cpf} 
                          invalid={this.state.invalid.cpf} 
                          valid={this.state.valid.cpf}
                          required
                         />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="date-input">Data de Nascimento</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input 
                        type="date" 
                        id="data_nascimento" 
                        name="data_nascimento" 
                        placeholder="date" 
                        onChange={this.handleChange} 
                        value={this.state.data_nascimento} 
                        invalid={this.state.invalid.data_nascimento} 
                        valid={this.state.valid.data_nascimento}
                        required
                       />
                    </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Telefone</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input 
                          type="text" 
                          id="telefone" 
                          name="telefone" 
                          onChange={this.handleChange} 
                          value={this.state.telefone}
                          invalid={this.state.invalid.telefone} 
                          valid={this.state.valid.telefone}
                          required
                          />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Celular</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input 
                        type="text" 
                        id="celular" 
                        name="celular" 
                        onChange={this.handleChange} 
                        value={this.state.celular} 
                        invalid={this.state.invalid.celular} 
                        valid={this.state.valid.celular}
                        required
                        />
                      </Col>
                    </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">Curriculo</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                      type="file" 
                      id="file-input" 
                      name="file-input" 
                      onChange={this.handleChangeFile} 
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
           <Card>
              <CardHeader>
                <strong><i className="cui-user-follow"></i>&nbsp;Talentos</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="nome">Nome</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input 
                          type="text" 
                          id="formacao" 
                          name="formacao" 
                          onChange={this.handleChange} 
                          value={this.state.formacao} 
                          invalid={this.state.invalid.formacao} 
                          valid={this.state.valid.formacao} 
                          required
                          />
                          <FormFeedback invalid="">Insira o nome do candidato</FormFeedback>
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
                          onChange={this.handleChange} 
                          value={this.state.cep} 
                          maxLength="8" 
                          invalid={this.state.invalid.cep} 
                          valid={this.state.valid.cep}
                          required
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
                        <Input 
                          type="text" 
                          id="endereco_numero" 
                          name="endereco_numero" 
                          onChange={this.handleChange} 
                          value={this.state.endereco_numero} 
                          invalid={this.state.invalid.endereco_numero} 
                          valid={this.state.valid.endereco_numero}
                          required
                        />
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
               <Popup open={this.state.popup.open} closeOnDocumentClick onClose={this.closePopup}>
               <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '100%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>{this.state.popup.message}</h2>
                      <p>Voltar para o menu?</p>
                      <Link to="/dashboard">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Menu</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
               </Popup>
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
export default RegisterUser;
