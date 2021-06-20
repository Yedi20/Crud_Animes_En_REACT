/* eslint-disable react/jsx-no-undef */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line no-unused-vars
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';


const data = [
  { id: 1, personaje: "Naruto", anime: "Naruto" },
  { id: 2, personaje: "Goku", anime: "Dragon Ball" },
  { id: 3, personaje: "Kenshin Himura", anime: "Rurouni Kenshi" },
  { id: 4, personaje: "Monkey D. Luffy", anime: "One Piece" },
  { id: 5, personaje: "Edward Elric", anime: "Fullmetal Alchemist: Broitherhood" },
  { id: 6, personaje: "Seto Kaiba", anime: "Yu-Gi-Oh!" },
];
class App extends React.Component {
  state = {
    data: data,
    form: {
      id: '',
      personaje: '',
      anime: ''
    },
    ModalInsertar: false,
    ModalEditar: false,
  };
  handleChange=e=> {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }
  //'aqui lo se debe es insertar 

  mostrarModalInsertar=() => {
    this.setState({ ModalInsertar: true });
  }

  ocultarModalInsertar = () => {
    this.setState({ ModalInsertar: false });
  }

// aqui vamos a editar lo que se inserto.

mostrarModalEditar = (registro) => {
  this.setState({ ModalEditar: true, form: registro });
}

ocultarModalEditar = () => {
  this.setState({ModalEditar: false });
}
 
//metodo para insertar
  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ data: lista, ModalInsertar: false });
  }

  // aqui vamos a editar
  editar=(dato)=>{
var contador =0;
var lista=this.state.data;
lista.map((registro)=>{

  if (dato.id==registro.id) {
    lista[contador].personaje=dato.personaje;
    lista[contador].personaje=dato.anime;
    
  }
  contador++;
});
this.setState({data: lista, ModalEditar: false});

  }
 

 //vamos a elimnar
 eliminar=(dato)=>{
  var opcion=window.confirm("Desea realmente eliminarlo eh?" +dato.id );
  if(opcion){

    var contador =0;
    var lista=this.state.data;
    lista.map((registro)=>{
      if (registro.id==dato.id){
        lista.splice(contador, 1);
        
      }
   
      contador++;
    });
   this.setState({data: lista});
   
  }

 
}
  render() {
    return (
      <>
        <Container>

          <br />

          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Insertar Nuevo Personaje</Button>
          <br />  
          <br />

          <Table>
            <thead>
              <tr>
              <th>Id</th>
              <th>Personaje</th>
              <th>Anime</th>
              <th>Acciones</th>
            </tr>
            </thead>

            <tbody>
              {this.state.data.map((elemento) => (
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.personaje}</td>
                  <td>{elemento.anime}</td>

                  <td><Button color="primary"  onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>{"  "}
                    <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button></td>

                </tr>

              ))}
            </tbody>

          </Table>
        </Container>


        <Modal isOpen={this.state.ModalInsertar}>
          <ModalHeader>
            <div>
              <h3>
                Insertar Registro
              </h3>
            </div>
          </ModalHeader>
             

          <ModalBody> 

          <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.data.length+1}/>
            </FormGroup>

            <FormGroup>
              <label>Personaje:</label>
              <input className="form-control" name="personaje"  type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Anime:</label>
              <input className="form-control" name="anime" type="text" onChange={this.handleChange} />
            </FormGroup>

          </ModalBody>
           
          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>Insertar</Button>
            <Button color="danger" onClick={() => this.ocultarModalInsertar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>



        
        <Modal isOpen={this.state.ModalEditar}>
          <ModalHeader>
            <div>
              <h3>
                Editar Registro
              </h3>
            </div>
          </ModalHeader>
             

          <ModalBody> 

          <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.form.id} />
            </FormGroup>

            <FormGroup>
              <label>Personaje:</label>
              <input className="form-control" name="personaje"  type="text" onChange={this.handleChange} value={this.state.form.personaje} />
            </FormGroup>

            <FormGroup>
              <label>Anime:</label>
              <input className="form-control" name="anime" type="text" onChange={this.handleChange} value={this.state.form.anime} />
            </FormGroup>

          </ModalBody>
           
          <ModalFooter>
            <Button color="primary" onClick={()=>this.editar(this.state.form)} >Editar</Button>
            <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </>
      );
  }
}

export default App;
