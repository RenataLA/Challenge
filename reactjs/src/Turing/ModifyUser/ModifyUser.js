import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
import {
  Button,
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from 'reactstrap';

class ModifyUser extends Component {
  constructor(props) {
    super(props);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.state = {
      filtercod:'%',
      filtercpf:'',
      filteremail:'',
      usersData: [],
      popup: {
        open : false,
        message : ''
      },
    };
  }

  componentDidMount(){
    this.performSearch();
    this.setState({
      filtercod: ''
    });
  }

  clearFields = () => {
    this.setState({
      filtercod:'',
      filtercpf:'',
      filteremail:'',
      sqlquery:'',
      response:'',
      post:'',
      responseToPost:''
    });
  }

  performSearch = () => {
      fetch('api/selectCandidato?table=CANDIDATO&cod='+this.state.filtercod +'&cpf='+this.state.filtercpf+'&email='+this.state.filteremail)
      .then(res => res.json())
      .then(res => {
        var aux = [];
        res.recordset.forEach(e => {
          aux.push(e);
        });
        this.setState({
          usersData : aux
        })
        this.renderTableData();

      })
      .catch(err => {
        this.openPopup("Erro ao filtrar candidatos. " + err);
      });
  }

  renderTableData(){
    return this.state.usersData.map((usersData, index) => {
      const {cod_candidato, nome, sobrenome, email, endereco } = usersData;
      const userLink = `/modificar/${cod_candidato}`
      return (
        <tr key={cod_candidato}>
          <th scope="row"><Link to={userLink}>{cod_candidato}</Link></th>
          <td><Link to={userLink}>{nome}&nbsp;{sobrenome}</Link></td>
          <td>{email}</td>
          <td><Link to={userLink}></Link></td>
        </tr>
      )
    });
    }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      sex: radioSelected.target.value,
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
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Filtrar Usuários</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" className="form-horizontal">
                  <FormGroup row>
                  <Col md="4">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          type="text" 
                          id="filtercod" 
                          name="filtercod" 
                          placeholder="Código"
                          value={this.state.filtercod}
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                    </Col>
                    <Col md="4">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          type="text" 
                          id="filtercpf" 
                          name="filtercpf" 
                          placeholder="CPF" 
                          value={this.state.filtercpf}
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                    </Col>
                    <Col md="4">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-envelope-o"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          type="text" 
                          id="filteremail" 
                          name="filteremail" 
                          placeholder="E-Mail" 
                          value={this.state.filteremail}
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="success" onClick={this.performSearch}><i className="fa fa-dot-circle-o"></i> Buscar</Button>
                <Label>&nbsp;</Label>
                <Button type="reset" size="sm" color="danger" onClick={this.clearFields}><i className="fa fa-ban"></i> Limpar</Button>
              </CardFooter>
            </Card>
          </Col>
          </Row>
          <Popup open={this.state.popup.open} closeOnDocumentClick onClose={this.closePopup}>
               <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '100%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>{this.state.popup.message}</h2>
                      {/* <Link to="/dashboard">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Menu</Button>
                      </Link> */}
                    </div>
                  </CardBody>
                </Card>
               </Popup>
        {/* Lista de Usuários */}
          <Row>
          <Col xl={12}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Usuários <small className="text-muted"></small>
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">Cód.</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {userList.map((user, index) =>
                        <UserRow key={index} user={user}/>
                      )} */}
                      {this.renderTableData()}
                    </tbody>
                  </Table>
                  <Pagination className="center">
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination>
                </CardBody>
              </Card>
            </Col>
          </Row>
      </div>
    );
  }
}

export default ModifyUser;
