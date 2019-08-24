import React, { Component, lazy, Suspense } from 'react';
import { Pie, Polar, Radar } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';

class PersonalityInsights extends Component {
  constructor(props) {
    super(props);
    this.loadUser = this.loadUser.bind(this);
    this.loadPolar = this.loadPolar.bind(this);
    this.loadRadar = this.loadRadar.bind(this);
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
      pi_bigfive : [0,0,0,0,0],
      pi_needs : [0,0,0,0,0,0,0,0,0,0,0,0],
      pi_values : [0,0,0,0,0],
      popup: {
        open : false,
        message : ''
      },
      formMessage: {
        message : '',
        type : ''
      },
    };
  }

componentDidMount(){
  this.loadUser();
}

loadPolar(){
  const polar = {
    datasets: [
      {
        data: this.state.pi_bigfive,
        backgroundColor: [
          '#FF6384',
          '#4BC0C0',
          '#FFCE56',
          '#E7E900',
          '#36A2EB',
        ],
        label: 'My dataset' // for legend
      }],
      labels: ['Abertura', 'Escrupulosidade', 'Extroversão', 'Amabilidade', 'Faixa Emocional'],
  };
  const options = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false
  }
  return(
    <Card>
      <CardHeader>
        Big Five
        <div className="card-header-actions">
          <a href="http://www.chartjs.org" className="card-header-action">
            <small className="text-muted">docs</small>
          </a>
        </div>
      </CardHeader>
      <CardBody>
        <div className="chart-wrapper">
          <Polar data={polar} options={options}/>
        </div>
      </CardBody>
    </Card>
    )
}

loadRadar(){
  var values = this.state.pi_needs;
  const radar = {
    labels: [
      'Desafio',
      'Retraimento',
      'Curiosidade',
      'Empolgação',
      'Ideal',
      'Liberdade',
      'Amor',
      'Natureza Prática',
      'Expressão da Própia Personalidade',
      'Estabilidade',
      'Estrutura',
    ],
    datasets: [
      {
        label: 'Necessidades',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#000',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        data: values,
      },
    ],
  };
  return(
    <Card>
      <CardHeader>
        Necessidades
          <div className="card-header-actions">
            <a href="http://www.chartjs.org" className="card-header-action">
              <small className="text-muted">docs</small>
            </a>
          </div>
      </CardHeader>
      <CardBody>
        <div className="chart-wrapper">
          <Radar data={radar} />
        </div>
      </CardBody>
    </Card>
  )
}

loadPie(){
  const pie = {
    labels: [
      'Conservação',
      'Abertura a Mudança',
      'Hedonismo',
      'Autocrescimento',
      'Autotranscendencia',
    ],
    datasets: [
      {
        data: this.state.pi_values,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#27C156',
          '#98CE56',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#27C156',
          '#98CE56',
        ],
      }],
  };  
  return(
    <Card>
      <CardHeader>
        Pie Chart
        <div className="card-header-actions">
          <a href="http://www.chartjs.org" className="card-header-action">
            <small className="text-muted">docs</small>
          </a>
        </div>
      </CardHeader>
      <CardBody>
        <div className="chart-wrapper">
          <Pie data={pie} />
        </div>
      </CardBody>
    </Card>
  );
}

