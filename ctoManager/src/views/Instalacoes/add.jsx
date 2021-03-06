import React from "react";

import axios from "axios";
import { Redirect } from "react-router-dom";
import { utils } from "../../common";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import classNames from "classnames";
import Select from "react-select";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  divAutocomplete: {
    paddingTop: 30
  },
  input: {
    display: "flex",
    padding: 0
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    right: 0
  }
};

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

class addInstalacao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      porta: "",
      caixas: [],
      clientes:[],
      funcionarios: []
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = lot => {
    if (this.state.redirect) {
      return <Redirect to="/admin/instalacoes" />;
    }
  };

  handleChange = name => value => {
    this.setState({
      [name]: value
    });
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  save = async event => {
    event.preventDefault();
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      await axios.post(`${utils.URL_BASE_API}/instalacoes`, {
        porta: this.state.porta,
        dataInstalacao: this.state.installDate,
        dataLiberacaoPorta: null,
        idCaixa: this.state.idCaixa.value,
        idPessoaFuncionario: this.state.idPessoaFuncionario.value,
        idPessoaCliente: this.state.idPessoaCliente.value
      },{
           headers : {"X-Access-Token" : user.token}
      });
      this.setRedirect();
    } catch (err) {
      utils.showError(err);
    } 
    //console.log(this.state);
  };

  loadCaixas = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const res = await axios
      .get(`${utils.URL_BASE_API}/ctos`, {
        headers: {
          "X-Access-Token": user.token
        }
      })
      .then(res => {
        this.setState({ caixas : res.data });
      });
    } catch (err) {
      utils.showError(err);
    }
  };

  loadClientes = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const res = await axios
      .get(`${utils.URL_BASE_API}/clientes`, {
        headers: {
          "X-Access-Token": user.token
        }
      })
      .then(res => {
        this.setState({ clientes : res.data });
      });
    } catch (err) {
      utils.showError(err);
    }
  };

  loadFuncionarios = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const res = await axios
      .get(`${utils.URL_BASE_API}/funcionarios`, {
        headers: {
          "X-Access-Token": user.token
        }
      })
      .then(res => {
        this.setState({ funcionarios : res.data });
      });
    } catch (err) {
      utils.showError(err);
    }
  };

  componentDidMount() {
    this.loadCaixas();
    this.loadClientes();
    this.loadFuncionarios();
  }
  
  render() {
    const { classes } = this.props;

    const components = {
      Control,
      Menu,
      MultiValue,
      NoOptionsMessage,
      Option,
      Placeholder,
      SingleValue
    };

    const allCaixas = this.state.caixas
      .map(caixa => {
        return { label: (caixa.descricao), value: caixa.idCaixa };
      });

    const allClientes = this.state.clientes
      .map(clientes => {
        return { label: (clientes.nome +" "+ clientes.sobrenome), value: clientes.idPessoa };
      });

      const allFuncionarios = this.state.funcionarios
      .map(funcionarios => {
        return { label: (funcionarios.nome +" "+ funcionarios.sobrenome), value: funcionarios.idPessoa };
      });

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Registrar Instala????o</h4>
              </CardHeader>
              <form onSubmit={this.save}>
                <CardBody>
                <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <TextField
                            id="dataInstalacao"
                            name="dataInstalacao"
                            label="Data da Instala????o:"
                            type="date"                            
                            onChange={(event) => this.setState({installDate: event.target.value})}

                            className={classes.textField}
                            InputLabelProps={{
                              value: this.state.dataInstalacao,
                              shrink: true,
                              required: true
                            }}
                        />
                    </GridItem>
                      <GridItem xs={3} sm={3} md={3}>
                      <CustomInput
                        labelText="Porta"
                        id="porta"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "porta",
                          value: this.state.porta,
                          onChange: this.onChange,
                          required: true
                        }}
                      />
                      </GridItem>
                      <GridItem style={{ marginTop: 22 }} xs={6} sm={6} md={6}>
                          <Select
                            classes={classes}
                            options={allCaixas}
                            components={components}
                            value={this.state.idCaixa}
                            required={true}
                            onChange={this.handleChange("idCaixa")}
                            placeholder="Caixa"                        
                          />
                    </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem style={{ marginTop: 22 }} xs={6} sm={6} md={6}>
                          <Select
                            classes={classes}
                            options={allClientes}
                            components={components}
                            value={this.state.idPessoaCliente}
                            required={true}
                            onChange={this.handleChange("idPessoaCliente")}
                            placeholder="Cliente"                        
                          />
                    </GridItem>
                    <GridItem style={{ marginTop: 22 }} xs={6} sm={6} md={6}>
                          <Select
                            classes={classes}
                            options={allFuncionarios}
                            components={components}
                            value={this.state.idPessoaFuncionario}
                            required={true}
                            onChange={this.handleChange("idPessoaFuncionario")}
                            placeholder="Funcion??rio"                        
                          />
                    </GridItem>
                    </GridContainer>  
                </CardBody>
                <CardFooter>
                  {this.renderRedirect(this.state.lot)}
                  <Button value="Cadastrar" type="submit" color="info">
                    Cadastrar
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(addInstalacao);