import React, { Component } from 'react';
import Popup from "reactjs-popup";
import { Link } from 'react-router-dom';
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


class User extends Component {
  constructor(props) {
    super(props);
    this.validateForm = this.validateForm.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.loadUser = this.loadUser.bind(this);

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

  componentDidMount(){
    this.loadUser();
  }

  loadUser(){
    fetch('api/search/candidate?table=CANDIDATO&cod='+this.props.match.params.id)
    .then(res => res.json())
    .then(res => {
      console.log(res.recordset)
      this.setState({
        nome: res.recordset[0].nome,
        sobrenome: res.recordset[0].sobrenome,
        data_nascimento:res.recordset[0].data_nascimento,
        cpf:res.recordset[0].cpf,
        email:res.recordset[0].email,
        telefone:res.recordset[0].telefone,
        celular:res.recordset[0].celular,
        cep:res.recordset[0].cep,
        endereco_numero:res.recordset[0].endereco_numero,
        cod_localidade: res.recordset[0].cod_localidade,
      });

      fetch('api/search/address?table=LOCALIDADE&cod='+this.state.cod_localidade)
      .then(res => res.json())
      .then(res => {
        console.log("Localidade : "+res);
        this.setState({
          cep: res.recordset[0].cep,
          logradouro:res.recordset[0].logradouro, 
          bairro: res.recordset[0].bairro,
          localidade:res.recordset[0].localidade,
          uf: res.recordset[0].uf,
          complemento: res.recordset[0].complemento,
        });
      })
      .catch(err => {
        this.openPopup("Erro ao carregar localidade : " +err);
      });
    })
    .catch(err => {
      this.openPopup("Erro ao carregar candidato : " +err);
    });
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
              formMessage : {
                message : "Insira um CEP válido",
                type : 'error'
              },
              logradouro : '',
              bairro:'',
              localidade:'',
              uf:'', 
            });
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

  renderMessage(){
    return(
      <Label>{this.state.formMessage.message}</Label>
    )
  }

  validateCEP = () => {
    if(this.state.cep.length < 8){
      this.validateForm("cep", this.state.cep, false);
    }else{
      fetch('api/selectcep?table=LOCALIDADE&cep='+this.state.cep)
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
        console.log("Erro" +err);
      });
    }
  }

  clearFields = () => {
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

    this.validateForm(event.target.id, value);
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
    console.log(this.props.match.params.id);
   // {this.loadUser()}
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
                         />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="date-input">Data de Nascimento</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input 
                        type="text" 
                        id="data_nascimento" 
                        name="data_nascimento" 
                        placeholder="date" 
                        onChange={this.handleChange} 
                        value={this.state.data_nascimento} 
                        invalid={this.state.invalid.data_nascimento} 
                        valid={this.state.valid.data_nascimento}
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
                          valid={this.state.valid.telefone}/>
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
                        />
                      </Col>
                    </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">Curriculo</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="file-input" name="file-input" />
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
                          />
                        <InputGroupAddon addonType="append">
                          <Button type="button" color="success" onClick={this.validateCEP}>Validar</Button>
                        </InputGroupAddon>
                        <FormFeedback invalid="">Insira um CEP válido</FormFeedback>
                      </InputGroup>
                        {/* <Input maxLength="8" type="text" id="cep" name="text-input" onChange={this.handleChangeCEP} value={this.state.cep}/> */}
                        {/* <InputMask mask="99999-999" type="text" id="cep" name="text-input" onChange={this.handleChangeCEP} value={this.state.cep}/> */}
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
               <Button type="submit" size="sm" color="success" onClick={this.registerUser}><i className="fa fa-dot-circle-o"></i> Atualizar</Button>
                &nbsp;
                <Link to="/modificarusuario">
                  <Button type="reset" id="reset" size="sm" color="danger" onClick={this.clearFields}><i className="fa fa-ban" ></i> Cancelar</Button>
                </Link>
                &nbsp;
                {this.renderMessage()}
        </CardFooter> 
        </Card>
      </div>
    );
  }
}

export default User;