loadUser(){
fetch('api/search/candidate?table=CANDIDATO&cod='+this.props.match.params.id)
  .then(res => res.json())
  .then(res => {
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
        this.setState({
          cep: res.recordset[0].cep,
          logradouro:res.recordset[0].logradouro, 
          bairro: res.recordset[0].bairro,
          localidade:res.recordset[0].localidade,
          uf: res.recordset[0].uf,
          complemento: res.recordset[0].complemento,
        });
        fetch('api/search/personality?table=PI_BIGFIVE&cod='+this.props.match.params.id)
        .then(res => res.json())
        .then(res => {
          this.setState({
            pi_bigfive : [res.recordset[0].abertura, res.recordset[0].escrupulosidade, res.recordset[0].extroversao, res.recordset[0].amabilidade, res.recordset[0].faixa_emocional]
          })
            fetch('api/search/personality?table=PI_NEEDS&cod='+this.props.match.params.id)
            .then(res => res.json())
            .then(res => {
              this.setState({
                pi_needs : [
                  res.recordset[0].desafio,
                  res.recordset[0].retraimento, 
                  res.recordset[0].curiosidade, 
                  res.recordset[0].empolgacao,
                  res.recordset[0].harmonia,
                  res.recordset[0].ideal,
                  res.recordset[0].liberdade,
                  res.recordset[0].amor,
                  res.recordset[0].natureza_pratica,
                  res.recordset[0].expressao_personalidade,
                  res.recordset[0].estabilidade,
                  res.recordset[0].estrutura
                ]
              });
              fetch('api/search/personality?table=PI_VALUES&cod='+this.props.match.params.id)
              .then(res => res.json())
              .then(res => {
                console.log(res);
                this.setState({
                  pi_values : [
                    res.recordset[0].conservacao,
                    res.recordset[0].abertura_mudanca, 
                    res.recordset[0].hedonismo, 
                    res.recordset[0].autocrescimento,
                    res.recordset[0].autotranscendencia
                  ]
                })
              })
              .catch(err => {
                console.log("Erro" +err);
              });
            })
            .catch(err => {
              console.log("Erro" +err);
            });

        })
        .catch(err => {
          console.log("Erro" +err);
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
  return(
    <div className="animated fadeIn">
      <Card>
        <CardHeader>
          <strong>Perfil do Candidato</strong> : {this.state.nome}&nbsp;{this.state.sobrenome}
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
                      <Col md="2">
                        <Label htmlFor="nome">Nome</Label>
                      </Col>
                      <Col xs="12" md="10">
                        <Input 
                          type="text" id="nome" name="nome" value={this.state.nome} readOnly />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="2">
                        <Label htmlFor="text-input">Sobrenome</Label>
                      </Col>
                      <Col xs="12" md="10">
                        <Input type="text" id="sobrenome" name="sobrenome" value={this.state.sobrenome} readOnly/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="email-input">Email</Label>
                    </Col>
                    <Col xs="12" md="10">
                      <Input type="email" id="email" name="email" autoComplete="email" value={this.state.email} readOnly/>
                    </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="2">
                        <Label htmlFor="text-input">CPF</Label>
                      </Col>
                      <Col xs="12" md="10">
                        <Input type="text"  id="cpf" name="cpf" value={this.state.cpf} readOnly />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="date-input">Data de Nascimento</Label>
                    </Col>
                    <Col xs="12" md="10">
                      <Input type="date" id="data_nascimento" name="data_nascimento" placeholder="date" value={this.state.data_nascimento} readOnly />
                    </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="2">
                        <Label htmlFor="text-input">Telefone</Label>
                      </Col>
                      <Col xs="12" md="10">
                        <Input type="text" id="telefone" name="telefone" value={this.state.telefone} readOnly/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="2">
                        <Label htmlFor="text-input">Celular</Label>
                      </Col>
                      <Col xs="12" md="10">
                        <Input type="text" id="celular" name="celular" value={this.state.celular} readOnly/>
                      </Col>
                    </FormGroup>
                </Form>
              </CardBody>
            </Card>
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
                        <Input type="text" id="cep" name="cep" value={this.state.cep} readOnly/>
                      </Col>
                      <Col md="2">
                        <Label htmlFor="text-input">Número</Label>
                      </Col>
                      <Col xs="12" md="4">
                        <Input type="text" id="endereco_numero" name="endereco_numero" value={this.state.endereco_numero} readOnly/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="text-input">Complemento</Label>
                    </Col>
                    <Col xs="12" md="10">
                      <Input type="text" id="complemento" name="complemento" value={this.state.complemento} readOnly/>
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
          <Col xs="12" md="6">
          {this.loadPolar()}
          {this.loadRadar()}
          {this.loadPie()}
            
          </Col>
        </Row>
        </CardBody>
        <CardFooter>
        </CardFooter> 
        </Card>
      </div>
  );
  }
}
export default PersonalityInsights;
